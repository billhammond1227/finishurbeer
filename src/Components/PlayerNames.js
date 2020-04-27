import React, {Component} from 'react';

class PlayerNames extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        let players = {};
        for(let i=0; i<this.props.numplayers; i++){
            //players.push(event.target[i].value);
            players[i] = { name: event.target[i].value, status: "Check In"}
        }
        let roomid = Number(new Date());
        let newroom = {
            version: this.props.version,
            id: roomid,
            numplayers: this.props.numplayers,
            players: players,
            turn: 1,
            playersturn: 0,
            card:{
                title: "",
                description: "",
                status: "hide"
            },
            drink:"",
            view:"",
            cardsplayed:[],
            state: "active",
            cardselected: 0,
            numberturns: 10
        }
        this.props.createRoom(newroom, roomid);
        this.props.history.push(`/InviteLink/${roomid}`);
    }

    render(){
        let rows = [];
        for(let i=0; i<this.props.numplayers; i++){
            let theplayer = '';
            if(this.props.players[i]){
                theplayer = this.props.players[i];
            }
            rows.push(<div className="uk-margin" style={{marginTop:20+'px'}} key={i}>
                    <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user"></span>
                        <input name="playername" className="uk-input" type="text" placeholder="Player Name" defaultValue={theplayer} />
                    </div>
                </div>)
        }
        return <div className="uk-child-width-1-2@s uk-flex-center uk-grid-small uk-grid-match player_names_container uk-text-center" data-uk-grid>
            <div>
                <div className="uk-card uk-card-primary uk-card-body">
                    <h3 className="uk-card-title">Enter Player Names</h3>
                    <h4>{this.props.numplayers} Players</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="uk-child-width-1-2@s uk-flex-center uk-grid-small uk-grid-match" data-uk-grid>{rows}</div>
                        <button type="submit" className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom">Create Invite Link</button>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default PlayerNames