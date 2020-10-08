const admin = require('firebase-admin')

const getAuthToken = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    console.log('no auth')
    req.authToken = null;
  }
  next();
};

const authRequired = async (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken); //this would be replaced if using a diff database
      //take the bearer token and turn it into a user id and then verify it
      req.authId = userInfo.uid;
      //can do more here
      next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};
//isRoomAdmin - i can edit 1 room

//admin = edit all rooms
const adminsOnly = (req, res, next) => {
  authRequired(req, res, async () => {
    try {
      let adminDocs = await admin.firestore().collection('admin').where('uid', '==', req.authId).get()
      let isAdmin = adminDocs && adminDocs.docs && adminDocs.docs.map(doc => doc.data()).length > 0
      if (!isAdmin) {
        console.error("not an admin")
        return res
          .status(401)
          .send({ error: "You are not authorized to make this request" });
      } else {
        next()
      }
    } catch(e) {
      console.error(e)
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  })
}

const roomAdminOnly = (req, res, next) => {
  authRequired(req, res, async () => {
    try {
      let adminDocs = await admin.firestore().collection('admin').where('uid', '==', req.authId).get()
      let isAdmin = adminDocs && adminDocs.docs && adminDocs.docs.map(doc => doc.data()).length > 0
      if (!isAdmin) {
        console.error("not an admin")
        return res
          .status(401)
          .send({ error: "You are not authorized to make this request" });
      } else {
        next()
      }
    } catch(e) {
      console.error(e)
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  })
}

const currentUserOnly = (req, res, next) => {
  if (req.user.id !== Number(req.params.userId)) {
    const err = new Error("Wait, that's illegal")
    err.status = 401
    return next(err)
  }
  next()
}

const adminOrCurrentUser = (req, res, next) => {
  if (req.user.id === Number(req.params.userId) || req.user.admin) {
    next()
  } else {
    const err = new Error('Not your Page!')
    err.status = 401
    return next(err)
  }
}

module.exports = {getAuthToken, adminsOnly, authRequired, currentUserOnly, adminOrCurrentUser}
