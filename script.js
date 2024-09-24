const apiKey = 'YOUR_API_KEY'; // Replace with your NewsAPI key
const newsContainer = document.getElementById('news-container');
const searchButton = document.getElementById('search-button');
const searchBar = document.getElementById('search-bar');
const categoryButtons = document.querySelectorAll('.category-btn');

async function fetchNews(query = '', category = '') {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    if (query) {
        url += `&q=${query}`;
    } else if (category) {
        url += `&category=${category}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
}

function displayNews(articles) {
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        articleDiv.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || 'No description available'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(articleDiv);
    });
}

searchButton.addEventListener('click', () => {
    const query = searchBar.value;
    fetchNews(query);
});

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        fetchNews('', category);
    });
});

// Load top headlines on page load
window.onload = () => {
    fetchNews();
};
