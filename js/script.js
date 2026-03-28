const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');
const whatsappLinks = document.querySelectorAll('[data-whatsapp-link]');
const contactPhones = document.querySelectorAll('.contact-phone');

let whatsappNumber = '5548999156552';
let whatsappNumberFormatted = '(48) 99915-6552';
let whatsappDefaultMessage = 'Olá! Gostaria de solicitar um orçamento com a Floripa AR.';

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
});

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active-link');
        } else {
            navLink?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

function buildWhatsappUrl(customMessage) {
    const message = customMessage || whatsappDefaultMessage;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function updateWhatsappLinks() {
    const url = buildWhatsappUrl();
    whatsappLinks.forEach(link => {
        link.href = url;
    });
}

function updateContactPhones() {
    contactPhones.forEach(phone => {
        phone.textContent = whatsappNumberFormatted;
    });
}

async function loadConfig() {
    try {
        const response = await fetch('config.json', { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Não foi possível carregar o config.json');
        }

        const data = await response.json();
        if (data?.contact?.phone) {
            whatsappNumber = data.contact.phone;
        }
        if (data?.contact?.phoneFormatted) {
            whatsappNumberFormatted = data.contact.phoneFormatted;
        }
        if (data?.contact?.whatsappDefaultMessage) {
            whatsappDefaultMessage = data.contact.whatsappDefaultMessage;
        }

        updateWhatsappLinks();
        updateContactPhones();
    } catch (error) {
        console.error('Erro ao carregar config.json:', error);
        updateWhatsappLinks();
        updateContactPhones();
    }
}

updateWhatsappLinks();
updateContactPhones();

loadConfig();

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        const whatsappMessage = `Olá! Meu nome é ${name}.\n\nEmail: ${email}\nTelefone: ${phone}\n\nMensagem: ${message}`;
        const whatsappUrl = buildWhatsappUrl(whatsappMessage);

        window.open(whatsappUrl, '_blank');

        contactForm.reset();

        alert('Redirecionando para o WhatsApp...');
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.service__card, .review__card, .about__data, .about__img');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                e.target.value = value;
            } else if (value.length <= 6) {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length <= 10) {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
            } else {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            }
        }
    });
});

console.log('Floripa AR - Website carregado com sucesso!');
