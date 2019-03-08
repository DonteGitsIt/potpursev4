import React, { Component } from "react";
import AuthHelperMethods from '../components/AuthHelperMethods';
import './styles/login.css'
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Signup extends Component {

    Auth = new AuthHelperMethods();

    state = {
        username: "",
        password: ""
    }

    _handleChange = (e) => {

        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )

        console.log(this.state);
    }

    handleFormSubmit = (e) => {

        e.preventDefault();


        axios.post("/signup", {
            username: this.state.username,
            password: this.state.password
        })
            .then(data => {
                console.log(data);
                this.props.history.replace("/login");
            });




    }

    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <div className="box">
                        <div className="box-header">
                        <img id="logo" src="pp_logo.jpg" alt="logo"/>
                        </div>
                        <form className="box-form">
                            <input
                                className="form-item"
                                placeholder="Username"
                                name="username"
                                type="text"
                                onChange={this._handleChange}
                            />
                            <input
                                className="form-item"
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={this._handleChange}
                            />
                            <button className="form-submit" onClick={this.handleFormSubmit}>Sign-up</button>
                        </form>
                        <Link className="link" to="/login">Already have an account? <span className="link-signup">Login</span></Link>
                    </div>
                </div>

            </React.Fragment>
        );
    }

}