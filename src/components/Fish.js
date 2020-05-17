import React from "react";
import { formatPrice } from "../helpers";
import PropTypes from "prop-types";

const Fish = ({ details, addToOrder, index }) => {
    const { image, name, price, desc, status } = details;
    const isAvailable = () => status === 'available';
    return (
        <li className="menu-fish" >
            <img src={image} alt={name} />
            <h3 className="fish-name">
                {name}
                <span className="price">{formatPrice(price)}</span>
            </h3>
            <p>{desc}</p>
            <button disabled={!isAvailable()} onClick={() => addToOrder(index)}>{isAvailable() ? "Add to Cart" : "Sold Out!"}</button>
        </li>
    )
}

Fish.propTypes = {
    details: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        desc: PropTypes.string,
        status: PropTypes.string
    }),
    addToOrder: PropTypes.func
}

export default Fish;