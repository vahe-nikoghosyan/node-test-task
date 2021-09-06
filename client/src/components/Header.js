import logo from "../logo.svg";
import {Link, withRouter, useHistory} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {logoutUser} from "../store/actions/auth.action";

const Header = ({ auth, logoutUser }) => {
    const history = useHistory();

    if (auth && auth.isAuthenticated) {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" width="88" />
                <div className="app-menu">
                    <ul>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/my-products'}>My Products</Link>
                    </ul>
                    <div>
                        <p>{auth.user.full_name}</p>
                        <button onClick={() => logoutUser(history)}>Log Out</button>
                    </div>
                </div>
            </header>
        );
    }
    return null;
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(withRouter( Header ));
