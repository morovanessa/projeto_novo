// --- Banco de Dados de Temas (Sorteador) ---
const topicsDB = [
    {
        title: "Anatomia Facial e Camadas Teciduais",
        desc: "Estudo detalhado das 5 camadas faciais (Pele, Subcutâneo, SMAS, Espaços de Retenção e Periósteo) com foco na aplicação segura de injetáveis.",
        area: "Anatomia Aplicada",
        questions: "Frequente em 85% das provas"
    },
    {
        title: "Toxina Botulínica: Mecanismos e Diluição",
        desc: "Ação da toxina no bloqueio da liberação de acetilcolina na junção neuromuscular via clivagem das proteínas SNARE.",
        area: "Farmacologia",
        questions: "Frequente em 92% das provas"
    },
    {
        title: "Preenchedores Dérmicos e Reologia",
        desc: "Comportamento do Ácido Hialurônico, retrochoque, G' (elasticidade), viscoelasticidade e manejo de intercorrências com Hialuronidase.",
        area: "Cosmetologia / Injetáveis",
        questions: "Frequente em 78% das provas"
    },
    {
        title: "Bioestimuladores de Colágeno",
        desc: "Mecanismo de indução inflamatória subclínica do PLLA (Ácido Poli-L-Láctico) e Hidroxiapatita de Cálcio para neocolagênese.",
        area: "Biotecnologia",
        questions: "Frequente em 70% das provas"
    },
    {
        title: "Histologia da Pele e Cicatrização",
        desc: "Composição celular da epiderme (queratinócitos, melanócitos) e turnover celular aplicados a Peelings Químicos.",
        area: "Histologia",
        questions: "Frequente em 88% das provas"
    }
];

// --- Banco de Dados do Simulado ---
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
        explanation: "A Toxina Botulínica entra no neurônio motor e cliva a proteína SNAP-25 (do complexo SNARE), bloqueando a liberação de acetilcolina."
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
        explanation: "O protocolo de emergência vascular exige o uso imediato e em altas doses de Hialuronidase para degradação do gel e descompressão vascular."
    }
];

// --- Lógica do Sorteador ---
document.getElementById('draw-btn').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * topicsDB.length);
    const selectedTopic = topicsDB[randomIndex];

    document.getElementById('topic-title').innerText = selectedTopic.title;
    document.getElementById('topic-desc').innerText = selectedTopic.desc;
    document.getElementById('topic-tag').innerText = selectedTopic.area;
    document.getElementById('topic-questions').innerText = selectedTopic.questions;

    document.getElementById('draw-result').classList.remove('hidden');
});

// --- Lógica do Simulado (Quiz) ---
let currentQuestionIndex = 0;

function loadQuestion() {
    const q = quizQuestions[currentQuestionIndex];
    document.getElementById('quiz-progress').innerText = `Questão ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
    document.getElementById('question-text').innerText = q.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    document.getElementById('explanation').classList.add('hidden');
    document.getElementById('next-q-btn').classList.add('hidden');

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectOption(idx, q.correct, q.explanation);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex, correctIndex, expText) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIndex) btn.classList.add('correct');
        if (idx === selectedIndex && selectedIndex !== correctIndex) btn.classList.add('wrong');
    });

    const expDiv = document.getElementById('explanation');
    expDiv.innerText = expText;
    expDiv.classList.remove('hidden');

    if (currentQuestionIndex < quizQuestions.length - 1) {
        document.getElementById('next-q-btn').classList.remove('hidden');
    }
}

document.getElementById('next-q-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

// --- Lógica dos Flashcards ---
function flipCard(card) {
    card.classList.toggle('flipped');
}

// --- Lógica do Timer Pomodoro ---
let timerInterval = null;
let timeLeft = 25 * 60; // 25 Minutos

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-display').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('start-btn').addEventListener('click', () => {
    if (timerInterval) return;
    
    // Inicia som sintético com Tone.js no clique
    if (window.Tone) Tone.start();

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Tempo de foco encerrado! Faça uma pausa.");
            
            // Toca um bipe de finalização se o Tone.js estiver ativo
            if (window.Tone) {
                const synth = new Tone.Synth().toDestination();
                synth.triggerAttackRelease("C5", "8n");
            }
        }
    }, 1000);
});

document.getElementById('pause-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    updateTimerDisplay();
});

// Funções Utilitárias
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Inicialização das funções ao carregar a página
window.onload = function() {
    loadQuestion();
    updateTimerDisplay();
};