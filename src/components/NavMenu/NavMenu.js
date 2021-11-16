import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UseToken from '../App/UseToken';
import './NavMenu.css';

function NavMenu() {
  const { token, setToken } = UseToken();

  const handlerLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  }

  return (
    <Navbar className="nav-style">
      <Nav id="basic-nav">
        <NavItem>
          <Link to="/asteroids" className={!token ? 'disabled-link' : 'enabled-link'}>Asteroids</Link>
        </NavItem>
        <NavItem >
          {!token ? <Link to="/">Login</Link> :
            <div className="container-column enable-link" onClick={handlerLogout}>
              {token.login}
              <p className="edit-margin-p">(Logout)</p>
            </div>}
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavMenu;