
//auth.currentUser

//on user changes
auth.onAuthStateChanged(user=>{    
    if(user!=null)
    {
        //Updating the teacher/student status
        
        if (user != null) {
            user.providerData.forEach(function (profile) {
              console.log("Sign-in provider: " + profile.providerId);
              console.log("  Provider-specific UID: " + profile.uid);
              console.log("  Name: " + profile.displayName);
              console.log("  Email: " + profile.email);
              console.log("  Photo URL: " + profile.photoURL);
            });
          }
        
        //console.log(provider.Fb.type);
    }
    else
    {
        console.log('User logged out');
    }
});


