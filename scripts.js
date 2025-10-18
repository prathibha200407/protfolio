// ===== HERO TYPING EFFECT =====
const typedText = document.getElementById('typed-text');
const texts = ["Prathibha K S", "MCA Student", "Aspiring Full Stack Developer", "UI/UX Enthusiast"];
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 150;

function type() {
  if (charIndex < texts[textIndex].length) {
    typedText.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, typingSpeed / 2);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", type);

// ===== NAVBAR MOBILE TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const shown = navLinks.classList.toggle('show');
  navToggle.setAttribute('aria-expanded', shown ? 'true' : 'false');
  navLinks.setAttribute('aria-hidden', shown ? 'false' : 'true');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
  }
});

// ===== PROJECT DETAILS + CAROUSEL (Smooth Toggle) =====
document.querySelectorAll('.project-card').forEach(card => {
  const btn = card.querySelector('.project-details-btn');
  const details = card.querySelector('.project-details');

  if (btn && details) {
    const imgs = details.querySelectorAll('.carousel-img');
    let index = 0;

    // Function to show image at index i
    const showImg = i => {
      imgs.forEach((img, idx) => {
        img.classList.toggle('active', idx === i);
      });
    };

    // Carousel navigation buttons
    const prevBtn = details.querySelector('.prev');
    const nextBtn = details.querySelector('.next');

    if (prevBtn) {
      prevBtn.addEventListener('click', e => {
        e.stopPropagation(); // prevent toggle when clicking nav
        index = (index - 1 + imgs.length) % imgs.length;
        showImg(index);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', e => {
        e.stopPropagation();
        index = (index + 1) % imgs.length;
        showImg(index);
      });
    }

    btn.addEventListener('click', () => {
      // Close all other project details first
      document.querySelectorAll('.project-card').forEach(otherCard => {
        const otherDetails = otherCard.querySelector('.project-details');
        const otherBtn = otherCard.querySelector('.project-details-btn');
        if (otherDetails !== details) {
          otherDetails.style.display = 'none';
          if (otherBtn) otherBtn.textContent = 'View Details';
        }
      });

      // Toggle current project details visibility
      const isVisible = details.style.display === 'block';
      if (isVisible) {
        details.style.display = 'none';
        btn.textContent = 'View Details';
      } else {
        details.style.display = 'block';
        btn.textContent = 'Hide Details';

        // Reset carousel to first image when showing
        index = 0;
        showImg(index);
      }
    });
  }
});



// ===== LANGUAGE PROGRESS ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
  const languages = document.querySelectorAll('.language');

  languages.forEach(lang => {
    const progressBar = lang.querySelector('.progress');
    const percentText = lang.querySelector('.lang-percent');
    const target = parseInt(lang.getAttribute('data-percentage'), 10);
    let width = 0;

    function fill() {
      if (width < target) {
        width++;
        progressBar.style.width = width + '%';
        percentText.textContent = width + '%';
        requestAnimationFrame(fill);
      }
    }

    fill();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById('feedback-form');
  const confettiContainer = document.getElementById('confetti-container');
  const feedbackSuccess = document.getElementById('feedback-success');

  feedbackForm.addEventListener('submit', e => {
    e.preventDefault();

    const feedbackText = feedbackForm.querySelector('textarea').value.trim();
    if (!feedbackText) {
      alert("Please enter your feedback!");
      return;
    }

    feedbackSuccess.style.display = 'block';
    setTimeout(() => feedbackSuccess.style.display = 'none', 3000);

    // Central 🎉
    const mainEmoji = document.createElement('div');
    mainEmoji.classList.add('confetti', 'main-emoji');
    mainEmoji.innerText = '🎉';
    mainEmoji.style.fontSize = '100px';
    mainEmoji.style.left = `${window.innerWidth / 2}px`;
    mainEmoji.style.top = `${window.innerHeight / 2}px`;
    mainEmoji.style.position = 'fixed';
    mainEmoji.style.transform = 'translate(-50%, -50%) scale(0)';
    mainEmoji.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
    confettiContainer.appendChild(mainEmoji);

    // Animate central emoji pop
    setTimeout(() => {
      mainEmoji.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 50);

    // Blast confetti
    setTimeout(() => {
      const emojis = ['🎉', '🎊', '🥳', '✨'];
      const count = 100;

      for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        const size = Math.random() * 20 + 10;
        confetti.style.fontSize = `${size}px`;
        confetti.style.left = `${window.innerWidth / 2}px`;
        confetti.style.top = `${window.innerHeight / 2}px`;
        confetti.style.position = 'fixed';
        confetti.style.transform = `translate(0px, 0px)`;
        confetti.style.transition = `transform 1.5s ease-out, opacity 1.5s ease-out`;

        confettiContainer.appendChild(confetti);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 400 + 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        setTimeout(() => {
          confetti.style.transform = `translate(${x}px, ${y}px)`;
          confetti.style.opacity = 0;
        }, 50);

        setTimeout(() => confetti.remove(), 1600);
      }
    }, 600);

    // Fade out central emoji
    setTimeout(() => {
      mainEmoji.style.opacity = 0;
      setTimeout(() => mainEmoji.remove(), 1000);
    }, 1200);

    feedbackForm.reset();
  });
});



