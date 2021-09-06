
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link, withRouter, useHistory } from 'react-router-dom';
import { registerUser } from "../store/actions/auth.action";

const Register = ({ auth, registerUser }) => {
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('test')
        const { value: full_name } = event.target.password;
        const { value: email } = event.target.email;
        const { value: password } = event.target.password;

        // dispatch action
        registerUser({ full_name, email, password }, history);
    }

    const { errors } = auth;
    console.log(errors, 'errors')
    return (
        <section className='register-section'>
            <form onSubmit={handleSubmit}>
                {
                    errors &&
                    <div className="error-message">{errors}</div>

                }
                <label>
                    <input type='text' name='full_name' placeholder="Full name" />
                </label>
                <label>
                    <input type='text' name='email' placeholder="Email" />
                </label>
                <label>
                    <input type='password' name='password' placeholder="Password ***" />
                </label>
                <Link to={'/login'}>already have an account, Sign in</Link>
                <button>submit</button>
            </form>
        </section>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter( Register ));
