const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.navlist');

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navList.classList.toggle("active");
});

document.querySelectorAll(".navlink").forEach(link => 
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navList.classList.remove("active");
    })
);
