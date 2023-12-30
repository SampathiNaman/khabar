import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import NewsDataError from "../NewsDataError";

import "./index.css";

const Home = (props) => {

  const location = useLocation();   
  const navigate = useNavigate();

  if (location.pathname === '/') {
    navigate('/General', {replace: true});
  }

  const [fetchedHeadlines, setFetchedHeadlines] = useState([]);
  const [fetchedNews, setFetchedNews] = useState([]);
  const [loadingHeadlines, setLoadingHeadlines] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState(location.pathname.slice(1));
  const [activeFilter, setActiveFilter] = useState("publishedAt");

  const headlinesApi = "https://newsapi.org/v2/top-headlines";
  const newsApi = "https://newsapi.org/v2/everything";
  const apiKey = '2bbf504b4b1c46ad9615c9c3618c8fb0';


  const getHeadlines = async (queryParams) => {
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
    getHeadlines({ category: activeCategory });
  }, [activeCategory]);

  useEffect(() => {
    getNews({ filter: activeFilter, pageSize: 100 });
  }, [activeFilter, activeCategory])


  return (

    <div className="home w-100">
    <AppNavbar
      categoryState={{ activeCategory, setActiveCategory }}
      filterState={{ activeFilter, setActiveFilter }}
      getNews={getNews}
    />

    {error ? <NewsDataError /> : <Outlet context={{fetchedHeadlines, fetchedNews, loadingHeadlines, loadingNews}} />}
  </div>
    
  );
};

export default Home;
