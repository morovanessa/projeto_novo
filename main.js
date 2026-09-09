// Banco de dados focado em Biomedicina Estética e Vestibular Integrado
const bancoBiomedicinaEstetica = [
    {
        especialidade: "Anatomia Humana",
        subtopico: "Histologia da Pele",
        titulo: "Camadas da Epiderme e Derme",
        resumo: "A epiderme é um epitélio estratificado pavimentoso queratinizado (composto pelas camadas basal, espinhosa, granulosa, lúcida e córnea). Abaixo dela está a derme, rica em fibroblastos responsáveis pela síntese de colágeno e elastina, fundamentais para a firmeza e sustentação cutânea.",
        questao: "Qual é a célula predominante na derme responsável pela produção das fibras de colágeno e elastina?",
        opcoes: [
            "Queratinócito",
            "Fibroblasto",
            "Melanócito",
            "Célula de Langerhans"
        ],
        correta: 1,
        explicacao: "Os fibroblastos são as células chave do tecido conjuntivo dermal encarregadas da síntese do colágeno, elastina e ácido hialurônico endógeno."
    },
    {
        especialidade: "Injetáveis e Preenchedores",
        subtopico: "Bioquímica dos Biomateriais",
        titulo: "Ácido Hialurônico e Reticulação",
        resumo: "O Ácido Hialurônico é um glicosaminoglicano com alta capacidade de retenção de água. Na estética, o processo de reticulação (cross-linking com BDDE) altera sua estrutura química para torná-lo mais resistente à degradação enzimática da hialuronidase, prolongando a duração no tecido.",
        questao: "Em vestibulares e provas de bioquímica, o ácido hialurônico é classificado como qual tipo de macromolécula?",
        opcoes: [
            "Proteína Fibrosa",
            "Lipídio Complexo",
            "Glicosaminoglicano (Carboidrato)",
            "Ácido Nucleico"
        ],
        correta: 2,
        explicacao: "O ácido hialurônico é um polissacarídeo não sulfatado pertencente à classe dos glicosaminoglicanos (carboidratos complexos)."
    },
    {
        especialidade: "Dermatofuncional",
        subtopico: "Farmacologia Cutânea",
        titulo: "Peelings Químicos (AHA e BHA)",
        resumo: "Os Alfa-hidroxiácidos (como o ácido glicólico e lático) são hidrossolúveis e atuam diminuindo a coesão dos corneócitos na camada córnea. Já os Beta-hidroxiácidos (como o ácido salicílico) são lipossolúveis, permitindo penetrar nos poros e folículos pilossebáceos, sendo ideais para peles acneicas.",
        questao: "O ácido salicílico é muito utilizado em tratamentos de acne por ser um Beta-hidroxiácido com a seguinte propriedade:",
        opcoes: [
            "Apenas Ação Hidratante de Superfície",
            "Lipossolubilidade (afinidade por óleos)",
            "Ação Exclusivamente Despigmentante",
            "Formação de Pontes de Dissulfeto"
        ],
        correta: 1,
        explicacao: "Sua lipossolubilidade permite que o ácido salicílico penetre o sebo nos poros, desobstruindo-os e promovendo esfoliação interna."
    },
    {
        especialidade: "Aparelhos Estéticos",
        subtopico: "Física Aplicada à Estética",
        titulo: "Laser e Fototermólise Seletiva",
        resumo: "A fototermólise seletiva é a capacidade de destruir um alvo específico (cromóforo, como a melanina ou hemoglobina) através da luz/calor sem danificar os tecidos adjacentes. O comprimento de onda e a duração do pulso são ajustados de acordo com a profundidade do cromóforo.",
        questao: "No tratamento de remoção de manchas vasculares (vasinhos), qual substância atua como o cromóforo-alvo do laser?",
        opcoes: [
            "Queratina",
            "Melanina",
            "Hemoglobina",
            "Colágeno"
        ],
        correta: 2,
        explicacao: "A hemoglobina presente nos vasos sanguíneos absorve o comprimento de onda do laser vascular, gerando calor e coagulando o vaso."
    },
    {
        especialidade: "Microbiologia & Biossegurança",
        subtopico: "Biossegurança em Clínicas",
        titulo: "Esterilização e Assepsia Cutânea",
        resumo: "Procedimentos minimamente invasivos exigem rigorosa assepsia local com clorexidina ou álcool 70% e esterilização de materiais reutilizáveis em autoclave (calor úmido sob pressão), eliminando todas as formas vegetativas e esporos bacterianos.",
        questao: "O equipamento padrão utilizado em clínicas biomédicas para esterilização por meio de calor úmido sob pressão é o(a):",
        opcoes: [
            "Estufa de Convecção",
            "Autoclave",
            "Câmara UV-C",
            "Ultrassom de Limpeza"
        ],
        correta: 1,
        explicacao: "A autoclave utiliza vapor de água sob alta pressão e temperatura, garantindo a eliminação completa de micro-organismos e esporos."
    },
    {
        especialidade: "Imunologia Cutânea",
        subtopico: "Processos Inflamatórios",
        titulo: "Regeneração Tecidual e Cicatrização",
        resumo: "Muitos procedimentos estéticos (como o microagulhamento) funcionam induzindo uma lesão controlada na pele. Isso desencadeia a cascata inflamatória: liberação de fatores de crescimento, migração de fibroblastos e neocolagênese (formação de novo colágeno).",
        questao: "Qual das seguintes fases da cicatrização caracteriza-se pelo pico de síntese e remodelação de colágeno?",
        opcoes: [
            "Fase Hemostática",
            "Fase de Maturação / Remodelação",
            "Fase de Necrose",
            "Fase de Diapedese"
        ],
        correta: 1,
        explicacao: "A fase de maturação é a etapa final da cicatrização, onde o colágeno tipo III é reorganizado e substituído por colágeno tipo I."
    }
];

