import React from 'react'
import Card from 'react-bootstrap/Card'

import './index.css'

const NewsCards = ({news}) => {
  return (
    <>
    {news.map((item, index) => (
      <Card style={{ width: '18rem' }} key={index}>
        <Card.Img variant="top" src={item.urlToImage} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>
            {item.description}
          </Card.Text>
          <Card.Link href={item.url}>Read More</Card.Link>
        </Card.Body>
      </Card>
    ))}
  </>)
}
export default NewsCards