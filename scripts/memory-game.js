$(document).ready(function () {
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedPairs = 0;
  const totalPairs = 10;

  const cards = $(".card");

  // Shuffle and reappend
  const shuffled = cards.toArray().sort(() => 0.5 - Math.random());
  $(".game-board").empty().append(shuffled);

  // Inject flip structure and set up card backs
  $(".card").each(function () {
    const img = $(this).find("img").clone();
    $(this).empty().append(`
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back"></div>
      </div>
    `);
    $(this).find(".card-back").append(img);
  });

  // Click handler
  $(".card").on("click", function () {
    if (lockBoard || $(this).hasClass("flipped")) return;

    $(this).addClass("flipped");

    if (!firstCard) {
      firstCard = $(this);
      return;
    }

    secondCard = $(this);
    lockBoard = true;

    const isMatch = firstCard.data("name") === secondCard.data("name");

    if (isMatch) {
      firstCard.off("click");
      secondCard.off("click");
      matchedPairs++;

      if (matchedPairs === totalPairs) {
        $("#memory-win-message").show(); // ✅ Proper jQuery call
        localStorage.setItem("year2Complete", "true");
        markAchievementComplete(2);
      }

      resetBoard();
    } else {
      setTimeout(() => {
        firstCard.removeClass("flipped");
        secondCard.removeClass("flipped");
        resetBoard();
      }, 1000);
    }
  });

  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }
});
