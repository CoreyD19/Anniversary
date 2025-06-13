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

  // Event listener for the "Generate Word Search" button
  generateBtn.addEventListener('click', () => {
    // Reset game state for a new puzzle
    foundWords.clear(); // Clear previously found words
    completionMessage.textContent = ''; // Clear any completion message
    // Reset styling for words in the display list
    document.querySelectorAll('.word-to-find').forEach(span => {
        span.style.textDecoration = 'none'; // Remove line-through
        span.style.color = '#ffcce6'; // Reset text color
    });

    const selectedWords = shuffle([...words]).slice(0, 10); // Select 10 random words
    createGrid(selectedWords); // Generate the grid with selected words
    wordDisplay.innerHTML = ''; // Clear previous word list display
    // Populate the word list display
    selectedWords.forEach(w => {
      const item = document.createElement('span');
      item.textContent = w.toUpperCase(); // Display word in uppercase
      item.classList.add('word-to-find'); // Add class for styling
      wordDisplay.appendChild(item);
    });
  });

  // Utility function to shuffle an array
  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  // Function to create and populate the word search grid
  function createGrid(wordList) {
    // The grid size is fixed at 20x20 to match the CSS layout for desktop
    const size = 20;

    // Initialize an empty board with empty strings
    const board = Array.from({ length: size }, () => Array(size).fill(''));
    wordPositions = []; // Reset stored word positions for the new grid

    // Place each selected word onto the board
    wordList.forEach(word => {
      const clean = word.replace(/\s/g, '').toUpperCase(); // Clean and uppercase word for placement
      placeWord(board, clean, word.toUpperCase()); // Place word and store its original case
    });

    // Fill remaining empty cells with random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (!board[y][x]) {
          board[y][x] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    grid.innerHTML = ''; // Clear existing grid HTML
    // Set the grid template columns. This defines the desktop layout.
    // On mobile, CSS transforms will scale this entire fixed-size grid down.
    grid.style.gridTemplateColumns = `repeat(${size}, 35px)`;
    grid.classList.add('puzzle-grid'); // Ensure the main grid class is present

    // Create and append individual letter tiles to the grid
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const tile = document.createElement('div');
        const letterSpan = document.createElement('span'); // Wrap letter in a span for consistent styling
        letterSpan.textContent = board[y][x];
        tile.appendChild(letterSpan); // Append the span to the div

        tile.dataset.x = x; // Store x-coordinate as data attribute
        tile.dataset.y = y; // Store y-coordinate as data attribute
        tile.classList.add('tile'); // Add class for styling
        grid.appendChild(tile);
      }
    }

    setupSelectionHandlers(); // Set up event listeners for tile selection
  }

  // Function to attempt placing a word on the board
  function placeWord(board, word, original) {
    const size = board.length;
    // Define all 8 possible directions for word placement
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

    // Try multiple attempts to place the word
    for (let attempts = 0; attempts < 500; attempts++) {
      const dir = directions[Math.floor(Math.random() * directions.length)]; // Random direction
      const row = Math.floor(Math.random() * size); // Random starting row
      const col = Math.floor(Math.random() * size); // Random starting column

      // Check if the word can be placed at this position and direction
      if (canPlace(board, word, row, col, dir)) {
        const coords = [];
        for (let i = 0; i < word.length; i++) {
          const y = row + i * dir[1];
          const x = col + i * dir[0];
          board[y][x] = word[i]; // Place letter on board
          coords.push(`${x},${y}`); // Store coordinates
        }
        wordPositions.push({ word: original, coords }); // Store word and its coordinates
        placed = true;
        break; // Word placed, exit loop
      }
    }

    if (!placed) {
      console.warn(`⚠️ Could not place word: "${original}"`); // Log warning if word couldn't be placed
    }
  }

  // Helper function to check if a word can be placed without collision or going out of bounds
  function canPlace(board, word, row, col, dir) {
    const size = board.length;
    for (let i = 0; i < word.length; i++) {
      const y = row + i * dir[1];
      const x = col + i * dir[0];
      // Check boundaries and if cell is already occupied by a different letter
      if (x < 0 || x >= size || y < 0 || y >= size || (board[y][x] && board[y][x] !== word[i])) {
        return false;
      }
    }
    return true;
  }

  // Sets up mouse and touch event handlers for tile selection
  function setupSelectionHandlers() {
    let isMouseDown = false;
    selectedTiles = []; // Reset selected tiles list

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

    // Global mouseup listener to reset isMouseDown if mouse is released outside a tile
    document.removeEventListener('mouseup', () => isMouseDown = false); // Prevent duplicates
    document.addEventListener('mouseup', () => isMouseDown = false);

    // Event handler for mouse down on a tile
    function handleMouseDown(e) {
      e.preventDefault(); // Prevent default browser drag behavior
      isMouseDown = true;
      clearHighlights(); // Clear any previous selection
      selectTile(this); // Select the clicked tile
    }

    // Event handler for mouse entering a tile (during selection)
    function handleMouseEnter() {
      if (isMouseDown) { // Only select if mouse button is down
        selectTile(this);
      }
    }

    // Event handler for mouse up (ends selection)
    function handleMouseUp() {
      isMouseDown = false;
      checkSelection(); // Check if the selected sequence forms a word
    }

    // Event handler for touch start on a tile
    function handleTouchStart(e) {
      e.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
      clearHighlights();
      selectTile(this);
    }

    // Event handler for touch move across tiles
    function handleTouchMove(e) {
      const touch = e.touches[0]; // Get the first touch point
      // Get the element at the current touch coordinates
      const elem = document.elementFromPoint(touch.clientX, touch.clientY);
      if (elem && elem.classList.contains('tile')) { // If it's a valid tile
        selectTile(elem); // Select it
      }
    }

    // Event handler for touch end (ends selection)
    function handleTouchEnd() {
      checkSelection(); // Check if the selected sequence forms a word
    }
  }

  // Adds 'selected' class to a tile and adds it to selectedTiles array
  function selectTile(tile) {
    if (!tile.classList.contains('selected')) {
      tile.classList.add('selected');
      selectedTiles.push(tile);
    }
  }

  // Removes 'selected' class from all tiles and clears selectedTiles array
  function clearHighlights() {
    selectedTiles.forEach(t => t.classList.remove('selected'));
    selectedTiles = [];
  }

  // Checks if the currently selected tiles form a valid word
  function checkSelection() {
    // Sort selectedTiles by their coordinates to ensure consistent order for comparison
    // This is crucial for matching words placed in different directions
    selectedTiles.sort((a, b) => {
      const coordA = parseInt(a.dataset.y) * 1000 + parseInt(a.dataset.x);
      const coordB = parseInt(b.dataset.y) * 1000 + parseInt(b.dataset.x);
      return coordA - coordB;
    });

    const coords = selectedTiles.map(t => `${t.dataset.x},${t.dataset.y}`);
    
    // Find a matching word: check both original order and reversed order (for words placed backwards)
    const match = wordPositions.find(w => 
      arraysEqual(w.coords, coords) || arraysEqual(w.coords.slice().reverse(), coords)
    );

    if (match && !foundWords.has(match.word)) { // If a match is found and word hasn't been found already
      selectedTiles.forEach(t => t.classList.add('found')); // Mark tiles as found
      foundWords.add(match.word); // Add word to set of found words
      markWordFound(match.word); // Update display for found word
    }
    clearHighlights(); // Clear visual selection (gold outline)
  }

  // Helper function to compare two arrays for equality
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // Updates the word list display when a word is found
  function markWordFound(word) {
    const spans = document.querySelectorAll('.word-to-find');
    spans.forEach(span => {
      if (span.textContent === word.toUpperCase()) { // Match case
        span.style.textDecoration = 'line-through'; // Cross out the word
        span.style.color = '#a4dcbe'; // Change color to green
      }
    });

    // Check if all 10 words have been found
    if (foundWords.size === 10) {
      triggerConfetti(); // Play confetti animation

      localStorage.setItem('year5Complete', 'true'); // Mark achievement in local storage
      // Call external achievement function if available
      if (typeof markAchievementComplete === 'function') {
        markAchievementComplete(5);
      } else {
        console.warn("markAchievementComplete function not found.");
      }

      // Display completion message
      const msg = document.getElementById('completion-message');
      msg.textContent = "🎉 You found all the words and unlocked the Year 5 achievement!";
    }
  }

  // Triggers a confetti animation on screen
  function triggerConfetti() {
    const emojis = ["🎉", "💖", "🌟", "✨", "🎊", "🥳"];
    const count = 80; // Number of confetti pieces

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti'); // Add confetti class for styling
      confetti.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
      confetti.style.fontSize = Math.random() * 10 + 16 + 'px'; // Random font size
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)]; // Random emoji
      document.body.appendChild(confetti); // Add to document body

      setTimeout(() => confetti.remove(), 3000); // Remove after 3 seconds
    }
  }
});