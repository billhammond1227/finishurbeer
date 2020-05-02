import React, {Component} from 'react';
import icon from '../images/icon-beer.png';

class Logo extends Component {
    render(){
        return <div className="uk-card uk-card-default uk-padding-small uk-text-center icon-container" style={{zIndex: 980}} uk-sticky="bottom: #offset"><img src={icon} alt="Beer Icon" /></div>
    }
}

export default Logo