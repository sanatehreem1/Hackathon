const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const clearButton = document.getElementById('clear-button');
const showButton = document.querySelector('load-entries')

showButton.addEventListener('click', showButton)

async function showAllEntries() {
    
    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('', options)

    if (response.ok) {
        
    }
}


async function searchEntries(query) {
    try {
        const response = await fetch(`/diary/${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const entries = await response.json();
        displayResults(entries);
    } catch (error) {
        console.error('Error fetching search results:', error);
        resultsContainer.innerHTML = '<p class="error">An error occurred while searching. Please try again.</p>';
    }
}

function displayResults(entries) {
    resultsContainer.innerHTML = '';
    if (entries.length === 0) {
        resultsContainer.innerHTML = '<p>No entries found.</p>';
        return;
    }

    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');

        const title = document.createElement('h3');
        title.textContent = entry.title || 'Untitled';

        const content = document.createElement('p');
        content.textContent = entry.content;

        const date = document.createElement('small');
        date.textContent = new Date(entry.entry_date).toLocaleDateString();

        entryDiv.appendChild(title);
        entryDiv.appendChild(content);
        entryDiv.appendChild(date);

        resultsContainer.appendChild(entryDiv);
    });
}

