import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { SPEducationService } from "../../../store/apiServices/SPEducationService";
import CSpinner from "../../../helpers/CSpinner";
import { Card, CardBody, CardHeader } from "reactstrap";
import PropTypes from "prop-types";

class SPEducationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selItem: null,
            items: [],
            loading: true,
            totalItems: 0,
            filterObj: {
                first: 0,
                rows: 10,
                sortField: null,
                sortOrder: null,
                filters: null
            }
        };
        this.spEducationService = new SPEducationService();
    }
    componentDidMount() {
        this.onLoadLazy();
    }
    onPage = (event) => {
        this.setState({
            loading: true
        });
        if (event.first !== undefined) {
            this.setState(
                {
                    filterObj: {
                        ...this.state.filterObj,
                        first: event.first,
                        rows: event.rows
                    }
                },
                () => this.onLoadLazy()
            );
        }
        if (event.sortField !== undefined) {
            this.setState(
                {
                    filterObj: {
                        ...this.state.filterObj,
                        sortField: event.sortField,
                        sortOrder: event.sortOrder
                    }
                },
                () => this.onLoadLazy()
            );
        }
        if (event.filters !== undefined) {
            if (Object.keys(event.filters).length !== 0) {
                let key = Object.keys(event.filters)[0];
                let value = event.filters[Object.keys(event.filters)[0]].value;
                this.setState(
                    {
                        filterObj: {
                            ...this.state.filterObj,
                            filters: {
                                ...this.state.filterObj.filters,
                                [key]: value
                            }
                        }
                    },
                    () => this.onLoadLazy()
                );
            } else {
                this.setState(
                    {
                        filterObj: {
                            ...this.state.filterObj,
                            filters: {}
                        }
                    },
                    () => this.onLoadLazy()
                );
            }
        }
    }
    onLoadLazy = () => {
        this.spEducationService
            .GetAllList(this.state.filterObj)
            .then(data => {
                this.setState({
                    totalItems: data.totalItems,
                    items: data.items,
                    loading: false
                });
            });
    }

    render() {
        var header = (
            <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
                <span>Справочник образования</span>
                <Button className="p-button-primary"
                    label="Добавить"
                    icon="pi pi-plus"
                    style={{ float: "left" }}
                    onClick={() => {
                        this.props.selItem(null);
                    }}
                />
            </div>
        );

        return (
            <div className="animated fadeIn">
                {this.state.loading && <CSpinner />}
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify" /> Образования
                    </CardHeader>
                    <CardBody>
                        <DataTable
                            ref={el => (this.dt = el)}
                            value={this.state.items}
                            paginator={true}
                            rows={this.state.filterObj.rows}
                            totalRecords={this.state.totalItems}
                            lazy={true}
                            first={this.state.filterObj.first}
                            onPage={this.onPage}
                            onSort={this.onPage}
                            sortField={this.state.filterObj.sortField}
                            sortOrder={this.state.filterObj.sortOrder}
                            onFilter={this.onPage}
                            resizableColumns={true}
                            responsive={true}
                            selectionMode="single"
                            onSelectionChange={this.props.selItem}
                            selection={this.state.selItem}
                            loading={this.state.loading}
                            emptyMessage="Нет данных"
                            header={header}
                        >
                            <Column field="id" header="id" style={{ width: "5%" }} />
                            <Column
                                field="nameRu"
                                header="Название на рус."
                                sortable={true}
                                filter={true}
                            />
                            <Column
                                field="nameUz"
                                header="Название на узб."
                                sortable={true}
                                filter={true}
                            />
                        </DataTable>
                    </CardBody>
                </Card>
            </div>
        );
    }
    componentDidUpdate(prevProps) {
        if (this.props.refreshList != null && this.props.refreshList) {
            this.onLoadLazy();
        }
    }
}
SPEducationList.propTypes = {
    refreshList: PropTypes.bool.isRequired
};

export default SPEducationList;
