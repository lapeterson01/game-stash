import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';

class GameDetail extends Component {
    constructor(props) {
        super(props)

        this.props.fetchGame(this.props.match.params.gameID)

        this.state = {
            redirect: false
        }
    }

    onScoresClick = (event) => {
        event.preventDefault();

        this.props.fetchScores(this.props.game.gID)
            .then(() => this.props.fetchGame(this.props.game.gID))
            .then(() => this.setState({ redirect: true }));
    }

    render() {
        let game = this.props.game;
        const { redirect } = this.state;
        if (!game) {
            return (
                <div>
                    <h1 className="text-center">Loading...</h1>
                </div>
            )
        }
        if (redirect) {
            return <Redirect to='/scores' />
        }
        return (
            <div>
                <div className="row justify-content-between">
                    <button className="btn-link" onClick={this.onScoresClick}>See High Scores for {game.name}</button>
                    <a href="/games/new">Upload Your Game</a>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <h1>{game.name}</h1>
                    <iframe title={game.name} src={`/${game.fileName}`} width="100%" height="600" />
                </div>
            </div>
        )
    }
};

const mapStateToProps = ({ games }) => {
    return { game: games[0] };
}

export default connect(mapStateToProps, actions)(GameDetail);