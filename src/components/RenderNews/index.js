import React, {useState} from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading';
import HeadlinesCarousel from '../HeadlinesCarousel';
import NewsCards from '../NewsCards';
import './index.css';

const RenderNews = (props) => {

    const {fetchedHeadlines, fetchedNews, loadingHeadlines, loadingNews} = useOutletContext();

    const [page, setPage] = useState(1);

    const renderPagination = () => (
        <div className="d-flex justify-content-center pb-5">
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

    return (
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
        <h2 className="news-heading text-dark mt-5">Latest News</h2>
        <div className="d-flex justify-content-around mx-auto news-cards-container">
          <NewsCards news={fetchedNews.slice((page-1)*10, page*10)} />
        </div>
        {renderPagination()}
        </>
      )}
  
      </>
    )
}

export default RenderNews;