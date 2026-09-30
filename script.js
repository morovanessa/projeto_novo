// Banco de Dados de Temas com Links de Busca Acadêmica e Periódicos Ativos
const topicsDB = [
    {
        title: "Anatomia Facial e Camadas Teciduais",
        desc: "Estudo detalhado das 5 camadas faciais (Pele, Subcutâneo, SMAS, Espaços de Retenção e Periósteo) com foco na aplicação segura de injetáveis.",
        area: "Anatomia Aplicada",
        questions: "Frequente em 85% das provas",
        url: "http://www.rbcp.org.br/"
    },
    {
        title: "Toxina Botulínica: Mecanismos e Diluição",
        desc: "Ação da toxina no bloqueio da liberação de acetilcolina na junção neuromuscular via clivagem das proteínas SNARE.",
        area: "Farmacologia",
        questions: "Frequente em 92% das provas",
        url: "https://www.scielo.br/j/abd/"
    },
    {
        title: "Preenchedores Dérmicos e Reologia",
        desc: "Comportamento do Ácido Hialurônico, retrochoque, G' (elasticidade), viscoelasticidade e manejo de intercorrências com Hialuronidase.",
        area: "Cosmetologia / Injetáveis",
        questions: "Frequente em 78% das provas",
        url: "https://www.scielo.br/j/surgicalcosmetic/"
    },
    {
        title: "Bioestimuladores de Colágeno",
        desc: "Mecanismo de indução inflamatória subclínica do PLLA (Ácido Poli-L-Láctico) e Hidroxiapatita de Cálcio para neocolagênese.",
        area: "Biotecnologia",
        questions: "Frequente em 70% das provas",
        url: "https://www.scielo.br/j/surgicalcosmetic/"
    },
    {
        title: "Histologia da Pele e Cicatrização",
        desc: "Composição celular da epiderme (queratinócitos, melanócitos) e turnover celular aplicados a Peelings Químicos.",
        area: "Histologia",
        questions: "Frequente em 88% das provas",
        url: "https://www.msdmanuals.com/pt-br/profissional/dist%C3%BArbios-dermatol%C3%B3gicos/estrutura-e-fun%C3%A7%C3%A3o-da-pele/estrutura-e-fun%C3%A7%C3%A3o-da-pele"
    }
];

// Banco de Dados do Simulado
const quizQuestions = [
    {
        question: "Qual o principal mecanismo de ação da Toxina Botulínica Tipo A na placa motora?",
        options: [
            "Inibição da síntese de colágeno pelo fibroblasto.",
            "Clivagem da proteína SNAP-25, impedindo a exocitose de acetilcolina.",
            "Bloqueio reversível dos canais de sódio nos axônios periféricos.",
            "Destruição permanente dos receptores pós-sinápticos."
        ],
        correct: 1,
        explanation: "A Toxina Botulínica entra no neurônio motor e cliva a proteína SNAP-25 (do complexo SNARE), bloqueando a liberação de acetilcolina.",
        sourceUrl: "https://www.scielo.br/j/abd/"
    },
    {
        question: "Em caso de oclusão vascular iminente por preenchedor de Ácido Hialurônico, qual a conduta imediata?",
        options: [
            "Aplicação de compressas frias e compressão local.",
            "Injeção imediata da enzima Hialuronidase na área afetada.",
            "Aplicação de toxina botulínica para relaxar o vaso sanguíneo.",
            "Prescrição exclusiva de corticoide via oral por 5 dias."
        ],
        correct: 1,
        explanation: "O protocolo de emergência vascular exige o uso imediato e em altas doses de Hialuronidase para degradação do gel e descompressão vascular.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=hyaluronidase+complications+hyaluronic+acid"
    }
];

// Lógica do Sorteador
const drawBtn = document.getElementById('draw-btn');
if (drawBtn) {
    drawBtn.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * topicsDB.length);
        const selectedTopic = topicsDB[randomIndex];

        document.getElementById('topic-title').innerText = selectedTopic.title;
        document.getElementById('topic-desc').innerText = selectedTopic.desc;
        document.getElementById('topic-tag').innerText = selectedTopic.area;
        document.getElementById('topic-questions').innerText = selectedTopic.questions;

        const topicLink = document.getElementById('topic-link');
        if (topicLink) {
            topicLink.href = selectedTopic.url;
        }

        document.getElementById('draw-result').classList.remove('hidden');
    });
}

// Lógica do Simulado (Quiz)
let currentQuestionIndex = 0;

function loadQuestion() {
    const q = quizQuestions[currentQuestionIndex];
    const progressEl = document.getElementById('quiz-progress');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');

    if (!progressEl || !questionTextEl || !optionsContainer) return;

    progressEl.innerText = `Questão ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
    questionTextEl.innerText = q.question;
    optionsContainer.innerHTML = '';
    
    document.getElementById('explanation').classList.add('hidden');
    document.getElementById('next-q-btn').classList.add('hidden');

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectOption(idx, q.correct, q.explanation, q.sourceUrl);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex, correctIndex, expText, sourceUrl) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIndex) btn.classList.add('correct');
        if (idx === selectedIndex && selectedIndex !== correctIndex) btn.classList.add('wrong');
    });

    const expDiv = document.getElementById('explanation');
    expDiv.innerHTML = `${expText} <br><br><a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--gold-light); text-decoration: underline;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Ler sobre o tema na literatura científica</a>`;
    expDiv.classList.remove('hidden');

    if (currentQuestionIndex < quizQuestions.length - 1) {
        document.getElementById('next-q-btn').classList.remove('hidden');
    }
}

const nextQBtn = document.getElementById('next-q-btn');
if (nextQBtn) {
    nextQBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });
}

// Lógica dos Flashcards
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Lógica do Cronômetro Pomodoro
let timerInterval = null;
let timeLeft = 25 * 60; // 25 Minutos

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        timeDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

const startBtn = document.getElementById('start-btn');
if (startBtn) {
    startBtn.addEventListener('click', () => {
        if (timerInterval !== null) return; // Impede duplicar o timer

        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert("⏰ Tempo de foco encerrado! Faça uma pausa.");
            }
        }, 1000);
    });
}

const pauseBtn = document.getElementById('pause-btn');
if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    });
}

const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        timeLeft = 25 * 60;
        updateTimerDisplay();
    });
}

// Navegação Suave
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    updateTimerDisplay();
});