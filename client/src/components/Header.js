import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <a className="nav-link" href="/auth/google">Login With Google</a>
            default:
                return <a className="nav-link" href="/api/logout">Logout</a>
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <Link to={this.props.auth ? "/games" : "/"} className="navbar-brand mr-auto" href="/">
                        Game Stash
                    </Link>
                    {this.renderContent()}
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);