// ===== CHATBOT =====
const chatToggle = document.getElementById('chatbot-toggle');
const chatBox = document.getElementById('chatbot-box');
const chatMessages = document.getElementById('chatbot-messages');
const chatInput = document.getElementById('chatbot-input');
const chatSend = document.getElementById('chatbot-send');

const sectionMap = {
  "projects": "projects",
  "skills": "skills",
  "education": "education",
  "certifications": "certifications",
  "languages": "languages",
  "feedback": "feedback"
};

chatToggle?.addEventListener('click', () => {
  chatBox.classList.toggle('show');
  chatInput.focus();
});

function addMessage(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.className = `chat-message ${sender}`;
  msg.innerHTML = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function scrollToSection(text) {
  for (let key in sectionMap) {
    if (text.includes(key)) {
      const el = document.getElementById(sectionMap[key]);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return key;
    }
  }
  return null;
}

function getBotResponse(input) {
  const text = input.toLowerCase().trim();
  const section = scrollToSection(text);
  if (section) return `🚀 Sure! Let me show you the ${section} section 👇`;
  if (text.includes("your name") || text.includes("who are you") || text.includes("introduce"))
    return "Hi 👋! My name is <b>Prathibha K S</b> 😊. I’m a BCA graduate and currently pursuing MCA at Amrita University. I’m passionate about becoming a <b>Full Stack Developer</b> 💻 and love <b>UI/UX design</b> 🎨.";
  if (text.includes("skills"))
    return "Here are my main skills 💻:<br>👉 HTML, CSS, JavaScript<br>👉 Python<br>👉 React<br>👉 MongoDB";
  if (text.includes("education"))
    return "📚 My education:<br>🎓 MCA - Amrita University (2026)<br>🎓 BCA - Amrita University (2023)<br>🏫 JSS PU College (2020)<br>🏫 Swarana High School (2018)";
  if (text.includes("contact") || text.includes("email") || text.includes("reach you")) {
    setTimeout(() => window.location.href = "mailto:prathi72003@gmail.com", 500);
    return "📧 You can reach me at <b>prathi72003@gmail.com</b>. Opening your email client... ✉️";
  }
  if (text.includes("dark mode") || text.includes("light mode") || text.includes("theme")) {
    document.body.classList.toggle("dark");
    return "🌙 Theme toggled! Try dark/light mode now ✨";
  }
  if (text.includes("hello") || text.includes("hi"))
    return "Hello! 👋 I'm your portfolio assistant. Ask me about 💻 skills, 🚀 projects, or 📧 contact.";
  return "I'm still learning 🤖. Try asking me about 💻 skills, 📚 education, 🚀 projects, or 📧 contact.";
}

function handleUserMessage() {
  const userText = chatInput.value.trim();
  if (!userText) return;
  addMessage(userText, 'user');
  chatInput.value = '';
  const typingMsg = document.createElement('div');
  typingMsg.className = 'chat-message bot';
  typingMsg.innerHTML = '💭 ...';
  chatMessages.appendChild(typingMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  setTimeout(() => {
    typingMsg.remove();
    addMessage(getBotResponse(userText), 'bot');
  }, 800);
}

chatInput?.addEventListener('keypress', e => { if (e.key === 'Enter') handleUserMessage(); });
chatSend?.addEventListener('click', handleUserMessage);

addMessage("Hi! I'm your portfolio assistant 🤖. Ask me about 💻 skills, 🚀 projects, or 📧 contact.");

// ===== DARK/LIGHT MODE TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const sunCore = document.querySelector('.sun-core');
const sunRays = document.querySelector('.sun-rays');
const moon = document.querySelector('.moon');

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  sunRays.style.opacity = 0;
  moon.style.opacity = 1;
  sunCore.setAttribute('fill', '#f5f5f5');
}

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  sunRays.style.opacity = isDark ? 0 : 1;
  moon.style.opacity = isDark ? 1 : 0;
  sunCore.setAttribute('fill', isDark ? '#f5f5f5' : 'yellow');
});

// ===== CERTIFICATIONS ANIMATION =====
const certCards = document.querySelectorAll('.cert-card');

function animateCertifications() {
  certCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && !card.classList.contains('show')) {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 200);
    }
  });
}



document.addEventListener("DOMContentLoaded", function () {
  const typedText = document.getElementById("typed-text");
  const text = "";
  let i = 0;

  function typeEffect() {
    if (i < text.length) {
      typedText.textContent += text.charAt(i);
      i++;
      setTimeout(typeEffect, 150); // typing speed
    }
  }

  // Start typing after slight delay
  setTimeout(typeEffect, 500);
});


window.addEventListener('scroll', animateCertifications);
window.addEventListener('load', animateCertifications);

