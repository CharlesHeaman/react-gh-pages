import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter"
import { AdditionalTimeActivityResponseData } from "../../../../types/additionalTimeActivity.types"
import { CreateCostCentreAttributes } from "../../../../types/costCentres.types"
import putAPI from "../../../../utils/putAPI"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"
import AdditionalTimeActivityDetailsForm from "./AdditinonalTimeActivityDetailsForm"

const AdditionalTimeActivityEdit = (props: {
    additionalTimeActivity: AdditionalTimeActivityResponseData,
    setAdditionalTimeActivityData: Dispatch<SetStateAction<AdditionalTimeActivityResponseData | undefined>>,
    disabledEdit: () => void
}) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [activityDetails, setActivityDetails] = useState<CreateCostCentreAttributes>({
        name: props.additionalTimeActivity.data.name,
        description: props.additionalTimeActivity.data.description ? props.additionalTimeActivity.data.description : '',
    });

    const updateActivityParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setActivityDetails)
    }
    
    const updateAdditionalTimeActivity = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`additional_time_activity/${props.additionalTimeActivity.id}/update`, {}, activityDetails, (response: any) => {
            const additionalTimeActivityData: AdditionalTimeActivityResponseData = response.data;
            props.setAdditionalTimeActivityData(additionalTimeActivityData);
            props.disabledEdit();
        }, setIsUpdating)
    }

    const formComplete = (
        activityDetails.name.length > 0
    )

    return (
        <>
            <AdditionalTimeActivityDetailsForm 
                activityDetails={activityDetails} 
                updateParams={updateActivityParams} 
                showErrors
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateAdditionalTimeActivity}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default AdditionalTimeActivityEdit