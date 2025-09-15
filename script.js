// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navMenu = document.getElementById("navMenu")

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  const icon = mobileMenuBtn.querySelector("i")
  icon.classList.toggle("fa-bars")
  icon.classList.toggle("fa-times")
})

// Smooth Scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.backgroundColor = "white"
    header.style.backdropFilter = "none"
  }
})

// Animação de contadores na seção de estatísticas
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number")
  const speed = 200

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = counter.innerText
      const count = +counter.getAttribute("data-count") || 0

      // Extrair apenas números do texto
      const targetNumber = Number.parseInt(target.replace(/[^\d]/g, ""))

      if (!targetNumber) return

      const inc = targetNumber / speed

      if (count < targetNumber) {
        counter.setAttribute("data-count", Math.ceil(count + inc))

        // Manter formatação original
        if (target.includes("R$")) {
          counter.innerText = `R$ ${Math.ceil(count + inc).toLocaleString("pt-BR")}`
        } else if (target.includes("MW")) {
          counter.innerText = `${Math.ceil(count + inc)}MW`
        } else if (target.includes("milhões")) {
          counter.innerText = `${Math.ceil(count + inc)} milhões`
        } else if (target.includes("+")) {
          counter.innerText = `${Math.ceil(count + inc).toLocaleString("pt-BR")}+`
        } else {
          counter.innerText = Math.ceil(count + inc).toLocaleString("pt-BR")
        }

        setTimeout(updateCount, 1)
      } else {
        counter.innerText = target
      }
    }

    updateCount()
  })
}

// Intersection Observer para animações
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("stats")) {
        animateCounters()
      }

      // Adicionar classe de animação para cards
      const cards = entry.target.querySelectorAll(".feature-card, .solution-card")
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, index * 100)
      })
    }
  })
}, observerOptions)

// Observar seções para animações
document.querySelectorAll(".features, .stats, .solutions").forEach((section) => {
  observer.observe(section)
})

// Inicializar cards com estado inicial para animação
document.querySelectorAll(".feature-card, .solution-card").forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(20px)"
  card.style.transition = "all 0.6s ease"
})

// Simulador de economia (placeholder)
document.querySelectorAll("button").forEach((button) => {
  if (button.textContent.includes("Calcular") || button.textContent.includes("Simular")) {
    button.addEventListener("click", () => {
      alert("Simulador em desenvolvimento! Em breve você poderá calcular sua economia com energia limpa.")
    })
  }

  if (button.textContent.includes("Orçamento")) {
    button.addEventListener("click", () => {
      alert("Formulário de orçamento em desenvolvimento! Entre em contato pelo telefone (11) 3000-0000.")
    })
  }

  if (button.textContent.includes("Especialista")) {
    button.addEventListener("click", () => {
      alert("Chat com especialista em desenvolvimento! Entre em contato pelo email contato@ecoenergia.com.br.")
    })
  }
})

// Adicionar CSS para menu mobile
const style = document.createElement("style")
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            flex-direction: column;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-menu a {
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--border);
        }
        
        .nav-menu a:last-child {
            border-bottom: none;
        }
    }
`
document.head.appendChild(style)
