import { Dispatch, SetStateAction, useState } from "react"
import DeactivateModule from "../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { DescriptionOfWorksResponseData } from "../../../../types/descriptionOfWorks.types";
import putAPI from "../../../../utils/putAPI";

const DescriptionOfWorksDeactivate = (props: {
    descriptionOfWorksID: number,
    reactivate: boolean,
    setDescriptionOfWorksData: Dispatch<SetStateAction<DescriptionOfWorksResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateDescriptionOfWorks = () => {
        putAPI(`description_of_works/${props.descriptionOfWorksID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const descriptionOfWorksData: DescriptionOfWorksResponseData = response.data;
            props.setDescriptionOfWorksData(descriptionOfWorksData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Description of Works'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Description of Works"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateDescriptionOfWorks}/>
        </>

    )
}

export default DescriptionOfWorksDeactivate