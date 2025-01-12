// DOM Elements
const promptSelector = document.getElementById('promptSelector');
const backButton = document.getElementById('backButton');
const sections = {
    writing: document.getElementById('writingSection'),
    art: document.getElementById('artSection'),
    coding: document.getElementById('codingSection'),
    music: document.getElementById('musicSection')
};

// Event Listeners for Prompt Type Selection
document.querySelectorAll('.prompt-card').forEach(card => {
    card.addEventListener('click', () => {
        const type = card.dataset.type;
        showSection(type);
    });
});

// Back Button Event Listener
backButton.addEventListener('click', showPromptSelector);

// Show/Hide Section Functions
function showSection(type) {
    promptSelector.style.display = 'none';
    backButton.style.display = 'block';
    Object.values(sections).forEach(section => section.style.display = 'none');
    sections[type].style.display = 'block';
}

function showPromptSelector() {
    Object.values(sections).forEach(section => section.style.display = 'none');
    promptSelector.style.display = 'block';
    backButton.style.display = 'none';
}

// Word count helper function
function countWords(str) {
    return str.trim().split(/\s+/).length;
}

// Update word count in the UI
function updateWordCount(text, elementId) {
    const wordCount = countWords(text);
    const countElement = document.getElementById(elementId);
    countElement.textContent = `Word count: ${wordCount}/45`;

    if (wordCount === 45) {
        countElement.className = 'word-count success';
    } else {
        countElement.className = 'word-count warning';
    }
}

// Copy text functionality
function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Prompt copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text:', err);
        alert('Failed to copy text. Please try again.');
    });
}

// Generate Writing Prompt
document.getElementById('writingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const character = document.getElementById('character').value.trim();
    const setting = document.getElementById('setting').value.trim();
    const conflict = document.getElementById('conflict').value.trim();
    const mode = document.getElementById('mode').value.trim();

    if (!character && !setting && !conflict && !mode) {
        alert('Please provide at least one input to generate a prompt!');
        return;
    }

    let promptIntro;
    switch (mode.toLowerCase()) {
        case 'dramatic':
            promptIntro = 'Picture a gripping tale full of suspense and intensity:';
            break;
        case 'sad':
            promptIntro = 'Imagine a heartbreaking story filled with sorrow and loss:';
            break;
        case 'romance':
            promptIntro = 'Visualize a tender love story blooming against all odds:';
            break;
        case 'adventure':
            promptIntro = 'Embark on an epic journey packed with thrills and excitement:';
            break;
        case 'mystery':
            promptIntro = 'Dive into an enigmatic tale of secrets and revelations:';
            break;
        default:
            promptIntro = 'Imagine an intriguing concept:';
    }

    let promptParts = [];
    if (character) promptParts.push(`a character named "${character}"`);
    if (setting) promptParts.push(`in a setting like "${setting}"`);
    if (conflict) promptParts.push(`facing the challenge of "${conflict}"`);

    const prompt = `${promptIntro} ${promptParts.join(', ')}. Develop a story based on this idea.`;

    document.getElementById('writingOutput').textContent = prompt;
    updateWordCount(prompt, 'writingWordCount');
});

// Generate Art Prompt
document.getElementById('artForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const subject = document.getElementById('subject').value.trim();
    const style = document.getElementById('style').value.trim();
    const mood = document.getElementById('mood').value.trim();
    const details = document.getElementById('details').value.trim();

    if (!subject && !style && !mood && !details) {
        alert('Please provide at least one input to generate a prompt!');
        return;
    }

    let prompt = `Create an artistic masterpiece featuring ${subject}`;
    if (style) prompt += ` in the style of ${style}`;
    if (mood) prompt += `, capturing a ${mood} atmosphere`;
    if (details) prompt += `, with details like ${details}`;
    prompt += '.';

    document.getElementById('artOutput').textContent = prompt;
    updateWordCount(prompt, 'artWordCount');
});

// Generate Coding Prompt
document.getElementById('codingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const language = document.getElementById('language').value.trim();
    const difficulty = document.getElementById('difficulty').value.trim();
    const projectType = document.getElementById('projectType').value.trim();
    const requirements = document.getElementById('requirements').value.trim();

    if (!language && !difficulty && !projectType && !requirements) {
        alert('Please provide at least one input to generate a prompt!');
        return;
    }

    let promptIntro;
    switch (difficulty.toLowerCase()) {
        case 'beginner':
            promptIntro = 'Create a beginner-friendly project';
            break;
        case 'intermediate':
            promptIntro = 'Develop an intermediate-level application';
            break;
        case 'advanced':
            promptIntro = 'Build an advanced system';
            break;
        default:
            promptIntro = 'Create a coding project';
    }

    let prompt = `${promptIntro} using ${language}`;
    if (projectType) prompt += ` focusing on ${projectType}`;
    if (requirements) prompt += `. Include the following features: ${requirements}`;
    prompt += '. The project should demonstrate best practices and include proper documentation.';

    document.getElementById('codingOutput').textContent = prompt;
    updateWordCount(prompt, 'codingWordCount');
});

// Generate Music Prompt
document.getElementById('musicForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const genre = document.getElementById('genre').value.trim();
    const instruments = document.getElementById('instruments').value.trim();
    const tempo = document.getElementById('tempo').value.trim();
    const inspiration = document.getElementById('inspiration').value.trim();

    if (!genre && !instruments && !tempo && !inspiration) {
        alert('Please provide at least one input to generate a prompt!');
        return;
    }

    let promptIntro;
    switch (tempo.toLowerCase()) {
        case 'slow':
            promptIntro = 'Compose a soulful piece';
            break;
        case 'medium':
            promptIntro = 'Create a groove-based composition';
            break;
        case 'fast':
            promptIntro = 'Write an energetic track';
            break;
        default:
            promptIntro = 'Compose a piece';
    }

    let prompt = `${promptIntro} in the ${genre} style`;
    if (instruments) prompt += `, featuring ${instruments}`;
    if (inspiration) prompt += `. Draw inspiration from ${inspiration}`;
    prompt += '. Focus on creating a cohesive and emotionally resonant piece.';

    document.getElementById('musicOutput').textContent = prompt;
    updateWordCount(prompt, 'musicWordCount');
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    showPromptSelector();
    backButton.style.display = 'none';
});