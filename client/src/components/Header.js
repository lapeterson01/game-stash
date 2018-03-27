import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            term: ""
        }
    }

    onInputChange = (event) => {
        this.setState({ term: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.fetchGames(this.state.term);
        this.setState({ term: "" });
    }

    onLinkClick = (event) => {
        event.preventDefault();

        window.location.reload();
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <a className="nav-link" href="/auth/google">Login With Google</a>
            default:
                return [
                    <a key="1" className="nav-link" href={`/profile/123`}>Profile</a>,
                    <a key="2" className="nav-link" href="/api/logout">Logout</a>
                ]
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <div className="row">
                        <a href={this.props.auth ? "/games" : "/"} className="navbar-brand">
                            Game Stash
                        </a>
                        <a href='/scores' className="nav-link mr-auto">
                            High Scores
                        </a>
                    </div>
                    <div className="row" onSubmit={this.onFormSubmit}>
                        <form className="input-group">
                            <input
                                placeholder="Search Games"
                                className="form-control"
                                value={this.state.term}
                                onChange={this.onInputChange}
                            />
                        </form>
                    </div>
                    <div className="row">
                        {this.renderContent()}
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(Header);