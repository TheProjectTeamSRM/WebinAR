// JS for teachers Home
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
window.addEventListener("DOMContentLoaded", (e) => {
  // Check for no user and redirect to signin
  //   setTimeout(() => {
  //     if (!auth.currentUser) {
  //       console.log("teacher home", auth.currentUser);
  //       window.location.replace("faculty-login.html");
  //     }
  //   }, 2000);
  /* Logout */
  let logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(function () {
        window.location.replace("faculty-login.html");
      })
      .catch(function (error) {
        console.error(error);
      });
  });
  let classAdd = document.getElementById("add-class");
  classAdd.addEventListener("click", (e) => {
    e.preventDefault();
    const sub = document.getElementById("subject").value;
    const section = document.getElementById("section").value;
    const classId = makeid(6);
    db.collection("classes")
      .doc(classId)
      .set({
        subject: sub,
        section: section,
      })
      .then(async (snapshot) => {
        let result = await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .get();
        let classes = result.data().classes;
        classes.push(classId);
        db.collection("users").doc(auth.currentUser.uid).update({ classes });
        document.getElementById("closebtn").click();
      });
  });
});
