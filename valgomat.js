let partyScores = {
  FRP: 0,
  H: 0,
  V: 0,
  KRF: 0,
  SP: 0,
  AP: 0,
  MDG: 0,
};

class Question {
  constructor(question, enig, uenig) {
    this.question = question;
    this.enig = enig;
    this.uenig = uenig;
  }
}

// Create an array of Question objects
const questions = [
  new Question(
    "Bør vi ha lekser på skolen?",
    { FRP: 2, H: 3, V: 1, KRF: 1, SP: 2, MDG: 5, AP: 4 },
    { FRP: 1, H: 2, V: 3, KRF: 3, SP: 4, MDG: 5, AP: 2 }
  ),
  new Question(
    "Bør vi gi pengestøtte til bønder?",
    { FRP: 4, H: 3, V: 2, KRF: 5, SP: 5, MDG: 1, AP: 2 },
    { FRP: 1, H: 2, V: 3, KRF: 1, SP: 2, MDG: 3, AP: 4 }
  ),
  new Question(
    "Bør vi gi pengestøtte til kunstnere?",
    { FRP: 3, H: 4, V: 2, KRF: 1, SP: 2, MDG: 5, AP: 5 },
    { FRP: 2, H: 1, V: 3, KRF: 4, SP: 4, MDG: 1, AP: 1 }
  ),
  new Question(
    "Bør vi senke skattene?",
    { FRP: 5, H: 4, V: 3, KRF: 2, SP: 2, MDG: 1, AP: 1 },
    { FRP: 1, H: 2, V: 3, KRF: 4, SP: 4, MDG: 5, AP: 5 }
  ),
  new Question(
    "Bør vi ha strengere straffer?",
    { FRP: 4, H: 3, V: 2, KRF: 2, SP: 1, MDG: 0, AP: 2 },
    { FRP: 0, H: 1, V: 2, KRF: 3, SP: 4, MDG: 5, AP: 3 }
  ),
  new Question(
    "Bør vi finne nye oljefelt?",
    { FRP: 5, H: 4, V: 3, KRF: 0, SP: 0, MDG: 0, AP: 0 },
    { FRP: 0, H: 0, V: 0, KRF: 0, SP: 0, MDG: 5, AP: 4 }
  ),
  new Question(
    "Bør vi få flere private sykehus?",
    { FRP: 4, H: 3, V: 5, KRF: 2, SP: 0, MDG: 0, AP: 1 },
    { FRP: 0, H: 0, V: 0, KRF: 0, SP: 5, MDG: 5, AP: 5 }
  ),
  new Question(
    "Bør vi beholde kontantstøtten?",
    { FRP: 4, H: 3, V: 2, KRF: 2, SP: 0, MDG: 0, AP: 1 },
    { FRP: 0, H: 0, V: 0, KRF: 0, SP: 5, MDG: 5, AP: 5 }
  ),
  new Question(
    "Bør leger ha muligheten til å reservere seg mot å henvise til abort?",
    { FRP: 4, H: 4, V: 2, KRF: 4, SP: 0, MDG: 0, AP: 2 },
    { FRP: 0, H: 0, V: 0, KRF: 0, SP: 5, MDG: 5, AP: 3 }
  ),
  new Question(
    "Bør vi ta imot flere flyktninger?",
    { FRP: 0, H: 4, V: 3, KRF: 2, SP: 1, MDG: 5, AP: 5 },
    { FRP: 7, H: 0, V: 0, KRF: 0, SP: 0, MDG: 0, AP: 0 }
  ),
];
const questionText = document.getElementById("question"); // Der me skriv ut spørsmålet
const btnNext = document.getElementById("btnNext");
const rbAnswer = document.getElementsByName("answer"); // radiobuttons (fleirtal)
const inputForm = document.getElementById("valgomatForm");
const resultatContainer = document.getElementById("resulat-container");
const formContainer = document.querySelector(".form-container");
const progressBar = document.getElementById("progress");
const totalQuestions = questions.length;

btnNext.addEventListener("click", nextQuestion);

