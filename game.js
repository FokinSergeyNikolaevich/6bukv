// Слова для угадывания (всего 6 букв!)
const words = ["яблоко", "малина", "огурец", "творог", "кассир", "бургер", "здание", "монета", "скидка", "ценник"];

// Выбираем случайное слово
let targetWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0;
const maxAttempts = 6;

// Находим игровое поле и сообщение
const grid = document.getElementById('grid');
const message = document.getElementById('message');

// Создаем сетку 6x6
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

// Проверяем слово
function submitGuess() {
  const input = document.getElementById('guess-input');
  const guess = input.value.toLowerCase();

  if (guess.length !== 6) {
    message.textContent = "Слово должно быть 6 букв!";
    return;
  }

  if (attempts >= maxAttempts) {
    message.textContent = `Игра окончена! Слово: ${targetWord}`;
    return;
  }

  // Проверяем каждую букву
  for (let i = 0; i < 6; i++) {
    const cell = document.getElementById(`cell-${attempts}-${i}`);
    cell.textContent = guess[i];

    if (guess[i] === targetWord[i]) {
      cell.classList.add('correct'); // Зелёный
    } else if (targetWord.includes(guess[i])) {
      cell.classList.add('present'); // Жёлтый
    } else {
      cell.classList.add('absent'); // Серый
    }
  }

  // Если угадали
  if (guess === targetWord) {
    message.textContent = "Поздравляем! Вы угадали!";
    input.disabled = true;
    return;
  }

  attempts++;
  input.value = '';

  // Если попытки закончились
  if (attempts === maxAttempts) {
    message.textContent = `Игра окончена! Слово: ${targetWord}`;
    input.disabled = true;
  }
}

// Запускаем игру
initGrid();
document.getElementById('guess-input').focus();