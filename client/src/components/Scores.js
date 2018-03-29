import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../actions';
import queryString from 'query-string';

class Scores extends Component {
    constructor(props) {
        super(props)

        this.props.fetchGames();

        this.state = {
            game: null,
            scores: null,
            redirectToGame: false,
            redirectToScores: false,
            redirectToSelection: false
        }
    }

    componentDidMount = () => {
        let search = this.props.location.search;  
        if (search) {
            const parsed = queryString.parse(search);
            const game = parsed.game;
            this.setState({ game });
            this.props.fetchScores(game);
        }
    }

    onDropdownChange = (event) => {
        this.setState({ game: event.target.value });
        this.setState({ redirectToScores: true });
    }

    onBackButtonClick = () => {
        this.setState({ redirectToSelection: true });
    }

    onGameButtonClick = () => {
        this.setState({ redirectToGame: true })
    }

    renderDropdown() {
        if (this.props.games.length === 0) {
            return;
        } else {
            return this.props.games.map(game => 
                <option key={game.gID} value={game.gID}>{game.name}</option>
            )
        }
    }

    renderScores() {
        if (!this.props.scores.length) {
            return (
                <div className="row justify-content-center" style={{width:'100%', height:'100px', borderTop:'solid black 2px', margin:'10px'}}>
                    <h1>No High Scores</h1>
                </div>
            )
        }
        let place = 1;
        return this.props.scores.map(score => 
            <div key={place} className="row" style={{width:'100%', height:'100px', borderTop:'solid black 2px', margin:'10px'}}>
                <div className="col">
                    <h6 className="text-center vcenter">{place++}</h6>
                </div>
                <div className="col">
                    <Link to={`/profile/${score.uID}`}>
                    <div className="row">
                        <img className="center-block text-center vcenter-image" src={score.profilePic} alt="" style={{width:'50px', height:'50px'}} />
                        <h6 className="text-center vcenter">{score.player}</h6>
                    </div>
                    </Link>
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
        if (this.state.redirectToGame) {
            return <Redirect to={`/games/detail/${this.state.game}`} />
        }
        if (this.state.redirectToScores) {
            window.location.reload()
            return <Redirect to={`/scores?game=${this.state.game}`} />
        }
        if (this.state.redirectToSelection) {
            window.location.reload()
            return <Redirect to='/scores' />
        }
        switch (this.props.scores) {
            case null:
                return (
                    <div className="jumbotron">
                        <h2 className="text-center scores-menu">HIGH SCORES</h2>
                        <h5 className="text-center scores-menu">What game would you like to see high scores for?</h5>
                        <select className="form-control scores-menu" name="game" onChange={this.onDropdownChange}>
                            <option value="">Select a Game</option>
                            {this.renderDropdown()}
                        </select>
                    </div>
                )
            default:
                
                return (
                    <div className="scores">
                        <div className="row justify-content-between">
                            <button className="btn-link" onClick={this.onBackButtonClick}>Back To Game Selection</button>
                            <button className="btn-link" onClick={this.onGameButtonClick}>Play This Game</button>
                        </div>
                        <hr />
                        <h2 className="text-center">HIGH SCORES</h2>
                        <div className="row" style={{border:"solid black 3px", paddingTop:"15px", width:'75%', marginLeft:'auto', marginRight: 'auto'}}>
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
    }
};

const mapStateToProps = (state) => {
    return (
        {
            scores: state.scores,
            games: state.games
        }
    );
}

export default connect(mapStateToProps, actions)(Scores);