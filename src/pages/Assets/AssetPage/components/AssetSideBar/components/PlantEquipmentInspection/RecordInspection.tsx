import { Dispatch, SetStateAction, useState } from "react";
import DateInput from "../../../../../../../components/form/DateInput/DateInput";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { AssetResponseData } from "../../../../../../../types/asset.types";
import getMonthRelativeDate from "../../../../../../../utils/getMonthRelativeDate";
import putAPI from "../../../../../../../utils/putAPI";
import updateStateDateParams from "../../../../../../../utils/updateStateParams/updateStateDateParams";

const RecordInspection = (props: {
    plantEquipmentID: number,
    inspectionFrequency: number,
    show: boolean,
    hideFunc: () => void,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>
}) => {

    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [patTestAttributes, setPatTestAttributes] = useState({
        last_inspection: new Date()
    })
    
    const recordInspection = () => {
        putAPI(`assets/${props.plantEquipmentID}/record_inspection`, {}, {
            next_inspection: getMonthRelativeDate(patTestAttributes.last_inspection, props.inspectionFrequency)
        }, (response: any) => {
            const plantEquipmentData: AssetResponseData = response.data;
            props.setPlantEquipmentData(plantEquipmentData);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay 
            title={"Record Inspection"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
            footer={<SubmitButton 
                text={"Record Inspection"} 
                color='light-green'
                iconFont="assignment_turned_in"
                submitting={isUpdating}
                submittingText="Recording..."
                clickFunc={recordInspection}  
            />}
        >
            <p>Select the previous inspection date for this plant/tools.</p>
            <InfoGrid>
                <GridItem title='Inspection Date'>
                    <DateInput
                        name="last_inspection"
                        value={patTestAttributes.last_inspection}
                        label="Inspection date"
                        updateFunc={(date, name) => updateStateDateParams(date, name, setPatTestAttributes)}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default RecordInspection