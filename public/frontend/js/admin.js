createAdminDashBoard();
const form = document.getElementById("createUserForm");
const messageEl = document.getElementById("createUserMessage");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        name: document.getElementById("name").value.trim(),
        surname: document.getElementById("surname").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value
    };
    console.log(payload);

    try {
        const res = await fetch("/auth/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            messageEl.textContent = data.error || "Failed to create user";
            return;
        }

        messageEl.textContent = "User created successfully";

        // form.reset();

    } catch (err) {
        console.error(err);
        messageEl.textContent = "Server error";
    }
});

function createAdminDashBoard() {
    const container = document.getElementById("admin");
    container.innerHTML = `
        <div class="hero-icon">
        <span class="line"></span>
        <!-- <img class="icon" src="./images/progress.png"><br>  -->
        <span class="line"></span>
        </div>
        <h2>Create User</h2>
        <form id="createUserForm">
            <input type="text" id="name" placeholder="Name" required>

            <input type="text" id="surname" placeholder="Surname" required>

            <input type="email" id="email" placeholder="Email" required>

            <input type="password" id="password" placeholder="Password" required>

            <button type="submit">
                Create User
            </button>
        </form>

        <div id="createUserMessage"></div>`
}