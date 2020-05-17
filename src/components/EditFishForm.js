import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
    static propTypes = {
        fish: PropTypes.shape({
            name: PropTypes.string,
            status: PropTypes.string,
            desc: PropTypes.string,
            image: PropTypes.string,
            price: PropTypes.number
        }),
        index: PropTypes.string,
        updatedFish: PropTypes.func,
        deleteFish: PropTypes.func
    }
    changeHandler = (event) => {
        // Update fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.name === "price" ? parseInt(event.currentTarget.value) : event.currentTarget.value
        };

        this.props.updateFish(this.props.index, updatedFish)
    }

    render() {
        return (
            <div className="fish-edit">
                <input type="text" name="name" value={this.props.fish.name} onChange={this.changeHandler} placeholder="Name" />
                <input type="text" name="price" value={this.props.fish.price} onChange={this.changeHandler} placeholder="Price" />
                <select name="status" value={this.props.fish.status} onChange={this.changeHandler}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" value={this.props.fish.desc} onChange={this.changeHandler} placeholder="Desc" />
                <input type="text" name="image" value={this.props.fish.image} onChange={this.changeHandler} placeholder="Image" />
                <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </div>
        );
    }
}

export default EditFishForm;