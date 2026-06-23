// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
}

// Interactive Chatbot Clone Logic
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');

// Custom response database based on keywords
const botResponses = {
    education: "I am currently pursuing my M.Tech in Data Science at the National Institute of Technology, Jamshedpur (NIT Jamshedpur). My coursework covers advanced Machine Learning, Deep Learning, NLP, Big Data Architectures, and Mathematical Foundations. I love applying these theoretical concepts to solve practical problems!",
    nit: "I am studying at NIT Jamshedpur, specializing in M.Tech Data Science. It is an amazing environment for learning and collaborating on data-driven engineering projects, especially in the NLP and Generative AI space.",
    rag: "My Multi-Document RAG (Retrieval-Augmented Generation) Engine is one of my signature projects! It allows uploading multiple large documents, partitions and indexes them using Facebook AI Similarity Search (FAISS) and Google Generative AI Embeddings, and serves responses using the Gemini LLM via LangChain. I also implemented OAuth2 JWT Web Tokens for access security. You can find the repository here: https://github.com/shrixx18/Multi_RAG_ngn",
    skills: "My technical expertise includes:\n\n• Generative AI & LLMs: LangChain, RAG, Google GenAI (Gemini API), FAISS, Prompt Engineering, LLM Serving (vLLM).\n• NLP & Chatbots: Transformers (HuggingFace), text embeddings, SpaCy, sentence similarity models.\n• Backend Development: Python, FastAPI, JWT web tokens, SQLite, Docker, Git.\n\nWhich of these would you like to explore further?",
    contact: "I'd love to connect! You can reach me via:\n\n• LinkedIn: https://www.linkedin.com/in/shriverdhan600/\n• GitHub: https://github.com/shrixx18\n• Resume: You can view my CV at https://drive.google.com/drive/folders/1lCdjN6xmtCTxN2T3jZnp26_vWGbYFfRr?usp=sharing\n\nFeel free to send a connection request or message!",
    projects: "Some of my key projects include:\n\n1. Multi-Document RAG Engine: Built with LangChain, FAISS, Gemini Embeddings, and JWT token protection.\n2. JWT Auth Microservice: Secure token-based user service using FastAPI and SQLite.\n3. LLM Serving setup: Containerized LLM serving pipelines using Docker.\n\nType 'RAG' or 'JWT' to get more specific details about them!",
    jwt: "I designed a robust authentication service using FastAPI and JWT (JSON Web Tokens) to protect sensitive endpoints, like those in my Multi-Document RAG Engine. It features bcrypt password hashing, token refreshes, and access token validation.",
    hello: "Hi! I am Shriverdhan's AI Clone. 🤖 I can tell you all about Shriverdhan's skills, his studies at NIT Jamshedpur, his Multi-Document RAG Engine project, or how to contact him. What would you like to know?",
    default: "I'm Shriverdhan's AI clone! I might not know everything, but I can talk in detail about Shriverdhan's M.Tech studies, his LangChain/FAISS Multi-Document RAG Engine, his Python/FastAPI skills, and how to connect with him on LinkedIn. Feel free to use the quick prompt buttons on the side to try it out!"
};

// Handle submitting messages
if (chatForm && chatInput && chatMessages) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (!query) return;

        // Append User Message
        appendMessage(query, 'outgoing');
        chatInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Process query
        setTimeout(() => {
            const reply = processQuery(query);
            hideTypingIndicator();
            appendMessage(reply, 'incoming');
        }, 1000 + Math.random() * 800); // realistic delay
    });
}

// Hook up quick prompt buttons
document.querySelectorAll('.quick-prompt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        if (!query) return;

        // Append User Message
        appendMessage(query, 'outgoing');

        // Show typing indicator
        showTypingIndicator();

        // Process query
        setTimeout(() => {
            const reply = processQuery(query);
            hideTypingIndicator();
            appendMessage(reply, 'incoming');
        }, 1000 + Math.random() * 500);
    });
});

function appendMessage(text, direction) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', direction);

    // Prepare content with line breaks replaced by <br> and URLs converted to clickable links
    let formattedText = text.replace(/\n/g, '<br>');
    formattedText = formattedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: #facc15;">$1</a>');

    const avatarHtml = direction === 'incoming' 
        ? `<div class="message-avatar"><img src="./assets/profile.jpg" alt="AI Agent"></div>`
        : '';

    msgDiv.innerHTML = `
        ${avatarHtml}
        <div class="message-bubble">
            ${formattedText}
        </div>
    `;

    chatMessages.appendChild(msgDiv);
    
    // Auto Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    if (typingIndicator) {
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function hideTypingIndicator() {
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
}

function processQuery(query) {
    const normalized = query.toLowerCase();

    if (normalized.includes('hello') || normalized.includes('hi ') || normalized.includes('hey')) {
        return botResponses.hello;
    }
    if (normalized.includes('m.tech') || normalized.includes('mtech') || normalized.includes('education') || normalized.includes('course') || normalized.includes('study') || normalized.includes('studies')) {
        return botResponses.education;
    }
    if (normalized.includes('nit') || normalized.includes('jamshedpur')) {
        return botResponses.nit;
    }
    if (normalized.includes('rag') || normalized.includes('retrieval') || normalized.includes('multi-document')) {
        return botResponses.rag;
    }
    if (normalized.includes('jwt') || normalized.includes('token') || normalized.includes('auth') || normalized.includes('login')) {
        return botResponses.jwt;
    }
    if (normalized.includes('skill') || normalized.includes('languages') || normalized.includes('tools') || normalized.includes('framework')) {
        return botResponses.skills;
    }
    if (normalized.includes('contact') || normalized.includes('reach') || normalized.includes('email') || normalized.includes('linkedin') || normalized.includes('github') || normalized.includes('resume') || normalized.includes('cv')) {
        return botResponses.contact;
    }
    if (normalized.includes('project') || normalized.includes('creation') || normalized.includes('portfolio')) {
        return botResponses.projects;
    }

    return botResponses.default;
}

// Fade in scroll animations (simple intersection observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.glass, .hero-content, .hero-image-area').forEach(el => {
    el.classList.add('fade-in-element');
    observer.observe(el);
});

// CSS styles to support fade-in animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
.fade-in-element {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in-visible {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(styleSheet);
