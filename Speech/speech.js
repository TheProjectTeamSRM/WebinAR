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

window.setInterval(stt, 10);

//Jquery
var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var notesList = $('ul#notes');
var noteContent = '';

// previous sesh notes display ()
var notes = getAllNotes();
renderNotes(notes);

// Speech recog

function stt(){
    recognition.start();
    console.log(' Speech function working');

    recognition.onresult = function(event) {
        var word = event.results[current][0].transcript;

        var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
  
        if(!mobileRepeatBug) {
        noteContent += transcript;
        noteTextarea.val(noteContent);
        }
        noteTextarea.textContent = 'Result received: ' + word + '.';
        console.log('Confidence: ' + event.results[0][0].confidence + word);
    }
    recognition.onstart = function() { 
        instructions.text('Voice recognition activated. Try speaking into the microphone.');
      }
      
      recognition.onspeechend = function() {
        instructions.text('You were quiet for a while so voice recognition turned itself off.');
      }
      
      recognition.onerror = function(event) {
        if(event.error == 'no-speech') {
          instructions.text('No speech was detected. Try again.');  
          
        };
      }

}


//DOM manupulation

$('#start-record-btn').on('click', function(e) {
    if (noteContent.length) {
      noteContent += ' ';
    }
    recognition.start();
  });
  
  
  $('#pause-record-btn').on('click', function(e) {
    recognition.stop();
    instructions.text('Voice recognition paused.');
  });
  
  noteTextarea.on('input', function() {
    noteContent = $(this).val();
  })
  
  $('#save-note-btn').on('click', function(e) {
    recognition.stop();
  
    if(!noteContent.length) {
      instructions.text('Could not save empty note. Please add a message to your note.');
    }
    else {
      saveNote(new Date().toLocaleString(), noteContent);
      noteContent = '';
      renderNotes(getAllNotes());
      noteTextarea.val('');
      instructions.text('Note saved successfully.');
    }
        
  })
   
  notesList.on('click', function(e) {
    e.preventDefault();
    var target = $(e.target);
    if(target.hasClass('listen-note')) {
      var content = target.closest('.note').find('.content').text();
      readOutLoud(content);
    }
    if(target.hasClass('delete-note')) {
      var dateTime = target.siblings('.date').text();  
      deleteNote(dateTime);
      target.closest('.note').remove();
    }
  });
  

  // Text to speech
  function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
  
    window.speechSynthesis.speak(speech);
}