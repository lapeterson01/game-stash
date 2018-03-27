import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class GameDetail extends Component {
    constructor(props) {
        super(props)

        this.props.fetchGame(this.props.match.params.gameID)
    }

    render() {
        let game = this.props.game;
        if (!game) {
            return (
                <div>
                    <h1 className="text-center">Loading...</h1>
                </div>
            )
        }
        return (
            <div>
                <div className="row justify-content-end">
                    <a href="/games/new">Upload Your Game</a>
                </div>
                <hr />
                <div className="row">
                    <h2 className="text-center">{game.name}</h2>
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