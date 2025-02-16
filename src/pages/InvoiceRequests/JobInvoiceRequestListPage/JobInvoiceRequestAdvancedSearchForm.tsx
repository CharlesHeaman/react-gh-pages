import { Dispatch, SetStateAction } from "react"
import DepartmentSelect from "../../../components/form/DepartmentSelect/DepartmentSelect"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { DepartmentResponseData } from "../../../types/department.types"

export interface AdvancedJobInvoiceRequestSearchForm {
    department_id: number,
}

const JobInvoiceRequestAdvancedSearchForm = (props: {
    advancedSearchParams: AdvancedJobInvoiceRequestSearchForm,
    setAdvancedSearchParams: Dispatch<SetStateAction<AdvancedJobInvoiceRequestSearchForm>>,
    selectedDepartment: DepartmentResponseData | undefined,
    setSelectedDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>,
}) => {

    return (
        <>
            <section>
                <InfoGrid>
                    <GridItem title='Department'>
                        <DepartmentSelect 
                            selectedDepartment={props.selectedDepartment} 
                            setSelectedDepartment={props.setSelectedDepartment}
                            hasSubmitted                 
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default JobInvoiceRequestAdvancedSearchForm