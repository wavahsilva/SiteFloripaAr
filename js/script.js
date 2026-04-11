const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');
const whatsappLinks = document.querySelectorAll('[data-whatsapp-link]');
const contactPhones = document.querySelectorAll('.contact-phone');
const heroSlider = document.getElementById('hero-slider');
const contactEmails = document.querySelectorAll('.contact-email');
const socialLinks = document.querySelectorAll('[data-social-link]');

let whatsappNumber = '5548999156552';
let whatsappNumberFormatted = '(48) 99915-6552';
let whatsappDefaultMessage = 'Olá! Gostaria de solicitar um orçamento com a Floripa AR.';
let contactEmail = 'contato@floripaar.com.br';
let contactMailSubject = 'Contato via site Floripa AR';
let sliderImages = [];
let sliderIndex = 0;
let sliderIntervalId;
let emailJsConfig = null;

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

function updateContactEmails() {
    contactEmails.forEach(emailEl => {
        emailEl.textContent = contactEmail;
    });
}

function updateSocialLinks(socialConfig = {}) {
    socialLinks.forEach(link => {
        const network = link.dataset.socialLink;
        if (network && socialConfig[network]) {
            link.href = socialConfig[network];
        }
    });
}

function showNextHeroImage() {
    if (!heroSlider || sliderImages.length <= 1) return;

    heroSlider.classList.add('is-fading');

    setTimeout(() => {
        sliderIndex = (sliderIndex + 1) % sliderImages.length;
        heroSlider.src = sliderImages[sliderIndex];
        heroSlider.classList.remove('is-fading');
    }, 300);
}

function initHeroSlider() {
    if (!heroSlider) return;

    const imagesAttr = heroSlider.dataset.sliderImages;
    if (!imagesAttr) return;

    sliderImages = imagesAttr.split(',').map(img => img.trim()).filter(Boolean);
    if (sliderImages.length <= 1) return;

    heroSlider.src = sliderImages[0];
    sliderIndex = 0;

    sliderIntervalId = setInterval(showNextHeroImage, 5000);
    setTimeout(showNextHeroImage, 1000);
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
        if (data?.contact?.email) {
            contactEmail = data.contact.email;
        }
        if (data?.contact?.mailSubject) {
            contactMailSubject = data.contact.mailSubject;
        }
        if (data?.contact?.whatsappDefaultMessage) {
            whatsappDefaultMessage = data.contact.whatsappDefaultMessage;
        }

        if (data?.emailjs) {
            emailJsConfig = data.emailjs;
            if (emailjs && emailjs.init && emailJsConfig.publicKey) {
                emailjs.init(emailJsConfig.publicKey);
            }
        }

        updateWhatsappLinks();
        updateContactPhones();
        updateContactEmails();
        updateSocialLinks(data?.socials);
    } catch (error) {
        console.error('Erro ao carregar config.json:', error);
        updateWhatsappLinks();
        updateContactPhones();
        updateContactEmails();
        updateSocialLinks();
    }
}

updateWhatsappLinks();
updateContactPhones();
updateContactEmails();
updateSocialLinks();
initHeroSlider();

loadConfig();

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        const feedbackEl = document.getElementById('contact-feedback');
        const formData = {
            from_name: name,
            reply_to: email,
            phone,
            message,
            to_email: contactEmail,
            mail_subject: contactMailSubject
        };

        if (!emailJsConfig?.serviceId || !emailJsConfig?.templateId || !emailJsConfig?.publicKey) {
            feedbackEl.textContent = 'Configuração de email incompleta. Atualize o config.json.';
            feedbackEl.classList.add('is-error');
            return;
        }

        feedbackEl.textContent = 'Enviando mensagem...';
        feedbackEl.classList.remove('is-error');

        try {
            await emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, formData);
            feedbackEl.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            contactForm.reset();
        } catch (err) {
            console.error('Erro ao enviar email:', err);
            feedbackEl.textContent = 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.';
            feedbackEl.classList.add('is-error');
        }
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
