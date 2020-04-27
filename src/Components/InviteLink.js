import React, {Component} from 'react';

class InviteLink extends Component {
    constructor(){
        super();
        this.state = {
            roomid: 0,
            roomkey: "",
            url: window.location.href
        }
    }

    componentDidMount(){
        const {match} = this.props;
        let rid = Number(match.params.roomid);
        this.props.loadRoom(rid);
        this.setState({
            roomid: rid
        })
    }

    checkIn(playerkey){
        const {match} = this.props;
        this.props.userCheckIn(this.props.room, playerkey);
        this.props.history.push(`/Game/${match.params.roomid}/${playerkey}`);
    }
    
    render(){
        console.log(this.props.room);
        let players = Object.values(this.props.room.players);
        return <div className="uk-child-width-1-2@s uk-grid-small uk-flex-center uk-grid-match invite_link_container uk-text-center" data-uk-grid>
                <div>
                    <div className="uk-card uk-card-primary uk-card-body">
                        <h3 className="uk-card-title uk-text-center">Send this url to your Friends</h3>
                        <p className="uk-text-center">{this.state.url}</p> 
                        <ul className="uk-list uk-list-striped player_names">
                        {
                            players.map((player, index) => (
                                <li key={index} className="uk-child-width-1-2@s" data-uk-grid><div>{player.name}</div><div><button className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" onClick={this.checkIn.bind(this, index)}>{player.status}{(player.status === "active") ? <span className="uk-margin-small-right" uk-icon="check"></span> : <div></div>}</button></div></li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
            </div>
    }
}

export default InviteLink