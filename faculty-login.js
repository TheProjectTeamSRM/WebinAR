window.addEventListener("DOMContentLoaded", () => {
  let loginBtn = document.getElementById("loginBtn");
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("inputEmail").value;
    const pass = document.getElementById("inputPassword").value;
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((cred) => {
        window.location.replace("home-teachers.html");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  });
});
