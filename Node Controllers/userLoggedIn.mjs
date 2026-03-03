export function generateKey() {

    const keyOrigin = new Date();
    keyOrigin.toTimeString
    
    localStorage.setItem("validLoginUntil", keyOrigin);

    return

}