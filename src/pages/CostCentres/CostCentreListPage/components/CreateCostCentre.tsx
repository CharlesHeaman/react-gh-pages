import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { CostCentreResponseData, CreateCostCentreAttributes } from "../../../../types/costCentres.types"
import postAPI from "../../../../utils/postAPI"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"
import CostCentreDetailsForm from "./CostCentreDetailsForm"
import { DepartmentResponseData } from "../../../../types/department.types"
import isCostCentreFormValid from "../../utils/isCostCentreFormValid"

const CreateCostCentre = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const navigate = useNavigate();

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [costCentreDetails, setCostCentreDetails] = useState<CreateCostCentreAttributes>({
        name: '',
        description: '',
    });
    const [associatedResource, setAssociatedResource] = useState<number>(0);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();

    const updateCostCentreParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setCostCentreDetails)
    }

    const createCostCentre = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI('cost_centres/create', {}, {
            ...costCentreDetails,
            department_id: departmentData?.id,
            associated_resource_type: associatedResource
        }, (response: any) => {
            const costCentreData: CostCentreResponseData = response.data;
            navigate(costCentreData.id.toString())
        }, setIsCreating)
    }

    const formComplete = isCostCentreFormValid(costCentreDetails, associatedResource);

    return (
        <WindowOverlay 
            title={"Create Cost Centre"} 
            maxWidth={500} 
            show={props.show} 
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Cost Centre"
                iconFont="add"
                color="dark-blue"
                clickFunc={createCostCentre}
                submitting={isCreating}
                submittingText="Creating..."
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <CostCentreDetailsForm
                costCentreDetails={costCentreDetails}
                selectedAssociatedResource={associatedResource}
                setSelectedAssociatedResource={setAssociatedResource}
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                updateParams={updateCostCentreParams}
                showErrors={hasSubmitted}
            />
        </WindowOverlay>
    )
}

export default CreateCostCentre