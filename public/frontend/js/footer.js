export async function loadFooter() {
    const container = document.getElementById("footer-container");

    const res = await fetch("./footer.html");
    const html = await res.text();

    container.innerHTML = html;
}