document.addEventListener('DOMContentLoaded', () => {
    try {
        const classFilter = document.getElementById('classFilter');
        const subjectFilter = document.getElementById('subjectFilter');
        const lessonFilter = document.getElementById('lessonFilter');
        const rows = document.querySelectorAll('#pdfList tbody tr');
        
        // Check if all necessary elements are found
        if (!classFilter || !subjectFilter || !lessonFilter || rows.length === 0) {
            console.error("Required elements are missing. Please check your HTML.");
            return;
        }

        initializeSubjectFilter();
        initializeLessonFilter();

        classFilter.addEventListener('change', updateSubjectsAndLessons);
        subjectFilter.addEventListener('change', updateLessonsAndFilterNotes);
        lessonFilter.addEventListener('change', filterNotes);
    } catch (error) {
        console.error("Error during initialization:", error);
    }
});

function initializeSubjectFilter() {
    const subjectFilter = document.getElementById('subjectFilter');
    subjectFilter.innerHTML = '<option value="all">All Subjects</option>';
}

function initializeLessonFilter() {
    const lessonFilter = document.getElementById('lessonFilter');
    lessonFilter.innerHTML = '<option value="all">All Lessons</option>';
}

function updateSubjectsAndLessons() {
    const classFilterValue = document.getElementById('classFilter').value.toLowerCase();
    const subjectFilter = document.getElementById('subjectFilter');

    initializeSubjectFilter();
    initializeLessonFilter();

    if (classFilterValue !== 'all') {
        const subjects = Object.keys(lessonsData[classFilterValue] || {});
        subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject.replace('_', ' ').toUpperCase();
            subjectFilter.appendChild(option);
        });
    }
    filterNotes();
}

// ===== SCHOOL BANNER CAROUSEL SCRIPT =====
let slideIndex = 0;
const slides = document.querySelectorAll('.slides img');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    slideIndex = i;
    showSlide(i);
  });
});

// Auto Slide Every 5 Seconds
setInterval(nextSlide, 5000);


function updateLessonsAndFilterNotes() {
    const classFilterValue = document.getElementById('classFilter').value.toLowerCase();
    const subjectFilterValue = document.getElementById('subjectFilter').value.toLowerCase();
    const lessonFilter = document.getElementById('lessonFilter');

    initializeLessonFilter();

    if (classFilterValue !== 'all' && subjectFilterValue !== 'all') {
        const lessons = lessonsData[classFilterValue]?.[subjectFilterValue];
        if (lessons) {
            lessons.forEach(lesson => {
                const option = document.createElement('option');
                option.value = lesson.toLowerCase();
                option.textContent = lesson;
                lessonFilter.appendChild(option);
            });
        }
    }
    filterNotes();
}

function filterNotes() {
    const classFilterValue = document.getElementById('classFilter').value.toLowerCase();
    const subjectFilterValue = document.getElementById('subjectFilter').value.toLowerCase();
    const lessonFilterValue = document.getElementById('lessonFilter').value.toLowerCase();

    const rows = document.querySelectorAll('#pdfList tbody tr');
    rows.forEach(row => {
        const className = row.getAttribute('data-class')?.toLowerCase();
        const subjectName = row.getAttribute('data-subject')?.toLowerCase();
        const lessonName = row.getAttribute('data-lesson')?.toLowerCase();

        if (
            (classFilterValue === 'all' || className === classFilterValue) &&
            (subjectFilterValue === 'all' || subjectName === subjectFilterValue) &&
            (lessonFilterValue === 'all' || lessonName === lessonFilterValue)
        ) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
        });
    }
});

(function () {
    try {
        emailjs.init("eFFnvBh7YKicvN14v"); // Replace with your EmailJS user ID
    } catch (error) {
        console.error("EmailJS initialization failed:", error);
    }
})();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("Form submission started...");

        emailjs.sendForm('service_k0zoxi9', 'template_rcmaf84', this)
            .then(function () {
                console.log('Email sent successfully');
                alert('Your message has been sent!');
            }, function (error) {
                console.error('FAILED...', error);
                alert('Failed to send the message. Please try again.');
            });
    });
} else {
    console.error("Contact form not found.");
}
