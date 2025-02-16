import { useState } from "react";
import GridItem from "../Containers/GridItem/GridItem";
import InfoGrid from "../Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../Containers/WindowOverlay/WindowOverlay"
import FilterSelect, { FilterSelection } from "../FilterSelect/FilterSelect";
import SubmitButton from "../../form/SubmitButton/SubmitButton";

const ExportTableData = (props: {
    show: boolean,
    hideFunc: () => void,
    exportToExcel: () => void,
    exportToJSON: () => void,
    exportToPDF: () => void,
}) => {
    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>([
        {
            text: 'Excel',
            value: 'excel',
            iconFont: 'table_view',
            selected: true
        },
        {
            text: 'JSON',
            value: 'json',
            iconFont: 'data_object',
        },
        {
            text: 'PDF',
            value: 'pdf',
            iconFont: 'picture_as_pdf',
        }
    ]);

    const fileType =  selectOptions.find(selection => selection.selected)?.value;

    const exportData = () => {
        props.hideFunc();
        if (fileType === 'json') {
            props.exportToJSON();
        } else if (fileType === 'pdf') {
            props.exportToPDF();
        } else {
            props.exportToExcel();
        }
    }

    return (
        <WindowOverlay 
            title="Export Table Data"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton 
                text={"Export Data"} 
                clickFunc={exportData}
                iconFont="file_download"
            />}
        >
            <InfoGrid>
                <GridItem title='Export To' span={2}>
                    <FilterSelect
                        selections={selectOptions}
                        selectionSetter={setSelectOptions}
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default ExportTableData