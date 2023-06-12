import React, { Fragment } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    };

    static PpropTypes = {
        match: PropTypes.object
    }

    componentDidMount(){
        
        const { params } = this.props.match;

        // first reinstate our locatstorage
        const localStorageRef = localStorage.getItem(params.storeName);
        if(localStorageRef) {
          this.setState({order: JSON.parse(localStorageRef)});
        }

        this.ref = base.syncState(`${params.storeName}/fishes`, {
            context: this,
            state: 'fishes'
        });
        
    }

    componentDidUpdate () {
        localStorage.setItem(this.props.match.params.storeName, JSON.stringify(this.state.order));
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    
    updatedFish = (key, updatedFish) => {
        //1. take a copy of the current state
        const fishes = { ...this.state.fishes };
        //2. update the state
        fishes[key] = updatedFish;
        //3. set that to to states
        this.setState({fishes:fishes});
    }

    deleteFish = (key) => {
        //1. take a copy of the current state
        const fishes = { ...this.state.fishes };
        //2. update the state
        fishes[key] = null;
        //3. set that to to states
        this.setState({fishes:fishes});
    }

    addFish = fish => {
        //1. take a copy of existing state
        const fishes = { ...this.state.fishes };
        // 2. add our new fish into fishes
        fishes[`fish${Date.now()}`] = fish;
        // 3. set the new fishes object to states
        this.setState({ fishes: fishes });
    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (key) => {
        //1. take a copy of existing state
        const order = { ...this.state.order };
        //2. either add or update the number in order
        order[key] = order[key] + 1 || 1;
        //3. call setstate to update our state object
        this.setState({ order: order });
    };

    removeFromOrder = (key) => {
        //1. take a copy of existing state
        const order = { ...this.state.order };
        //2. remove in order
        delete order[key];
        //3. call setstate to update our state object
        this.setState({ order: order });
    };
    
    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"></Header>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish 
                                key={key} 
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}>
                            </Fish>
                        ))}
                    </ul> 
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}/>
                <Inventory 
                    addFish={this.addFish} 
                    updatedFish={this.updatedFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes} 
                    fishes={this.state.fishes}
                    addToOrder={this.addToOrder}
                    storeId={this.props.match.params.storeName}/>            
            </div>
        ) 
        
    }
    
}

export default App;