import { useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import FilterSelect, { FilterSelection } from "../../../../components/ui/FilterSelect/FilterSelect";
import putAPI from "../../../../utils/putAPI";
import getQuotedEquipmentStatusIcon from "../../utils/getQuotedEquipmentStatusIcon";
import getQuotedEquipmentStatusTitle from "../../utils/getQuotedEquipmentStatusTitle";
import getQuotedEquipmentStatusColor from "../../utils/getQuotedEquipmentStatusColor";

const SelectQuotedEquipmentStatus = (props: {
    quotedEquipmentID: number,
    quotedEquipmentStatus: number,
    getQuotedEquipment: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>([
        {
            text: getQuotedEquipmentStatusTitle(0),
            value: 0,
            iconFont: getQuotedEquipmentStatusIcon(0),
            color: getQuotedEquipmentStatusColor(0),
            selected: props.quotedEquipmentStatus === 0
        },
        {
            text: getQuotedEquipmentStatusTitle(1),
            value: 1,
            iconFont: getQuotedEquipmentStatusIcon(1),
            color: getQuotedEquipmentStatusColor(1),
            selected: props.quotedEquipmentStatus === 1
        },
        {
            text: getQuotedEquipmentStatusTitle(2),
            value: 2,
            iconFont: getQuotedEquipmentStatusIcon(2),
            color: getQuotedEquipmentStatusColor(2),
            selected: props.quotedEquipmentStatus === 2
        },
    ]);

    var selectOption = selectOptions.find(selection => selection.selected)?.value;

    const updateStatus = () => {
        putAPI(`quoted_equipment/${props.quotedEquipmentID}/update_status`, {}, {
            status: selectOption
        }, () => {
            props.getQuotedEquipment();
            props.hideFunc();
        }, setIsUpdating);
    }

    return (
        <WindowOverlay
            title='Select Equipment Quote Status'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={400}
            footer={<SubmitButton
                text="Select Status"
                clickFunc={updateStatus}
                iconFont="label"
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem title='Status'>
                    <FilterSelect
                        selections={selectOptions}
                        selectionSetter={setSelectOptions}
                    />                
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default SelectQuotedEquipmentStatus