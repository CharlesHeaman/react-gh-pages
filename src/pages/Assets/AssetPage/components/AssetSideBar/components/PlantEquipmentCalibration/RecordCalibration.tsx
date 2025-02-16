import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { AssetResponseData } from "../../../../../../../types/asset.types";
import getYearRelativeDate from "../../../../../../../utils/getYearRelativeDate";
import putAPI from "../../../../../../../utils/putAPI";
import DateInput from "../../../../../../../components/form/DateInput/DateInput";
import updateStateDateParams from "../../../../../../../utils/updateStateParams/updateStateDateParams";
import getMonthRelativeDate from "../../../../../../../utils/getMonthRelativeDate";

const RecordCalibration = (props: {
    plantEquipmentID: number,
    calibrationTestFrequency: number,
    show: boolean,
    hideFunc: () => void,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>
}) => {

    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [patTestAttributes, setPatTestAttributes] = useState({
        last_calibration_test: new Date()
    })
    
    const recordCalibration = () => {
        putAPI(`assets/${props.plantEquipmentID}/record_calibration_test`, {}, {
            next_calibration_test: getMonthRelativeDate(patTestAttributes.last_calibration_test, props.calibrationTestFrequency)
        }, (response: any) => {
            const plantEquipmentData: AssetResponseData = response.data;
            props.setPlantEquipmentData(plantEquipmentData);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay 
            title={"Record Calibration"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
            footer={<SubmitButton 
                text={"Record Calibration"} 
                color='light-green'
                iconFont="compass_calibration"
                submitting={isUpdating}
                submittingText="Recording..."
                clickFunc={recordCalibration}  
            />}
        >
            <p>Select the previous calibration test date for this plant/tools.</p>
            <InfoGrid>
                <GridItem title='Calibration Test Date'>
                    <DateInput
                        name="last_calibration_test"
                        value={patTestAttributes.last_calibration_test}
                        label="Calibration test date"
                        updateFunc={(date, name) => updateStateDateParams(date, name, setPatTestAttributes)}
                        required
                    />
                </GridItem>
            </InfoGrid>
            
        </WindowOverlay>
    )
}

export default RecordCalibration