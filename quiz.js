//intrebarile disponibile
const quizData = [{
        question: "1.Ce este A* (A star)?",
        a: "Un algoritm de sortare",
        b: "Un algoritm de cautare",
        c: "Un algoritm de gasire a drumului",
        d: "Un algoritm hash",
        correct: "c",
    },
    {
        question: "2.La ce este folosit A*?",
        a: "Sisteme GPS",
        b: "Case de marcat",
        c: "Gestionarea unei baze de date",
        d: "Rezolvarea problemelor de matematica",
        correct: "a",
    },
    {
        question: "3.Cand si-a facut aparitia algoritmul A*?",
        a: "1954",
        b: "1979",
        c: "2001",
        d: "1968",
        correct: "d",
    },
    {
        question: "4.Care dintre acestia nu este algoritm de gasire a drumului?",
        a: "Dijkstra",
        b: "Greedy",
        c: "BFS",
        d: "DFS",
        correct: "b",
    },
    {
        question: "5.Ce se foloseste la un algoritm A*?",
        a: "Noduri",
        b: "Sfori",
        c: "Liste",
        d: "Linii",
        correct: "a",
    },
    {
        question: "6.Ce presupun euristicele?",
        a: "Asigurare",
        b: "Calculare",
        c: "Estimare",
        d: "Organizare",
        correct: "c",
    },




];
//declararea functiilor ce alcatuie quizul
const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

//initializarea quizilui
let currentQuiz = 0
let score = 0

loadQuiz()

//functia ce afiseaza intrebarile quizului
function loadQuiz() {

    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

//Listener ce tine cont de apasarea pe submit si astfel calculeaza scorul, daca ai trecut sau nu
submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if (currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            if ((score) >= (quizData.length) / 2) {
                quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly. You passed!</h2>

           <button onclick="location.reload()" style="position: fixed; left: 47%; cursor: pointer;">Reload</button>
           `
            } else {
                quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly. You failed. Try again.</h2>

           <button onclick="location.reload()" style="position: fixed; left: 47%; cursor: pointer;">Reload</button>
           `
            }

        }
    }


})