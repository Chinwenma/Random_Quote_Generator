
import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import twitter from '../Assests/x.png';
import reload from '../Assests/reload.png';

const RandomQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "Difficulties increase the nearer we get to the goal",
    author: "Johann Wolfgang von Goethe"
  });

  useEffect(() => {
    async function loadQuotes() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
    }

    loadQuotes();
  }, []);

  const random = () => {
    const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(selectedQuote);
  };

  return (
    <div className='container'>
      <div className='quote'>
        <div>{quote.text}</div>
      </div>
      <div>
        <div className='line'></div>
        <div className='bottom'>
          <div className='author'>{quote.author ? `-${quote.author}` : 'unknown'}</div>
          <div className='icons'>
            <img src={reload} onClick={random} alt='' />
            <img src={twitter} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;

