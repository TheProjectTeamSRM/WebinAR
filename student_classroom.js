
auth.onAuthStateChanged(user=>{
  if(user==null)
  window.location.replace("student-login.html");

})

window.addEventListener("DOMContentLoaded", () => {


  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");
  console.log(myParam);
  db.collection("messages")
    .doc(myParam)
    .onSnapshot((snapshot) => {
      const data = snapshot.data();
      for (key in data) {
        const div = document.createElement("div");
        div.className = "callout callout-primary";
        div.style = "border-radius:20px;";
        div.innerHTML = `<h4>Faculty - ${data[key].timestamp}</h4>${data[key].message}`;
        console.log(div);
        document.getElementById("message-container").appendChild(div);
      }
    });
  db.collection("documents")
    .doc(myParam)
    .onSnapshot((snapshot) => {
      const data = snapshot.data();
      for (key in data) {
        const div = document.createElement("div");
        div.className = "callout callout-danger";
        div.style = "border-radius: 20px;";
        div.innerHTML = `<h5>${data[key].title}</h5>
      <p>${data[key].description}</p>
      <a href="${data[key].link}" download
        >Click here to download</a
      >`;
      }
    });

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
