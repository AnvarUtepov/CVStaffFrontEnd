import React, { Component } from "react";
import { StaffService } from "../../../store/apiServices/StaffService";
import { SPNationService } from "../../../store/apiServices/SPNationService";
import { SPEducationService } from "../../../store/apiServices/SPEducationService";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Table, Card, CardHeader, CardBody, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, } from "reactstrap";
import PropTypes from "prop-types";
import { convToDate, required, isRequired, isRequiredNotZero, isEmail, email, requiredNotZero, isIntervLengthStr, intervLengthStr } from "../../../helpers/validations";
import ExportPdfPage from "./ExportPdf";

class StaffView extends Component {
    constructor(props) {
        super(props);
        const ItemNull = {
            id: 0,
            fio: "",
            birthDate: "",
            spNationId: 0,
            phone: "",
            email: "",
            educations: [],
            jobs: [],
            eduId: 0,
            eduPlace: "",
            eduYear: "",
            eduSPEduId: 0,
            jobId: 0,
            jobPlace: "",
            jobYearOfBegin: "",
            jobYearOfEnd: "",
        };
        this.state = {
            formValid: false,
            eduFormValid: false,
            jobFormValid: false,
            spNations: null,
            spEducations: null,
            Item: ItemNull,
            ItemDefault: ItemNull
        };
        this.StaffService = new StaffService();
        this.SPNationService = new SPNationService();
        this.SPEducationService = new SPEducationService();
    }
    componentDidMount() {
        this.SPNationService.GetSelectList().then(data => {
            this.setState({
                spNations: data
            });
        });
        this.SPEducationService.GetSelectList().then(data => {
            this.setState({
                spEducations: data
            });
        });
    }
    handleChange = (event) => {
        //console.log(event);
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
        if (required(this.state.Item.fio) ||
            !email(this.state.Item.email) ||
            required(this.state.Item.birthDate) ||
            required(this.state.Item.phone) ||
            requiredNotZero(this.state.Item.spNationId) ||
            !intervLengthStr(this.state.Item.fio, 1, 250)
        ) {
            this.setState({
                formValid: false
            });
        } else {
            this.setState({
                formValid: true
            });
        }
        if (required(this.state.Item.eduPlace) ||
            required(this.state.Item.eduYear) ||
            requiredNotZero(this.state.Item.eduSPEduId)
        ) {
            this.setState({
                eduFormValid: false
            });
        } else {
            this.setState({
                eduFormValid: true
            });
        }
        if (required(this.state.Item.jobPlace) ||
            required(this.state.Item.jobYearOfBegin) ||
            required(this.state.Item.jobYearOfEnd)
        ) {
            this.setState({
                jobFormValid: false
            });
        } else {
            this.setState({
                jobFormValid: true
            });
        }
    }
    handleSubmit = () => {
        this.setState({
            Item: {
                ...this.state.Item,
                birthDate: convToDate(this.state.Item.birthDate)
            }
        },
            () => {
                this.StaffService.AddUpdateItem(this.state.Item)
                    .then(data => {
                        this.props.onSaveDialog();
                        // this.setState({
                        //     Item: this.state.ItemDefault
                        // });
                    });
            }
        );

    }
    handleDelete = () => {
        // eslint-disable-next-line no-restricted-globals
        var isConfirmed = confirm("Вы уверены что хотите удалить запись?");
        if (isConfirmed) {
            this.StaffService.DeleteItem(this.state.Item.id)
                .then(data => {
                    this.props.onSaveDialog();
                });
        }
    }
    handleSubmitEdu = () => {
        this.setState({
            Item: {
                ...this.state.Item,
                educations: [
                    ...this.state.Item.educations,
                    {
                        id: Math.max(this.state.Item.educations.map(x => x.id)) + 1,
                        place: this.state.Item.eduPlace,
                        yearOfDone: this.state.Item.eduYear,
                        spEducationId: this.state.Item.eduSPEduId
                    }
                ]
            }
        }, () => {
            this.setState({
                Item: {
                    ...this.state.Item,
                    eduId: Math.max(this.state.Item.educations.map(x => x.id)) + 1,
                    eduPlace: "",
                    eduYear: "",
                    eduSPEduId: 0
                }
            }, () => {
                this.formValid();
            });
        });
    }
    handleSubmitJob = () => {
        this.setState({
            Item: {
                ...this.state.Item,
                jobs: [
                    ...this.state.Item.jobs,
                    {
                        id: Math.max(this.state.Item.jobs.map(x => x.id)) + 1,
                        place: this.state.Item.jobPlace,
                        yearOfBegin: this.state.Item.jobYearOfBegin,
                        yearOfEnd: this.state.Item.jobYearOfEnd,
                    }
                ]
            }
        }, () => {
            this.setState({
                Item: {
                    ...this.state.Item,
                    jobId: Math.max(this.state.Item.jobs.map(x => x.id)) + 1,
                    jobPlace: "",
                    jobYearOfBegin: "",
                    jobYearOfEnd: "",
                }
            }, () => {
                this.formValid();
            });
        });
    }
    deleteFromEducations = (valueId) => {
        // eslint-disable-next-line no-restricted-globals
        var isConfirmed = confirm("Вы уверены что хотите удалить запись?");
        if (isConfirmed) {
            this.setState({
                Item: {
                    ...this.state.Item,
                    educations: this.state.Item.educations.filter(x => x.id !== valueId)
                }
            });
        }
    }
    deleteFromJobs = (valueId) => {
        // eslint-disable-next-line no-restricted-globals
        var isConfirmed = confirm("Вы уверены что хотите удалить запись?");
        if (isConfirmed) {
            this.setState({
                Item: {
                    ...this.state.Item,
                    jobs: this.state.Item.jobs.filter(x => x.id !== valueId)
                }
            });
        }
    }
    render() {
        const eduTable = (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify" /> Образования
                    </CardHeader>
                <CardBody>
                    <FormGroup row className="m-2 p-2">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Учебное заведение</th>
                                    <th>Год окончания</th>
                                    <th>Образование</th>
                                    <th>Команда</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Item.educations.map((item) =>
                                    <tr key={item.id}>
                                        <td>
                                            {item.place}
                                        </td>
                                        <td>
                                            {item.yearOfDone}
                                        </td>
                                        <td>
                                            {this.state.spEducations.filter(x => x.value === item.spEducationId)[0].label}
                                        </td>
                                        <td>
                                            <Button
                                                label="Удалить"
                                                className="p-button-danger pull-right"
                                                icon="pi pi-trash"
                                                onClick={() => this.deleteFromEducations(item.id)}
                                            />
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td>
                                        <Input
                                            type="text"
                                            name="eduPlace"
                                            required
                                            value={this.state.Item.eduPlace}
                                            onChange={this.handleChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            type="text"
                                            name="eduYear"
                                            required
                                            value={this.state.Item.eduYear}
                                            onChange={this.handleChange}
                                        />
                                    </td>
                                    <td>
                                        <Dropdown
                                            style={{ width: "100%" }}
                                            name="eduSPEduId"
                                            value={this.state.Item.eduSPEduId}
                                            options={this.state.spEducations}
                                            onChange={this.handleChange}
                                            placeholder="Выберите"
                                            required
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            label="Добавить"
                                            className="p-button-primary pull-right"
                                            icon="pi pi-plus"
                                            disabled={!this.state.eduFormValid}
                                            onClick={this.handleSubmitEdu}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </FormGroup>
                </CardBody>
            </Card>
        );
        const jobTable = (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify" /> Место работы
        </CardHeader>
                <CardBody>
                    <FormGroup row className="m-2 p-2">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Учреждение</th>
                                    <th>Год начало работы</th>
                                    <th>Год окончания работы</th>
                                    <th>Команда</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Item.jobs.map((item) =>
                                    <tr key={item.id}>
                                        <td>
                                            {item.place}
                                        </td>
                                        <td>
                                            {item.yearOfBegin}
                                        </td>
                                        <td>
                                            {item.yearOfEnd}
                                        </td>
                                        <td>
                                            <Button
                                                label="Удалить"
                                                className="p-button-danger pull-right"
                                                icon="pi pi-trash"
                                                onClick={() => this.deleteFromJobs(item.id)}
                                            />
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td>
                                        <Input
                                            type="text"
                                            name="jobPlace"
                                            required
                                            value={this.state.Item.jobPlace}
                                            onChange={this.handleChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            type="text"
                                            name="jobYearOfBegin"
                                            required
                                            value={this.state.Item.jobYearOfBegin}
                                            onChange={this.handleChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            type="text"
                                            name="jobYearOfEnd"
                                            required
                                            value={this.state.Item.jobYearOfEnd}
                                            onChange={this.handleChange}
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            label="Добавить"
                                            className="p-button-primary pull-right"
                                            icon="pi pi-plus"
                                            disabled={!this.state.jobFormValid}
                                            onClick={this.handleSubmitJob}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </FormGroup>
                </CardBody>
            </Card>
        );
        const footer = (
            <div>
                {this.state.Item.id !== 0 ?
                    (<>
                        <Button
                            label="Удалить"
                            className="p-button-danger pull-left"
                            icon="pi pi-trash"
                            onClick={this.handleDelete}
                        />
                        <ExportPdfPage {...this.state} />
                    </>
                    ) : ""}
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
                    className='dialog-max-size'
                    header={"Резюме сотрудника: " + this.state.Item.fio}
                    visible={this.props.displayDialog}
                    modal={true}
                    footer={footer}
                    onHide={() => this.props.onCloseDialog(false)}
                >
                    <Form className="was-validated" onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label sm={3}>Ф.И.О.</Label>
                            <Col sm={9}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-user"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        className={isIntervLengthStr(this.state.Item.fio, 1, 250)}
                                        type="text"
                                        name="fio"
                                        required
                                        value={this.state.Item.fio}
                                        onChange={this.handleChange}
                                    />
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Дата рождения</Label>
                            <Col sm={9}>
                                <Calendar
                                    className={isRequired(this.state.Item.birthDate)}
                                    readOnlyInput={true}
                                    dateFormat="dd.mm.yy"
                                    value={this.state.Item.birthDate}
                                    showIcon={true}
                                    name="birthDate"
                                    onChange={this.handleChange}
                                    monthNavigator={true}
                                    yearNavigator={true}
                                    yearRange="1910:2019"
                                    required />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Национальность</Label>
                            <Col sm={9}>
                                <Dropdown
                                    className={isRequiredNotZero(this.state.Item.spNationId)}
                                    style={{ width: "100%" }}
                                    name="spNationId"
                                    value={this.state.Item.spNationId}
                                    options={this.state.spNations}
                                    onChange={this.handleChange}
                                    placeholder="Выберите"
                                    required
                                />
                            </Col>
                        </FormGroup>


                        <FormGroup row>
                            <Label sm={3}>Телефон</Label>
                            <Col sm={9}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-phone"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <InputMask
                                        className={"form-control " + isRequired(this.state.Item.phone)}
                                        mask="(999) 99-999-99-99"
                                        name="phone"
                                        required
                                        value={this.state.Item.phone}
                                        placeholder="(999) 99-999-99-99"
                                        onChange={this.handleChange}>
                                    </InputMask>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Почта</Label>
                            <Col sm={9}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-envelope"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        className={isEmail(this.state.Item.email)}
                                        type="text"
                                        name="email"
                                        required
                                        value={this.state.Item.email}
                                        onChange={this.handleChange}
                                    />
                                </InputGroup>
                            </Col>
                        </FormGroup>
                    </Form>
                    {eduTable}
                    {jobTable}
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
            this.StaffService
                .GetItemById(this.props.selItem.id)
                .then(data => {
                    data.birthDate = new Date(data.birthDate);
                    //console.log(data);
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

StaffView.propTypes = {
    displayDialog: PropTypes.bool.isRequired,
    onCloseDialog: PropTypes.func.isRequired,
    onSaveDialog: PropTypes.func.isRequired
};

export default StaffView;
