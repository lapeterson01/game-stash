import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class GameList extends Component {
    constructor(props) {
        super(props);

        if (this.props.games) {
            this.props.fetchGames();
        }
    }

    renderGames() {
        if (this.props.games.length === 0) {
            return (
                <div>
                    <h1>No Results</h1>
                </div>
            )
        } else {
            return this.props.games.map(game =>
                <Link to={`/games/detail/${game.gID}`} key={game.gID} className="col text-center games">
                    <img className="game-image" src={game.imageURL} alt={game.name} />
                    <h2 className="link">{game.name}</h2>
                    <p className="link">{game.description}</p>
                </Link>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="row justify-content-end">
                    <a href="/games/new">Upload Your Game</a>
                </div>
                <hr />
                <div className="row">
                    {this.renderGames()}
                </div>
            </div>
        )
    }
};

function mapStateToProps({ games }) {
    return { games };
}

export default connect(mapStateToProps, actions)(GameList);