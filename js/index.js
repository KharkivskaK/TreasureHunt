// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  const icons = document.querySelectorAll(".section-icon");
  icons.forEach((icon) => {
    observer.observe(icon);
  });
});

// Another event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  var menuBt = document.getElementById("menuBt");
  var burgerMenu = document.getElementById("burgerMenu");

  menuBt.addEventListener("click", function () {
    // Toggle the display property between 'block' and 'none'
    if (burgerMenu.style.display === "block") {
      burgerMenu.style.display = "none";
    } else {
      burgerMenu.style.display = "block";
    }
    this.classList.toggle("menu-active");
  });
});

// Function to show a modal dialog
function showModal() {
  document.getElementById("customModal").style.display = "block";
}

// Function to hide the modal dialog
function hideModal() {
  document.getElementById("customModal").style.display = "none";
}

// Global click event listener to close the modal dialog when clicking outside of it
window.onclick = function (event) {
  var modal = document.getElementById("customModal");
  if (event.target === modal) {
    hideModal();
  }
};

// Click functionality for anchor tags
document.querySelectorAll("nav a").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelectorAll("nav a").forEach((link) => {
      link.classList.remove("active");
    });
    this.classList.add("active");
  });
});
