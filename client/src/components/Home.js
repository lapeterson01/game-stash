import React, { Component } from 'react';

class Home extends Component{
    render() {
        return (
            <div className="jumbotron text-center">
                <h1 className="display-4">Welcome to Game Stash!</h1>
                <p className="lead">Login to play a plethora of games with friends</p>
                <hr className="my-4" />
                <p className="lead text-center">
                    <a className="login-button btn btn-lg btn-primary" href="/auth/google" role="button">Login With Google</a>
                </p>
            </div>
        )
    }
};

export default Home;