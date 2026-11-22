
// ======================================
// 1. WEBSITE NAVIGATION
// ======================================

const views = document.querySelectorAll(".view");

function showView(id) {

    const selectedView = document.getElementById(id);

    if (!selectedView) return;

    views.forEach(view => {
        view.classList.remove("active");
        view.hidden = true;
    });

    selectedView.hidden = false;
    selectedView.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    history.replaceState(null, "", "#" + id);
}


// Connect all navigation buttons

document.addEventListener("click", event => {

    const homeButton = event.target.closest("[data-home]");
    const viewButton = event.target.closest("[data-view]");

    if (homeButton) {
        showView("home");
    }

    if (viewButton) {
        showView(viewButton.dataset.view);
    }

});


// Open a section directly using its URL hash

const initialView = location.hash.substring(1);

if (initialView && document.getElementById(initialView)) {
    showView(initialView);
}


// ======================================
// 2. PRESENTATION MODE
// ======================================

const presentationBtn =
    document.getElementById("presentationBtn");

const presentationOverlay =
    document.getElementById("presentationOverlay");

const closePresentation =
    document.getElementById("closePresentation");

const previousSlide =
    document.getElementById("previousSlide");

const nextSlide =
    document.getElementById("nextSlide");

const presentationTitle =
    document.getElementById("presentationTitle");

const presentationDescription =
    document.getElementById("presentationDescription");

const slideCounter =
    document.getElementById("slideCounter");


// Four sections for four presenters

const slides = [

    {
        title: "المقدمة والتجارة التقليدية",
        description:
            "يقدم المتحدث الأول مفهوم التجارة التقليدية، " +
            "وخصائصها، وتطبيقاتها اليومية، ومميزاتها وتحدياتها.",
        view: "traditional"
    },

    {
        title: "التجارة الإلكترونية",
        description:
            "يشرح المتحدث الثاني مفهوم التجارة الإلكترونية، " +
            "وعوامل تقدمها التقني، وتطبيقاتها الاقتصادية.",
        view: "electronic"
    },

    {
        title: "المميزات والتحديات",
        description:
            "يعرض المتحدث الثالث نقاط القوة والتحديات " +
            "لكلا النوعين، مع توضيح أثر كل منها في المستهلك.",
        view: "comparison"
    },

    {
        title: "المقارنة والاستنتاج",
        description:
            "يعرض المتحدث الرابع أوجه التشابه والاختلاف، " +
            "ثم يقدم الاستنتاجات والتوصيات لتحقيق التوازن.",
        view: "conclusion"
    }

];

let currentSlide = 0;


// Update presentation information

function updateSlide() {

    const slide = slides[currentSlide];

    presentationTitle.textContent = slide.title;

    presentationDescription.textContent =
        slide.description;

    slideCounter.textContent =
        `${currentSlide + 1} / ${slides.length}`;

    showView(slide.view);

    previousSlide.disabled = currentSlide === 0;

    nextSlide.textContent =
        currentSlide === slides.length - 1
            ? "إنهاء العرض"
            : "التالي";

}


// Open presentation

presentationBtn.addEventListener("click", () => {

    currentSlide = 0;

    presentationOverlay.hidden = false;

    updateSlide();

});


// Close presentation

closePresentation.addEventListener("click", () => {

    presentationOverlay.hidden = true;

});


// Previous slide

previousSlide.addEventListener("click", () => {

    if (currentSlide > 0) {

        currentSlide--;

        updateSlide();

    }

});


// Next slide

nextSlide.addEventListener("click", () => {

    if (currentSlide < slides.length - 1) {

        currentSlide++;

        updateSlide();

    } else {

        presentationOverlay.hidden = true;

        showView("home");

    }

});


// Keyboard navigation during presentation

document.addEventListener("keydown", event => {

    if (presentationOverlay.hidden) return;

    if (event.key === "ArrowLeft") {

        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlide();
        }

    }

    if (event.key === "ArrowRight") {

        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }

    }

    if (event.key === "Escape") {

        presentationOverlay.hidden = true;

    }

});


// ======================================
// 3. ACCESSIBILITY
// ======================================

// Allow keyboard users to navigate naturally

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("keydown", event => {

        if (event.key === "Enter" || event.key === " ") {
            // Native button behavior is preserved.
        }

    });

});
