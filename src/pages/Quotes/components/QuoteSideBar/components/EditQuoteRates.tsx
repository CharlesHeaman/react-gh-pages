import { useEffect, useState } from "react";
import MoneyInput from "../../../../../components/form/MoneyInput/MoneyInput";
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { QuotedEquipmentResponseData } from "../../../../../types/quotedEquipment.types";
import putAPI from "../../../../../utils/putAPI";

const EditQuoteRates = (props: {
    quotedEquipment: QuotedEquipmentResponseData,
    getQuotedEquipment: () => void,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [engineerRate, setEngineerRate] = useState(props.quotedEquipment.data.engineer_rate.toString());
    const [mateRate, setMateRate] = useState(props.quotedEquipment.data.mate_rate.toString());
    const [mileageRate, setMileageRate] = useState(props.quotedEquipment.data.mileage_rate.toString());

    useEffect(() => {
        setEngineerRate(props.quotedEquipment.data.engineer_rate.toString());
        setMateRate(props.quotedEquipment.data.mate_rate.toString());
        setMileageRate(props.quotedEquipment.data.mileage_rate.toString());
    }, [props.quotedEquipment.data.engineer_rate, props.quotedEquipment.data.mate_rate, props.quotedEquipment.data.mileage_rate]);
    
    const assignToEngineer = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`quoted_equipment/${props.quotedEquipment.id}/update_rates`, {}, {
            engineer_rate: engineerRate,
            mate_rate: mateRate,
            mileage_rate: mileageRate
        }, () => {
            props.hideFunc();
            props.getQuotedEquipment();
        }, setIsUpdating)
    }

    const formComplete = (
        engineerRate.length > 0 &&
        mateRate.length > 0 &&
        mileageRate.length > 0
    );

    return (
        <WindowOverlay 
            title={"Edit Quote Rates"} 
            maxWidth={250} 
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton 
                text={"Update Rates"} 
                iconFont="currency_pound"
                disabled={hasSubmitted && !formComplete} 
                submitting={isUpdating}
                submittingText="Adding..."
                clickFunc={assignToEngineer}            
            />} 
        >
            <InfoGrid>
                <GridItem title='Engineer Rate'>
                    <MoneyInput 
                        name={"engineer_rate"} 
                        value={engineerRate} 
                        updateFunc={(event) => setEngineerRate(event.target.value)}
                        hasSubmitted={hasSubmitted}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title='Mate Rate'>
                    <MoneyInput 
                        name={"mate_rate"} 
                        value={mateRate} 
                        updateFunc={(event) => setMateRate(event.target.value)}
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
                <GridItem title='Mileage Rate'>
                    <MoneyInput 
                        name={"mileage_rate"} 
                        value={mileageRate} 
                        updateFunc={(event) => setMileageRate(event.target.value)}
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default EditQuoteRates