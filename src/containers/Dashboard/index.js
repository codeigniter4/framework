import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "../../components/list/"


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <React.Fragment>
              Dashboard
              <List/>
            </React.Fragment>
        );
    }
}

export default Dashboard;
