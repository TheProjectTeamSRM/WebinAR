const flogin=document.getElementById('fLogin');

const provider = new firebase.auth.GoogleAuthProvider();


auth.onAuthStateChanged(user=>{    
    if(user!=null)
    {
        console.log(user);
    }
    else
    {
        console.log('User logged out');
    }
})
flogin.addEventListener('click',function(){
    provider.setCustomParameters({
        'type': 'faculty'
      });
    
    auth.signInWithPopup(provider).then(function(cred) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = cred.credential.accessToken;
      // The signed-in user info.
      var user = cred.user;
      console.log(user);
      console.log(provider.Fb.type);
      window.location.replace("home-teachers.html");
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);  
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

})

