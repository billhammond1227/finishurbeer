import React, {Component} from 'react';

class ThankYou extends Component {
    constructor(){
        super();
        this.endGame = this.endGame.bind(this);
    }
    render(){
        return <div className="uk-text-center">
            <div className="uk-card uk-card-primary uk-card-body">
                <h3 className="uk-card-title">Thank you for your donation!</h3>
                <p>We appreciate your kind gesture. Now off the liquore store!</p>
                <a href="https://finishurbeer.com/" className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom">Start New Game!</a>
            </div>
        </div>;
    }
}

export default ThankYou