import React, { useState, useEffect } from "react";
import AppNavbar from "../AppNavbar";
import Loading from "../Loading";
import HeadlinesCarousel from "../HeadlinesCarousel";
import NewsCards from "../NewsCards";
import NewsDataError from "../NewsDataError";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

const Home = () => {
  const [fetchedHeadlines, setFetchedHeadlines] = useState([]);
  const [fetchedNews, setFetchedNews] = useState([]);
  const [loadingHeadlines, setLoadingHeadlines] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("General");
  const [activeFilter, setActiveFilter] = useState("publishedAt");
  const [page, setPage] = useState(1);

  const headlinesApi = "https://newsapi.org/v2/top-headlines";
  const newsApi = "https://newsapi.org/v2/everything";
  const apiKey = 'b98c99252ca04c4c970d5e616ad55066';

  const renderPagination = () => (
    <div className="d-flex justify-content-center">
      <button className="btn btn-dark" onClick={() => page>1 && setPage(page - 1)}>
      <FontAwesomeIcon icon={faAnglesLeft} />
      </button>  
      {[...Array(Math.ceil(fetchedNews.length/20))].map((_, i) => (
        <span key={i+1} onClick = {() => setPage(i+1)} className={`${i+1 === page && 'selected-page'} page-no`}>{i+1}</span>
      ))}
      <button className="btn btn-dark" onClick={() => page<fetchedNews.length/20 &&  setPage(page + 1)}>
      <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>  
  )

  const getHedlines = async (queryParams) => {
    const {
      category = activeCategory,
      language = "en",
      pageSize = 20,
    } = queryParams;

    setLoadingHeadlines(true);
    const response = await fetch(`${headlinesApi}?category=${category}&language=${language}&pageSize=${pageSize}&apiKey=${apiKey}`);
    if (response.ok) {
      const data = await response.json();
      const articles = data.articles.filter(
        (newsItem) => newsItem.title !== "[Removed]"
      );       
      setFetchedHeadlines(articles); 
    }
    else {
      setError(true);
    }
    setLoadingHeadlines(false);      
  }

  const getNews = async (queryParams) => {
    const {
      searchTerm = '',
      filter = activeFilter,
      language = "en",
      pageSize = 20,
    } = queryParams;

    setLoadingNews(true);
    const response = await fetch(`${newsApi}?q=${searchTerm ? `"${searchTerm}"` : activeCategory}&sortBy=${filter}&language=${language}&pageSize=${pageSize}&apiKey=${apiKey}`);
    
    if (response.ok) {
      const data = await response.json();
      const articles = data.articles.filter(
        (newsItem) => newsItem.title !== "[Removed]"
      );
      
      setFetchedNews(articles);    
    }
    else {
      setError(true);
    }
    setLoadingNews(false);
  };
  
  useEffect(() => {
    getHedlines({ category: activeCategory });
  }, [activeCategory]);

  useEffect(() => {
    getNews({ filter: activeFilter, pageSize: 100 });
  }, [activeFilter])

  const renderData = () => (
    <>
    {loadingHeadlines ? (
      <Loading />
    ) :
    (
      <>
        <h2 className="news-heading">Top Headlines</h2>
        <HeadlinesCarousel headlines={fetchedHeadlines} />
      </>
    )}

    {loadingNews ? (
      !loadingHeadlines && <Loading />
    ) :
    (
      <>          
      <h2 className="news-heading text-dark mt-4">Latest News</h2>
      <div className="d-flex justify-content-around mx-auto news-cards-container">
        <NewsCards news={fetchedNews.slice((page-1)*10, page*10)} />
      </div>
      {renderPagination()}
      </>
    )}

    </>
  )

  return (

    <div className="home w-100">
    <AppNavbar
      categoryState={{ activeCategory, setActiveCategory }}
      filterState={{ activeFilter, setActiveFilter }}
      getNews={getNews}
    />

    {error ? <NewsDataError /> : renderData()}

  </div>
    
  );
};

export default Home;
