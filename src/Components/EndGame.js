import React, {Component} from 'react';

class EndGame extends Component {
    constructor(){
        super();
        this.endGame = this.endGame.bind(this);
    }
    endGame(){
        const {match} = this.props;
        let rid = Number(match.params.roomid);
        this.props.removeRoom(rid);
        this.props.history.push("");
    }
    render(){
        return <div className="uk-text-center">
            <div className="uk-card uk-card-primary uk-card-body">
                <h3 className="uk-card-title">Completed!</h3>
                <p>You have completed the game. Hope you had fun. Review the photo gallery below to make fun of your friends. Come back soon!</p>
                <button className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" onClick={() => { this.props.endGame() }}>End Game</button>
            </div>
        </div>;
    }
}

export default EndGame