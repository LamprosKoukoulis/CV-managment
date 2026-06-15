async function loadUsers() {
  try {
    const res = await fetch("/api/users");
    
    const users = await res.json();
    // console.log(users);

    const container = document.getElementById("output");

    container.innerHTML = users.map(u => `
      <div class="col-md-4">
        <div class="card p-3 mb-2">
          <h5>${u.email}</h5>
          <p>Role: ${u.role}</p>
          <small>ID: ${u.id}</small>
        </div>
      </div>
    `).join("");

  } catch (err) {
    console.error(err);
  }
}