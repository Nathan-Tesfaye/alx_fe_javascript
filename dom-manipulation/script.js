document.addEventListener('DOMContentLoaded', () => {

  const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", category: "Success" }
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');

  const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<strong>Quote:</strong> "${randomQuote.text}"<br><strong>Category:</strong> ${randomQuote.category}`;
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

      inputText.value = '';
      inputCategory.value = '';

      alert('New quote added successfully!');
    });
  };

  // Event listener for displaying a random quote
  newQuoteButton.addEventListener('click', showRandomQuote);

  // Initially show a random quote when the page loads
  showRandomQuote();

  // Create and display the form to add new quotes
  createAddQuoteForm();
});
