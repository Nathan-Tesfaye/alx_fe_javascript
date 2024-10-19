document.addEventListener('DOMContentLoaded', () => {
  const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
  const categoryFilter = document.getElementById('categoryFilter');
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');
  const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
  const serverApiUrl = 'https://jsonplaceholder.typicode.com/posts'; 
  const syncInterval = 60000; 
  
  categoryFilter.value = lastSelectedCategory;
  filterQuotes();

  const showRandomQuote = () => {
    const filteredQuotes = filterQuotesArray();
    if (filteredQuotes.length > 0) {
      const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
    } else {
      quoteDisplay.textContent = 'No quotes available for this category.';
    }
  };

  document.getElementById('newQuote').addEventListener('click', showRandomQuote);

  document.getElementById('addQuoteBtn').addEventListener('click', () => {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText && quoteCategory) {
      const newQuote = { text: quoteText, category: quoteCategory };
      quotes.push(newQuote);
      localStorage.setItem('quotes', JSON.stringify(quotes));

      postQuoteToServer(newQuote);

      populateCategories();

      newQuoteText.value = '';
      newQuoteCategory.value = '';

      showRandomQuote();
    } else {
      alert('Please fill out both the quote and category fields.');
    }
  });

  const populateCategories = () => {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  };

  populateCategories();

  const filterQuotes = () => {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('lastSelectedCategory', selectedCategory);
    showRandomQuote();
  };

  const filterQuotesArray = () => {
    const selectedCategory = categoryFilter.value;
    return selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  };

  document.getElementById('exportQuotesBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  window.importFromJsonFile = event => {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      localStorage.setItem('quotes', JSON.stringify(quotes));
      populateCategories();
      filterQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  };

  const fetchQuotesFromServer = async () => {
    try {
      const response = await fetch(serverApiUrl);
      const serverQuotes = await response.json();

      serverQuotes.forEach(serverQuote => {
        if (!quotes.some(localQuote => localQuote.text === serverQuote.text)) {
          quotes.push(serverQuote); // Add server quote if it doesn't exist locally
        }
      });

      localStorage.setItem('quotes', JSON.stringify(quotes));
      populateCategories();
      filterQuotes();
      alert('Quotes have been updated with the latest from the server.');
    } catch (error) {
      console.error('Error fetching quotes from the server:', error);
    }
  };

  const postQuoteToServer = async (newQuote) => {
    try {
      await fetch(serverApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuote)
      });
      console.log('New quote posted to server');
    } catch (error) {
      console.error('Error posting new quote to the server:', error);
    }
  };

  setInterval(fetchQuotesFromServer, syncInterval);

  showRandomQuote();
});
