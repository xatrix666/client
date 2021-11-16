import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useToken from '../App/useToken';
import './NavMenu.css';

function NavMenu()  {

  const { token } = useToken();

    return (
      <Navbar className="nav-style" fluid staticTop>
        <Nav id="basic-nav">
          <NavItem eventKey={2}>
            <span className="nav-font-color">
              <Link to="/asteroids" className={!token ? 'disabled-link' : ''}>Asteroids</Link>
              {/* <Link to={token ? '/asteroids' : '#'} /> */}
            </span>
          </NavItem>
          <NavItem eventKey={3}>
            <Link to="/">Login</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
}

export default NavMenu;