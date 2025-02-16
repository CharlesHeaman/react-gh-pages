import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { AdditionalTimeActivityResponseData } from "../../../types/additionalTimeActivity.types";
import { CreateCostCentreAttributes } from "../../../types/costCentres.types";
import postAPI from "../../../utils/postAPI";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import AdditionalTimeActivityDetailsForm from "./components/AdditinonalTimeActivityDetailsForm";

const CreateAdditionalTimeActivity = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const navigate = useNavigate();

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activityDetails, setActivityDetails] = useState<CreateCostCentreAttributes>({
        name: '',
        description: '',
    });

    const updateActivityParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setActivityDetails)
    }

    const createAdditionalTimeActivity = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI('additional_time_activity/create', {}, activityDetails, (response: any) => {
            const additionalTimeActivityData: AdditionalTimeActivityResponseData = response.data;
            navigate(additionalTimeActivityData.id.toString())
        }, setIsSubmitting)
    }

    const formComplete = (
        activityDetails.name.length > 0
    )

    return (
        <>
            <WindowOverlay 
                title={"Create Additional Time Activity"} 
                maxWidth={400} 
                show={props.show} 
                hideFunc={props.hideFunc}
                footer={<SubmitButton
                    text="Create Activity"
                    iconFont="add"
                    color="dark-blue"
                    clickFunc={createAdditionalTimeActivity}
                    submitting={isSubmitting}
                    submittingText="Creating..."
                    disabled={hasSubmitted && !formComplete}
                />}
            >
                <AdditionalTimeActivityDetailsForm
                    activityDetails={activityDetails}
                    updateParams={updateActivityParams}
                    showErrors={hasSubmitted}
                />                
                
            </WindowOverlay>
        </>
    )
}

export default CreateAdditionalTimeActivity