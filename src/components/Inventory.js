import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import firebase from "firebase";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        storeId: PropTypes.string
    }

    state = {
        loggedInId: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        })
    }

    authHandler = async (authData) => {
        // Look for current store in firebase
        console.log("Auth data...", authData);
        const { uid, email } = { ...authData.user }
        // Get store data
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log("Current store data ...", store);

        //>> If No Owner > set owner as current user
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: { uid, email }
            })
        }

        // Set the current state of inventory
        this.setState({
            loggedInId: uid,
            owner: store.owner || { uid, email }
        })
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider)
            .then(this.authHandler)
            .catch(err => console.warn(err.message));
    }
    loggingOut = async () => {
        console.log(`Logging out!`);
        await firebase.auth().signOut();

        this.setState({
            loggedInId: null
        })

    }
    render() {
        const logout = <button onClick={this.loggingOut}>Log Out</button>
        if (!this.state.loggedInId) {
            return <Login authenticate={this.authenticate} />
        }
        if (this.state.loggedInId !== this.state.owner.uid) {
            return (
                <div>
                    <p>Sorry! You are not the owner.</p>
                    {logout}
                </div>
            )
        }

        return (
            <div className="inventory">
                <h2>Inventory!!</h2>
                {logout}
                {Object.keys(this.props.fishes).map(fish =>
                    <EditFishForm
                        key={fish}
                        index={fish}
                        fish={this.props.fishes[fish]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish} />
                )}

                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;