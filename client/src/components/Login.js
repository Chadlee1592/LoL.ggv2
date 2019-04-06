import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login'
import GoogleLogin from "react-google-login"
import "./Login.css"

class Auth extends Component {
    render() {
        const button = this.props.loggedIn
            ? <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={this.props.logoutSuccess}
            />
            : <GoogleLogin
                clientId="438159176315-sniu1cdjmffo9pcd9okvpmosqef7cb59.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.props.loginSuccess}
                onFailure={this.props.loginFail}
            />
        return (
            <div className={this.props.loggedIn ? "googleBtn" : ""}>
                {button}
            </div>
        )
    }
}

export default Auth;















// import google from './google.png'
// import "../components/Login.css";

// //Assets
// class GoogleLogin extends Component{
//     constructor(props) {
//         super(props)
//     }

//     componentDidMount(){
//         (function() {
//             var e = document.createElement("script");
//             e.type = "text/javascript";
//             e.async = true;
//             e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
//             var t = document.getElementsByTagName("script")[0];
//             t.parentNode.insertBefore(e, t)
//         })();    
//     }

//     //Triggering login for google
//     googleLogin = () => {
//         let response = null;
//         window.gapi.auth.signIn({
//             callback: function(authResponse) {
//                 this.googleSignInCallback( authResponse )
//             }.bind( this ),
//             clientid: "438159176315-sniu1cdjmffo9pcd9okvpmosqef7cb59.apps.googleusercontent.com", //Google client Id
//             cookiepolicy: "single_host_origin",
//             requestvisibleactions: "http://schema.org/AddAction",
//             scope: "https://www.googleapis.com/auth/plus.login email"
//         });
//     }

//     googleSignInCallback = (e) => {
//         console.log( e )
//         if (e["status"]["signed_in"]) {
//             window.gapi.client.load("plus", "v1", function() {
//                 if (e["access_token"]) {
//                     this.getUserGoogleProfile( e["access_token"] )
//                 } else if (e["error"]) {
//                     console.log('Import error', 'Error occured while importing data')
//                 }
//             }.bind(this));
//         } else {
//             console.log('Oops... Error occured while importing data')
//         }
//     }

//     getUserGoogleProfile = accesstoken => {
//         var e = window.gapi.client.plus.people.get({
//             userId: "me"
//         });
//         e.execute(function(e) {
//             if (e.error) {
//                 console.log(e.message);
//                 console.log('Import error - Error occured while importing data')
//                 return

//             } else if (e.id) {
//                 //Profile data
//                 alert("Successfull login from google : "+ e.displayName )
//                 console.log( e );
//                 return;
//             }
//         }.bind(this));
//     }

//     render(){
//         return(
//             <div>
//             <img src={google} title="google login" alt="google" onClick={ () => this.googleLogin() }/>
//             {/* <button onClick={window.gapi.auth.GoogleAuth.signOut().bind(this)}>Signout</button> */}
//             </div>
//         )
//     }
// }

// export default GoogleLogin;
