import { Dispatch, SetStateAction, useState } from "react"
import DeactivateModule from "../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { AdditionalTimeActivityResponseData } from "../../../../types/additionalTimeActivity.types";
import putAPI from "../../../../utils/putAPI";

const AdditionalTimeActivityDeactivate = (props: {
    additionalTimeActivityID: number,
    reactivate: boolean,
    setAdditionalTimeActivityData: Dispatch<SetStateAction<AdditionalTimeActivityResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateActivity = () => {
        putAPI(`additional_time_activity/${props.additionalTimeActivityID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const contactData: AdditionalTimeActivityResponseData = response.data;
            props.setAdditionalTimeActivityData(contactData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Activity'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Additional Time Activity"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateActivity}/>
        </>

    )
}

export default AdditionalTimeActivityDeactivate