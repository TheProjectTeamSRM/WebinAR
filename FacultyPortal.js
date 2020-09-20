var facultyFrame=document.getElementById('modelFrame');
var clearBtn=document.getElementById('clear')


clearBtn.addEventListener('click',()=>{
    document.getElementById('showHere').innerHTML="";
    db.collection("changeListener")
        .get()
        .then(res => {
          res.forEach(async element => {
            await element.ref.delete();            
          });
        });
})


function upload(link,noun,path){   
     
    //console.log('This works');
    console.log(link,noun);     
    facultyFrame.src=link;
    //console.log(path);
    //console.log(facultyFrame);
    ping(link,noun,path);
}

function ping(link,noun,source){    
    db.collection('changeListener').add({
        url: link,
        word: noun,
        path: source,
    });
    facultyFrame.src=link
    console.log('uploaded');    
}




// db.collection('testdata').onSnapshot(snapshot=>{
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {

//     }); 
    
// })