document.addEventListener('DOMContentLoaded', (event) => {
  let timer;
  let timeLimit = 60;// 1 menit
  let timeRemaining = timeLimit;
  let isTestActive = false;
  let currentLanguage = 'id';//default language

  const textToTypeElement = document.getElementById('text-to-type');
  const typingArea = document.getElementById('typing-area');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  const result = document.getElementById('result');
  const wpmDisplay = document.getElementById('wpm');
  const charactersDisplay = document.getElementById('character');
  const accuracyDisplay = document.getElementById('accuracy');
  const languageBtn = document.getElementById('language-btn');
  const timerElement = document.getElementById('timer');

  // daftar kata-kata random bahasa indonesia
  const wordListId = [
    "halo", "semua", "random", "musik", "aku",
    "dia", "akan", "coding", "yang", "mereka",
    "selalu", "itu", "menjadi", "melakukan", "sesuatu",
    "kamu","dengan", "ingat", "bahwa", "kita",
    "rumah", "jalan", "buku", "makanan", "minuman",
    "mobil", "motor", "sepeda", "hujan", "sedih",
    "orang", "pagi", "malam", "makan", "suara",
    "api", "langit", "angin", "siang", "tetapi",
    "taman", "kucing", "teman", "baik", "sepatu",
    "baju", "rasa", "hilang", "senang", "gembira"
  ];

  // daftar kata-kata random bahasa inggris
  const wordListEn = [
    "hello", "all", "random", "music", "i",
    "she", "will", "coding", "which", "they",
    "always", "that", "become", "do", "something",
    "you", "with", "remember", "that", "we",
    "house", "road", "book", "food", "drink",
    "car", "motorcycle", "bicycle", "rain", "sad",
    "people", "morning", "night", "eat", "voice",
    "fire", "sky", "wind", "afternoon", "but",
    "park", "cat", "friend", "good", "shoes",
    "dress", "flavor", "is lost", "like", "happy"
  ];

  let originalText = "";
  let wordsToType = [];

// fungsi untuk mendapat random teks
  function getRandomText() {
    let wordList = currentLanguage === 'id' ? wordListId : wordListEn;
    let randomWords = [];
    for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      randomWords.push(wordList[randomIndex]);
    }
    return randomWords;
  }

  startBtn.addEventListener('click', startTest);
  restartBtn.addEventListener('click', restartTest);
  typingArea.addEventListener('input', checkCompletion);
  languageBtn.addEventListener('click', switchLanguage);

  function startTest() {
    if (isTestActive) return;

    isTestActive = true;
    typingArea.disabled = false;
    typingArea.focus();
    timeRemaining = timeLimit;
    typingArea.value = "";
    result.style.display = "none";
    startBtn.style.display = "none";
    restartBtn.style.display = "block";
    timerElement.style.display = "inline";
    languageBtn.style.display = "none";

    wordsToType = getRandomText();
    originalText = wordsToType.join(' ');// store original text
    textToTypeElement.innerText = originalText;

    timer = setInterval(updateTimer, 1000);
    updateTimerDisplay();
  }

  function updateTimer() {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      endTest();
    }
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');
    timerElement.innerText = `${minutes}:${seconds}`;
  }

  function checkCompletion() {
    const typedText = typingArea.value.trim();
    const typedWords = typedText.split(/\s+/);

    let remainingWords = wordsToType.slice(typedWords.length).join(' ');

    textToTypeElement.innerText = remainingWords;// update display teks

    if (typedText === originalText) {
      clearInterval(timer);
      endTest();
    }
  }

  function endTest() {
    if (!isTestActive) return;

    isTestActive = false;
    typingArea.disabled = true;
    timerElement.style.display = "none";

    const typedText = typingArea.value.trim();
    const wordsTyped = typedText.split(/\s+/).filter(word => word.length > 0).length;
    const charactersTyped = typedText.length;

    let correctCharacters = 0;
    const minLength = Math.min(typedText.length, originalText.length);
    for (let i = 0; i < minLength; i++) {
      if (typedText[i] === originalText[i]) {
        correctCharacters++;
      }
    }

    const accuracy = Math.round((correctCharacters / originalText.length) * 100);

    wpmDisplay.innerText = Math.round((wordsTyped / timeLimit) * 60);
    charactersDisplay.innerText = charactersTyped;
    accuracyDisplay.innerText = accuracy;

    result.style.display = "block";

    // menghapus random teks setelah di tampilkan
    textToTypeElement.innerText = "";
  }

  function restartTest() {
    clearInterval(timer);
    isTestActive = false;
    typingArea.value = "";
    typingArea.disabled = true;
    result.style.display = "none";
    startBtn.style.display = "block";
    restartBtn.style.display = "none";
    languageBtn.style.display = "block";
    timerElement.style.display = "none";
    // menghapus random teks saat restart
    textToTypeElement.innerText = "";
  }

  function switchLanguage() {
    currentLanguage = currentLanguage === 'id' ? 'en' : 'id';
    if (isTestActive) {
      const randomText = getRandomText();
      textToTypeElement.innerText = randomText;
    }
    languageBtn.innerText = currentLanguage === 'id' ? 'Switch to English' : 'Switch to Indonesia';
  }
});

// Menambahkan toggle untuk dark/light mode
document.addEventListener("DOMContentLoaded", () => {
  const toggleThemeBtn = document.getElementById('toggle-theme-btn');
  const body = document.body;

  toggleThemeBtn.addEventListener("click", () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      toggleThemeBtn.textContent = '☀';
    } else {
      toggleThemeBtn.textContent = '🌙';
    }
  });
});