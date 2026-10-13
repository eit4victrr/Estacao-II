document.addEventListener("DOMContentLoaded", function () {
    // Atualiza o ano no rodapé
    const rodape = document.querySelector("footer p");

    if (rodape) {
        rodape.textContent =
            "Feira de Ciências — Choques e Silêncios (1950–1960) | " +
            new Date().getFullYear();
    }

    // Cria a barra de progresso da página
    const progresso = document.createElement("div");

    progresso.style.position = "fixed";
    progresso.style.top = "0";
    progresso.style.left = "0";
    progresso.style.height = "4px";
    progresso.style.width = "0%";
    progresso.style.backgroundColor = "#c16b7b";
    progresso.style.zIndex = "1000";
    progresso.style.transition = "width 0.1s";

    document.body.appendChild(progresso);

    window.addEventListener("scroll", function () {
        const altura =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const porcentagem = altura > 0
            ? (window.scrollY / altura) * 100
            : 0;

        progresso.style.width = porcentagem + "%";
    });

    // Anima a entrada das seções
    const secoes = document.querySelectorAll("main section");

    secoes.forEach(function (secao) {
        secao.style.opacity = "0";
        secao.style.transform = "translateY(20px)";
        secao.style.transition = "opacity 0.6s, transform 0.6s";
    });

    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.1
    });

    secoes.forEach(function (secao) {
        observador.observe(secao);
    });

    // Cria o botão de modo de leitura
    const botao = document.createElement("button");

    botao.textContent = "Modo de leitura";
    botao.style.position = "fixed";
    botao.style.right = "15px";
    botao.style.bottom = "15px";
    botao.style.padding = "12px 16px";
    botao.style.backgroundColor = "#853544";
    botao.style.color = "#ffffff";
    botao.style.border = "1px solid #c16b7b";
    botao.style.borderRadius = "6px";
    botao.style.cursor = "pointer";
    botao.style.zIndex = "1000";

    document.body.appendChild(botao);

    let modoLeitura = false;

    botao.addEventListener("click", function () {
        modoLeitura = !modoLeitura;

        if (modoLeitura) {
            document.body.style.backgroundColor = "#f5f0e8";
            document.body.style.color = "#222222";

            document.querySelectorAll("main section").forEach(function (secao) {
                secao.style.backgroundColor = "#ffffff";
                secao.style.borderColor = "#d8c8c8";
            });

            document.querySelectorAll("main p").forEach(function (paragrafo) {
                paragrafo.style.color = "#222222";
            });

            botao.textContent = "Voltar ao tema escuro";
        } else {
            document.body.style.backgroundColor = "#111111";
            document.body.style.color = "#e5e0dc";

            document.querySelectorAll("main section").forEach(function (secao) {
                secao.style.backgroundColor = "#1b191a";
                secao.style.borderColor = "#33282a";
                secao.style.borderLeftColor = "#853544";
            });

            document.querySelectorAll("main p").forEach(function (paragrafo) {
                paragrafo.style.color = "#d3ccca";
            });

            botao.textContent = "Modo de leitura";
        }
    });
});