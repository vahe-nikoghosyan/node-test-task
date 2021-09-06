
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link, withRouter, useHistory } from 'react-router-dom';
import { setCurrentUser, getAllProducts } from "../store/actions/auth.action";
import jwt_decode from "jwt-decode";

const Home = ({ auth, setCurrentUser, getAllProducts }) => {
    const history = useHistory();
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (auth && !auth.isAuthenticated && !token) {
            history.push('/login')
        }
        if (auth && !auth.isAuthenticated && token) {
            console.log('ss')
            getAllProducts();
            const decoded = jwt_decode(token);
            setCurrentUser(decoded);
        }
    }, [auth, history, getAllProducts]);

    console.log(auth, 'auth')
    const { products } = auth;
    return (
        <div className="home">
            {
                products && products.length ? (
                    <div className="products">
                        {
                            products.map(product => (
                                <div className="product">
                                    <p>{product.name}</p>
                                    <p>{product.description}</p>
                                    <div>
                                        <span>{product.category}</span>&nbsp;<span>${product.price}</span>
                                    </div>
                                    <hr/>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>No Data</div>
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { setCurrentUser, getAllProducts }
)(withRouter( Home ));
