import { Dispatch, SetStateAction, useState } from "react";
import DeactivateModule from "../../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { RefrigerantResponseData } from "../../../../../../../types/refrigerant.types";
import putAPI from "../../../../../../../utils/putAPI";

const RefrigerantDeactivate = (props: {
    refrigerantID: number,
    setRefrigerantData: Dispatch<SetStateAction<RefrigerantResponseData | undefined>>,
    reactivate: boolean
}) => {

    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateRefrigerant = () => {
        putAPI(`refrigerants/${props.refrigerantID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const refrigerantData: RefrigerantResponseData = response.data;
            props.setRefrigerantData(refrigerantData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName="Refrigerant, Gas/Air"
                reactivate={props.reactivate}
                showFunc={() => setShowDeactivate(true)}
            />

            <DeactivateOverlay 
                resourceName="Refrigerant, Gas/Air"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateRefrigerant}
            />
        </>
    )
}

export default RefrigerantDeactivate