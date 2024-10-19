document.addEventListener('DOMContentLoaded', () => {

  const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", category: "Success" }
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');
  const addQuoteButton = document.getElementById('addQuoteButton');

  // Function to display a random quote
  const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<strong>Quote:</strong> "${randomQuote.text}"<br><strong>Category:</strong> ${randomQuote.category}`;
  };

  const addQuote = () => {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText === '' || quoteCategory === '') {
      alert('Please enter both a quote and a category.');
      return;
    }

    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);

    newQuoteText.value = '';
    newQuoteCategory.value = '';

    alert('New quote added successfully!');
  };

  newQuoteButton.addEventListener('click', showRandomQuote);
  addQuoteButton.addEventListener('click', addQuote);

  showRandomQuote();
});

