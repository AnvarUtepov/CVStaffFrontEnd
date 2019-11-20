import React, { Component } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

class CSpinner extends Component {
    render() {
        return (
            <div>
                <div className="loadingBack" />
                <div className="loading">
                    <ProgressSpinner />{" "}
                </div>
            </div>
        );
    }
}

export default CSpinner;
