(function() {
    var toggle = document.querySelector("#nav-menu");
    var nav = document.querySelector("#nav-bar");
    toggle.addEventListener("click", function(e) {
        e.preventDefault();
        nav.classList.contains("nav-menu-on") ? nav.classList.remove("nav-menu-on") : nav.classList.add("nav-menu-on");
    });
})();