import { getMe } from "./auth.js";

loadSite();

async function loadSite() {
    const container = document.getElementById("site-container");
    
    const res = await fetch("./header.html");
    const html = await res.text();
    
    container.innerHTML = html;

    
    const navGuest = document.getElementById("site-guest");
    const navUser = document.getElementById("site-user");
    const navAdmin = document.getElementById("site-admin");
    

    const user  = await getMe();
    
    navGuest.style.display = "none";
    navUser.style.display = "none";
    navAdmin.style.display = "none";
  

    if (!user) {
        
        navGuest.style.display= "block";    
        return;
    }
    
    if (user.role === "admin") {
        
        navAdmin.style.display = "block";
        
        
    } else if(user.role ==="student") {
        
        navUser.style.display = "block";
        
    }

    
}


