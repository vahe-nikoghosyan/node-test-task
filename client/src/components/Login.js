
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link, withRouter, useHistory } from 'react-router-dom';
import { loginUser } from "../store/actions/auth.action";

const Login = ({ auth, loginUser }) => {
    const history = useHistory();

    useEffect(() => {
        if (auth && auth.isAuthenticated) {
            history.push('/');
        }
    }, [auth]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const { value: email } = event.target.email;
        const { value: password } = event.target.password;

        // dispatch action
        loginUser({ email, password });
    }

    const { errors, user } = auth;
    console.log(auth, 'sss')
    return (
        <section className='login-section'>
            <form onSubmit={handleSubmit}>
                {
                    errors &&
                    <div className="error-message">{errors}</div>
                }
                <label>
                    <input type='text' name='email' />
                </label>
                <label>
                    <input type='password' name='password' />
                </label>
                <Link to={'/register'}>sign up</Link>
                <button>sign in</button>
            </form>
        </section>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter( Login ));
