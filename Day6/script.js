const quoteEl  = document.getElementById("quote");
const authorEl = document.getElementById("author");
const newBtn   = document.getElementById("newBtn");
const copyBtn  = document.getElementById("copyBtn");
const tweetBtn = document.getElementById("tweetBtn");

async function fetchQuote() {
  try {
    const res = await fetch("https://dummyjson.com/quotes");
    const data = await res.json();

    const randomIndex = Math.floor(Math.random() * data.quotes.length);
    const randomQuote = data.quotes[randomIndex];

    showQuote(randomQuote.quote, randomQuote.author);
  } catch (err) {
    quoteEl.textContent = "Failed to fetch quote 😔";
    authorEl.textContent = "";
  }
}

function showQuote(text, author) {
  quoteEl.textContent = text;
  authorEl.textContent = `— ${author}`;
}

newBtn.addEventListener("click", fetchQuote);

copyBtn.addEventListener("click", async () => {
  const text = `${quoteEl.textContent} ${authorEl.textContent}`;
  await navigator.clipboard.writeText(text);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
});

fetchQuote();
