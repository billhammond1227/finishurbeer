import React, {Component} from 'react';

class Gallery extends Component {
    constructor(){
        super();
        this.state = {
            images: []
        }
    }
    componentDidMount(){
        const {match} = this.props;
        let rid = Number(match.params.roomid);
        this.props.startLoadingGallery(rid);
    }

    getSafe(fn, defaultVal) {
        try {
            return fn();
        } catch (e) {
            return defaultVal;
        }
    }

    render(){
        const url = [];
        if(this.props.gallery[`0`]){
            for (let [key, value] of Object.entries(this.props.gallery[`0`])) {
                for (let [key2, value2] of Object.entries(value)) {
                    console.log(`${key2}: ${value2}`);
                    url.push(`${value2}`);
                }
            }
        }

        return <div className="game_container uk-text-center">
                <div className="uk-grid-match uk-flex-center uk-child-width-1-2@s uk-text-center" data-uk-grid>
                    { url.map((image, index) => 
                            <div key={index}><div className="uk-card uk-card-default uk-card-body"><a href={image} target="_blank"><img key={index} src={image} alt="Image Gallery" /></a></div></div>
                    )}
                </div>     
            </div>;
    }
}

export default Gallery