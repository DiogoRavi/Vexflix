document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.getElementById("carousel");
    const leftBtn  = document.querySelector(".arrow.left");
    const rightBtn = document.querySelector(".arrow.right");

    if (!carousel) return;

    const clickAmount = 300;
    const autoSpeed   = 1.5; // Reduzido a velocidade para ser mais suave

    // 1. Duplica os cards para loop suave
    const cards = [...carousel.children];
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
    });

    let autoScrollInterval;

    // 2. Função para iniciar o Auto-scroll
    function startAutoScroll() {
        // Verifica a largura da tela (opcional: desativa em telas pequenas)
        if (window.innerWidth < 600) return; 

        if (autoScrollInterval) clearInterval(autoScrollInterval); // Garante que não haja múltiplos intervalos

        autoScrollInterval = setInterval(() => {
            carousel.scrollLeft += autoSpeed;

            // Se o scroll atingir metade da largura (onde começam os clones), reseta para o início
            if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                carousel.scrollLeft = 0;
            }
        }, 10);
    }
    
    // 3. Função para parar o Auto-scroll
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Inicia o carrossel no carregamento
    startAutoScroll();

    // Eventos para pausar ao passar o mouse
    carousel.addEventListener("mouseenter", stopAutoScroll);
    carousel.addEventListener("mouseleave", startAutoScroll);

    // Eventos de clique nas setas
    rightBtn.addEventListener("click", () => {
        stopAutoScroll(); // Pausa ao interagir manualmente
        carousel.scrollBy({ left: clickAmount, behavior: "smooth" });
        // Opcional: Retomar o scroll após um pequeno delay
        setTimeout(startAutoScroll, 2000); 
    });

    leftBtn.addEventListener("click", () => {
        stopAutoScroll(); // Pausa ao interagir manualmente
        carousel.scrollBy({ left: -clickAmount, behavior: "smooth" });
        // Opcional: Retomar o scroll após um pequeno delay
        setTimeout(startAutoScroll, 2000);
    });

    // Adiciona evento de redimensionamento para ajustar o auto-scroll
    window.addEventListener('resize', () => {
        // Se a tela for pequena, garante que o auto-scroll pare.
        if (window.innerWidth < 600) {
            stopAutoScroll();
        } else {
            // Se a tela for grande e o carrossel não estiver ativo, inicia.
            if (!autoScrollInterval) {
                 startAutoScroll();
            }
        }
    });

});