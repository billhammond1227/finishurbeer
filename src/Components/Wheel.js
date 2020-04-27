import React, {Component} from 'react';

class Wheel extends Component {
    constructor() {
        super();
        this.state = {
            selectedItem: null,
            finished: null
        }
        this.drinks = ['2 Drinks', 'Finish UR Beer!', '4 Drinks', 'Take a Shot!', 'Half Ur Beer!', '3 Drinks', 'Finish UR Beer!','2 Drinks','Take a Shot!','1 Drink'];
        this.selectItem = this.selectItem.bind(this);
    }
    selectItem() {
        const {match} = this.props;
        let pkey = Number(match.params.playerkey);
        let playersturn = Number(this.props.room.playersturn);

        if (this.state.selectedItem === null) {
            const selectedItem = Math.floor(Math.random() * this.drinks.length);
            if (this.props.onSelectItem) {
                this.props.onSelectItem(selectedItem);
            }
            this.setState({ selectedItem });
            if(pkey===playersturn){
                this.props.updateDrink(this.props.room, this.drinks[selectedItem]);
            }
            setTimeout(() => {this.setState({finished: true})}, 5000)
        } else {
            this.setState({ selectedItem: null });
            setTimeout(this.selectItem, 500);
        }
    }
    componentDidMount(){
        setTimeout(this.selectItem, 500);
    }
    render() {
        const selectedItem = this.state.selectedItem;
        const items = this.drinks;

        const wheelVars = {
        '--nb-item': items.length,
        '--selected-item': selectedItem,
        };
        const spinning = selectedItem !== null ? 'spinning' : '';
        
        const {match} = this.props;
        let pkey = Number(match.params.playerkey);
        let playersturn = Number(this.props.room.playersturn);

        return (
            <div>
            { this.state.finished !== null ? <h2>{this.props.room.drink}</h2> : ""}
            <button className="uk-button uk-button-secondary uk-button-large uk-margin-small" onClick={() => {this.props.nplayer()}}>Next Player</button>
            { pkey === playersturn ? <div>
                <div className="wheel-container">
                <div className={`wheel ${spinning}`} style={wheelVars}>
                {items.map((item, index) => (
                    <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                    {item}
                    </div>
                ))}
                </div>
            </div></div> : <p className="status_description">{`${this.props.room.players[playersturn].name} is spinning the wheel.`}</p> }
            
            </div>
        );
        
    }
}

export default Wheel
