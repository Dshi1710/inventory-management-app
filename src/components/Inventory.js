import React, { Fragment } from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from './EditFishForm';
import PropTypes from 'prop-types';
import Login from "./Login";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
    state = {
        uid: null,
        owner: null
    };

    static PropTypes = {
        updatedFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        addFish: PropTypes.func,
        fishes: PropTypes.object
    };

    componentDidUpdate () {
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
                this.authHandler({ user });
            }
        })
    }

    authHandler = async authData => {
        // 1. look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, {context: this} );
        // 2. claim it if there is no owner
        if (!store.owner) {
            //save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });

        }
        //3. set the state of the the inventory componenet to reflect the current user

        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });

    };

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler);
    };

    logout = async () => {
        console.log("Logging out!");
        await firebase.auth().signOut();
        this.setState({ uid: null });
      };

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;

        // 1. check if user is logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}></Login>;
        } 
        
        // check if user is not the owner of the store
        if (this.state.uid !== this.state.owner){
            return(
                <div>
                    <p> Sorry you are not the owner of the store</p>
                    {logout}
                </div>
                
            );
        }

        // 3. user is teh owner
        return(
            <div className="inventory">
                <h2>Inventory!!!</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => 
                <EditFishForm 
                    key={key} 
                    index={key} 
                    fish={this.props.fishes[key]} 
                    updatedFish={this.props.updatedFish}
                    deleteFish={this.props.deleteFish}>
                </EditFishForm>)}
                <AddFishForm 
                    addFish={this.props.addFish}>
                </AddFishForm>
                <button onClick={this.props.loadSampleFishes}>Load the fishes</button>
            </div>
        );
    
    }
    
}

export default Inventory;