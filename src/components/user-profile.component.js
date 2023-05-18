import React, { Component } from "react";
import axios from "axios";
import '../styles/UserProfile.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordMatchError: false,
      isDisabled: true

    };
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
      isDisabled: !e.target.value || !this.state.email || !this.state.password || !this.state.confirmPassword
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
      isDisabled: !this.state.name || !e.target.value || !this.state.password || !this.state.confirmPassword
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
      passwordMatchError: false,
      isDisabled: !this.state.name || !this.state.email || !e.target.value || !this.state.confirmPassword
    });
  };

  onChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
      passwordMatchError: false,
      isDisabled: !this.state.name || !this.state.email || !this.state.password || !e.target.value
    });
  };


  onSubmit = (e) => {

    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        passwordMatchError: true
      });
      return;
    }

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/userprofiles/add", user)
      .then((res) => console.log(res.data));
      toast.success("Congrats! You have successfully created your profile on Readible!", {
        autoClose: 3000
      });

    this.setState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordMatchError: false
    });
  };

  render() {
    return (
      <div className="container">
        <h3>Sign Up</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              placeholder="Enter your full name"
            />
          </div>
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
              placeholder="Create your password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.confirmPassword}
              onChange={this.onChangeConfirmPassword}
              placeholder="Confirm your password"
            />
          </div>
          {this.state.passwordMatchError &&
            <div className="alert alert-danger" role="alert">
              Passwords do not match!
            </div>
          }
          <div className="form-group">
            <button type="submit" className="btn btn-primary"  disabled={this.state.isDisabled}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
