const madLibTemplates = [
	"Being with you feels like [verbEndingInIng] through a field of [pluralNoun] on a [adjective] day.",
"I dream of [verbEndingInIng] with you in [fantasyPlace], surrounded by [pluralNoun].",
"Your love is stronger than a [adjective] [animal] charging into [place].",
"Each [noun] you give me is worth more than all the [pluralNoun] in [place].",
"I still remember the way you [verbPast] when we first met — it was [adjective].",
"Our story is better than any [genre] novel set in [fantasyPlace].",
"You hold my [bodyPart] like it’s the last [noun] on Earth.",
"I want to [verb] with you until we both turn into [mythicalCreature]s of [place].",
"You’re the [adjective] reason I smile like a [animal] on [holiday].",
"If love were a [object], you'd be the rarest one found only in [place].",
"I never knew [emotion] until you [verbPast] into my life.",
"Let’s write our story on a scroll of [material] and hide it in [fantasyPlace].",
"You’re the song my [bodyPart] sings every time you [verb] near.",
"Falling for you was like [verbEndingInIng] into a pool of [pluralNoun].",
"No [adjective] day passes without thinking of our time at [memoryPlace].",
  "My darling [noun], you are my [adjective] [animal] in a world full of [pluralNoun].",
  "Every time we [verb] together at the [place], my heart feels like [noun].",
  "Your [bodyPart] against mine is like [noun] touching the [naturalElement].",
  "In this [adjective] life, you are the [superlative] thing that’s ever happened to me.",
  "Sometimes, I wish we could [verb] under the stars, just like we did at [memory].",
  "You make my [bodyPart] do backflips whenever you [verb] near me.",
  "Our love is more epic than a [adjective] [fantasyCreature] riding a [vehicle] into [place].",
  "When I hear your voice, it's like [sound] echoing through a [place] of [pluralNoun].",
  "You are the [noun] that completes my [noun], and I will always [verb] you.",
  "From our first [sharedActivity] to our last [memory], every moment is [adjective].",
  "You smell better than [food] on a [season] afternoon, and that’s saying something.",
  "If I had a [magicalItem] for every time I thought of you, I’d rule [fantasyPlace] by now.",
  "Let’s [verb] forever, even if we end up in [place] covered in [pluralNoun].",
  "Nothing compares to how your [adjective] [bodyPart] makes me feel inside.",
  "Even when we [verb] about [sillyTopic], I know we’re perfect for each other."
];


function startMadLib() {
  const template = madLibTemplates[Math.floor(Math.random() * madLibTemplates.length)];
  const regex = /\[(.+?)\]/g;
  let match;
  const inputs = [];

  while ((match = regex.exec(template)) !== null) {
    inputs.push(match[1]);
  }

  const answers = {};
  for (const input of inputs) {
    const response = prompt(`Enter a(n) ${input}:`);
    if (response === null) return; // Cancelled
    answers[input] = response;
  }

  let finalLetter = template.replace(/\[(.+?)\]/g, (_, key) => `<strong>${answers[key]}</strong>`);
  document.getElementById('madlib-output').innerHTML = finalLetter;

  // Mark achievement complete for Year 6
  localStorage.setItem('year6Complete', 'true');
  markAchievementComplete(6); // ✅ This was missing
  launchConfetti();
}
function launchConfetti() {
  const colors = ['#ffb6e6', '#a4dcbe', '#ffd700', '#e38ea0', '#ffffff'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
    confetti.style.width = `${6 + Math.random() * 4}px`;
    confetti.style.height = `${6 + Math.random() * 4}px`;
    confetti.style.borderRadius = '50%';
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}

