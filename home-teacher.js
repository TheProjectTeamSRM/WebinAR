
document.addEventListener('DOMContentLoaded',(e)=>{
    //generate random id
auth.onAuthStateChanged(user=>{
    if(user==null)
    window.location.replace("faculty-login.html");   
    else
        console.log(user);      
});    
    
        
    function makeid(length) {
        var result           = '';  
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

     const addBtn= document.getElementById('addClass');
     addBtn.addEventListener('click',(e)=>{         
         e.preventDefault();
         const section = document.getElementById('section').value;
         const sub= document.getElementById('subject').value;
         db.collection('classes').doc(makeid(6)).set({
             section: section,
             subject: sub
         });         
     });
});

 
 