(() => {
  // Check if SpeechRecognition is available in the browser
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in your browser.");
    return;
  }

  // DOM elements
  const imageElement = document.getElementById("image");
  const textElem = document.querySelector('.text');

  // Configuration
  const originalImageSrc = "facebot.gif";
  const changeImageTimeout = 3000;

  // Speech recognition instance
  const recognition = new SpeechRecognition();

  // Function to handle speech recognition results
  function handleRecognitionResult(event) {
    const { transcript } = event.results[0][0];
    textElem.innerText += transcript;

    if (transcript.includes("แสนดี") || transcript.includes("สวัสดีครับ") || transcript.includes("สวัสดีค่ะ")) {
      imageElement.src = "eye5.png";
      imageElement.alt = "Smile";

      setTimeout(() => {
        imageElement.src = originalImageSrc;
        imageElement.alt = "bot_eyes";
      }, changeImageTimeout);
    } 
    if (transcript.includes("สู้ๆ") || transcript.includes(สู้สู้)) {
      imageElement.src = "eye4.png";
      imageElement.alt = "bot_1eye";

      setTimeout(() => {
        imageElement.src = originalImageSrc;
        imageElement.alt = "bot_eyes";
      }, changeImageTimeout);
    }
    else {
      imageElement.src = originalImageSrc;
      imageElement.alt = "bot_eyes";
    }
  }

  // Function to start recognition
  function startRecognition() {
    recognition.lang = 'th-TH';
    recognition.addEventListener('result', handleRecognitionResult);
    recognition.addEventListener('end', startRecognition); // Restart recognition after it ends
    recognition.start();
  }

  startRecognition();
})();