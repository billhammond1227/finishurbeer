import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NumberPlayers extends Component {
    render(){
        return <div className="uk-child-width-1-2@s uk-flex-center uk-grid-small uk-grid-match" data-uk-grid>
        <div className="number_players_container">
            <div className="uk-card uk-card-primary uk-card-body uk-text-center">
                <h1 className="uk-card-title">How many players?</h1>
                <p className="description">Max 20 players*</p>
                <h4><span>{this.props.numplayers}</span> Player(s)</h4>
                <input type="range" id="vol" name="vol" min="1" max="20" value={this.props.numplayers} className="uk-range uk-margin-small" onChange={(e) => { this.props.updateNumPlayers(e.target.value) }}/>
                <Link to="/PlayerNames" className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom">Enter Player Names</Link>
            </div>
        </div>
    </div>
    }
}

export default NumberPlayers