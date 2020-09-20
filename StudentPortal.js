var sFrame=document.getElementById('sFrame');

console.log(sFrame);
db.collection('changeListener').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      console.log(change.doc.data());   
      newURL=change.doc.data().url;
      sFrame.src=newURL;
      
    });
})
