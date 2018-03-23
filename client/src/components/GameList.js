import React, { Component } from 'react';

class GameList extends Component {
    renderGames = () => {
        return;
    }

    render() {
        return (
            <div>
                <h2>Game List</h2>
                <div className="row">
                    {this.renderGames()}
                </div>
            </div>
        )
    }
};

export default GameList;