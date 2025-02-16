import { ChangeEvent, Dispatch, SetStateAction } from "react"
import TextInput from "../../../../components/form/TextInput/TextInput"
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreateCostCentreAttributes } from "../../../../types/costCentres.types"
import DepartmentSelect from "../../../../components/form/DepartmentSelect/DepartmentSelect"
import { DepartmentResponseData } from "../../../../types/department.types"
import AssociatedResourceSelect from "./AssociatedResourceSelect"

const CostCentreDetailsForm = (props: {
    costCentreDetails: CreateCostCentreAttributes,
    selectedAssociatedResource: number,
    setSelectedAssociatedResource: Dispatch<SetStateAction<number>>,
    selectedDepartment: DepartmentResponseData | undefined,
    setSelectedDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Cost Centre Details</h2>}
            <InfoGrid>
                <GridItem title='Name'>
                    <TextInput
                        name="name"
                        label="Name"
                        value={props.costCentreDetails.name}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Description' secondaryTitle="(optional)">
                    <TextareaInput
                        name="description"
                        value={props.costCentreDetails.description}
                        label="Description"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Associated Resource' span={3}>
                    <AssociatedResourceSelect 
                        selectedAssociatedResource={props.selectedAssociatedResource} 
                        setSelectedAssociatedResource={props.setSelectedAssociatedResource}                
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Department' span={3} secondaryTitle="(optional)">
                    <DepartmentSelect
                        selectedDepartment={props.selectedDepartment}
                        setSelectedDepartment={props.setSelectedDepartment}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default CostCentreDetailsForm 