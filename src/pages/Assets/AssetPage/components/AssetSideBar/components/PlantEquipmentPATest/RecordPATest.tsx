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

const RecordPATest = (props: {
    plantEquipmentID: number,
    paTestFrequency: number,
    show: boolean,
    hideFunc: () => void,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>
}) => {

    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [patTestAttributes, setPatTestAttributes] = useState({
        last_pa_test: new Date()
    })
    
    const recordPATest = () => {
        putAPI(`assets/${props.plantEquipmentID}/record_pa_test`, {}, {
            next_pa_test: getMonthRelativeDate(patTestAttributes.last_pa_test, props.paTestFrequency)
        }, (response: any) => {
            const plantEquipmentData: AssetResponseData = response.data;
            props.setPlantEquipmentData(plantEquipmentData);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay 
            title={"Record PA Test"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
            footer={<SubmitButton 
                text={"Record PA Test"} 
                color='light-green'
                iconFont="domain_verification"
                submitting={isUpdating}
                submittingText="Recording..."
                clickFunc={recordPATest}  
            />}
        >
            <p>Select the previous PA test date for this plant/tools.</p>
            <InfoGrid>
                <GridItem title='PA Test Date'>
                    <DateInput
                        name="last_pa_test"
                        value={patTestAttributes.last_pa_test}
                        label="PA test date"
                        updateFunc={(date, name) => updateStateDateParams(date, name, setPatTestAttributes)}
                        required
                    />
                </GridItem>
            </InfoGrid>
            
        </WindowOverlay>
    )
}

export default RecordPATest