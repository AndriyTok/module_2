const questionsData = [
    {
        "question": "Яка столиця України?",
        "answers": ["Київ", "Львів", "Харків", "Одеса"],
        "correctAnswer": 0
    },
    {
        "question": "Яке найвище озеро в Україні?",
        "answers": ["Синевир", "Шацьке", "Світязь", "Ясиня"],
        "correctAnswer": 0
    },
    {
        "question": "Який найдовший річка в Україні?",
        "answers": ["Дніпро", "Дунай", "Південний Буг", "Сіверський Донець"],
        "correctAnswer": 0
    },
    {
        "question": "Яке найбільше місто в Україні?",
        "answers": ["Київ", "Харків", "Одеса", "Дніпро"],
        "correctAnswer": 0
    },
    {
        "question": "Який найпопулярніший вид спорту в Україні?",
        "answers": ["Футбол", "Волейбол", "Баскетбол", "Легка атлетика"],
        "correctAnswer": 0
    }
];

const questionsContainer = document.getElementById('questions');
const resultsContainer = document.getElementById('results');
const scoreElement = document.getElementById('score');
const submitBtn = document.getElementById('submitBtn');

let currentQuestionIndex = 0;
let score = 0;

function generateQuestion(questionData) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.classList.add('question-text');
    questionText.textContent = questionData.question;

    const answersList = document.createElement('ul');
    answersList.classList.add('answers');

    for (let i = 0; i < questionData.answers.length; i++) {
        const answerDiv = document.createElement('li');
        answerDiv.classList.add('answer');
        answerDiv.textContent = questionData.answers[i];
        answerDiv.dataset.index = i;

        answerDiv.addEventListener('click', function() {
            const selectedAnswer = parseInt(answerDiv.dataset.index);
            const isCorrect = selectedAnswer === questionData.correctAnswer;

            if (isCorrect) {
                score++;
                answerDiv.style.backgroundColor = 'lightgreen';
            } else {
                answerDiv.style.backgroundColor = 'lightcoral';
            }

            for (const answer of answersList.children) {
                answer.classList.add('disabled');
            }

            setTimeout(nextQuestion, 1000); // Перехід до наступного питання через 1 секунду
        });

        answersList.appendChild(answerDiv);
    }

    questionDiv.appendChild(questionText);
    questionDiv.appendChild(answersList);
    questionsContainer.appendChild(questionDiv);
}

function displayResults() {
    resultsContainer.style.display = 'block';
    scoreElement.textContent = score + ' з 5';
}

function startTest() {
    generateQuestion(questionsData[currentQuestionIndex]);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
        questionsContainer.innerHTML = ''; // Очистити попереднє питання
        generateQuestion(questionsData[currentQuestionIndex]);
    } else {
        displayResults();
        submitBtn.disabled = true;
    }
}

submitBtn.addEventListener('click', nextQuestion);

startTest();
