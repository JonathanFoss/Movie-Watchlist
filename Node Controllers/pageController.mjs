export function attachNavigation(element, hash) {
    if (!element) return;

    element.style.backgroundColor = "red";

    element.addEventListener("click", () => {
        window.location.hash = hash;
    });
}

export function redirect(hash){
    window.location.hash = hash;
}