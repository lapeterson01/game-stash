import React, { Component } from 'react';

class GameDetail extends Component {
    render() {
        return (
            <div>
                <h2>Game Detail</h2>
                <iframe title="breakout" src="/breakout.html" width="100%" height="600" />
            </div>
        )
    }
};

export default GameDetail;