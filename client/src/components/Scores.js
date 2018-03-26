import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Scores extends Component {
    constructor(props) {
        super(props)

        this.props.fetchScores();
    }

    renderScores() {
        let place = 1;
        return this.props.scores.map(score => 
            <div key={place} className="row" style={{width:'100%', height:'100px', borderTop:'solid black 2px', margin:'10px'}}>
                <div className="col">
                    <h6 className="text-center vcenter">{place++}</h6>
                </div>
                <div className="col">
                    <img className="center-block text-center vcenter-image" src={score.profilePic} alt="No Pic" />
                </div>
                <div className="col">
                    <h6 className="text-center vcenter">{score.player}</h6>
                </div>
                <div className="col">
                    <img className="score-image center-block vcenter-image" src={score.gamePic} alt="" />
                </div>
                <div className="col">
                    <h5 className="text-center vcenter">{score.score}</h5>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h2 className="text-center">HIGH SCORES</h2>
                <div className="row" style={{border:"solid black 3px", paddingTop:"15px"}}>
                    <div className="col text-center">
                        <h4>Place</h4>
                    </div>
                    <div className="col text-center">
                        <h4>Player</h4>
                    </div>
                    <div className="col text-center">
                        <h4>Game</h4>
                    </div>
                    <div className="col text-center">
                        <h4>Score</h4>
                    </div>
                    {this.renderScores()}
                </div>
            </div>
        )
    }
};

const mapStateToProps = ({ scores }) => {
    return { scores };
}

export default connect(mapStateToProps, actions)(Scores);