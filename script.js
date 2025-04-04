document.addEventListener("DOMContentLoaded", function () {
    // Navbar Hover Effect
    let menuItems = document.querySelectorAll(".menu-item a");

    menuItems.forEach(item => {
        item.addEventListener("mouseover", function () {
            this.style.color = "purple";
            this.style.transform = "scale(1.1)";
        });

        item.addEventListener("mouseout", function () {
            this.style.color = "black";
            this.style.transform = "scale(1)";
        });
    });

    // Subscribe Button Click Event
    let subscribeButton = document.querySelector(".srch button");
    let emailInput = document.querySelector(".srch input");

    subscribeButton.addEventListener("click", function () {
        let emailValue = emailInput.value.trim();

        if (emailValue === "") {
            alert("Please enter your email before subscribing.");
        } else if (!validateEmail(emailValue)) {
            alert("Please enter a valid email address.");
        } else {
            alert(`Thank you for subscribing, ${emailValue}!`);
            emailInput.value = ""; // Clears input field after subscribing
        }
    });

    // Booking Button Click Event
    let bookButtons = document.querySelectorAll(".btn button");

    bookButtons.forEach(button => {
        button.addEventListener("click", function () {
            alert("Booking confirmed! Thank you for choosing Travel School.");
        });
    });

    // Function to validate email format
    function validateEmail(email) {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
