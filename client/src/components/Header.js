import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li><a className="nav-link" href="/auth/google">Login With Google</a></li>
            default:
                return [
                    <a className="nav-link" href={`/profile/123`}>Profile</a>,
                    <a className="nav-link" href="/api/logout">Logout</a>
                ]
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                        <Link to={this.props.auth ? "/games" : "/"} className="navbar-brand">
                            Game Stash
                        </Link>
                        <Link to='/scores' className="nav-link mr-auto">
                            High Scores
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