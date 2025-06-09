const bingoPrompts = 
[
  "Meeting at Living Word",
  "Playing Fortnite",
  "Playing Big City Stories",
  "Eating at Tela",
  "Going to Reds Games",
  "Going to Bengals Games",
  "Seeing Lewis Capaldi",
  "Seeing Big Time Rush",
  "Getting engaged at Anakeesta",
  "Going to Gattlinburg",
  "Eating at Paula Deans",
  "Going to Otherworld",
  "Watching Gilmore Girls",
  "Watching Bridgerton",
  "Seeing Endgame",
  "Seeing Hamilton Downtown",
  "Going to the Art Museum",
  "Eating at the Melting Pot",
  "Shopping at Kenwood Mall",
  "Making pottery at Color Me Mine",
  "Vacationing in Clearwater, Florida",
  "Vacationing in Destin, Florida",
  "Watchin The Vampire Diaries",
  "Seeing Pete Davidson",
  "Playing Minecraft",
  "Getting Milo",
  "Getting Mochi",
  "Getting Finn",
  "Getting Willow",
  "Getting Loki",
  "Going to Homecoming",
  "Going to the Zoo",
  "Going to Niederman Farm",
  "Going to Kings Island",
  "Going to Top Golf",
  "Listening to Yellow",
  "Weekend Trip to Chicago",
  "Painting at Pinots Palet",
  "Listening to The One",
  "Listening to Rescue",
  "Stopping at Bucees",
  "Living together at Flyer Dr",
  "Eating at Texas Roadhouse",
  "Eating at Longhorn Steakhouse",
  "Shopping at Target",
  "Shopping at Ross",
  "Shopping at TJ Maxx",
  "Dressing up as Nick and Judy",
  "Watching New Girl",
  "watching Riverdale",
  "Listening to Seperate lives",
  "Watching You",
  "Watching The Flash",
  "Shopping at Trader Joes",
  "Shopping at Traders World",
  "Shopping at Liberty Center",
  "Falling Asleep on Facetime",
  "Writing Love Letters",
  "Dressing up as Amoung Us Characters",
  "Playing Cup Pong",
  "Playing Battleships",
  "Watching Reba",
  "Watching Pretty Little Liars",
  "Swimming at the Gym",
  "Going to Classes at the same time at Miami University",
  "Walking to Laroses",
  "Going to Wyoming Football Games",
  "Seeing the Dixie Stampede",
  "Eating at Seasons 52",
  "Eating at The Grand Finale",
  "Going to get your nails done",
  "Going to Redsfest",
  "Going to My Baseball Games",
  "Visiting the Set of TVD in Georgia",
  "Getting Parker",
  "Going to the Christmas Ranch",
  "Doordashing Together",
  "Relaxing in Our HotTub",
  "Having fun at Great Wolf Lodge",
  "Building a Couch Together",
  "Riding in an Airplane Together",
  "Viewing Amazing Sunsets",
  "Swimming at East Fork Lake",
  "Watching the Labor Day Fireworks in Newport",
  "Carving Pumpkins",
  "Watching Criminal Minds",
  "Eating at Chick Fil A",
  "Going to Dayton Dragons Games",
  "Eating Crumble Cookies",
  "Eating Homemade Bread",
  "Listening to Theres the Sun",
  "Listening to Ordinary",
  "Watching the 4th of July Fireworks",
  "Finding shapes in the Clouds",
  "Staying on a phone call for 24 hours",
  "Playing Games at Dave and Busters",
  "Taking a boat ride on the Ocean",
  "Building Families in The Sims",
  "Making Boo Baskets",
  "Going to Perfect North"
];

let drawnPrompts = [];
let boardPrompts = [];
let boardMatrix = [];

