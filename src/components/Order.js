import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

const Order = ({ fishes, order, removeFromOrder }) => {
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((prevTotal, key) => {
        const fish = fishes[key];
        const count = order[key];
        const isAvaialable = fish && fish.status === 'available';

        if (isAvaialable) {
            return prevTotal + (count * fish.price);
        }
        return prevTotal;
    }, 0)

    const renderOrder = (key) => {
        const fish = fishes[key];
        const count = order[key];
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 250, exit: 250 }
        }
        
        if (!fish) return null;
        if (fish.status !== 'available') {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>Sorry, {fish && fish.name} is no longer unavailable!</li>
                </CSSTransition>
            )
        }
        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={count} timeout={{ enter: 250, exit: 250 }}>
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name}
                        {formatPrice(count * fish.price)}
                        <button onClick={() => removeFromOrder(key)} title="Remove item">X</button>
                    </span>
                </li>
            </CSSTransition>
        )
    }

    return (
        <div className="order-wrap" >
            <h2>Orders!!</h2>
            <TransitionGroup className="order" component="ul">
                {orderIds.map(renderOrder)}
            </TransitionGroup>
            <div className="total">
                Total: <strong>{formatPrice(total)}</strong>
            </div>
        </div>
    )
}

Order.propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
}

export default Order;