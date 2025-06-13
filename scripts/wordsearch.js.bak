document.addEventListener('DOMContentLoaded', () => {
  const words = [
    "living word",
    "fortnite",
    "big city stories",
    "tela",
    "Reds",
    "bengals",
    "lewis capaldi",
    "big time rush",
    "anakeesta",
    "gattlinburg",
    "paula deans",
    "otherworld",
    "gilmore girls",
    "bridgerton",
    "endgame",
    "hamilton",
    "art museum",
    "melting pot",
    "kenwood mall",
    "color me mine",
    "clearwater",
    "destin",
    "vampire diaries",
    "pete davidson",
    "minecraft",
    "pookie",
    "milo",
    "mochi",
    "finn",
    "willow",
    "loki",
    "homecoming",
    "zoo",
    "Niederman farm",
    "kings island",
    "top golf",
    "yellow",
    "chicago",
    "pinots palet",
    "salt air",
    "the one",
    "rescue",
    "bucees",
    "Flyer Dr",
    "texas roadhouse",
    "longhorn",
    "target",
    "ross",
    "tj maxx",
    "nick and judy",
    "new girl",
    "riverdale",
    "seperate lives",
    "you",
    "the flash",
    "Trader Joes",
    "Traders World",
    "Liberty Center"
  ];

  const grid = document.getElementById('word-search-grid');
  const wordDisplay = document.getElementById('word-list-display');
  const generateBtn = document.getElementById('generateWordSearchBtn');
  const completionMessage = document.getElementById('completion-message');

  let selectedTiles = [];
  let foundWords = new Set();
  let wordPositions = [];

  generateBtn.addEventListener('click', () => {
    // Reset on new generation
    foundWords.clear();
    completionMessage.textContent = ''; // Clear previous message
    // Clear found word styles on the word list
    document.querySelectorAll('.word-to-find').forEach(span => {
        span.style.textDecoration = 'none';
        span.style.color = '#ffcce6'; // Reset to default color
    });

    const selectedWords = shuffle([...words]).slice(0, 10);
    createGrid(selectedWords);
    wordDisplay.innerHTML = '';
    selectedWords.forEach(w => {
      const item = document.createElement('span');
      item.textContent = w.toUpperCase();
      item.classList.add('word-to-find');
      wordDisplay.appendChild(item);
    });
  });

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  function createGrid(wordList) {
    const size = 20; // Revert to fixed 20x20 grid size

    const board = Array.from({ length: size }, () => Array(size).fill(''));
    wordPositions = []; // Reset word positions for new grid

    wordList.forEach(word => {
      const clean = word.replace(/\s/g, '').toUpperCase();
      placeWord(board, clean, word.toUpperCase());
    });

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (!board[y][x]) {
          board[y][x] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    grid.innerHTML = '';
    // Revert to explicitly setting grid-template-columns with fixed px for desktop
    grid.style.gridTemplateColumns = `repeat(${size}, 35px)`;
    grid.classList.add('puzzle-grid');

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const tile = document.createElement('div');
        // Keep the span wrapper for letters for consistent centering with flexbox
        const letterSpan = document.createElement('span');
        letterSpan.textContent = board[y][x];
        tile.appendChild(letterSpan);

        tile.dataset.x = x;
        tile.dataset.y = y;
        tile.classList.add('tile');
        grid.appendChild(tile);
      }
    }

    setupSelectionHandlers();
  }

  function placeWord(board, word, original) {
    const size = board.length;
    const directions = [
      [0, 1],     // Down
      [1, 0],     // Right
      [0, -1],    // Up
      [-1, 0],    // Left
      [1, 1],     // Down-Right
      [-1, -1],   // Up-Left
      [1, -1],    // Up-Right
      [-1, 1]     // Down-Left
    ];

    let placed = false;

    for (let attempts = 0; attempts < 500; attempts++) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (canPlace(board, word, row, col, dir)) {
        const coords = [];
        for (let i = 0; i < word.length; i++) {
          const y = row + i * dir[1];
          const x = col + i * dir[0];
          board[y][x] = word[i];
          coords.push(`${x},${y}`);
        }
        wordPositions.push({ word: original, coords });
        placed = true;
        break;
      }
    }

    if (!placed) {
      console.warn(`⚠️ Could not place word: "${original}"`);
    }
  }

  function canPlace(board, word, row, col, dir) {
    const size = board.length;
    for (let i = 0; i < word.length; i++) {
      const y = row + i * dir[1];
      const x = col + i * dir[0];
      if (x < 0 || x >= size || y < 0 || y >= size || (board[y][x] && board[y][x] !== word[i])) {
        return false;
      }
    }
    return true;
  }

  function setupSelectionHandlers() {
    let isMouseDown = false;
    selectedTiles = [];

    grid.querySelectorAll('.tile').forEach(tile => {
      // Remove any existing listeners to prevent duplicates (important after grid re-creation)
      tile.removeEventListener('mousedown', handleMouseDown);
      tile.removeEventListener('mouseenter', handleMouseEnter);
      tile.removeEventListener('mouseup', handleMouseUp);
      tile.removeEventListener('touchstart', handleTouchStart);
      tile.removeEventListener('touchmove', handleTouchMove);
      tile.removeEventListener('touchend', handleTouchEnd);

      // Add new listeners
      tile.addEventListener('mousedown', handleMouseDown);
      tile.addEventListener('mouseenter', handleMouseEnter);
      tile.addEventListener('mouseup', handleMouseUp);
      tile.addEventListener('touchstart', handleTouchStart);
      tile.addEventListener('touchmove', handleTouchMove);
      tile.addEventListener('touchend', handleTouchEnd);
    });

    document.removeEventListener('mouseup', () => isMouseDown = false);
    document.addEventListener('mouseup', () => isMouseDown = false);

    function handleMouseDown(e) {
      e.preventDefault();
      isMouseDown = true;
      clearHighlights();
      selectTile(this);
    }

    function handleMouseEnter() {
      if (isMouseDown) {
        selectTile(this);
      }
    }

    function handleMouseUp() {
      isMouseDown = false;
      checkSelection();
    }

    function handleTouchStart(e) {
      e.preventDefault();
      clearHighlights();
      selectTile(this);
    }

    function handleTouchMove(e) {
      const touch = e.touches[0];
      const elem = document.elementFromPoint(touch.clientX, touch.clientY);
      if (elem && elem.classList.contains('tile')) {
        selectTile(elem);
      }
    }

    function handleTouchEnd() {
      checkSelection();
    }
  }

  function selectTile(tile) {
    if (!tile.classList.contains('selected')) {
      tile.classList.add('selected');
      selectedTiles.push(tile);
    }
  }

  function clearHighlights() {
    selectedTiles.forEach(t => t.classList.remove('selected'));
    selectedTiles = [];
  }

  function checkSelection() {
    // Sort selectedTiles by their coordinates to ensure consistent order for comparison
    selectedTiles.sort((a, b) => {
      const coordA = parseInt(a.dataset.y) * 1000 + parseInt(a.dataset.x);
      const coordB = parseInt(b.dataset.y) * 1000 + parseInt(b.dataset.x);
      return coordA - coordB;
    });

    const coords = selectedTiles.map(t => `${t.dataset.x},${t.dataset.y}`);
    
    const match = wordPositions.find(w => 
      arraysEqual(w.coords, coords) || arraysEqual(w.coords.slice().reverse(), coords)
    );

    if (match && !foundWords.has(match.word)) {
      selectedTiles.forEach(t => t.classList.add('found'));
      foundWords.add(match.word);
      markWordFound(match.word);
    }
    clearHighlights();
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function markWordFound(word) {
    const spans = document.querySelectorAll('.word-to-find');
    spans.forEach(span => {
      if (span.textContent === word.toUpperCase()) {
        span.style.textDecoration = 'line-through';
        span.style.color = '#a4dcbe';
      }
    });

    if (foundWords.size === 10) {
      triggerConfetti();

      localStorage.setItem('year5Complete', 'true');
      if (typeof markAchievementComplete === 'function') {
        markAchievementComplete(5);
      } else {
        console.warn("markAchievementComplete function not found.");
      }

      const msg = document.getElementById('completion-message');
      msg.textContent = "🎉 You found all the words and unlocked the Year 5 achievement!";
    }
  }

  function triggerConfetti() {
    const emojis = ["🎉", "💖", "🌟", "✨", "🎊", "🥳"];
    const count = 80;

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.fontSize = Math.random() * 10 + 16 + 'px';
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }
  }
});