function shuffle(array) {
  let copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateBingoBoard() {
	document.getElementById('drawnPromptDisplay').innerText = '';
  drawnPrompts = [];
  boardPrompts = shuffle(bingoPrompts).slice(0, 24);
  boardMatrix = [];
document.getElementById('drawPromptBtn').style.display = 'inline-block';

  const board = document.getElementById('bingo-board');
  board.innerHTML = '';
  
  let index = 0;
  for (let row = 0; row < 5; row++) {
    const tr = document.createElement('tr');
    const rowData = [];
    for (let col = 0; col < 5; col++) {
      const td = document.createElement('td');
      if (row === 2 && col === 2) {
        td.innerText = 'FREE SPACE';
        td.classList.add('marked');
        rowData.push('FREE SPACE');
      } else {
        td.innerText = boardPrompts[index];
        rowData.push(boardPrompts[index]);
        index++;
      }
      tr.appendChild(td);
    }
    board.appendChild(tr);
    boardMatrix.push(rowData);
  }
}

function drawPrompt() {
  if (drawnPrompts.length >= bingoPrompts.length) return;

  let prompt;
  do {
    prompt = bingoPrompts[Math.floor(Math.random() * bingoPrompts.length)];
  } while (drawnPrompts.includes(prompt));

  drawnPrompts.push(prompt);

  // Display the drawn prompt
  document.getElementById("drawnPromptDisplay").innerText = `Drawn: ${prompt}`;

  // Highlight it on the board
  const cells = document.querySelectorAll('#bingo-board td');
  cells.forEach((cell, index) => {
    if (cell.innerText === prompt) {
  cell.classList.add('marked');
}

  });

  setTimeout(checkForWin, 100);
}

function checkForWin() {
  const board = document.getElementById('bingo-board');
  const size = 5;

  // Check rows
  for (let r = 0; r < size; r++) {
    let markedRow = true;
    for (let c = 0; c < size; c++) {
      if (!board.rows[r].cells[c].classList.contains('marked')) {
        markedRow = false;
        break;
      }
    }
    if (markedRow) return winBingo();
  }

  // Check columns
  for (let c = 0; c < size; c++) {
    let markedCol = true;
    for (let r = 0; r < size; r++) {
      if (!board.rows[r].cells[c].classList.contains('marked')) {
        markedCol = false;
        break;
      }
    }
    if (markedCol) return winBingo();
  }

  // Check main diagonal
  let mainDiagonal = true;
  for (let i = 0; i < size; i++) {
    if (!board.rows[i].cells[i].classList.contains('marked')) {
      mainDiagonal = false;
      break;
    }
  }
  if (mainDiagonal) return winBingo();

  // Check anti-diagonal
  let antiDiagonal = true;
  for (let i = 0; i < size; i++) {
    if (!board.rows[i].cells[size - 1 - i].classList.contains('marked')) {
      antiDiagonal = false;
      break;
    }
  }
  if (antiDiagonal) return winBingo();
}


function winBingo() {
  setTimeout(() => {
    // Show win message
    const winMsg = document.getElementById('bingoWinMessage');
    winMsg.innerText = "🎉 BINGO! You've got 5 in a row! You Have Unlocked the Year 7 Achievement!!";
    winMsg.style.display = 'block';

    // Hide Draw Prompt button
    document.getElementById('drawPromptBtn').style.display = 'none';

    // Mark achievement + store
    localStorage.setItem('year7Complete', 'true');
    markAchievementComplete(7);
    const achievementBox = document.getElementById('year7-achievement');
    achievementBox.style.display = 'block';
    achievementBox.classList.add('complete');

    // Confetti celebration
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.innerText = '🎉';
      confetti.style.position = 'fixed';
      confetti.style.top = `${Math.random() * 100}%`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.fontSize = '20px';
      confetti.style.opacity = '1';
      confetti.style.animation = 'fall 3s linear';
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }
  }, 100); // delay to allow prompt display & tile mark first
}




// Expose to HTML
window.generateBingoBoard = generateBingoBoard;
window.drawPrompt = drawPrompt;
