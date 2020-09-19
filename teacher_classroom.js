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
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");
  console.log(myParam);
  db.collection("messages")
    .doc(myParam)
    .get()
    .then((snapshot) => {
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
  send_button = document.getElementById("msg_send");
  send_button.addEventListener("click", (e) => {
    e.preventDefault();
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    const message = document.getElementById("msg_val").value;
    document.getElementById("msg_val").value = "";
    const id = makeid(7);
    const payload = {
      message,
      timestamp: dateTime,
    };
    const data = {};
    data[id] = payload;
    db.collection("messages")
      .doc(myParam)
      .update(data)
      .then((res) => {
        const div = document.createElement("div");
        div.className = "callout callout-primary";
        div.style = "border-radius:20px;";
        div.innerHTML = `<h4>Faculty - ${dateTime}</h4>${message}`;
        console.log(div);
        document.getElementById("message-container").appendChild(div);
      })
      .catch((err) => {
        db.collection("messages")
          .doc(myParam)
          .set(data)
          .then((res) => {
            const div = document.createElement("div");
            div.className = "callout callout-primary";
            div.style = "border-radius:20px;";
            div.innerHTML = `<h4>Faculty - ${dateTime}</h4>${message}`;
            console.log(div);
            document.getElementById("message-container").appendChild(div);
          });
      });
  });
});
