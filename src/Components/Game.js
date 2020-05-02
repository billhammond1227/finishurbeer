import React, {Component} from 'react';
import Card from './Card';
import Wheel from './Wheel';
import Dare from './Dare';
import EndGame from './EndGame';
import icon from '../images/icon-beer.png';

class Game extends Component {
    constructor(){
        super();
        this.state = {
            roomid: "",
            playerkey: "",
            playername: "",
            view: "",
            images: "",
            visibleplayers: false,
        };
        this.nextView = this.nextView.bind(this);
        this.nextPlayer = this.nextPlayer.bind(this);
        this.playerDD = this.playerDD.bind(this);
        this.evenodd = this.evenodd.bind(this);
    }

    componentDidMount(){
        const {match} = this.props;
        let rid = Number(match.params.roomid);
        let pkey = Number(match.params.playerkey);
        this.setState({
            roomid: rid,
            playerkey: pkey,
            playername: this.props.room.players[`${this.props.room.playersturn}`]
        })
        this.props.loadRoom(rid);
        //this.props.startLoadingGallery(rid);
        //this.props.startLoadingDares(this.props.room.version);
    }

    nextPlayer(){
        let numplayers = Number(this.props.room.numplayers);
        let playersturn = Number(this.props.room.playersturn);
        let turn = Number(this.props.room.turn);
        let numberturns = Number(this.props.room.numberturns);
        playersturn++;
        if(playersturn>=numplayers){
            playersturn=0;
            turn++;
        }
        this.props.updateTurn(this.props.room, playersturn, turn);

        if(turn <= numberturns){
            this.nextView("");
        }
        else {
            this.nextView("endgame");
        }
    }

    getSafe(fn, defaultVal) {
        try {
            return fn();
        } catch (e) {
            return defaultVal;
        }
    }
    
    nextView(v){
        this.props.updateView(this.props.room, v);
    }

    playerDD(){
        this.setState(state => ({
            visibleplayers: !state.visibleplayers
        }));
    }

    evenodd(num){
        if ( num % 2 === 0) {
            return "even";
        }else{
            return "odd";
        }
    }

    render(){
        const {match} = this.props;
        let pkey = Number(match.params.playerkey);
        let turn = Number(this.props.room.turn);
        let numberturns = Number(this.props.room.numberturns);
        let players = Object.values(this.props.room.players);
        let selectedplayer = this.props.room.players[`${this.props.room.playersturn}`];
        return <div className="game_container uk-text-center">
                <div className="uk-card uk-card-default uk-card-body uk-text-center game_header" style={{zIndex: 980}} uk-sticky="bottom: #offset">
                    { turn <= numberturns ? <h2>Turn {this.props.room.turn} - {this.getSafe(() => selectedplayer.name)}</h2> : <h2>Review Gallery</h2>}
                    <button className="uk-button uk-button-default players_dd" type="button" onClick={() => this.playerDD()}>Players <span uk-icon="users"></span></button>
                    <div className={`uk-grid-collapse uk-child-width-1-5@s uk-flex-center uk-text-center uk-margin-top uk-width-1-1 player_names_cards`} data-uk-grid>
                    {
                        players.map((player, index) => (
                            <div key={index} className={this.state.visibleplayers === false ? ' hide' : ''}>
                                <div className={`uk-padding-small uk-light ${index === this.props.room.playersturn ? "uk-background-secondary" : `uk-background-primary player_name_${this.evenodd(index)}`}`}>{ index===pkey ? "You" : player.name }</div>
                            </div>
                        ))
                    }
                    </div>
                </div>
                <div className="uk-grid-collapse uk-child-width-1-2@s uk-flex-center uk-text-center uk-margin-medium-top uk-width-1-1" data-uk-grid>
                    <div className="view">
                        {(() => {
                            switch (this.props.room.view) {
                            case "draw card": return <Card {...this.props} view={this.nextView} />;
                            case "wheel": return <Wheel {...this.props} nplayer={this.nextPlayer} view={this.nextView}/>;
                            case "dare": return <Dare {...this.props} nplayer={this.nextPlayer} view={this.nextView} />;
                            case "endgame": return <EndGame {...this.props} view={this.nextView}/>;
                            default: return <button className="uk-button uk-button-secondary uk-button-large uk-margin-small" onClick={() => { this.nextView("draw card") }}>Your Turn {this.getSafe(() => selectedplayer.name)}!</button>;
                            }
                        })()}
                    </div>
                </div>
                { this.props.room.view !== "gallery" && this.props.room.view !== "wheel" && this.props.room.view !== "dare" ? <div><a target="_blank" href={`/Gallery/${this.state.roomid}/`} className="uk-button uk-button-secondary uk-margin-medium-top uk-button-large uk-width-1-1 uk-margin-small" onClick={() => { this.nextView("gallery") }}>View Gallery</a><br/><button className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" onClick={() => { this.nextView("endgame") }}>End Game</button></div> : "" }
        </div>

    }
}

export default Game