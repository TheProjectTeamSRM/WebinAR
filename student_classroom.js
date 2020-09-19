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
});