let questionIDX = 0;
let progress = 0;

questionText.innerHTML = questions[questionIDX].question;

function nextQuestion() {
  let radioChecked = document.querySelector('input[name="answer"]:checked');

  if (radioChecked) {
    const chosen = radioChecked.value;
    calculateResult(questionIDX, chosen);
    questionIDX++;

    if (questionIDX < questions.length) {
      radioChecked.checked = false;
      const currentQuestion = questions[questionIDX];
      questionText.innerHTML = currentQuestion.question;

      // Calculate progress and update the progress bar
      progress = (questionIDX / totalQuestions) * 100;
      progressBar.style.width = progress + "%";
    } else {
      inputForm.style.display = "none";
      showResult();

      // Set the progress bar width to 100% when the questionnaire is completed
      progressBar.style.width = "100%";
    }
  } else {
    alert("Du må velge et svaralternativ!");
  }
}

// Funksjon som regner ut resultatet, får inn spørsmåls-ID og hvilket svar som er valgt (enig/uenig)
function calculateResult(questionIDX, chosen) {
  console.log("Spørsmåls-ID: " + questionIDX + ", valgt: " + chosen);

  let partyChoices = questions[questionIDX][chosen]; // Henter ut partiene og poengene for det valgte svaret
  console.log("partyChoices: ");
  console.log(partyChoices);

  for (let party in partyChoices) {
    partyScores[party] += partyChoices[party];
  }

  console.log("partyScore: ");
  console.log(partyScores);
}

function showResult() {
  // Define a mapping of party names to colors
  const partyColors = {
    FRP: "teal",
    H: "blue",
    V: "lime",
    KRF: "yellow",
    SP: "green",
    AP: "red",
    MDG: "darkgreen",
  };

  // Konverter objektet til et array av nøkkel-verdi-par
  let entries = Object.entries(partyScores);
  resultatContainer.style =
    "display: flex; flex-direction: column; align-items: center;";

  formContainer.style = "display: none";

  // Sorter arrayet etter verdiene i stigende rekkefølge
  entries.sort((a, b) => b[1] - a[1]);

  // Konverter arrayet tilbake til et objekt
  let sortedPartyScores = Object.fromEntries(entries);

  console.log("Sortert etter poengsum: ");
  console.log(sortedPartyScores);

  // Skriver ut resultatet til HTML
  let resultBox = document.getElementById("result");
  resultBox.innerText = "";

  let partyIndex = 0; // Used to track the index of the party
  let highestScore = Object.values(sortedPartyScores)[0]; // Get the highest score

  for (let party in sortedPartyScores) {
    // Calculate the width based on the percentage of the score relative to the highest score
    let widthPercentage = (sortedPartyScores[party] / highestScore) * 100;

    // Create a container for each party with title and score
    let partyContainer = document.createElement("div");
    partyContainer.style.display = "flex";
    partyContainer.style.alignItems = "center";
    partyContainer.style.marginBottom = "10px"; // Add spacing below each div

    // Create a div for the party title
    let partyTitleDiv = document.createElement("div");
    partyTitleDiv.innerText = party;
    partyTitleDiv.style.flex = "1"; // Ensure it takes up available space

    // Create a div for the party score
    let partyScoreDiv = document.createElement("div");
    partyScoreDiv.innerText = sortedPartyScores[party];
    partyScoreDiv.style.width = "40px"; // Set default width
    partyScoreDiv.style.minWidth = "40px"; // Set minimum width
    partyScoreDiv.style.backgroundColor = partyColors[party]; // Assign the party's color

    // Set the width of the score div based on the calculated percentage
    if (widthPercentage > 40) {
      partyScoreDiv.style.width = widthPercentage + "px"; // Adjust width if it's greater than 40px
    }

    // Append the title and score divs to the party container
    partyContainer.appendChild(partyTitleDiv);
    partyContainer.appendChild(partyScoreDiv);

    // Append the party container to the result box
    resultBox.appendChild(partyContainer);

    partyIndex++; // Increment the party index
  }
}
