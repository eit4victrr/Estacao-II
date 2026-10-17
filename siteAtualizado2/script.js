
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. ANO DO RODAPÉ
    // ==========================================

    const rodape = document.querySelector("footer p");

    if (rodape) {
        rodape.textContent =
            "Feira de Ciências — Choques e Silêncios (1950–1960) | " +
            new Date().getFullYear();
    }


    // ==========================================
    // 2. BARRA DE PROGRESSO
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
        const altura =
            document.documentElement.scrollHeight - window.innerHeight;

        const porcentagem = altura > 0
            ? (window.scrollY / altura) * 100
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
    botaoLeitura.textContent = "Tema escuro";
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

        document.body.classList.toggle("modo-leitura", modoLeitura);

        botaoLeitura.textContent = modoLeitura
            ? "Voltar ao tema escuro"
            : "Tema claro";
    });


    // ==========================================
    // 5. QUIZ
    // ==========================================

    const quizForm = document.getElementById("quizForm");
    const resultado = document.getElementById("resultadoQuiz");

    if (quizForm && resultado) {

        const gabarito = {
            q1: "b",
            q2: "c",
            q3: "d",
            q4: "a",
            q5: "c"
        };

        quizForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let pontuacao = 0;
            let detalhes = "";

            for (let i = 1; i <= 5; i++) {
                const pergunta = "q" + i;
                const selecionada = quizForm.querySelector(
                    'input[name="' + pergunta + '"]:checked'
                );

                if (selecionada && selecionada.value === gabarito[pergunta]) {
                    pontuacao++;

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

            if (pontuacao === 5) {
                mensagem = "Excelente! Você acertou todas as perguntas!";
            } else if (pontuacao >= 3) {
                mensagem = "Muito bem! Você está no caminho certo!";
            } else {
                mensagem = "Continue estudando! Você pode melhorar!";
            }

            resultado.innerHTML = `
                <h3>Resultado: ${pontuacao}/5</h3>
                <p>${mensagem}</p>
                <hr>
                ${detalhes}
            `;

            resultado.style.display = "block";

            resultado.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        });

        quizForm.addEventListener("reset", function () {
            resultado.innerHTML = "";
            resultado.style.display = "none";
        });
    }

});
