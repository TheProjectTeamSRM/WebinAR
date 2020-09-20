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
    html=`<div class="row">`
    db.collection('changeListener').get().then(snapshot =>{
        snapshot.docs.forEach(doc=>{
            newURL=doc.data().url;
            newWord=doc.data().word; 
            newPath=doc.data().path; 
            html=html+
        `<div class="column nature">
        <button>
          <div class="content">
            <img alt="${newWord}" id="${newURL}" onclick="upload(this.id,this.alt)"
              src="${newPath}" style="width:80%">
          </div>
      </div>`
        });
        html=html+`</div>`
        document.getElementById('showHere').innerHTML=html;
    });
}


db.collection('changeListener').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type=='added')
        {
            html=`<div class="row">`
            console.log(change.doc.data());                      
            facultyFrame.src=newURL;           
            console.log(newURL);    

        }
    }); 
})

// db.collection('testdata').onSnapshot(snapshot=>{
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {

//     }); 
    
// })