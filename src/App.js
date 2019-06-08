import React, {Component} from 'react'
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyBvGIfOnVpnpqWsTh1GKZEj9lkUPdR9bMc",
  authDomain: "freelance-a-lot-978be.firebaseapp.com"
})
class App extends Component {
  state ={ isSignedin : false}
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = ()=> {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedin: !!user})
    })

  }
  render(){
    return (
    <div className="App">
      {this.state.isSignedin ? (
        <span>
      <div>Signed In</div>
      <button onClick={()=>firebase.auth().signOut()}>Sign Out!</button>
      <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
      <img alt="profile picture" src={firebase.auth().currentUser.photoURL}/>
      </span>
       ) : (
      <StyledFirebaseAuth
      uiConfig={this.uiConfig}
      firebaseAuth={firebase.auth()}/>
    )}
    </div>
  )
}
}
export default App;
