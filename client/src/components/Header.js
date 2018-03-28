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

        this.props.fetchGames(this.state.term)
            .then(this.setState({ term: "" }))
    }

    onLinkClick = (event) => {
        event.preventDefault();

        window.location.reload();
    }

    renderLeftContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <a href="/" className="navbar-brand">Game Stash</a>
            default:
                return [
                    <a href="/games" className="navbar-brand">Game Stash</a>,
                    <a href='/scores' className="nav-link mr-auto">High Scores</a>
                ]
        }
    }

    renderMidContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return;
            default:
                return (
                    <form className="input-group">
                        <input
                            placeholder="Search Games"
                            className="form-control"
                            value={this.state.term}
                            onChange={this.onInputChange}
                        />
                    </form>
                )
        }
    }

    renderRightContent() {
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
                        {this.renderLeftContent()}
                    </div>
                    <div className="row" onSubmit={this.onFormSubmit}>
                        {this.renderMidContent()}
                    </div>
                    <div className="row">
                        {this.renderRightContent()}
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