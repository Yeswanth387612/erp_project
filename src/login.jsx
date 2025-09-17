import React, { Component } from 'react'
import './css/login.css'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      signup: false,
      signupData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      errData: {}
    };
  }

  toggleSignup = () => {
    this.setState({ signup: !this.state.signup });
  };

  handleSignUpInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      signupData: {
        ...this.state.signupData,
        [name]: value
      }
    });
  };

  registerUser = () => {
    // TODO: validation + API call
    console.log("Registering:", this.state.signupData);
  };

  render() {
    const { signup, signupData, errData } = this.state;

    return (
      <div className='login'>
        <div className='leftpanel'>
          <h2>Welcome to S201 ERP Project</h2>
          <p>Check all the ERP options here</p>
        </div>

        <div className='rightpanel'>
          <div className='card'>
            <input type='text' placeholder='Enter the email' />
            <input type='password' placeholder='Enter the Password' />

            <button onClick={this.toggleSignup}>
              {signup ? 'Sign Up' : 'Login'}
            </button>

            <p>
              {signup
                ? "Already have an account? "
                : "Don't have an account? "}
              <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={this.toggleSignup}
              >
                {signup ? 'Login' : 'Sign Up'}
              </span>
            </p>
          </div>
        </div>

        {/* ===== Overlay Signup Modal ===== */}
        {signup && (
          <div className='overlay'>
            <div className='signup'>
              <button className='close' onClick={() => this.setState({ signup: false })}>X</button>
              <h2>Create an account</h2>

              <label>First Name *</label>
              <input
                type='text'
                placeholder='First Name'
                name='firstName'
                value={signupData.firstName}
                onChange={this.handleSignUpInput}
                autoComplete='off'
                style={!errData.firstName ? {} : { border: "1px solid red" }}
              />

              <label>Last Name *</label>
              <input
                type='text'
                placeholder='Last Name'
                name='lastName'
                value={signupData.lastName}
                onChange={this.handleSignUpInput}
                autoComplete='off'
                style={!errData.lastName ? {} : { border: "1px solid red" }}
              />

              <label>Email ID *</label>
              <input
                type='text'
                placeholder='Email ID'
                name='email'
                value={signupData.email}
                onChange={this.handleSignUpInput}
                autoComplete='off'
                style={!errData.email ? {} : { border: "1px solid red" }}
              />

              <label>Phone Number *</label>
              <input
                type='text'
                placeholder='Phone Number'
                name='phone'
                value={signupData.phone}
                onChange={this.handleSignUpInput}
                autoComplete='off'
                style={!errData.phone ? {} : { border: "1px solid red" }}
              />

              <label>Password *</label>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={signupData.password}
                onChange={this.handleSignUpInput}
                style={!errData.password ? {} : { border: "1px solid red" }}
              />

              <label>Confirm Password *</label>
              <input
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={signupData.confirmPassword}
                onChange={this.handleSignUpInput}
                style={!errData.confirmPassword ? {} : { border: "1px solid red" }}
              />

              <button className='regButton' onClick={this.registerUser}>Register</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
