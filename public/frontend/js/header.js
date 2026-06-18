import { dropUser, getMe } from "./auth.js";

loadHeader();

async function loadHeader() {
    const container = document.getElementById("header-container");
    
    const res = await fetch("./header.html");
    const html = await res.text();
    
    container.innerHTML = html;

    
    const navGuest = document.getElementById("nav-guest");
    const navUser = document.getElementById("nav-user");
    const navAdmin = document.getElementById("nav-admin");
    const welcomeEl = document.getElementById("dashboardWelcomeText");
    
    // EventListener 
    document.getElementById("logo").addEventListener("click", () => {
        // console.log("button clicked");
        window.location.href = "/dashboard.html";
    });

    let welcomeText= null;

    
    const user  = await getMe();
    
    navGuest.style.display = "none";
    navUser.style.display = "none";
    navAdmin.style.display = "none";
    //IF NOT LOGGED IN
    if (!user) {
        
        navGuest.style.display= "block";    
        return;
    }
    
    if (user.role === "admin") {
        
        navAdmin.style.display = "block";
        welcomeText =`Admin: ${user.name+" "+ user.surname}`;
        
    } else if(user.role ==="student") {
        
        navUser.style.display = "block";
        welcomeText =`Welcome ${user.name+" "+ user.surname}`;
    }
    if(welcomeEl){
        welcomeEl.textContent=welcomeText;
    }
    
    // logout shared logic
    const logout = async () => {
        await fetch("/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        
        dropUser();
        
        // await loadHeader();
        location.href = "/dashboard.html";
    };
    document.getElementById("logoutBtn")?.addEventListener("click", logout);
    document.getElementById("logoutBtnAdmin")?.addEventListener("click", logout);
}


