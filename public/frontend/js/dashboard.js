import { getMe } from "./auth.js";

async function loadUser(){

    const user =await getMe();
    if(!user){
        window.location.href = "/login.html";
        return;
    }

    // document.getElementById("authButtons").style.display = "none";
    // document.getElementById("userArea").style.display = "block";
    
    document.getElementById("privateContent").style.display = "block";
    
    // document.getElementById("dashboardWelcomeText").textContent =`Welcome ${user.full_name}`;

}

loadUser();