function startGame() {
    // Placeholder for start game function
    alert("Starting the game! (Placeholder function)");
}

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Adjust based on when you want the animation to start
    });

    const icons = document.querySelectorAll('.section-icon');
    icons.forEach(icon => {
        observer.observe(icon);
    });
});

function burgerMenu() {
    document.getElementById('menuButton').addEventListener('click', function () {
        var navLinks = document.getElementById('burgerMenu');
        if (navLinks.style.display === 'block') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'block';
        }
    });
}
burgerMenu();
