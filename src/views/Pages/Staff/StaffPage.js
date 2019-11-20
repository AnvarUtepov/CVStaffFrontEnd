import React, { Component } from 'react';
import { Growl } from 'primereact/growl';
import StaffList from "./StaffList";
import StaffView from './StaffView';

class StaffPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDialog: false,
            selItem: null,
            refreshList: false
        };
    }
    selItem = (e) => {
        //console.log(e);
        if (e != null) {
            this.setState({
                selItem: e.value,
                displayDialog: true
            });
        } else {
            this.setState({
                selItem: null,
                displayDialog: true
            });
        }
    }
    onSaveDialog = () => {
        this.onCloseDialog(false);
        this.setState({
            refreshList: true
        });
        this.setState({
            refreshList: false
        });
        this.growl.show({ severity: 'success', summary: 'Успешно!', detail: 'Данные сохранены!' });
    }
    onCloseDialog = (event) => {
        this.setState({
            displayDialog: event
        });
    }
    render() {
        return (
            <div>
                <StaffList
                    selItem={this.selItem}
                    refreshList={this.state.refreshList}
                />
                <StaffView
                    selItem={this.state.selItem}
                    displayDialog={this.state.displayDialog}
                    onCloseDialog={this.onCloseDialog}
                    onSaveDialog={this.onSaveDialog}
                />
                <Growl ref={(el) => this.growl = el} />
            </div>
        )
    }
}

export default StaffPage;
