import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Rating extends Component {
    render(){
        return <div className="uk-child-width-1-2@s uk-grid-small uk-grid-match uk-text-center" data-uk-grid>
            <div>
                <div className="uk-card uk-card-default uk-card-body">
                    <h3 className="uk-card-title">PG Rated Game*</h3>
                    <p>PG rating - Content written by my buddy Adam. Very fun content, but tame enough to let grandma jump in. By joinining you are agreeing that you are over 21.</p>
                    <Link to="/NumberPlayers" className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" onClick={() => { this.props.updateVersion("PG") }}>Let's Play!</Link>
                </div>
            </div>
            <div>
                <div className="uk-card uk-card-primary uk-card-body">
                    <h3 className="uk-card-title">R Rated Game*</h3>
                    <p>R rating - Content written by my buddy Ben. Very slimy content that will send you straight to hell just for reading it. Marilyn Manson is triggered right now. By joinining you are agreeing that you are over 21.</p>
                    <Link to="/NumberPlayers" className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" onClick={() => { this.props.updateVersion("R") }}>Play at your own risk!</Link>
                </div>
            </div>
        </div>
    }
}

export default Rating