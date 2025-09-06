const quizData = [
    {
        question: "What does KDAG stand for?",
        options: [
            "Kharagpur Data Analytics Group",
            "Knowledge Data Analysis Group", 
            "Kharagpur Development Analytics Group",
            "Knowledge Development Analysis Group"
        ],
        correct: 0
    },
    {
        question: "Which programming language is most commonly used for data science?",
        options: ["Java", "Python", "C++", "JavaScript"],
        correct: 1
    },
    {
        question: "What is the primary purpose of data visualization?",
        options: [
            "To make data look pretty",
            "To communicate insights effectively",
            "To hide data complexity", 
            "To increase file size" 
        ],
        correct: 1
    },

    {
        question: "Which of the following is NOT a type of machine learning?",
        options: [
            "Supervised Learning",
            "Unsupervised Learning", 
            "Reinforcement Learning",
            "Supervised Cooking"
        ],
        correct: 3
    },
    {
        question: "What is the main goal of data preprocessing?",
        options: [
            "To increase data size",
            "To clean and prepare data for analysis",
            "To make data more complex",
            "To delete all data"
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let isTransitioning = false;

const questionTitle = document.getElementById('questionTitle');
const questionText = document.getElementById('questionText');
const questionOptions = document.getElementById('questionOptions');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const currentQuestion = document.getElementById('currentQuestion');
const resultsContainer = document.getElementById('resultsContainer');
const scoreDisplay = document.getElementById('scoreDisplay');
const answersReview = document.getElementById('answersReview');
const retakeBtn = document.getElementById('retakeBtn');

function initializeQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    displayQuestion();
    updateProgress();
}

function displayQuestion() {
    if (currentQuestionIndex >= quizData.length) return;
    
    const question = quizData[currentQuestionIndex];
    
    questionTitle.textContent = `Question ${currentQuestionIndex + 1}:`;
    questionText.textContent = question.question;
    
    questionOptions.innerHTML = '';
    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="currentQ" value="${index}">
            <span>${option}</span>
        `;
        
        const radioInput = label.querySelector('input');
        radioInput.addEventListener('change', () => {
            if (!isTransitioning) {
                selectAnswer(index);
            }
        });
        
        questionOptions.appendChild(label);
    });
    
    if (userAnswers[currentQuestionIndex] !== undefined) {
        const radioInput = questionOptions.querySelector(`input[value="${userAnswers[currentQuestionIndex]}"]`);
        if (radioInput) {
            radioInput.checked = true;
            
            Array.from(questionOptions.children).forEach(label => {
                label.style.background = '';
                label.style.transform = '';
            });
            
            const selectedLabel = questionOptions.children[userAnswers[currentQuestionIndex]];
            selectedLabel.style.background = 'rgba(231, 76, 60, 0.3)';
            selectedLabel.style.transform = 'scale(1.02)';
            showNavigationButtons();
        }
    } else {
        hideNavigationButtons();
    }
}

function selectAnswer(answerIndex) {
    if (isTransitioning) return;
    
    userAnswers[currentQuestionIndex] = answerIndex;
    
    Array.from(questionOptions.children).forEach(label => {
        label.style.background = '';
        label.style.transform = '';
    });
    
    const selectedLabel = questionOptions.children[answerIndex];
    selectedLabel.style.background = 'rgba(231, 76, 60, 0.3)';
    selectedLabel.style.transform = 'scale(1.02)';
    
    showNavigationButtons();
}

function transitionToNext() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestion.classList.add('fade-out');
        
        setTimeout(() => {
            currentQuestionIndex++;
            updateProgress();
            displayQuestion();
            currentQuestion.classList.remove('fade-out');
            currentQuestion.classList.add('fade-in');
            
            setTimeout(() => {
                currentQuestion.classList.remove('fade-in');
                isTransitioning = false;
            }, 300);
        }, 300);
    }
}

function transitionToPrevious() {
    if (currentQuestionIndex > 0) {
        currentQuestion.classList.add('fade-out');
        
        setTimeout(() => {
            currentQuestionIndex--;
            updateProgress();
            displayQuestion();
            currentQuestion.classList.remove('fade-out');
            currentQuestion.classList.add('fade-in');
            
            setTimeout(() => {
                currentQuestion.classList.remove('fade-in');
                isTransitioning = false;
            }, 300);
        }, 300);
    }
}

function showNavigationButtons() {
    let navContainer = document.getElementById('navigationButtons');
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.id = 'navigationButtons';
        navContainer.style.cssText = `
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            gap: 10px;
        `;
        
        const currentQuestionDiv = document.getElementById('currentQuestion');
        currentQuestionDiv.appendChild(navContainer);
    }
    
    navContainer.innerHTML = '';
    
    if (currentQuestionIndex > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.style.cssText = `
            padding: 12px 24px;
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        `;
        prevBtn.addEventListener('click', () => {
            if (!isTransitioning) {
                isTransitioning = true;
                transitionToPrevious();
            }
        });
        prevBtn.addEventListener('mouseover', () => {
            prevBtn.style.background = '#5a6268';
            prevBtn.style.transform = 'translateY(-2px)';
        });
        prevBtn.addEventListener('mouseout', () => {
            prevBtn.style.background = '#6c757d';
            prevBtn.style.transform = 'translateY(0)';
        });
        navContainer.appendChild(prevBtn);
    }
    
    if (currentQuestionIndex < quizData.length - 1) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.style.cssText = `
            padding: 12px 24px;
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        `;
        nextBtn.addEventListener('click', () => {
            if (!isTransitioning) {
                isTransitioning = true;
                transitionToNext();
            }
        });
        nextBtn.addEventListener('mouseover', () => {
            nextBtn.style.background = '#c0392b';
            nextBtn.style.transform = 'translateY(-2px)';
        });
        nextBtn.addEventListener('mouseout', () => {
            nextBtn.style.background = '#e74c3c';
            nextBtn.style.transform = 'translateY(0)';
        });
        navContainer.appendChild(nextBtn);
    } else {
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';
        submitBtn.style.cssText = `
            padding: 12px 24px;
            background: #27ae60;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        `;
        submitBtn.addEventListener('click', () => {
            if (!isTransitioning) {
                showResults();
            }
        });
        submitBtn.addEventListener('mouseover', () => {
            submitBtn.style.background = '#219a52';
            submitBtn.style.transform = 'translateY(-2px)';
        });
        submitBtn.addEventListener('mouseout', () => {
            submitBtn.style.background = '#27ae60';
            submitBtn.style.transform = 'translateY(0)';
        });
        navContainer.appendChild(submitBtn);
    }
    
    navContainer.style.display = 'flex';
}

function hideNavigationButtons() {
    const navContainer = document.getElementById('navigationButtons');
    if (navContainer) {
        navContainer.style.display = 'none';
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    progressFill.style.width = `${progress}%`;
    
    if (currentQuestionIndex >= quizData.length) {
        progressText.textContent = `Quiz Completed!`;
        progressFill.style.width = '100%';
    }
}

function showResults() {
    document.getElementById('quizContent').style.display = 'none';
    
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / quizData.length) * 100);
    
    let performanceMessage = '';
    switch(true) {
        case (percentage >= 90):
            performanceMessage = '🎉 Excellent! You have great knowledge of data analytics!';
            break;
        case (percentage >= 70):
            performanceMessage = '👍 Good job! You have a solid understanding.';
            break;
        case (percentage >= 50):
            performanceMessage = '📚 Not bad! Keep learning to improve your skills.';
            break;
        default:
            performanceMessage = '💪 Keep studying! There\'s room for improvement.';
    }
    
    scoreDisplay.innerHTML = `
        <div style="font-size: 2rem; color: #e74c3c; margin-bottom: 10px;">
            You scored ${score} out of ${quizData.length}
        </div>
        <div style="font-size: 1.5rem; color: #27ae60; margin-bottom: 15px;">
            ${percentage}%
        </div>
        <div style="font-size: 1.1rem; color: #ffffff;">
            ${performanceMessage}
        </div>
    `;
    
    let reviewHTML = '<h3 style="color: #e74c3c; margin-bottom: 20px;">Answer Review:</h3>';
    
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        const userAnswerText = question.options[userAnswer];
        const correctAnswerText = question.options[question.correct];
        
        reviewHTML += `
            <div class="answer-item ${isCorrect ? 'correct' : 'incorrect'}">
                <h4>Question ${index + 1}: ${question.question}</h4>
                <div class="your-answer ${isCorrect ? '' : 'wrong'}">
                    Your answer: ${userAnswerText}
                </div>
                ${!isCorrect ? `<div class="correct-answer">Correct answer: ${correctAnswerText}</div>` : ''}
                <div style="margin-top: 8px; font-size: 0.9rem; color: ${isCorrect ? '#27ae60' : '#e74c3c'};">
                    ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </div>
            </div>
        `;
    });
    
    answersReview.innerHTML = reviewHTML;
    
    resultsContainer.style.display = 'block';
    resultsContainer.style.opacity = '0';
    resultsContainer.style.transform = 'translateY(20px)';

    setTimeout(() => {
        resultsContainer.style.transition = 'all 0.5s ease';
        resultsContainer.style.opacity = '1';
        resultsContainer.style.transform = 'translateY(0)';
    }, 100);
}

function retakeQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    isTransitioning = false;
    
    resultsContainer.style.display = 'none';
    document.getElementById('quizContent').style.display = 'block';
    
    currentQuestion.classList.remove('fade-out', 'fade-in');
    
    const navContainer = document.getElementById('navigationButtons');
    if (navContainer) {
        navContainer.remove();
    }
    
    initializeQuiz();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

retakeBtn.addEventListener('click', retakeQuiz);

document.addEventListener('keydown', function(e) {
    if (isTransitioning) return;
    
    switch(e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
            const optionIndex = parseInt(e.key) - 1;
            if (optionIndex < quizData[currentQuestionIndex]?.options.length) {
                const radioInput = questionOptions.querySelector(`input[value="${optionIndex}"]`);
                if (radioInput) {
                    radioInput.checked = true;
                    selectAnswer(optionIndex);
                }
            }
            break;
        case 'Enter':
            if (resultsContainer.style.display !== 'none') {
                retakeQuiz();
            }
            break;
    }
});