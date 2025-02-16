import { Dispatch, SetStateAction, useState } from "react";
import DeactivateModule from "../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { EquipmentResponseData } from "../../../../../../types/equipment.types";
import putAPI from "../../../../../../utils/putAPI";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";

const EquipmentDeactivate = (props: {
    equipmentID: number,
    reactivate: boolean,
    setEquipmentData: Dispatch<SetStateAction<EquipmentResponseData | undefined>>,
    ticketCount: number,
    quotesCount: number
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateSite = () => {
        putAPI(`equipment/${props.equipmentID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const siteData: EquipmentResponseData = response.data;
            props.setEquipmentData(siteData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    const hasOpen = (props.ticketCount + props.quotesCount) > 0;

    return (
        <>
            <DeactivateModule
                resourceName="Equipment"
                reactivate={props.reactivate}
                showFunc={() => setShowDeactivate(true)}
            />

            {hasOpen ?
                <WindowOverlay 
                    title={'Deactivate Equipment'} 
                    maxWidth={300} 
                    show={showDeactivate} 
                    hideFunc={() => setShowDeactivate(false)} 
                >
                    <p>Deactivate is disabled as the equipment still has open {props.ticketCount > 0 ? 'tickets' : ''} {(props.ticketCount > 0 && props.quotesCount > 0) ? 'and' : ''} {props.quotesCount > 0 ? 'quotes' : ''}.</p>
                    <p>Close all {props.ticketCount > 0 ? `${props.ticketCount} open tickets` : ''} {(props.ticketCount > 0 && props.quotesCount > 0) ? 'and' : ''} {props.quotesCount > 0 ? `${props.quotesCount} open quotes` : ''} to deactivate this equipment.</p>
                </WindowOverlay>
                :
                <DeactivateOverlay 
                    resourceName="Equipment"
                    reactivate={props.reactivate} 
                    show={showDeactivate} 
                    hideFunc={() => setShowDeactivate(false)} 
                    isSubmitting={isDeactivating} 
                    submitFunc={deactivateSite}
                />
            }   
        </>
    )
}

export default EquipmentDeactivate