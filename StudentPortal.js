var sFrame=document.getElementById('sFrame');

db.collection('changeListener').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      console.log(change.doc.data());   
      newURL=change.doc.data().url;
      sFrame.src=newURL;
      studentFrame.src=newURL;
    });
})
