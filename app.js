// Get DOM elements
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const copyBtn = document.getElementById('copyBtn');
const exportBtn = document.getElementById('exportBtn');

// Set marked options
marked.setOptions({
    breaks: true,
    gfm: true
});

// Function to update preview
function updatePreview() {
    const markdownText = editor.value;
    preview.innerHTML = marked.parse(markdownText);
}

// Real-time update
editor.addEventListener('input', updatePreview);

// Copy functionality
copyBtn.addEventListener('click', () => {
    // Create a range and select the preview content
    const range = document.createRange();
    range.selectNode(preview);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    
    try {
        // Execute the copy command
        const successful = document.execCommand('copy');
        const message = successful ? 'Copied to clipboard!' : 'Unable to copy';
        alert(message);
    } catch (err) {
        alert('Error copying text: ', err);
    }
    
    // Deselect the text
    window.getSelection().removeAllRanges();
});

// Export PDF functionality
exportBtn.addEventListener('click', () => {
    const element = preview;
    const opt = {
        margin: 10,
        filename: 'markdown-export.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Generate the PDF
    html2pdf().set(opt).from(element).save();
});

// Initialize with some markdown
editor.value = `# Welcome to Markdown Editor

## This is a subheading

Here's some **bold** and *italic* text.

- List item 1
- List item 2
- List item 3

[Visit GitHub](https://github.com)

\`\`\`javascript
// Code block
function hello() {
    console.log("Hello, world!");
}
\`\`\`
`;

// Update preview on load
updatePreview();