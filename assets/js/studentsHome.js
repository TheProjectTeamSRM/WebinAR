window.addEventListener("DOMContentLoaded", (e) => {

  auth.onAuthStateChanged((user) => {
    if (user != null) {
      console.log(user);
      dynamicInsertion();
    } else {
      window.location.replace("student-login.html");
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
                    <p class="card-text">This is a card for section ${section}</p>
                    <a href="Classroom_students.html?id=${c}" class="btn btn-primary stretched-link"
                    >Open classroom</a
                    >
                </div>
                </div>
            </div>
                `;
      }
      console.log(html);
      html = html + "</div>";
      document.getElementById("classes-container").innerHTML = html;
    }
  }


  let logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(function () {
        window.location.replace("student-login.html");  
      })
      .catch(function (error) {
        console.error(error);
      });
  });


});

const classAdd = document.getElementById("join");

classAdd.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("Clicked");
  let classId = document.getElementById("classCode").value;

  document.getElementById("classCode").value = "";

  let result = await db.collection("users").doc(auth.currentUser.uid).get();
  let classes = result.data().classes;
  classes.push(classId);
  db.collection("users").doc(auth.currentUser.uid).update({ classes });
  location.reload();
  document.getElementById("closeBtn").click();
});
