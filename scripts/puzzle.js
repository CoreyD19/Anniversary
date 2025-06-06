document.addEventListener('DOMContentLoaded', () => {
  let draggingTile = null;
  let draggingIndex = null;
  let currentOrder = [];

  const container = document.getElementById('puzzle-container');
  const result = document.getElementById('puzzle-result');
  const generateBtn = document.getElementById('generatePuzzleBtn');

  generateBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="puzzleChoice"]:checked');
    if (!selected) {
      result.textContent = "Please select a photo to use!";
      result.style.color = "#ff9999";
      return;
    }

    const imgSrc = selected.value;
    container.innerHTML = '';
    result.textContent = '';
    container.style.display = 'grid';

    const gridSize = 4;
    const totalTiles = gridSize * gridSize;
    const correctOrder = Array.from({ length: totalTiles }, (_, i) => i);
    currentOrder = [...correctOrder].sort(() => Math.random() - 0.5);

    currentOrder.forEach((tileIndex, i) => {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.setAttribute('draggable', true);
      tile.dataset.position = i;

      const x = tileIndex % gridSize;
      const y = Math.floor(tileIndex / gridSize);

      const img = document.createElement('img');
      img.src = imgSrc;
      img.className = 'tile-img';
      img.style.objectPosition = `-${x * 100}px -${y * 100}px`;

      tile.appendChild(img);
      container.appendChild(tile);
    });

    addDragEvents();

    function addDragEvents() {
      const tiles = container.querySelectorAll('.tile');
      tiles.forEach((tile, index) => {
        tile.addEventListener('dragstart', (e) => {
          draggingTile = tile;
          draggingIndex = index;
          e.dataTransfer.setData('text/plain', '');
        });

        tile.addEventListener('dragover', (e) => e.preventDefault());

        tile.addEventListener('drop', () => {
          if (draggingTile && draggingTile !== tile) {
            const dropIndex = [...container.children].indexOf(tile);

            // Swap DOM elements
            const draggedClone = draggingTile.cloneNode(true);
            const dropClone = tile.cloneNode(true);

            container.replaceChild(dropClone, draggingTile);
            container.replaceChild(draggedClone, tile);

            // Swap in currentOrder
            [currentOrder[draggingIndex], currentOrder[dropIndex]] =
              [currentOrder[dropIndex], currentOrder[draggingIndex]];

            addDragEvents(); // re-bind events to new nodes

            checkPuzzle(imgSrc);
          }
        });
      });
    }

    function checkPuzzle(imgSrc) {
      if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
        result.textContent = "🎉 You completed the puzzle and earned the Year 4 achievement!";
        result.style.color = "#7fffaf";
        localStorage.setItem('year4Complete', 'true');

        // Show full image
        container.innerHTML = '';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';

        const fullImage = document.createElement('img');
        fullImage.src = imgSrc;
        fullImage.alt = "Completed Puzzle";
        fullImage.style.width = '400px';
        fullImage.style.height = '400px';
        fullImage.style.borderRadius = '10px';
        fullImage.style.boxShadow = '0 4px 20px rgba(255, 110, 199, 0.3)';
        fullImage.style.marginTop = '1rem';
        container.appendChild(fullImage);

        launchConfetti();
      }
    }

    function launchConfetti() {
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ['#ff85d0', '#ffb6e6', '#ffcce6', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  });
});
