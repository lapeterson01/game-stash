import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.props.fetchUserInfo(this.props.match.params.userID);
    }

    renderGames = () => {
        const { userInfo } = this.props;
        let gameNames = []
        let gameIDs = [];
        userInfo.forEach(user => {
            if (gameNames.indexOf(user.game) === -1) {
                gameNames.push(user.game);
                gameIDs.push(user.gID);
            }
        })
        console.log(gameNames);
        console.log(gameIDs);
        let games = [];
        for (let i = 0; i < gameNames.length; i++) {
            let game = {
                name: gameNames[i],
                gID: gameIDs[i]
            }
            games.push(game);
        }
        console.log(games);
        return games.map(game =>
            <div key={game.gID} className="col-12">
                <h4 className="text-center">{game.name}</h4>
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
        console.log(userInfo);
        if (!userInfo.length) {
            return <div className="row justify-content-center">Loading...</div>
        }
        return (
            <div>
                <div className="row">
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

const mapStateToProps = ({ userInfo }) => {
    console.log(userInfo)
    return { userInfo }
}

export default connect(mapStateToProps, actions)(Profile);