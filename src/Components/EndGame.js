import React, {Component} from 'react';
import icon from '../images/icon-beer.png';

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
                <img src={icon} alt="Beer Icon" className="beer-icon"/>
                <h3 className="uk-card-title">Completed!</h3>
                <p>You have completed the game. Review the photo gallery below to make fun of your friends. Come back soon! If you feel enlightened and gasping for air due to laughter then feel free to contribute to my beer fund below. Much appreciated!</p>
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="hosted_button_id" value="MXZ9M5T7XYSVS" />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" style={{height: "1px"}}/>
                </form>
                <button className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" onClick={() => { this.props.endGame() }}>End Game</button>
            </div>
        </div>;
    }
}

export default EndGame