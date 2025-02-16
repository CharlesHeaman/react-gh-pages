import { Dispatch, SetStateAction, useState } from "react"
import { CostCentreResponseData } from "../../../../../../types/costCentres.types"
import DeactivateModule from "../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import putAPI from "../../../../../../utils/putAPI";

const CostCentreDeactivate = (props: {
    costCentreID: number,
    reactivate: boolean,
    setCostCentreData: Dispatch<SetStateAction<CostCentreResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateCostCentre = () => {
        putAPI(`cost_centres/${props.costCentreID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const costCentreData: CostCentreResponseData = response.data;
            props.setCostCentreData(costCentreData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Cost Centre'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Cost Centre"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateCostCentre}/>
        </>

    )
}

export default CostCentreDeactivate