import React, { Component } from 'react';
import './login.css';
import { BASEURL, callApi, setSession } from './lib';

class Login extends Component {
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
                confirmPassword: ""
            },
            errData: {},
            loginData: {
                email: "",
                password: ""
            }
        };
        this.signupResponse = this.signupResponse.bind(this);
        this.loginResponse = this.loginResponse.bind(this);
    }

    handleSignUpInput = (e) => {
        this.setState({
            signupData: {
                ...this.state.signupData,
                [e.target.name]: e.target.value
            }
        });
    }

    handleLoginInput = (e) => {
        this.setState({
            loginData: {
                ...this.state.loginData,
                [e.target.name]: e.target.value
            }
        });
    }

    validateSignup = () => {
        const { signupData } = this.state;
        const err = {};
        if (!signupData.firstName.trim()) err.firstName = "First Name is required";
        if (!signupData.lastName.trim()) err.lastName = "Last Name is required";
        if (!signupData.email.trim()) err.email = "Email ID is required";
        if (!signupData.phone.trim()) err.phone = "Phone Number is required";
        if (signupData.password.length < 8) err.password = "Password must have 8 chars";
        if (signupData.confirmPassword !== signupData.password) err.confirmPassword = "Password does not match";
        this.setState({ errData: err });
        return Object.keys(err).length === 0;
    }

    validateLogin = () => {
        const { loginData } = this.state;
        const err = {};
        if (!loginData.email.trim()) err.email = "Email ID is required";
        if (!loginData.password.trim()) err.password = "Password is required";
        this.setState({ errData: err });
        return Object.keys(err).length === 0;
    }

    registerUser = () => {
        if (!this.validateSignup()) return;
        const { signupData } = this.state;
        const data = JSON.stringify({
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            email: signupData.email,
            phone: signupData.phone,
            password: signupData.password
        });
        callApi("POST", BASEURL + 'signup', data, this.signupResponse);
    }

    signupResponse(res) {
        try {
            const rdata = JSON.parse(res);
            alert(rdata.message || rdata);
            this.setState({
                signupData: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: ""
                },
                signup: false,
                errData: {}
            });
        } catch {
            alert("Error during signup. Please try again.");
        }
    }

    login = () => {
        if (!this.validateLogin()) return;
        const { loginData } = this.state;
        const data = JSON.stringify({
            email: loginData.email,
            password: loginData.password
        });
        callApi("POST", BASEURL + 'login', data, this.loginResponse);
    }
    
    loginResponse(res) {
        try {
            const rdata = JSON.parse(res);
            if (typeof rdata === 'string' && rdata.includes('::')) {
                const parts = rdata.split("::");
                if (parts[0] === "300") {
                    const { loginData } = this.state;
                    setSession("sid", loginData.email, 1);
                    window.location.replace("/dashboard");
                } else alert(parts[1]);
            } else if (rdata.success) {
                const { loginData } = this.state;
                setSession("sid", loginData.email, 1);
                window.location.replace("/dashboard");
            } else {
                alert(rdata.message || "Login failed");
            }
            this.setState({
                loginData: { email: "", password: "" },
                errData: {}
            });
        } catch {
            if (typeof res === 'string' && res.includes('::')) {
                const parts = res.split("::");
                if (parts[0] === "300") {
                    const { loginData } = this.state;
                    setSession("sid", loginData.email, 1);
                    window.location.replace("/dashboard");
                } else alert(parts[1]);
            } else alert("Error during login. Please try again.");
        }
    }

    render() {
        const { signup, signupData, errData, loginData } = this.state;
        return (
            <div className='login'>
                <div className='leftpanel'>
                    <h1>Welcome Back!</h1>
                    <p>Access and manage your task efficiently</p>
                </div>
                <div className='rightpanel'>
                    <div className='card'>
                        <h2>Login</h2>
                        <input 
                            type='email' 
                            placeholder='Email' 
                            name='email' 
                            value={loginData.email} 
                            onChange={this.handleLoginInput}
                            style={errData.email ? { border: "1px solid red" } : {}}
                        />
                        <input 
                            type='password' 
                            placeholder='Password' 
                            name='password' 
                            value={loginData.password} 
                            onChange={this.handleLoginInput}
                            style={errData.password ? { border: "1px solid red" } : {}}
                        />
                        <button onClick={this.login}>Login</button>
                        <p>
                            Don't have an account? 
                            <span onClick={() => this.setState({ signup: true, errData: {} })}>
                                Sign Up
                            </span>
                        </p>
                    </div>
                </div>
                {signup && 
                    <div className='overlay' onClick={() => this.setState({ signup: false, errData: {} })}>
                        <div className='signup' onClick={(e) => e.stopPropagation()}>
                            <button className='close' onClick={() => this.setState({ signup: false, errData: {} })}>×</button>
                            <h2>Create an account</h2>
                            <label>First Name *</label>
                            <input 
                                type='text' 
                                placeholder='First Name' 
                                name='firstName' 
                                value={signupData.firstName} 
                                onChange={this.handleSignUpInput}
                                autoComplete='given-name'
                                style={errData.firstName ? { border: "1px solid red" } : {}}
                            />
                            <label>Last Name *</label>
                            <input 
                                type='text' 
                                placeholder='Last Name' 
                                name='lastName' 
                                value={signupData.lastName} 
                                onChange={this.handleSignUpInput}
                                autoComplete='family-name'
                                style={errData.lastName ? { border: "1px solid red" } : {}}
                            />
                            <label>Email ID *</label>
                            <input 
                                type='email' 
                                placeholder='Email ID' 
                                name='email' 
                                value={signupData.email} 
                                onChange={this.handleSignUpInput}
                                autoComplete='email'
                                style={errData.email ? { border: "1px solid red" } : {}}
                            />
                            <label>Phone Number *</label>
                            <input 
                                type='tel' 
                                placeholder='Phone Number' 
                                name='phone' 
                                value={signupData.phone} 
                                onChange={this.handleSignUpInput}
                                autoComplete='tel'
                                style={errData.phone ? { border: "1px solid red" } : {}}
                            />
                            <label>Password *</label>
                            <input 
                                type='password' 
                                placeholder='Password' 
                                name='password' 
                                value={signupData.password} 
                                onChange={this.handleSignUpInput}
                                autoComplete='new-password'
                                style={errData.password ? { border: "1px solid red" } : {}}
                            />
                            <label>Confirm Password *</label>
                            <input 
                                type='password' 
                                placeholder='Confirm Password' 
                                name='confirmPassword' 
                                value={signupData.confirmPassword} 
                                onChange={this.handleSignUpInput}
                                autoComplete='new-password'
                                style={errData.confirmPassword ? { border: "1px solid red" } : {}}
                            />
                            <button className='regButton' onClick={this.registerUser}>Register</button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Login;
