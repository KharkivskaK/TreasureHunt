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
        this.classList.toggle('menu-active');
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
    if (event.target === modal) {
        hideModal();
    }
}

// Click functionality for anchor tags
document.querySelectorAll('nav a').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default anchor tag behavior
        // Implement your functionality here. For example, toggle an active class
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active'); // Remove active class from all links
        });
        this.classList.add('active'); // Add active class to the clicked link
        // Additional actions can be added here, such as redirecting to another page
    });
});


