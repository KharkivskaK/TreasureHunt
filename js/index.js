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

document.addEventListener('DOMContentLoaded', function() {
    var menuButton = document.getElementById('menuButton');
    var burgerMenu = document.getElementById('burgerMenu');

    menuButton.addEventListener('click', function() {
        // Toggle the display property between 'block' and 'none'
        if (burgerMenu.style.display === 'block') {
            burgerMenu.style.display = 'none';
        } else {
            burgerMenu.style.display = 'block';
        }
    });
});

function showModal() {
    document.getElementById('customModal').style.display = 'block';
}

function hideModal() {
    document.getElementById('customModal').style.display = 'none';
}

// Optional: Close the modal if the user clicks outside of it
window.onclick = function(event) {
    var modal = document.getElementById('customModal');
    if (event.target == modal) {
        hideModal();
    }

}

