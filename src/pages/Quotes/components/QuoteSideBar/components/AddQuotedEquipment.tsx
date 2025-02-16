import { useState } from "react";
import EquipmentSelect from "../../../../../components/form/SiteSelect/EquipmentSelect";
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EquipmentResponseData } from "../../../../../types/equipment.types";
import postAPI from "../../../../../utils/postAPI";
import { useSearchParams } from "react-router-dom";
import { QuotedEquipmentResponseData } from "../../../../../types/quotedEquipment.types";

const AddQuotedEquipment = (props: {
    quoteID: number,
    siteID: number,
    getQuotedEquipment: (quoteID: number) => void
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateLocation = (quotedEquipmentID: number) => {
        searchParams.set('quoted_equipment_id', quotedEquipmentID.toString());
        setSearchParams(searchParams);
    } 

    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentResponseData>();
    
    const addEquipmentQuote = () => {
        setHasSubmitted(true);
        postAPI(`quoted_equipment/create`, {}, {
            quote_id: props.quoteID,
            equipment_id: selectedEquipment ? selectedEquipment.id : null,
            site_id: props.siteID,
        }, (response: any) => {
            const quotedEquipmentData: QuotedEquipmentResponseData = response.data;
            props.hideFunc();
            props.getQuotedEquipment(props.quoteID);
            updateLocation(quotedEquipmentData.id);
        }, setIsUpdating);
    }

    return (
        <WindowOverlay 
            title={"Add Equipment Quote"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton 
                text={"Add Equipment Quote"} 
                iconFont="add"
                submitting={isUpdating}
                submittingText="Adding..."
                clickFunc={addEquipmentQuote}            
            />} 
        >
            <InfoGrid>
                <GridItem title='Equipment'>
                    <EquipmentSelect 
                        selectedEquipment={selectedEquipment} 
                        setSelectedEquipment={setSelectedEquipment} 
                        siteID={props.siteID}
                        hasSubmitted={hasSubmitted}
                        showUnknown
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default AddQuotedEquipment