import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";


class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }
    componentDidMount() {
        const { params } = this.props.match;
        // First reinstate our localstorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentDidUpdate() {
        // console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }
    componentWillUnmount() {
        // Remove binding to prevent memory leak
        base.removeBinding(this.ref);
    }
    addFish = (fish) => {
        const fishes = { ...this.state.fishes }
        // Add new fish
        fishes[`fish${Date.now()}`] = fish;
        // Set in state
        this.setState({
            fishes
        });
    }
    updateFish = (key, updatedFish) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        this.setState({ fishes })
    }
    deleteFish = (key) => {
        let fishes = { ...this.state.fishes };
        fishes[key] = null;
        this.setState({ fishes })
    }
    removeFromOrder = (orderId) => {
        console.log(orderId);
        let order = { ...this.state.order };
        delete order[orderId];
        this.setState({ order });
    }
    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    }
    addToOrder = (key) => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({
            order
        })
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key =>
                            <Fish
                                key={key}
                                index={key} // Just for access heys in props
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder} />
                        )}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder} />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId} />
            </div>
        )
    }
}

export default App;