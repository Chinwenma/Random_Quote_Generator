import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import twitter from '../Assests/x.png';
import reload from '../Assests/reload.png';

const RandomQuote = () => {
  const [quote, setQuote] = useState({
    text: "Difficulties increase the nearer we get to the goal",
    author: "Johann Wolfgang von Goethe"
  });

  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    async function loadQuotes() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
    }

    const openTwitter = ()=> {
      window.open(`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author.split(',')[0]}`);
    }
    loadQuotes();
  }, []);

  const random = () => {
    const select = quotes[Math.floor(Math.random() * quotes.length)];
    // Handle the case where the author is "type.fit"
    const selectedAuthor = select.author === "type.fit" ? "Unknown" : select.author;
    setQuote({ text: select.text, author: selectedAuthor });
  };

  return (
    <div className='container'>
      <div className='quote'>
        <div>{quote.text}</div>
      </div>
      <div>
        <div className='line'></div>
        <div className='bottom'>
          <div className='author'>- {quote.author.split(',')[0]}</div>
          <div className='icons'>
            <img src={reload} onClick={() => {random()}} alt='' />
            <img src={twitter}onClick={() => {openTwitter()}} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