// Seleção de elementos da interface
const drawBtn = document.getElementById('draw-btn');
const studyCard = document.getElementById('study-card');
const subjectTag = document.getElementById('subject-tag');
const subtopicTag = document.getElementById('subtopic-tag');
const topicTitle = document.getElementById('topic-title');
const topicSummary = document.getElementById('topic-summary');
const quizQuestion = document.getElementById('quiz-question');
const optionsContainer = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');

// Função de Sorteio
function sortearTema() {
    const indiceSorteado = Math.floor(Math.random() * bancoBiomedicinaEstetica.length);
    const item = bancoBiomedicinaEstetica[indiceSorteado];

    // Preenche as informações
    subjectTag.textContent = item.especialidade;
    subtopicTag.textContent = item.subtopico;
    topicTitle.textContent = item.titulo;
    topicSummary.textContent = item.resumo;
    quizQuestion.textContent = item.questao;

    // Reseta o simulado
    optionsContainer.innerHTML = '';
    feedbackEl.className = 'feedback-box hidden';
    feedbackEl.textContent = '';

    // Gera os botões das alternativas
    item.opcoes.forEach((opcaoText, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = `${String.fromCharCode(65 + index)}) ${opcaoText}`;
        button.onclick = () => verificarResposta(index, item.correta, item.explicacao);
        optionsContainer.appendChild(button);
    });

    // Exibe o cartão na tela
    studyCard.classList.remove('hidden');
}

// Função de validação de resposta
function verificarResposta(opcaoEscolhida, opcaoCorreta, explicacao) {
    const botoes = optionsContainer.querySelectorAll('.option-btn');

    botoes.forEach((btn, index) => {
        btn.disabled = true;
        
        if (index === opcaoCorreta) {
            btn.classList.add('correct');
        } else if (index === opcaoEscolhida) {
            btn.classList.add('wrong');
        }
    });

    // Exibe a explicação
    feedbackEl.classList.remove('hidden');
    if (opcaoEscolhida === opcaoCorreta) {
        feedbackEl.classList.add('correct');
        feedbackEl.innerHTML = `<strong>✨ Resposta Correta!</strong><br>${explicacao}`;
    } else {
        feedbackEl.classList.add('wrong');
        feedbackEl.innerHTML = `<strong>❌ Resposta Incorreta.</strong><br>${explicacao}`;
    }
}

// Ouvinte do Botão
drawBtn.addEventListener('click', sortearTema);