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

  // Проверка на русские буквы
  const russianLetters = /^[а-яё]+$/;
  if (!russianLetters.test(guess)) {
    message.textContent = "Только русские буквы!";
    input.value = '';  // Очищаем поле
    return;  // Прерываем выполнение
  }

  // Остальная логика (как было)
  if (guess.length !== 6) {
    message.textContent = "Слово должно быть 6 букв!";
    return;
  }
  // ... далее ваш существующий код ...
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
