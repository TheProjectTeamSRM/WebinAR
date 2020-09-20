var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var database = ['electron', 'proton', 'neutron', 'atom', 'tissues', 'plant', 'animal'] 

var grammar = '#JSGF V1.0; grammar database;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


//DOM element
// var diagnostic = document.querySelector('.output', (intg)=>{
//     intg.preventDefault();
// });
var clear_data = document.getElementById("clear");
// var start_data = document.querySelector('.start');
// var stop_data = document.querySelector('.stop');


window.setInterval(stt, 1000);


function contain(inputspeech){
    console.log("in contain")
    db.collection('testdata').get().then((snapshot)=>{
        console.log(snapshot.docs);
    })
    var dict = { };
    var words = inputspeech.toLowerCase().split(/\s+/);
    console.log(words);
    words.forEach(function(word) {
        console.log('in word function'+database.indexOf(word))
        if (database.indexOf(word) > -1) {
            console.log('matched')
            console.log(word);
            dict[word]++;
            db.collection('testdata').add({
                data: word
            })
        }
    });
    console.log(dict);
};
var caption; 

function stt(){
    recognition.start();
    console.log("listening");

    recognition.onresult = function(event) {
      console.log("in the on result")
      var data = event.results[0][0].transcript;
    //   diagnostic.textContent =  data + ' ';
      console.log(data);
      console.log('Confidence: ' + event.results[0][0].confidence);
      contain(data);
      caption = data;
    }

      recognition.onspeechend = function() {
        recognition.stop();
      }

      recognition.onerror = function(event) {
        //testBtn.disabled = false;
        //diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
      }
    }

    ///Clearing data
    clear_data.addEventListener('click',(e) =>{
        console.log("Clear Triggered");
        e.stopPropagation();       
        db.collection("testdata")
        .get()
        .then(res => {
          res.forEach(async element => {
            await element.ref.delete();            
          });
        });

        // db.collection('testdata').get().then((snapshot)=>{
        //     snapshot.forEach((i)=>{
        //         i.delete();
        //     });
        //   });
    })
    
// $('#start').on('click', function(e) {
//         recognition.start();
//         console.log("listening");
//       });
      
      
//  $('#stop').on('click', function(e) {
//         recognition.stop();
//         console.log("Stopped listening");
//       }); 

      recognition.onaudiostart = function(event) {
          //Fired when the user agent has started to capture audio.
          console.log('SpeechRecognition.onaudiostart');
      }

      recognition.onaudioend = function(event) {
          //Fired when the user agent has finished capturing audio.
          console.log('SpeechRecognition.onaudioend');
      }

      recognition.onend = function(event) {
          //Fired when the speech recognition service has disconnected.
          console.log('SpeechRecognition.onend');
      }

      recognition.onnomatch = function(event) {
          //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
          console.log('SpeechRecognition.onnomatch');
      }

      recognition.onsoundstart = function(event) {
          //Fired when any sound — recognisable speech or not — has been detected.
          console.log('SpeechRecognition.onsoundstart');
      }

      recognition.onsoundend = function(event) {
          //Fired when any sound — recognisable speech or not — has stopped being detected.
          console.log('SpeechRecognition.onsoundend');
      }

      recognition.onspeechstart = function (event) {
          //Fired when sound that is recognised by the speech recognition service as speech has been detected.
          console.log('SpeechRecognition.onspeechstart');
      }
      recognition.onstart = function(event) {
          //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
          console.log('SpeechRecognition.onstart');
      }
