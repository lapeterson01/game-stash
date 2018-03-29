import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Redirect } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            term: "",
            redirect: false
        }
    }

    onInputChange = (event) => {
        this.setState({ term: event.target.value });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        this.setState({ redirect: true })
        window.location.reload()
    }

    renderLeftContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <a href="/" className="navbar-brand">Gam<img src="https://cdn3.iconfinder.com/data/icons/leisure/100/pacman-512.png" alt="" style={{height:"14px", width:"auto"}} /> Stash</a>
            default:
                return [
                    <a key="1" href="/games" className="navbar-brand">Gam<img src="https://cdn3.iconfinder.com/data/icons/leisure/100/pacman-512.png" alt="" style={{height:"14px", width:"auto"}} /> Stash</a>,
                    <a key="2" href='/scores' className="nav-link mr-auto">High Scores</a>
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
                    <a key="1" className="nav-link" href={`/profile/${this.props.auth.uID}`}>Profile</a>,
                    <a key="2" className="nav-link" href="/api/logout">Logout</a>
                ]
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={`/games?search=${this.state.term}`} />
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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