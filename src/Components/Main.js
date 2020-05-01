import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Rating from './Rating';
import NumberPlayers from './NumberPlayers';
import PlayerNames from './PlayerNames';
import InviteLink from './InviteLink';
import Gallery from './Gallery';
import Game from './Game';
import ThankYou from './ThankYou';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numplayers: Number(1),
            version: "PG",
            players: {}
        };
        this.updateNumPlayers = this.updateNumPlayers.bind(this);
        this.updateVersion = this.updateVersion.bind(this);
        this.updatePlayers = this.updatePlayers.bind(this);
        this.loadRoom = this.loadRoom.bind(this);
    }

    updateNumPlayers(np){
        this.setState({numplayers: np});
    }
    updateVersion(ver){
        this.setState({version: ver});
    }
    updatePlayers(pl){
        this.setState({
            players: pl
        });
    }

    loadRoom(roomid){
        this.props.startLoadingRoom(roomid);
    }

    render(){
        return <div>
            <Route exact path="/" render={() => (
                <Rating updateVersion={this.updateVersion}/>
            )} />
            <Route path="/NumberPlayers" render={() => (
                <NumberPlayers numplayers={this.state.numplayers} updateNumPlayers={this.updateNumPlayers}/>
            )}/>
            <Route path="/PlayerNames" render={() => (
                <PlayerNames {...this.props} version={this.state.version} numplayers={this.state.numplayers} updatePlayers={this.updatePlayers} players={this.state.players}/>
            )}/>
            <Route path="/InviteLink/:roomid" render={(params) => (
                <InviteLink {...this.props} loadRoom={this.loadRoom} players={this.state.players} {...params}/>
            )}/>
            <Route path="/Game/:roomid/:playerkey/:refresh?" render={(params) => (
                <Game {...this.props} loadRoom={this.loadRoom} players={this.state.players} {...params}/>
            )}/>
            <Route path="/Gallery/:roomid/:refresh?" render={(params) => (
                <Gallery {...this.props} loadRoom={this.loadRoom} players={this.state.players} {...params}/>
            )}/>
            <Route path="/ThankYou" render={(params) => (
                <ThankYou />
            )}/>
        </div>
    }
}

export default Main