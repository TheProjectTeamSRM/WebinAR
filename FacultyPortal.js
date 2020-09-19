var facultyFrame=document.getElementById('modelFrame');

function upload(link,noun){   
     
    //console.log('This works');
    console.log(link,noun);     
    facultyFrame.src=link;
    //console.log(facultyFrame);
    ping(link,noun);
}

function ping(link,noun){    
    db.collection('changeListener').add({
        url: link,
        word: noun,
    });
    facultyFrame.src=link
    console.log('uploaded');
}

db.collection('changeListener').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      console.log(change.doc.data());   
      newURL=change.doc.data().url;
      facultyFrame.src=newURL;
      console.log(newURL);     
      studentFrame.src=newURL;
    });
})