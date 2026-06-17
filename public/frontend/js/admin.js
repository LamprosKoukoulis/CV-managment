createAdminDashBoard();
const createUserForm = document.getElementById("createUserForm");
const craeteKeywordForm = document.getElementById("createKeyword");
const craeteSkillsForm = document.getElementById("createSkill");

createUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitForm({
        endpoint : "/auth/register",
        payload : {
            name: document.getElementById("name").value.trim(),
            surname: document.getElementById("surname").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value
        },
        messageDiv : document.getElementById("createUserMessage"),
        successMessage : "User created successfully",
        errorMessage : "Failed to create user"
    });
});

craeteKeywordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitForm({
        endpoint : "/keywords",
        payload : {
            keyword: document.getElementById("keyword").value.trim()
        },
        messageDiv : document.getElementById("createKeywordMessage"),
        successMessage : "Keyword created successfully",
        errorMessage : "Failed to create keyword"
    });
});

craeteSkillsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitForm({

        endpoint: "/skills",
        payload: {
            skill: document.getElementById("skill").value.trim()
        },
        messageDiv: document.getElementById("createSkillMessage"),
        successMessage: "Skill created successfully",
        errorMessage: "Failed to create skill"
    });
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

    container.innerHTML += `
        <div class="tag-icon">
        <span class="line"></span>
        <!-- <img class="icon" src="./images/progress.png"><br>  -->
        <span class="line"></span>
        </div>

        <h2>Create Keywords And Skills</h2>
        
        <form id="createKeyword">
            <input type="text" id="keyword" placeholder="Keyword" required>

            <button type="submit"> Add Keyword </button>
        </form>
        
        <div id="createKeywordMessage"></div>

        <form id="createSkill">
        <br>
        <form id="createKeyword">
            <input type="text" id="skill" placeholder="Skill" required>
            
            <button type="submit"> Add Skill </button>
        </form>

        <div id="createSkillMessage"></div>`
}

async function submitForm({ endpoint, payload, messageDiv, successMessage, errorMessage }) {
    try {
        const res = await fetch(endpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            messageDiv.textContent = data.error || errorMessage;
            return;
        }

        messageDiv.textContent = successMessage;

    } catch (err) {
        console.error(err);
        messageDiv.textContent = "Server error";
    }
}
