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
  /*Check if already has classes*/
  auth.onAuthStateChanged((user) => {
    if (user != null) {
      console.log(user);
      dynamicInsertion();
    } else {
      window.location.replace("faculty-login.html");
    }
  });
  async function dynamicInsertion() {
    let result = await db.collection("users").doc(auth.currentUser.uid).get();
    if (result.data().classes.length > 0) {
      document.getElementById("empty-classes").style.display = "none";
      let classes = result.data().classes;
      console.log(classes);
      let html = `<div class="row">`;
      for (c of classes) {
        let res = await db.collection("classes").doc(c).get();
        let { subject, section } = res.data();
        html =
          html +
          `<div class="col-sm-6 col-xl-3 col-md-4 mb-4">
        <div class="card" style="  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 10px; border-width: 2px;"
        data-aos="fade-up" data-aos-delay="400">
          <div class="card-body">
            <h5 class="card-title">${subject}</h5>
            <p>id:${c}</p>
            <p class="card-text">This is a card for section ${section}</p>
            <a href="Classroom_teacher.html?id=${c}" class="btn btn-primary stretched-link"
              >Open classroom</a
            >
          </div>
        </div>
      </div>
        `;
        console.log(html);
      }
      console.log(html);
      html = html + "</div>";
      document.getElementById("classes-container").innerHTML = html;
    }
  }
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
    document.getElementById("subject").value = "";
    document.getElementById("section").value = "";
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
        window.reload();
        document.getElementById("closebtn").click();
      });
  });
});
