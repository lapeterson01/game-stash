import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../actions';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.props.fetchGamesUserPlayed(this.props.match.params.userID);
        this.props.fetchUserInfo(this.props.match.params.userID);
    }

    renderGames = () => {
        this.props.games.forEach(game => {
            const date = moment(game.timeOfScore).format("LT l")
            return game.timeOfScore = date.toString();
        })
        if (this.props.games.length) {
            console.log(this.props.games[0].timeOfScore)
        }
        return this.props.games.map(game =>
            <div key={game.gID} className="row justify-content-around" style={{width:'100%'}}>
                <div className="col">
                    <h4 className="text-center" >{game.name}</h4>
                </div>
                <div className="col">
                    <p className="text-center">{game.timeOfScore}</p>
                </div>
            </div>
        )
    }

    renderScores = () => {
        return (
            <div>
                <h4>List of Scores</h4>
            </div>
        )
    }

    render() {
        const { userInfo } = this.props;
        if (!userInfo.length) {
            return <div className="row justify-content-center">Loading...</div>
        }
        return (
            <div>
                <div className="row justify-content-center">
                    <img src={userInfo[0].userImage} alt="" style={{height:'120px', width:'auto'}} />
                    <h1 className="profile-name">{userInfo[0].user}</h1>
                </div>
                <div className="row">
                    <div className="col" style={{border:"solid black 3px", margin:"25px"}}>
                        <div className="row justify-content-center">
                            <h2>Games Played</h2>
                        </div>
                        <hr />
                        <div className="row justify-content-center">
                            {this.renderGames()}
                        </div>
                    </div>
                    <div className="col" style={{border:"solid black 3px", margin:"25px"}}>
                        <div className="row justify-content-center">
                            <h2>Scores</h2>
                        </div>
                        <hr />
                        <div className="row justify-content-center">
                            {this.renderScores()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        games: state.games,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, actions)(Profile);