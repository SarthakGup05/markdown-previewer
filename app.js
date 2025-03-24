document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("markdown-input");
    const preview = document.getElementById("markdown-preview");
    const themeToggle = document.getElementById("toggle-theme");
    const exportPdf = document.getElementById("export-pdf");
    const saveMd = document.getElementById("save-md");
    const counter = document.getElementById("counter");

    // Load saved draft
    if (localStorage.getItem("markdownContent")) {
        input.value = localStorage.getItem("markdownContent");
    }

    // Update Markdown Preview
    function updatePreview() {
        preview.innerHTML = marked.parse(input.value);
        localStorage.setItem("markdownContent", input.value); // Auto-save draft
        updateCounter();
    }

    input.addEventListener("input", updatePreview);
    updatePreview();

    // Dark Mode Toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    // Export as PDF
    exportPdf.addEventListener("click", function () {
        html2pdf().from(preview).save("markdown-preview.pdf");
    });

    // Save as .md File
    saveMd.addEventListener("click", function () {
        const blob = new Blob([input.value], { type: "text/markdown" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "document.md";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

   
    // Word and Character Counter
    function updateCounter() {
        const text = input.value.trim();
        const words = text.length > 0 ? text.split(/\s+/).length : 0;
        counter.textContent = `Words: ${words} | Characters: ${text.length}`;
    }
});
