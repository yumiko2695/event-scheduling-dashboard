import React, {useState, useEffect} from 'react';
import '../styles/App.css';
import Dashboard from './Dashboard'
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios'

function App() {
  const [authed, setAuthed] = useState(false)
  const [admin, setAdmin] = useState(false)
  let unregisterAuthObserver;
  let uiConfig = {
    signInFlow: 'popup', //this.props.type === 'popup' ? 'popup' : 'credential',
    signInOptions: [       firebase.auth.GoogleAuthProvider.PROVIDER_ID,      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none',
    signinSuccessUrl: '/',
    callbacks: {
            //console.log(currentUser)
      }
  }
  useEffect(() => {
    unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      async (user) => {
          if (user) { //only allow specific team members, not all users
            let userInfo = firebase.auth().currentUser;
            let name, email, photoUrl, uid, emailVerified;
            if (userInfo != null) {
              name = user.displayName;
              email = user.email;
              photoUrl = user.photoURL;
              emailVerified = user.emailVerified;
              uid =user.uid;
            }
            let token = await firebase.auth().currentUser.getIdToken()
            await axios.get('/auth', {headers: {
                Authorization: 'Bearer ' + token
              }
              })
              .then(
                function(response){
                  console.log(response.data)
                if(response.data === 'admin') {
                  setAuthed(true)
                  setAdmin(true)
                }            // ...
            }).catch(function(error) {
              // Handle error
            });

            }
        //       if (user.uid === "4kxEUK4BVfSIzDR6GVm7sZROqag2" || user.uid === "ww0gWsISlVPDeWroRGUP4Hofrh13" || user.uid === 'WLwvbeMi6qa35kCqOzhi0BaKBCZ2' || user.uid==='fBpbYu1tNqPukukVjENIqV8Q1O32' || user.uid==="EPXXPJfH1ePtLFkXiK9wMYsITdF2")
        //         setAuthed(true)
        //         console.log(authed)
        //       } else setAuthed(false)
        //       console.log(authed)
        // });
    })
  })

  return (
    <div className="App">
    {!authed && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>}
      {authed && <Dashboard authed={authed}  admin={admin}/>}    </div>
  );
}

export default App;
