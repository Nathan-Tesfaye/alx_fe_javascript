document.addEventListener('DOMContentLoaded', () => {
  let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", category: "Success" }
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');

  const saveQuotes = () => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  };

  const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<strong>Quote:</strong> "${randomQuote.text}"<br><strong>Category:</strong> ${randomQuote.category}`;
    
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
  };

  const createAddQuoteForm = () => {
    const formDiv = document.createElement('div');
    
    const inputText = document.createElement('input');
    inputText.setAttribute('id', 'newQuoteText');
    inputText.setAttribute('type', 'text');
    inputText.setAttribute('placeholder', 'Enter a new quote');
    
    const inputCategory = document.createElement('input');
    inputCategory.setAttribute('id', 'newQuoteCategory');
    inputCategory.setAttribute('type', 'text');
    inputCategory.setAttribute('placeholder', 'Enter quote category');
    
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    
    formDiv.appendChild(inputText);
    formDiv.appendChild(inputCategory);
    formDiv.appendChild(addButton);
    document.body.appendChild(formDiv);

    addButton.addEventListener('click', () => {
      const quoteText = inputText.value.trim();
      const quoteCategory = inputCategory.value.trim();

      if (quoteText === '' || quoteCategory === '') {
        alert('Please enter both a quote and a category.');
        return;
      }

      const newQuote = { text: quoteText, category: quoteCategory };
      quotes.push(newQuote);
      saveQuotes();  e

      inputText.value = '';
      inputCategory.value = '';

      alert('New quote added successfully!');
    });
  };

  newQuoteButton.addEventListener('click', showRandomQuote);

  const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
  if (lastViewedQuote) {
    quoteDisplay.innerHTML = `<strong>Quote:</strong> "${lastViewedQuote.text}"<br><strong>Category:</strong> ${lastViewedQuote.category}`;
  } else {
    showRandomQuote();
  }

  createAddQuoteForm();

  const exportQuotesButton = document.createElement('button');
  exportQuotesButton.textContent = 'Export Quotes as JSON';
  document.body.appendChild(exportQuotesButton);

  exportQuotesButton.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    downloadLink.click();
    URL.revokeObjectURL(url);
  });

  const importFileInput = document.createElement('input');
  importFileInput.setAttribute('type', 'file');
  importFileInput.setAttribute('id', 'importFile');
  importFileInput.setAttribute('accept', '.json');
  document.body.appendChild(importFileInput);

  importFileInput.addEventListener('change', (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();  
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  });
});
