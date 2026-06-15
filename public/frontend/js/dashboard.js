import { getMe } from "./auth.js";

async function loadUser(){
    document.getElementById("cv").style.display = "none";
    
    const user =await getMe();
    if(!user){
        // window.location.href = "/login.html";
        return;
    }
    document.getElementById("cv").style.display = "block";
    if(user.role ==="admin"){
        document.getElementById("admin").style.display = "block";
    }
    // document.getElementById("authButtons").style.display = "none";
    // document.getElementById("userArea").style.display = "block";
    
    
    // document.getElementById("dashboardWelcomeText").textContent =`Welcome ${user.full_name}`;

}

loadUser();