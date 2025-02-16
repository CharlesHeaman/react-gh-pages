import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter"
import { CostCentreResponseData, CreateCostCentreAttributes } from "../../../../types/costCentres.types"
import putAPI from "../../../../utils/putAPI"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"
import CostCentreDetailsForm from "../../CostCentreListPage/components/CostCentreDetailsForm"
import { DepartmentResponseData } from "../../../../types/department.types"
import isCostCentreFormValid from "../../utils/isCostCentreFormValid"

const EditCostCentreForm = (props: {
    costCentre: CostCentreResponseData,
    setCostCentreData: Dispatch<SetStateAction<CostCentreResponseData | undefined>>,
    department: DepartmentResponseData | undefined
    disabledEdit: () => void
}) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [costCentreDetails, setCostCentreDetails] = useState<CreateCostCentreAttributes>({
        name: props.costCentre.data.name,
        description: props.costCentre.data.description ? props.costCentre.data.description : '',
    });
    const [associatedResource, setAssociatedResource] = useState<number>(props.costCentre.data.associated_resource_type ? props.costCentre.data.associated_resource_type : 0);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData | undefined>(props.department);


    const updateCostCentreParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setCostCentreDetails)
    }

    const updateSite = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`cost_centres/${props.costCentre.id}/update`, {}, {
            ...costCentreDetails,
            department_id: departmentData?.id,
            associated_resource_type: associatedResource
        }, (response: any) => {
            const costCentreData: CostCentreResponseData = response.data;
            props.setCostCentreData(costCentreData);
            props.disabledEdit();
        }, setIsUpdating)
    }

    const formComplete = isCostCentreFormValid(costCentreDetails, associatedResource);

    return (
        <>
            <CostCentreDetailsForm
                costCentreDetails={costCentreDetails}
                selectedAssociatedResource={associatedResource}
                setSelectedAssociatedResource={setAssociatedResource}
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                updateParams={updateCostCentreParams}
                showErrors={hasSubmitted}
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    clickFunc={updateSite}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    iconFont="save"
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditCostCentreForm