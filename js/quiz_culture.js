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
const cityNameDiv = document.getElementById('cityName-div');
const optionsContainer = document.getElementById('optionsContainer');
const startButton = document.getElementById('startButton');
let elapsedTime = 0;
const timerValue = document.getElementById('timerValue');

/*function startQuiz() {
    currentQuestionIndex = 0;
    defineCityNameStyle("#fff")
    //cityNameDiv.style.backgroundColor = "#fff"; // Réinitialiser la couleur
    showQuestion();
}*/

function startQuiz() {
    currentQuestionIndex = 0;
    elapsedTime = 0; // Réinitialiser le temps écoulé
    timerValue.innerHTML = elapsedTime; // Réinitialiser l'affichage du timer
    defineCityNameStyle("#fff");
    showQuestion();

    timer = setInterval(() => {
        elapsedTime++;
        timerValue.innerHTML = elapsedTime; // Mettre à jour le timer
    }, 1000);
}

function showQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        cityName.textContent = question.city;
        optionsContainer.innerHTML = '';

        defineCityNameStyle("#fff");

        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.id = 'btnOption'
            button.onclick = () => checkAnswer(option, question.trueCountry, button);
            optionsContainer.appendChild(button);
        });

        // Changer la couleur après 3 secondes si aucune réponse
        // Jaune si pas de réponse
        setTimeout(() => {
            defineCityNameStyle("yellow")
            cityNameDiv.style.backgroundColor = "yellow";
            endQuiz();
        }, 5000);
    } else {
        alert("Quiz terminé !");
        //startButton.textContent = 'Start';
        clearInterval(timer);
        clearTimeout(timer);
    }
}

function checkAnswer(selected, trueCountry, button) {
    clearTimeout(timer); // Arrêter le timer
    clearInterval(timer); // Arrêter le timer de compt

    if (selected === trueCountry) {
        button.style.backgroundColor = "green";
        defineCityNameStyle("green")
        //cityNameDiv.style.backgroundColor = "green"; // Vert si correct
        currentQuestionIndex++;
        setTimeout(showQuestion, 500); // Attendre 1 seconde avant de montrer la prochaine question
    } else {
        button.style.backgroundColor = "red";
        defineCityNameStyle("red")
        //cityNameDiv.style.backgroundColor = "red"; // Rouge si incorrect
        endQuiz();
    }
}

function defineCityNameStyle(color) {
    cityNameDiv.style.minWidth = '150px';
    cityNameDiv.style.height = '80px';
    cityNameDiv.style.border = 'solid 0.5px gray';
    cityNameDiv.style.borderRadius = '5px';
    cityNameDiv.style.marginBottom = '20px';
    cityNameDiv.style.marginTop = '20px';
    cityNameDiv.style.textAlign = 'center';
    if (color === "green"){
        cityNameDiv.style.backgroundColor = "green";
    }

    if (color === "red"){
        cityNameDiv.style.backgroundColor = "red";
        //startButton.textContent = 'Restart';
    }

    if (color === "#fff"){
        cityNameDiv.style.backgroundColor = "#fff";
    }

    if (color === "yellow"){
        cityNameDiv.style.backgroundColor = "yellow";
        //startButton.textContent = 'Restart';
    }

    if (color === "RAS"){
        cityNameDiv.style.minWidth = '0px';
        cityNameDiv.style.height = '0px';
        cityNameDiv.style.border = 'none';
        cityNameDiv.style.borderRadius = '0';
        cityNameDiv.style.marginBottom = '0';
        cityNameDiv.style.textAlign = 'center';
        cityNameDiv.style.backgroundColor = "none";
        
    }
}

function endQuiz() {
    optionsContainer.innerHTML = ''; // Supprimer les options
    //startButton.style.display = 'block'; // Montrer le bouton Start
    clearInterval(timer);
    clearTimeout(timer);
}

/*startButton.onclick = () => {
    startButton.style.display = 'none'; // Cacher le bouton Start
    startQuiz();
};*/

startQuiz();