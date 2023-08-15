const quizForm = document.getElementById('quiz-form');
const resultContainer = document.getElementById('result-container');

// Questions and options - You can load these from a JSON file as well
const questions = [
    {
        question: 'Question 1: What is the capital of France?',
        options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
        answer: 0 // Index of correct answer
    },
    // Add more questions here
];

// Load questions dynamically
function loadQuestions() {
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <p>${question.question}</p>
            <ul>
                ${question.options.map((option, index) => `
                    <li>
                        <input type="radio" name="question${i}" value="${index}">
                        <label>${option}</label>
                    </li>
                `).join('')}
            </ul>
        `;
        quizForm.insertBefore(questionElement, quizForm.lastElementChild);
    }
}

// Calculate and display the result
function showResult() {
    const formData = new FormData(quizForm);
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (formData.get(`question${i}`) == questions[i].answer) {
            score++;
        }
    }
    const resultMessage = `Your score: ${score} out of ${questions.length}`;
    resultContainer.textContent = resultMessage;
}

// Load questions when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showResult();
    });
});
