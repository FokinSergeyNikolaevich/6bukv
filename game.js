const words = ["яблоко", "малина", "огурец", "творог", "кассир", "бургер", "здание", "монета", "скидка", "ценник"];

let targetWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0;
const maxAttempts = 6;

const grid = document.getElementById('grid');
const message = document.getElementById('message');

function initGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < 6; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = `cell-${i}-${j}`;
      grid.appendChild(cell);
    }
  }
}

function submitGuess() {
  const input = document.getElementById('guess-input');
  const guess = input.value.toLowerCase();

  // Проверка на русские буквы
  const russianLetters = /^[а-яё]+$/;
  if (!russianLetters.test(guess)) {
    message.textContent = "Только русские буквы!";
    input.value = '';
    return;
  }

  if (guess.length !== 6) {
    message.textContent = "Слово должно быть 6 букв!";
    return;
  }

  if (attempts >= maxAttempts) {
    message.textContent = `Игра окончена! Слово: ${targetWord}`;
    return;
  }

  for (let i = 0; i < 6; i++) {
    const cell = document.getElementById(`cell-${attempts}-${i}`);
    cell.textContent = guess[i];

    if (guess[i] === targetWord[i]) {
      cell.classList.add('correct');
    } else if (targetWord.includes(guess[i])) {
      cell.classList.add('present');
    } else {
      cell.classList.add('absent');
    }
  }

  if (guess === targetWord) {
    message.textContent = "Поздравляем! Вы угадали!";
    input.disabled = true;
    document.querySelector('.submit-btn').disabled = true;
    return;
  }

  attempts++;
  input.value = '';

  if (attempts === maxAttempts) {
    message.textContent = `Игра окончена! Слово: ${targetWord}`;
    input.disabled = true;
    document.querySelector('.submit-btn').disabled = true;
  }
}

// Инициализация игры при загрузке
window.onload = function() {
  initGrid();
  document.getElementById('guess-input').focus();
};
