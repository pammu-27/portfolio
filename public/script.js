document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.body.style.setProperty('--scroll-y', scrollY);
    document.body.classList.add('scrolling');
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
    }, 100);
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
});

document.addEventListener('mousemove', (event) => {
    const cursorFollow = document.getElementById('cursor-follow');
    cursorFollow.style.left = `${event.clientX}px`;
    cursorFollow.style.top = `${event.clientY}px`;
});

document.addEventListener('mousemove', function (e) {
    let cursor = document.getElementById('cursor-follow');
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

document.addEventListener('click', function () {
    let cursor = document.getElementById('cursor-follow');
    cursor.classList.add('click');
    setTimeout(() => {
        cursor.classList.remove('click');
    }, 500);
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Message sent successfully!');
        } else {
            throw new Error(data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});

document.getElementById('see-more-btn').addEventListener('click', function() {
    var moreServices = document.querySelectorAll('.more-service');
    moreServices.forEach(function(service) {
        service.style.display = 'block';
    });

    // Hide the See More button after clicking
    this.style.display = 'none';
});

