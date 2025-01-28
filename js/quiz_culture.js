const quizQuestions = [
    {
        id: 1,
        city: "Paris",
        flag: "",
        options: ["France", "Italie", "Espagne", "Allemagne"],
        trueCountry: "France"
    },
    {
        id: 2,
        city: "Tokyo",
        flag: "",
        options: ["Japon", "Chine", "Corée du Sud", "Thaïlande"],
        trueCountry: "Japon"
    },
    {
        id: 3,
        city: "New York",
        flag: "",
        options: ["États-Unis", "Canada", "Royaume-Uni", "Australie"],
        trueCountry: "États-Unis"
    },
    {
        id: 4,
        city: "Berlin",
        flag: "",
        options: ["Allemagne", "Pays-Bas", "Pologne", "Autriche"],
        trueCountry: "Allemagne"
    },
    {
        id: 5,
        city: "Madrid",
        flag: "",
        options: ["Espagne", "Portugal", "Italie", "France"],
        trueCountry: "Espagne"
    },
    {
        id: 6,
        city: "Rome",
        flag: "",
        options: ["Italie", "Grèce", "Égypte", "Turquie"],
        trueCountry: "Italie"
    },
    {
        id: 7,
        city: "Moscou",
        flag: "",
        options: ["Russie", "Ukraine", "Biélorussie", "Kazakhstan"],
        trueCountry: "Russie"
    },
    {
        id: 8,
        city: "Pékin",
        flag: "",
        options: ["Chine", "Japon", "Mongolie", "Vietnam"],
        trueCountry: "Chine"
    },
    {
        id: 9,
        city: "Canberra",
        flag: "",
        options: ["Australie", "Nouvelle-Zélande", "Fidji", "Papouasie-Nouvelle-Guinée"],
        trueCountry: "Australie"
    },
    {
        id: 10,
        city: "Ottawa",
        flag: "",
        options: ["Canada", "États-Unis", "Mexique", "Cuba"],
        trueCountry: "Canada"
    },
    {
        id: 11,
        city: "Lisbonne",
        flag: "",
        options: ["Portugal", "Espagne", "Italie", "France"],
        trueCountry: "Portugal"
    },
    {
        id: 12,
        city: "Le Caire",
        flag: "",
        options: ["Égypte", "Soudan", "Arabie Saoudite", "Jordanie"],
        trueCountry: "Égypte"
    },
    {
        id: 13,
        city: "Buenos Aires",
        flag: "",
        options: ["Argentine", "Chili", "Brésil", "Paraguay"],
        trueCountry: "Argentine"
    },
    {
        id: 14,
        city: "Nairobi",
        flag: "",
        options: ["Kenya", "Tanzanie", "Ouganda", "Rwanda"],
        trueCountry: "Kenya"
    },
    {
        id: 15,
        city: "Bangkok",
        flag: "",
        options: ["Thaïlande", "Vietnam", "Malaisie", "Singapour"],
        trueCountry: "Thaïlande"
    },
    {
        id: 16,
        city: "Lima",
        flag: "",
        options: ["Pérou", "Brésil", "Chili", "Argentine"],
        trueCountry: "Pérou"
    },
    {
        id: 17,
        city: "Séoul",
        flag: "",
        options: ["Corée du Sud", "Corée du Nord", "Japon", "Mongolie"],
        trueCountry: "Corée du Sud"
    },
    {
        id: 18,
        city: "Helsinki",
        flag: "",
        options: ["Finlande", "Suède", "Norvège", "Danemark"],
        trueCountry: "Finlande"
    },
    {
        id: 19,
        city: "Wellington",
        flag: "",
        options: ["Nouvelle-Zélande", "Australie", "Fidji", "Samoa"],
        trueCountry: "Nouvelle-Zélande"
    },
    {
        id: 20,
        city: "Stockholm",
        flag: "",
        options: ["Suède", "Norvège", "Finlande", "Danemark"],
        trueCountry: "Suède"
    }
];

let currentQuestionIndex = 0;
let timer;
const quizContainer = document.getElementById('quizContainer');
const cityName = document.getElementById('cityName');
const optionsContainer = document.getElementById('optionsContainer');
const startButton = document.getElementById('startButton');

function startQuiz() {
    currentQuestionIndex = 0;
    quizContainer.style.backgroundColor = "#fff"; // Réinitialiser la couleur
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        cityName.textContent = question.city;
        optionsContainer.innerHTML = '';

        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option, question.trueCountry);
            optionsContainer.appendChild(button);
        });

        // Changer la couleur après 3 secondes si aucune réponse
        // Jaune si pas de réponse
        timer = setTimeout(() => {
            quizContainer.style.backgroundColor = "yellow";
            endQuiz();
        }, 3000);
    } else {
        alert("Quiz terminé !");
    }
}

function checkAnswer(selected, trueCountry) {
    clearTimeout(timer); // Arrêter le timer
    if (selected === trueCountry) {
        quizContainer.style.backgroundColor = "green"; // Vert si correct
        currentQuestionIndex++;
        setTimeout(showQuestion, 1000); // Attendre 1 seconde avant de montrer la prochaine question
    } else {
        quizContainer.style.backgroundColor = "red"; // Rouge si incorrect
        endQuiz();
    }
}

function endQuiz() {
    optionsContainer.innerHTML = ''; // Supprimer les options
    startButton.style.display = 'block'; // Montrer le bouton Start
}

startButton.onclick = () => {
    startButton.style.display = 'none'; // Cacher le bouton Start
    startQuiz();
};