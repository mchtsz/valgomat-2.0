const questions = [
  // NB: Dette er ein array med objekt (ikkje map)
  {
    question: "Bør vi ha lekser på skolen?",
    enig: {
      FRP: 2,
      H: 3,
      V: 1,
      KRF: 1,
      SP: 2,
      MDG: 5,
      AP: 4,
    },
    uenig: {
      FRP: 1,
      H: 2,
      V: 3,
      KRF: 3,
      SP: 4,
      MDG: 5,
      AP: 2,
    },
  },
  {
    question: "Bør vi gi pengestøtte til bønder?",
    enig: {
      FRP: 4,
      H: 3,
      V: 2,
      KRF: 5,
      SP: 5,
      MDG: 1,
      AP: 2,
    },
    uenig: {
      FRP: 1,
      H: 2,
      V: 3,
      KRF: 1,
      SP: 2,
      MDG: 3,
      AP: 4,
    },
  },
  {
    question: "Bør vi gi pengestøtte til kunstnere?",
    enig: {
      FRP: 3,
      H: 4,
      V: 2,
      KRF: 1,
      SP: 2,
      MDG: 5,
      AP: 5,
    },
    uenig: {
      FRP: 2,
      H: 1,
      V: 3,
      KRF: 4,
      SP: 4,
      MDG: 1,
      AP: 1,
    },
  },
  {
    question: "Bør vi senke skattene?",
    enig: {
      FRP: 5,
      H: 4,
      V: 3,
      KRF: 2,
      SP: 2,
      MDG: 1,
      AP: 1,
    },
    uenig: {
      FRP: 1,
      H: 2,
      V: 3,
      KRF: 4,
      SP: 4,
      MDG: 5,
      AP: 5,
    },
  },
  {
    question: "Bør vi ha strengere straffer?",
    enig: {
      FRP: 4,
      H: 3,
      V: 2,
      KRF: 2,
      SP: 1,
      MDG: 0,
      AP: 2,
    },
    uenig: {
      FRP: 0,
      H: 1,
      V: 2,
      KRF: 3,
      SP: 4,
      MDG: 5,
      AP: 3,
    },
  },
  {
    question: "Bør vi finne nye oljefelt?",
    enig: {
      FRP: 5,
      H: 4,
      V: 3,
      KRF: 0,
      SP: 0,
      MDG: 0,
      AP: 0,
    },
    uenig: {
      FRP: 0,
      H: 0,
      V: 0,
      KRF: 0,
      SP: 0,
      MDG: 5,
      AP: 4,
    },
  },
  {
    question: "Bør vi få flere private sykehus?",
    enig: {
      FRP: 4,
      H: 3,
      V: 5,
      KRF: 2,
      SP: 0,
      MDG: 0,
      AP: 1,
    },
    uenig: {
      FRP: 0,
      H: 0,
      V: 0,
      KRF: 0,
      SP: 5,
      MDG: 5,
      AP: 5,
    },
  },
  {
    question: "Bør vi beholde kontantstøtten?",
    enig: {
      FRP: 4,
      H: 3,
      V: 2,
      KRF: 2,
      SP: 0,
      MDG: 0,
      AP: 1,
    },
    uenig: {
      FRP: 0,
      H: 0,
      V: 0,
      KRF: 0,
      SP: 5,
      MDG: 5,
      AP: 5,
    },
  },
  {
    question:
      "Bør leger ha muligheten til å reservere seg mot å henvise til abort?",
    enig: {
      FRP: 4,
      H: 4,
      V: 2,
      KRF: 4,
      SP: 0,
      MDG: 0,
      AP: 2,
    },
    uenig: {
      FRP: 0,
      H: 0,
      V: 0,
      KRF: 0,
      SP: 5,
      MDG: 5,
      AP: 3,
    },
  },
  {
    question: "Bør vi ta imot flere flyktninger?",
    enig: {
      FRP: 0,
      H: 4,
      V: 3,
      KRF: 2,
      SP: 1,
      MDG: 5,
      AP: 5,
    },
    uenig: {
      FRP: 7,
      H: 0,
      V: 0,
      KRF: 0,
      SP: 0,
      MDG: 0,
      AP: 0,
    },
  },
];
let partyScores = {
  FRP: 0,
  H: 0,
  V: 0,
  KRF: 0,
  SP: 0,
  AP: 0,
  MDG: 0,
};

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
    calculateResult(questionIDX, radioChecked.value);
    questionIDX++;
    if (questionIDX < questions.length) {
      radioChecked.checked = false;
      questionText.innerHTML = questions[questionIDX].question;

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
  // Konverter objektet til et array av nøkkel-verdi-par
  let entries = Object.entries(partyScores);
  resultatContainer.style =
    "display: flex; flex - direction: column; align - items: center;";

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

  for (let party in sortedPartyScores) {
    resultBox.innerHTML += party + ": " + sortedPartyScores[party] + "<br>";
  }
}
