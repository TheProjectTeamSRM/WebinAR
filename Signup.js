

window.addEventListener('DOMContentLoaded',()=>{
    const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('type');
console.log(myParam);


const signUp = document.getElementById('signUp');

signUp.addEventListener('click',(e)=>{
    e.preventDefault();
    const pass = document.getElementById('inputPassword').value;
    const email= document.getElementById('inputEmail').value;

    console.log(email,pass);

    firebase.auth().createUserWithEmailAndPassword(email, pass).then(cred=>{
        console.log(cred);
        db.collection('users').doc(cred.user.uid).set({
            type: myParam,
            classes: []
        }).then(()=>{            
            window.location.replace(`${myParam}-login.html`);
            

        })
    });

})


})
