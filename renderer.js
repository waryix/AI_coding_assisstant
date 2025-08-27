// renderer.js
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const problemInput = document.getElementById('problem-input');
    const solutionOutput = document.getElementById('solution-output');
    const closeButton = document.getElementById('close-btn');
    const opacitySlider = document.getElementById('opacity-slider');
    const langButtons = document.querySelectorAll('.lang-btn');

    let currentLanguage = 'python';
    let apiKey = null; // API key will be received from the main process

    // Receive the API key from the main process
    window.electronAPI.receive('api-key', (key) => {
        apiKey = key;
    });

    closeButton.addEventListener('click', () => {
        window.electronAPI.closeApp();
    });

    opacitySlider.addEventListener('input', (event) => {
        window.electronAPI.setOpacity(event.target.value);
    });

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLanguage = button.dataset.lang;
            solutionOutput.className = `language-${currentLanguage}`;
        });
    });

    generateButton.addEventListener('click', async () => {
        const problem = problemInput.value;
        if (!problem.trim()) {
            solutionOutput.textContent = "Please enter a problem description.";
            Prism.highlightElement(solutionOutput);
            return;
        }

        if (!apiKey) {
            solutionOutput.textContent = "Error: API key not received. Check your .env file.";
            Prism.highlightElement(solutionOutput);
            return;
        }

        generateButton.disabled = true;
        generateButton.textContent = "Generating...";
        solutionOutput.textContent = "Thinking...";
        Prism.highlightElement(solutionOutput);

        try {
            const solution = await getAISolution(problem, currentLanguage);
            solutionOutput.textContent = solution.trim();
            Prism.highlightElement(solutionOutput);
        } catch (error) {
            console.error("Error fetching AI solution:", error);
            solutionOutput.textContent = `Error: ${error.message}`;
            Prism.highlightElement(solutionOutput);
        } finally {
            generateButton.disabled = false;
            generateButton.textContent = "Generate";
        }
    });

    async function getAISolution(problemDescription, language) {
        const systemPrompt = `You are an expert coding assistant. Given a coding problem, provide only the most optimal ${language} code solution. Do not include any explanatory text, comments, or markdown formatting. Your entire response should be only the raw code.`;
        
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{ parts: [{ text: problemDescription }] }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error(`API request failed with status 403 (Forbidden). Check if your API key is correct and the API is enabled.`);
            }
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        return result.candidates[0].content.parts[0].text;
    }
});
