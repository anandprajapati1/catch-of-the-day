import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StorePicker from "./StorePicker";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path="/" component={StorePicker} />
            <Route exact path="/store/:storeId" component={App} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;