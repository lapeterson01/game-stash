import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';

class GameDetail extends Component {
    constructor(props) {
        super(props)

        this.props.fetchGame(this.props.match.params.gameID);

        this.state = {
            redirect: false
        }
    }

    updateScore = () => {
        if (localStorage.length) {
            this.props.postScore(this.props.game[0].gID, JSON.parse(localStorage.getItem('score')));
            
            localStorage.clear();
        }
    }
     

    onScoresClick = () => {
        this.setState({ redirect: true });
    }

    render() {
        if (!this.props.game) {
            return (
                <div>
                    <h1 className="text-center">Loading...</h1>
                </div>
            )
        }
        let game = this.props.game[0];
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={`/scores?game=${this.props.match.params.gameID}`} />
        }
        return (
            <div style={{padding:'20px'}}>
                <div className="row justify-content-between">
                    <a href="/games/new">Upload Your Game</a>
                    <button className="btn-link" onClick={this.onScoresClick}>See High Scores for {game.name}</button>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <h1>{game.name}</h1>
                    <iframe title={game.name} src={`/${game.fileName}`} onLoad={this.updateScore} width="100%" height="600" />
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        game: state.game,
        user: state.auth
    };
}

export default connect(mapStateToProps, actions)(GameDetail);