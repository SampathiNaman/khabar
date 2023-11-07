import React, { useState } from "react";
import {Navbar, Nav, NavDropdown, Form, Button, Container} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'
import "./index.css";

const categories = [
  "General",
  "Business",
  "Entertainment",
  "Health",
  "Science",
  "Sports",
  "Technology",
];

const filters = ['publishedAt', 'popularity', 'relevancy'];

const AppNavbar = (props) => {
  const { activeCategory, setActiveCategory } = props.categoryState;
  const { activeFilter, setActiveFilter } = props.filterState;
  
  const {getNews} = props;

  const [searchTerm, setSearchTerm] = useState("");

  const getSearchResults = (e) => {
    e.preventDefault();
    getNews({searchTerm, filter: 'relevancy'});
  }

  const renderFormComponent = () => (
    <Form onSubmit={getSearchResults} className="d-flex align-items-center">
    <FontAwesomeIcon icon={faFilter} />
    <NavDropdown title="Sort By" id="basic-nav-dropdown">
      {
        filters.map((filter) => (
          <NavDropdown.Item key={filter} onClick={() => {setActiveFilter(filter)}}>{filter}</NavDropdown.Item>
        ))
      }
    </NavDropdown>
    <Form.Control
      type="search"
      placeholder="Search latest news"
      className="mx-2"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      aria-label="Search latest news"
    />
    <Button variant="dark" type="submit">
      <FontAwesomeIcon icon={faSearch} />
    </Button>
    
  </Form>
  )

  return (
    <Navbar expand="lg" sticky='top' className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#" className="brand-name">Khabar</Navbar.Brand>
        <div className="d-lg-none">{renderFormComponent()}</div>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto mx-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
             {
              categories.map((category) => (
                <Link
                  key={category}
                  to={`/${category}`}
                  className={`nav-link ${ activeCategory === category ? "active" : "" }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Link>
              ))
             }
          </Nav>
          <div className="d-none d-lg-block">{renderFormComponent()}</div>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
};

export default AppNavbar;