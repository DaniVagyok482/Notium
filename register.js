/*szem müködése*/
function togglePassword(inputId, icon){
    const pass = document.getElementById(inputId);

    if(pass.type === "password"){
        pass.type = "text";
        icon.classList.replace("fa-eye","fa-eye-slash");
    }else{
        pass.type = "password";
        icon.classList.replace("fa-eye-slash","fa-eye");
    }
}