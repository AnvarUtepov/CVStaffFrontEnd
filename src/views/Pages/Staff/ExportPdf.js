import React, { Component } from 'react';
import { Button } from "primereact/button";
import { Font, PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Table, TableCell, TableHeader, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';

// Register font
Font.register({
    family: 'Roboto',
    src: '/assets/fonts/roboto-medium-webfont.ttf'
});

// Create styles
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Roboto',
        fontSize: 12,
        paddingTop: 20,
        margin: 10,
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 5,
        flexDirection: 'row',
    },
    text: {
        marginRight: 10,
        fontWeight: "normal",
    },
    title: {
        textAlign: "center"
    },
    table: {
        margin: 10,
        padding: 10
    },
    tableCell: {
        margin: 5,
        padding: 5
    }
});

// Create Document Component
const MyDocument = (props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.title}>
                <Text>Резюме</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Ф.И.О.:</Text>
                <Text>{props.Item.fio}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Дата рождения:</Text>
                <Text>{props.Item.birthDate.toLocaleDateString()}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Национальность:</Text>
                <Text>
                    {props.spEducations.filter(x => x.value === props.Item.spNationId)[0].label}
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Телефон:</Text>
                <Text>
                    {props.Item.phone}
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Почта:</Text>
                <Text>
                    {props.Item.email}
                </Text>
            </View>
            <View style={styles.title}>
                <Text>Образование</Text>
            </View>
            <View style={styles.table}>
                <Table
                    data={props.Item.educations}
                >
                    <TableHeader>
                        <TableCell>
                            Учебное заведение
                        </TableCell>
                        <TableCell >
                            Год окончания
                        </TableCell>
                        <TableCell >
                            Образование
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell getContent={(r) => r.place} />
                        <DataTableCell getContent={(r) => r.yearOfDone} />
                        <DataTableCell getContent={(r) => props.spEducations.filter(x => x.value === r.spEducationId)[0].label} />
                    </TableBody>
                </Table>
            </View>
            <View style={styles.title}>
                <Text>Место работы</Text>
            </View>
            <View style={styles.table}>
                <Table
                    data={props.Item.jobs}
                >
                    <TableHeader>
                        <TableCell>
                            Учреждение
                        </TableCell>
                        <TableCell >
                            Год начало работы
                        </TableCell>
                        <TableCell >
                            Год окончания работы
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell getContent={(r) => r.place} />
                        <DataTableCell getContent={(r) => r.yearOfBegin} />
                        <DataTableCell getContent={(r) => r.yearOfEnd} />
                    </TableBody>
                </Table>
            </View>
        </Page>
    </Document>
);

class ExportPdfPage extends Component {

    render() {
        console.log(this.props);
        const btnExport = (
            <Button
                label="Экспорт Pdf"
                className="p-button-danger"
                icon="pi pi-file-pdf"
            />)
        return (
            <PDFDownloadLink document={<MyDocument {...this.props} />} fileName="cv.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Загрузка...' : btnExport)}
            </PDFDownloadLink>
        )
    }
}

export default ExportPdfPage;


