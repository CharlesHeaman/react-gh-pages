import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import MoneyInput from "../../../../components/form/MoneyInput/MoneyInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"
import TextInput from "../../../../components/form/TextInput/TextInput"
import DateInput from "../../../../components/form/DateInput/DateInput"
import updateStateDateParams from "../../../../utils/updateStateParams/updateStateDateParams"
import DepartmentSelect from "../../../../components/form/DepartmentSelect/DepartmentSelect"
import { DepartmentResponseData } from "../../../../types/department.types"

export interface AdvancedContractSearchForm {
    value_greater_than: string,
    value_less_than: string,
    start_before: Date | undefined,
    start_after: Date | undefined,
    end_before: Date | undefined,
    end_after: Date | undefined,
    purchase_order_number_like: string,
}

const ContactAdvancedSearchForm = (props: {
    advancedSearchParams: AdvancedContractSearchForm,
    setAdvancedSearchParams: Dispatch<SetStateAction<AdvancedContractSearchForm>>,
    selectedDepartment: DepartmentResponseData | undefined,
    setSelectedDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
}) => {

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, props.setAdvancedSearchParams)
    }

    const updateDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, props.setAdvancedSearchParams)
    }
    
    return (
        <>
            <section>
                <InfoGrid>
                    <GridItem title='Department'>
                        <DepartmentSelect
                            selectedDepartment={props.selectedDepartment}
                            setSelectedDepartment={props.setSelectedDepartment}
                            hasSubmitted={false}
                        />
                    </GridItem>
                    <GridItem title='Value Greater Than' span={3}>
                        <MoneyInput
                            name="value_greater_than"
                            value={props.advancedSearchParams.value_greater_than} 
                            updateFunc={updateParams} 
                            hasSubmitted={false} 
                            autoFocus                   
                        />
                    </GridItem>
                    <GridItem title='Value Less Than' span={3}>
                        <MoneyInput
                            name="value_less_than"
                            value={props.advancedSearchParams.value_less_than} 
                            updateFunc={updateParams} 
                            hasSubmitted={false} 
                        />
                    </GridItem>
                    <GridItem title='Starts Before' span={3}>
                        <DateInput
                            name="start_before"
                            value={props.advancedSearchParams.start_before}
                            updateFunc={updateDateParams}
                            hasSubmitted={false} 
                        />
                    </GridItem>
                    <GridItem title='Starts After' span={3}>
                        <DateInput
                            name="start_after"
                            value={props.advancedSearchParams.start_after}
                            updateFunc={updateDateParams}
                            hasSubmitted={false} 
                        />
                    </GridItem>
                    <GridItem title='Ends Before' span={3}>
                        <DateInput
                            name="end_before"
                            value={props.advancedSearchParams.end_before}
                            updateFunc={updateDateParams}
                            hasSubmitted={false} 
                        />
                    </GridItem>
                    <GridItem title='Ends After' span={3}>
                        <DateInput
                            name="end_after"
                            value={props.advancedSearchParams.end_after}
                            updateFunc={updateDateParams}
                            hasSubmitted={false} 
                        />
                    </GridItem>
                    <GridItem title='Purchase Order Number' span={3}>
                        <TextInput
                            name="purchase_order_number_like"
                            value={props.advancedSearchParams.purchase_order_number_like} 
                            updateFunc={updateParams} 
                            hasSubmitted={false} 
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default ContactAdvancedSearchForm