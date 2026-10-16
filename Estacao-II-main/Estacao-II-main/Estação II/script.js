
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. ATUALIZAR O ANO NO RODAPÉ
    // ==========================================

    const rodape = document.querySelector("footer p");

    if (rodape) {
        rodape.textContent =
            "Feira de Ciências — Choques e Silêncios (1950–1960) | " +
            new Date().getFullYear();
    }


    // ==========================================
    // 2. BARRA DE PROGRESSO DA PÁGINA
    // ==========================================

    const progresso = document.createElement("div");

    progresso.id = "barraProgresso";

    Object.assign(progresso.style, {
        position: "fixed",
        top: "0",
        left: "0",
        height: "4px",
        width: "0%",
        backgroundColor: "#c16b7b",
        zIndex: "9999",
        transition: "width 0.1s"
    });

    document.body.appendChild(progresso);

    function atualizarProgresso() {
        const alturaTotal =
            document.documentElement.scrollHeight - window.innerHeight;

        const porcentagem = alturaTotal > 0
            ? (window.scrollY / alturaTotal) * 100
            : 0;

        progresso.style.width = porcentagem + "%";
    }

    window.addEventListener("scroll", atualizarProgresso);
    atualizarProgresso();


    // ==========================================
    // 3. ANIMAÇÃO DAS SEÇÕES
    // ==========================================

    const secoes = document.querySelectorAll("main section");

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {
                    entrada.target.classList.add("secao-visivel");
                    observador.unobserve(entrada.target);
                }

            });
        }, {
            threshold: 0.1
        });

        secoes.forEach(function (secao) {
            secao.style.opacity = "0";
            secao.style.transform = "translateY(20px)";
            secao.style.transition = "opacity 0.6s, transform 0.6s";

            observador.observe(secao);
        });

        // Mantém as seções visíveis quando o observador as encontra.
        const estiloAnimacao = document.createElement("style");

        estiloAnimacao.textContent = `
            main section.secao-visivel {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;

        document.head.appendChild(estiloAnimacao);

    } else {
        secoes.forEach(function (secao) {
            secao.style.opacity = "1";
            secao.style.transform = "none";
        });
    }


    // ==========================================
    // 4. MODO DE LEITURA
    // ==========================================

    const botaoLeitura = document.createElement("button");

    botaoLeitura.type = "button";
    botaoLeitura.textContent = "Modo de leitura";
    botaoLeitura.id = "botaoModoLeitura";

    Object.assign(botaoLeitura.style, {
        position: "fixed",
        right: "15px",
        bottom: "15px",
        padding: "12px 16px",
        backgroundColor: "#853544",
        color: "#ffffff",
        border: "1px solid #c16b7b",
        borderRadius: "6px",
        cursor: "pointer",
        zIndex: "9998"
    });

    document.body.appendChild(botaoLeitura);

    let modoLeitura = false;

    botaoLeitura.addEventListener("click", function () {

        modoLeitura = !modoLeitura;

        document.body.style.backgroundColor =
            modoLeitura ? "#f5f0e8" : "#111111";

        document.body.style.color =
            modoLeitura ? "#222222" : "#e5e0dc";

        document.querySelectorAll("main section").forEach(function (secao) {

            secao.style.backgroundColor =
                modoLeitura ? "#ffffff" : "#1b191a";

            secao.style.borderColor =
                modoLeitura ? "#d8c8c8" : "#33282a";

            secao.style.borderLeftColor =
                modoLeitura ? "#d8c8c8" : "#853544";

        });

        document.querySelectorAll("main p").forEach(function (paragrafo) {

            paragrafo.style.color =
                modoLeitura ? "#222222" : "#d3ccca";

        });

        document.querySelectorAll("main section h2, main section h3")
            .forEach(function (titulo) {
                titulo.style.color =
                    modoLeitura ? "#853544" :
                    titulo.tagName === "H2" ? "#dba0aa" : "#c98591";
            });

        botaoLeitura.textContent = modoLeitura
            ? "Voltar ao tema escuro"
            : "Modo de leitura";

    });


    // ==========================================
    // 5. QUIZ — CHOQUES E SILÊNCIOS
    // ==========================================

    const quizForm = document.getElementById("quizForm");
    const resultadoQuiz = document.getElementById("resultadoQuiz");

    if (quizForm && resultadoQuiz) {

        const gabarito = {
            q1: "b",
            q2: "c",
            q3: "d",
            q4: "a",
            q5: "c"
        };

        quizForm.addEventListener("submit", function (event) {

            event.preventDefault();

            let acertos = 0;
            let detalhes = "";

            for (let i = 1; i <= 5; i++) {

                const pergunta = "q" + i;
                const respostaMarcada = quizForm.querySelector(
                    'input[name="' + pergunta + '"]:checked'
                );

                if (
                    respostaMarcada &&
                    respostaMarcada.value === gabarito[pergunta]
                ) {

                    acertos++;

                    detalhes += `
                        <p class="resposta-correta">
                            ✅ Pergunta ${i}: resposta correta!
                        </p>
                    `;

                } else {

                    detalhes += `
                        <p class="resposta-incorreta">
                            ❌ Pergunta ${i}: a alternativa correta é
                            ${gabarito[pergunta].toUpperCase()}.
                        </p>
                    `;

                }

            }

            let mensagem;

            if (acertos === 5) {
                mensagem = "Excelente! Você acertou todas as perguntas!";
            } else if (acertos >= 3) {
                mensagem = "Muito bem! Você está no caminho certo!";
            } else {
                mensagem = "Continue estudando! Você pode melhorar!";
            }

            resultadoQuiz.innerHTML = `
                <h3>Resultado: ${acertos}/5</h3>
                <p>${mensagem}</p>
                <hr>
                <div class="detalhes-resultado">
                    ${detalhes}
                </div>
            `;

            resultadoQuiz.style.display = "block";

            resultadoQuiz.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        });

        quizForm.addEventListener("reset", function () {

            resultadoQuiz.innerHTML = "";
            resultadoQuiz.style.display = "none";

        });

    }

});
