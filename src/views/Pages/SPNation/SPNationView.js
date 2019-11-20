import React, { Component } from "react";
import { SPNationService } from "../../../store/apiServices/SPNationService";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import { required, isIntervLengthStr, intervLengthStr } from "../../../helpers/validations";

class SPNationView extends Component {
    constructor(props) {
        super(props);
        const ItemNull = {
            id: 0,
            nameRu: "",
            nameUz: "",
        };
        this.state = {
            formValid: false,
            Item: ItemNull,
            ItemDefault: ItemNull
        };
        this.spNationService = new SPNationService();
    }
    componentDidMount() { }
    handleChange = (event) => {
        this.setState(
            {
                Item: {
                    ...this.state.Item,
                    [event.target.name]: event.target.value
                }
            },
            () => this.formValid()
        );
    }
    formValid = () => {
        if (required(this.state.Item.nameRu) ||
            !intervLengthStr(this.state.Item.nameRu, 1, 100)) {
            this.setState({
                formValid: false
            });
        } else {
            this.setState({
                formValid: true
            });
        }
    }
    handleSubmit = () => {
        this.spNationService.AddUpdateItem(this.state.Item)
            .then(data => {
                this.props.onSaveDialog();
            });
    }
    handleDelete = () => {
        // eslint-disable-next-line no-restricted-globals
        var isConfirmed = confirm("Вы уверены что хотите удалить запись?");
        if (isConfirmed) {
            this.spNationService.DeleteItem(this.state.Item.id)
                .then(data => {
                    this.props.onSaveDialog();
                });
        }
    }
    render() {
        const footer = (
            <div>
                {this.state.Item.id !== 0 ?
                    <Button
                        label="Удалить"
                        className="p-button-danger pull-left"
                        icon="pi pi-trash"
                        onClick={this.handleDelete}
                    /> : ""}
                <Button
                    label="Сохранить"
                    className="p-button-success"
                    icon="pi pi-check"
                    disabled={!this.state.formValid}
                    onClick={this.handleSubmit}
                />
                <Button
                    label="Отменить"
                    className="p-button-secondary"
                    icon="pi pi-times"
                    onClick={() => this.props.onCloseDialog(false)}
                />
            </div>
        );
        return (
            <div>
                <Dialog
                    style={{ width: '60vw' }}
                    header={"Национальность " + this.state.Item.title}
                    visible={this.props.displayDialog}
                    modal={true}
                    footer={footer}
                    onHide={() => this.props.onCloseDialog(false)}
                >
                    <Form className="was-validated" onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label sm={3}>Название на рус</Label>
                            <Col sm={9}>
                                <Input
                                    className={isIntervLengthStr(this.state.Item.nameRu, 1, 100)}
                                    type="text"
                                    name="nameRu"
                                    required
                                    value={this.state.Item.nameRu}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Название на узб</Label>
                            <Col sm={9}>
                                <Input
                                    type="text"
                                    name="nameUz"
                                    value={this.state.Item.nameUz}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                </Dialog>
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (
            (this.props.selItem != null && prevProps.selItem == null) ||
            (this.props.selItem != null &&
                this.props.selItem.id !== prevProps.selItem.id)
        ) {
            this.spNationService
                .GetItemById(this.props.selItem.id)
                .then(data => {
                    this.setState({
                        formValid: true,
                        Item: data
                    });
                });
        }
        if (
            this.props.selItem == null &&
            this.props.displayDialog &&
            this.state.Item.id !== 0
        ) {
            this.setState({
                Item: this.state.ItemDefault
            });
        }
    }
}

SPNationView.propTypes = {
    displayDialog: PropTypes.bool.isRequired,
    onCloseDialog: PropTypes.func.isRequired,
    onSaveDialog: PropTypes.func.isRequired
};

export default SPNationView;
