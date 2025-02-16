import { Dispatch, SetStateAction } from "react"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import DepartmentSelect from "../../../../components/form/DepartmentSelect/DepartmentSelect"
import { DepartmentResponseData } from "../../../../types/department.types"

export interface AdvancedTicketInvoiceRequestSearchForm {
    department_id: number,
}

const TicketInvoiceRequestAdvancedSearchForm = (props: {
    advancedSearchParams: AdvancedTicketInvoiceRequestSearchForm,
    setAdvancedSearchParams: Dispatch<SetStateAction<AdvancedTicketInvoiceRequestSearchForm>>,
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

export default TicketInvoiceRequestAdvancedSearchForm