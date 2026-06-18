import { getMe } from "./auth.js";

loadSite();

async function loadSite() {
    const container = document.getElementById("site-container");
    
    const res = await fetch("./header.html");
    const html = await res.text();
    
    container.innerHTML = html;

    
    const Guest = document.getElementById("site-guest");
    const User = document.getElementById("site-user");
    const Admin = document.getElementById("site-admin");
    

    const user  = await getMe();
    
    Guest.style.display = "none";
    User.style.display = "none";
    Admin.style.display = "none";
  

    if (!user) {
        
        Guest.style.display= "block";    
        return;
    }
    
    if (user.role === "admin") {
        
        Admin.style.display = "block";
        
        
    } else if(user.role ==="student") {
        
        User.style.display = "block";
        
    }

    
}


