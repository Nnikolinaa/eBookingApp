import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  handleLogout = () => {
    // Perform any necessary logout actions here
    // For example, clearing user data, updating state, etc.
    // Then navigate to the desired route
    this.props.handleLogout();
  };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Readible
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Books
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Add a Book
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="navbar-item">
                  <Link to="/signup" className="nav-link sign-up-link">
                    Sign Up
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/login" className="nav-link login-link">
                    Login
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="navbar-item">
                  <Link to="/my-books" className="nav-link my-books-link">
                    My Books
                  </Link>
                </li>
                <li className="nav-link-logout-link">
                  <Link
                    to="/"
                    className="nav-link"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
