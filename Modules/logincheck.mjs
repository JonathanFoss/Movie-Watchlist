export function logincheck(){
    const check = localStorage.getItem("validatedUser");
    return !!check;
}