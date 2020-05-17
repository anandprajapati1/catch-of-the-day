import React from "react";
import { getFunName } from "../helpers";
import PropTypes from "prop-types";

class StorePicker extends React.Component {
    static propTypes = {
        history: PropTypes.object
    }
    myInput = React.createRef()

    goToStore = (event) => {
        event.preventDefault();
        // console.log(this.myInput.current.value);
        this.props.history.push(`/store/${this.myInput.current.value}`);
    }

    render() {
        return (
            <form action="" className="store-selector" onSubmit={this.goToStore}>
                {/* Test comment here */}
                <h2>Please enter a Store</h2>
                <input
                    type="text"
                    ref={this.myInput}
                    required
                    placeholder="Store name"
                    defaultValue={getFunName()}
                />
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

export default StorePicker;