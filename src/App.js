import React, { useState, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './Components/NewsCards/NewsCards'
import './App.css'
import { Typography  } from "@material-ui/core";

const APP = () => {
  const [alanInstance, setAlanInstance] = useState();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        key: process.env.REACT_APP_ALAN_KEY,
        onCommand: ({ command, articles, number }) => {
          if (command === 'newHeadlines') {
            setNewsArticles(articles);
            setActiveArticle(-1);
          } else if (command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          } else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];

            if (parsedNumber > articles.length) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          }
        },
      })
    )

  }, []);
  return (
    <div>
      <h1>The News Glory</h1>
      {newsArticles.length ? (
        <div>
        <Typography variant="h5" component="h2" color="secondary">Try saying:Open article number [4]</Typography>
        <Typography variant="h5" component="h2" color="secondary">Try saying:Go back</Typography>
        </div>
          
        ) : null}
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  )
}

export default APP
