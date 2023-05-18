import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
      isDisabled: !e.target.value || !this.state.password,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
      isDisabled: !this.state.email || !e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post('http://localhost:5000/userprofiles/login', user)
      .then((res) => {
        console.log(res.data);

        // Call the onLogin prop to update the login status in the parent component
        this.props.onLogin();

        // Redirect to home page or show success message
        toast.success('Congrats! You have successfully logged in to Readible!', {
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        // Show error message
        toast.error('You entered an invalid email or password', {
          autoClose: 3000,
        });
      });

    this.setState({
      email: '',
      password: '',
    });
  };

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={this.state.isDisabled}>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
