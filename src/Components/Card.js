import React, {Component} from 'react';

class Card extends Component {
    constructor(props){
        super(props);
        this.getSafe = this.getSafe.bind(this);
        this.state = {
            id: 0,
        }
    }
    
    componentDidMount(){
        this.props.startLoadingDares(this.props.room.version);
    }

    getSafe(fn, defaultVal) {
        try {
            return fn();
        } catch (e) {
            return defaultVal;
        }
    }

    render(){
        // let min = 0;
        // let max = this.props.dares.length;
        let id = 0;
        id = this.getSafe(() => this.props.room.cardselected);
        id++;
        let title = this.getSafe(() => this.props.dares[id].title);
        let description = this.getSafe(() => this.props.dares[id].description);

        return <div className="uk-card uk-card-default uk-card-body card_container">
                <h3 className="uk-card-title">{ this.getSafe(() => this.props.room.card.status) === "show" ? this.getSafe(() => this.props.room.card.title) : ""}</h3>
                { this.getSafe(() => this.props.room.card.status) === "show" ? <p>{this.getSafe(() => this.props.room.card.description)}</p> : ""}
                { this.getSafe(() => this.props.room.card.status) === "hide" ? <button className="uk-button uk-button-secondary uk-button-large uk-width-1-1 uk-margin-small" onClick={() => { this.props.updateCard(this.props.room, title, description, id); }}>Reveal Card</button> : ""}
                { this.getSafe(() => this.props.room.card.status) === "show" ? <button className="uk-button uk-button-secondary uk-button-large uk-width-1-1 uk-margin-small" onClick={() => { this.props.updateCardStatus(this.props.room, this.props.room.card, "hide"); this.props.view("dare") }}>Do the Dare</button> : ""}
                <button className="uk-button uk-button-secondary uk-button-large uk-width-1-1 uk-margin-small" onClick={() => { this.props.view("wheel"); this.props.updateCardStatus(this.props.room, this.getSafe(() => this.props.room.card), "hide") }}>Spin the Wheel</button>
            </div>
    }
}

export default Card