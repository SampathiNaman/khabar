import React, {useState} from 'react'
import {Carousel} from 'react-bootstrap'

import './index.css'

const HeadlinesCarousel = ({headlines}) => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  if (headlines.length === 0) return null;

  return (
       <Carousel activeIndex={index} onSelect={handleSelect}>
      {
        headlines.map((article, i) => (
          <Carousel.Item className="carousel-item" key={i}>
            <div className='row justify-content-center'>
            <img 
              className="carousel-img d-block col-11 col-md-5"
              src={article.urlToImage}
              alt={`slide ${i}`}
            />
          <div className='col-11 col-md-6 mt-4'>
              <h3 className='text-dark'>{article.title}</h3>
              <p className='text-dark pt-2'>{article.description}</p>
            </div>
            </div>
          </Carousel.Item>    
        ))
      }
  </Carousel>    
  )
}

export default HeadlinesCarousel

