export function attachNavigation(element, hash) {
    if (!element) return;
    element.addEventListener("click", () => {
        window.location.hash = hash;
    });
}

export function redirect(hash){
    window.location.hash = hash;
}

export function back(){
    window.history.back();
}

export function refresh(){
    window.location.reload();
}