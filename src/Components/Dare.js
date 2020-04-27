import React, {Component} from 'react';
import {storage} from '../database/config';
import ImageUploader from 'react-images-upload';

class Dare extends Component {
    constructor(){
        super();
        this.state = {
            selectedFile: null,
            pictures: [],
            uploadstatus: "initial",
            uploadpercentage: 0
        };
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
    }

    getSafe(fn, defaultVal) {
        try {
            return fn();
        } catch (e) {
            return defaultVal;
        }
    }

    fileUploadHandler = (picture) => {
        const {match} = this.props;
        let rid = Number(match.params.roomid);
        let image = picture[0];
        const nickname = Number(new Date());
        const uploadTask = storage.ref(`${rid}/${nickname}-${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
            let percentage = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            console.log(`Uploading: ${percentage}%`);
            this.setState({
                uploadpercentage: percentage
            })
        }, (error) => {
            console.log(error);
        }, () => {
            storage.ref(`${rid}`).child(`${nickname}-${image.name}`).getDownloadURL().then(url => {
                console.log(url);
                this.props.updateLastImage(this.props.room, url);
            });
            this.setState({
                uploadstatus: "complete"
            })
        });
    }

    render() {
        const {match} = this.props;
        let pkey = Number(match.params.playerkey);
        let playersturn = Number(this.props.room.playersturn);

        return <div className="uk-margin">
             { this.state.uploadpercentage > 0 && this.state.uploadpercentage < 100 ? <h2>Uploading Image {this.state.uploadpercentage}%</h2> : ""}
            <button className="uk-button uk-button-secondary uk-button-large uk-margin-small" onClick={() => {this.props.nplayer()}}>Next Player</button>
            <div className="dare_card">{this.getSafe(() => `Dare: ${this.props.room.card.description}`)}</div>
            { this.state.uploadstatus !== "file selected" && this.state.uploadstatus !== "complete" && pkey === playersturn ? <ImageUploader
                withIcon={true}
                buttonText='Select Image'
                onChange={this.fileUploadHandler}
                imgExtension={['.jpg', '.gif', '.png', '.gif','.jpeg']}
                singleImage={true}
            />
             : "" }
             { pkey !== playersturn ? <p className="status_description">{`${this.props.room.players[playersturn].name} is currently doing the dare.`}</p> : "" }
            <h3>Last Uploaded Image</h3>
            <img src={this.getSafe(() => this.props.room.lastimage)} alt="Last Uploaded Image"/><br/>
        </div>
    }
}

export default Dare