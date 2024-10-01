function compareCode() {
    // Get the code from both pre elements
    const code1 = document.getElementById('code1').innerText.split('\n');
    const code2 = document.getElementById('code2').innerText.split('\n');

    const maxLines = Math.max(code1.length, code2.length);
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';  // Clear previous results

    let updatedCode1 = '';
    let updatedCode2 = '';

    // Loop through all the lines and compare them
    for (let i = 0; i < maxLines; i++) {
        const line1 = code1[i] || ''; // Handle cases where one code is shorter
        const line2 = code2[i] || '';

        // If lines are different, highlight the exact character differences
        if (line1 !== line2) {
            const highlightedLine1 = highlightDifferences(line1, line2);
            const highlightedLine2 = highlightDifferences(line2, line1);

            updatedCode1 += `${highlightedLine1}\n`;
            updatedCode2 += `${highlightedLine2}\n`;

            const lineResult = document.createElement('div');
            lineResult.innerHTML = `<span class="highlight">Line ${i + 1}:</span><br>
                                    <span>Code 1: ${highlightedLine1}</span><br>
                                    <span>Code 2: ${highlightedLine2}</span><br><br>`;
            resultContainer.appendChild(lineResult);
        } else {
            updatedCode1 += `${escapeHtml(line1)}\n`;
            updatedCode2 += `${escapeHtml(line2)}\n`;
        }
    }

    // Update code blocks with highlighted differences
    document.getElementById('code1').innerHTML = updatedCode1;
    document.getElementById('code2').innerHTML = updatedCode2;
}

// Highlight character differences between two strings
function highlightDifferences(str1, str2) {
    let result = '';
    for (let i = 0; i < Math.max(str1.length, str2.length); i++) {
        const char1 = str1[i] || '';
        const char2 = str2[i] || '';
        
        // Highlight character if it's different
        if (char1 !== char2) {
            result += `<span class="highlight">${escapeHtml(char1)}</span>`;
        } else {
            result += escapeHtml(char1);
        }
    }
    return result;
}

// Escape HTML characters for safe display in contenteditable
function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"']/g, function(match) {
        switch (match) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#039;';
        }
    });
}
