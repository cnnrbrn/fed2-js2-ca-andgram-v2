import { onRegister } from "../../ui/auth/register";

const form = document.forms.register;
if(form) {
    form.addEventListener("submit", onRegister);
}