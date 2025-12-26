// ===== INTRO REDIRECT (Runs BEFORE page loads) =====
if (!sessionStorage.getItem("introPlayed")) {
    sessionStorage.setItem("introPlayed", "yes");
    window.location.href = "index.html";
}
const lessonsData = {
    "6th": {
        "Social": ["Lesson 1", "Lesson 2"],
        "English": ["Lesson 1", "Lesson 2", "Lesson 3"],
        "English_SR": ["Lesson 1", "Lesson 2"],
        "Maths": ["Introductory Classes", "Lesson 1", "Lesson 2", "Lesson 3"],
        "Science": ["Lesson 1", "Lesson 2"],
        "Telugu": ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"]
    },
    "10th": {
        "Maths": ["Lesson 1", "Lesson 2"],
        "English": ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"],
        "science_physics": ["Lesson 1", "Lesson 2"],
        "Hindi": ["Lesson 1", "Lesson 2"],
        "social_economics": ["Lesson 1", "Lesson 2"],
        "social_geography": ["Lesson 1", "Lesson 2"]
    }
};


// ===== MAIN SCRIPT =====
document.addEventListener('DOMContentLoaded', () => {
    try {
        const classFilter = document.getElementById('classFilter');
        const subjectFilter = document.getElementById('subjectFilter');
        const lessonFilter = document.getElementById('lessonFilter');
        const rows = document.querySelectorAll('#pdfList tbody tr');

        if (!classFilter || !subjectFilter || !lessonFilter || rows.length === 0) {
            console.error("Required filter elements missing");
            return;
        }

        initializeSubjectFilter();
        initializeLessonFilter();

        classFilter.addEventListener('change', updateSubjectsAndLessons);
        subjectFilter.addEventListener('change', updateLessonsAndFilterNotes);
        lessonFilter.addEventListener('change', filterNotes);

        // ===== SCHOOL BANNER CAROUSEL =====
        let slideIndex = 0;
        const slides = document.querySelectorAll('.slides img');
        const dots = document.querySelectorAll('.dot');
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');

        if (slides.length > 0 && dots.length > 0) {
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

            next?.addEventListener('click', nextSlide);
            prev?.addEventListener('click', prevSlide);

            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    slideIndex = i;
                    showSlide(i);
                });
            });

            setInterval(nextSlide, 5000);
        }

    } catch (error) {
        console.error("Initialization error:", error);
    }
});

// ===== FILTER FUNCTIONS =====
function initializeSubjectFilter() {
    document.getElementById('subjectFilter').innerHTML =
        '<option value="all">All Subjects</option>';
}

function initializeLessonFilter() {
    document.getElementById('lessonFilter').innerHTML =
        '<option value="all">All Lessons</option>';
}

function updateSubjectsAndLessons() {
    const classValue = document.getElementById('classFilter').value.toLowerCase();
    const subjectFilter = document.getElementById('subjectFilter');

    initializeSubjectFilter();
    initializeLessonFilter();

    if (classValue !== 'all') {
        Object.keys(lessonsData[classValue] || {}).forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject.replace('_', ' ').toUpperCase();
            subjectFilter.appendChild(option);
        });
    }
    filterNotes();
}

function updateLessonsAndFilterNotes() {
    const classValue = document.getElementById('classFilter').value.toLowerCase();
    const subjectValue = document.getElementById('subjectFilter').value.toLowerCase();
    const lessonFilter = document.getElementById('lessonFilter');

    initializeLessonFilter();

    const lessons = lessonsData[classValue]?.[subjectValue];
    lessons?.forEach(lesson => {
        const option = document.createElement('option');
        option.value = lesson.toLowerCase();
        option.textContent = lesson;
        lessonFilter.appendChild(option);
    });

    filterNotes();
}

document.addEventListener("DOMContentLoaded", () => {
    initializeSubjectFilter();
    initializeLessonFilter();

    document.getElementById("classFilter").addEventListener("change", updateSubjectsAndLessons);
    document.getElementById("subjectFilter").addEventListener("change", updateLessonsAndFilterNotes);
    document.getElementById("lessonFilter").addEventListener("change", filterNotes);
});

function initializeSubjectFilter() {
    const subjectFilter = document.getElementById("subjectFilter");
    subjectFilter.innerHTML = `<option value="all">All Subjects</option>`;
}

function initializeLessonFilter() {
    const lessonFilter = document.getElementById("lessonFilter");
    lessonFilter.innerHTML = `<option value="all">All Lessons</option>`;
}

function updateSubjectsAndLessons() {
    const classValue = document.getElementById("classFilter").value;
    const subjectFilter = document.getElementById("subjectFilter");

    initializeSubjectFilter();
    initializeLessonFilter();

    if (classValue !== "all" && lessonsData[classValue]) {
        Object.keys(lessonsData[classValue]).forEach(subject => {
            const option = document.createElement("option");
            option.value = subject;
            option.textContent = subject.replace(/_/g, " ").toUpperCase();
            subjectFilter.appendChild(option);
        });
    }

    filterNotes();
}

function updateLessonsAndFilterNotes() {
    const classValue = document.getElementById("classFilter").value;
    const subjectValue = document.getElementById("subjectFilter").value;
    const lessonFilter = document.getElementById("lessonFilter");

    initializeLessonFilter();

    const lessons = lessonsData[classValue]?.[subjectValue];
    if (lessons) {
        lessons.forEach(lesson => {
            const option = document.createElement("option");
            option.value = lesson;
            option.textContent = lesson;
            lessonFilter.appendChild(option);
        });
    }

    filterNotes();
}

function filterNotes() {
    const classValue = document.getElementById("classFilter").value;
    const subjectValue = document.getElementById("subjectFilter").value;
    const lessonValue = document.getElementById("lessonFilter").value;

    document.querySelectorAll("#pdfList tbody tr").forEach(row => {
        const rowClass = row.dataset.class;
        const rowSubject = row.dataset.subject;
        const rowLesson = row.dataset.lesson;

        const classMatch = classValue === "all" || rowClass === classValue;
        const subjectMatch = subjectValue === "all" || rowSubject === subjectValue;
        const lessonMatch = lessonValue === "all" || rowLesson === lessonValue;

        row.style.display =
            classMatch && subjectMatch && lessonMatch ? "" : "none";
    });
}





// ===== MOBILE NAV =====
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.nav-toggle')
        ?.addEventListener('click', () =>
            document.querySelector('nav').classList.toggle('active')
        );
});

// ===== EMAILJS =====
(function () {
    emailjs.init("eFFnvBh7YKicvN14v");
})();

document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    emailjs.sendForm('service_k0zoxi9', 'template_rcmaf84', this)
        .then(() => alert('Message sent!'))
        .catch(() => alert('Failed to send message'));
});
