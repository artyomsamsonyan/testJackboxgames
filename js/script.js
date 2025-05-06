const links = document.querySelectorAll('.header .navList .link.menu');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const signupModal = document.getElementById('signUpModal');
const openMobileMenu = document.querySelector('.toggleMenuIcon');
const mobileMenuWrapper = document.querySelector('.mobileNavListWrapper ');
const mobileMenu = document.querySelector('.mobileNavList');
const closeMobileMenu = document.getElementById('closeMobileNav');
const faqs = document.querySelectorAll('.faqSection .faqsList .faqBox');
const mayoImageSection = document.querySelector('.whatsJackboxSection');
const socialSection = document.querySelector('.socialSection');

const observer = new IntersectionObserver(
    ([entry]) => {
        const header = document.querySelector('header');
        if (!entry.isIntersecting) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    },
    { root: null, threshold: 1 }
);

const section = document.querySelector('section');
if (section) {
    observer.observe(section);
}


links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
        link.classList.toggle('opened');
    });

    document.addEventListener('click', (event) => {
        if (!link.contains(event.target)) {
            link.classList.remove('opened');
        }
    });
});


const openSignUpModal = function () {
    signupModal.classList.toggle('opened');
}

closeBtn.addEventListener('click', () => {
    signupModal.classList.remove('opened');
});

window.addEventListener('click', (e) => {
    if (e.target === signupModal) {
        signupModal.classList.remove('opened');
    }
});

openMobileMenu.addEventListener('click', () => {
    mobileMenuWrapper.classList.add('opened');
});

closeMobileMenu.addEventListener('click', () => {
    mobileMenuWrapper.classList.remove('opened');
});

mobileMenuWrapper.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target)) {
        mobileMenuWrapper.classList.remove('opened');
    }
});


const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const pagination = document.getElementById('pagination');

let index = 0;
const slideWidth = slides[0].offsetWidth + 20;
const totalSlides = slides.length;

function updateSlider() {
    const offset = -((slideWidth * index) - ((window.innerWidth - slideWidth) / 2));
    slider.style.transform = `translateX(${offset}px)`;

    document.querySelectorAll('.dot').forEach((dot, i) =>
        dot.classList.toggle('active', i === index)
    );

    slides.forEach((slide, i) =>
        slide.classList.toggle('active-slide', i === index)
    );
}


// Touch swipe
let startX = 0;
slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    let delta = endX - startX;
    if (delta > 50) {
        index = (index - 1 + totalSlides) % totalSlides;
    } else if (delta < -50) {
        index = (index + 1) % totalSlides;
    }
    updateSlider();
});

// Arrows
document.querySelector('.prev-btn').onclick = () => {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlider();
};

document.querySelector('.next-btn').onclick = () => {
    index = (index + 1) % totalSlides;
    updateSlider();
};

// Pagination
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        index = i;
        updateSlider();
    });
    pagination.appendChild(dot);
});

window.addEventListener('resize', updateSlider);
updateSlider();

faqs.forEach(faq => {
    faq.addEventListener('click', (e) => {
        e.stopPropagation();
        faq.classList.toggle('opened');
    });

    document.addEventListener('click', (event) => {
        if (!faq.contains(event.target)) {
            faq.classList.remove('opened');
        }
    });
});



window.addEventListener('scroll', () => {
    const mayoImageSectionTop = mayoImageSection.getBoundingClientRect().top;
    const socialSectionTop = socialSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (mayoImageSectionTop < windowHeight * 0.9) {
        mayoImageSection.classList.add('image-visible');
    }

    if (socialSectionTop < windowHeight * 0.9) {
        socialSection.classList.add('image-visible');
    }
});