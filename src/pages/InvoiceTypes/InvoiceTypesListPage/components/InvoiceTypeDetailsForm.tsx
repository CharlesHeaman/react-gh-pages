import { ChangeEvent, Dispatch, SetStateAction } from "react"
import TextInput from "../../../../components/form/TextInput/TextInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreateInvoiceTypeAttributes } from "../../../../types/invoiceTypes.types"
import CheckboxInput from "../../../../components/form/CheckboxInput/CheckboxInput"
import RateTypeSelect from "./RateTypeSelect"

const InvoiceTypeDetailsForm = (props: {
    invoiceTypeDetails: CreateInvoiceTypeAttributes,
    rateType: number,
    setRateType: Dispatch<SetStateAction<number>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Invoice Type Details</h2>}
            <InfoGrid>
                <GridItem title='Name' span={4}>
                    <TextInput
                        name="name"
                        label="Name"
                        value={props.invoiceTypeDetails.name}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Rate Type' span={2}>
                    <RateTypeSelect 
                        selectedRateType={props.rateType} 
                        setSelectedRateType={props.setRateType} 
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Charge Labour' span={2}>
                    <CheckboxInput 
                        name={"charge_labour"} 
                        checked={props.invoiceTypeDetails.charge_labour} 
                        updateFunc={props.updateCheckboxParams}                
                    />
                </GridItem>
                <GridItem title='Charge Expenses' span={2}>
                    <CheckboxInput 
                        name={"charge_expenses"} 
                        checked={props.invoiceTypeDetails.charge_expenses} 
                        updateFunc={props.updateCheckboxParams}                
                    />
                </GridItem>
                <GridItem title='Charge Mileage' span={2}>
                    <CheckboxInput 
                        name={"charge_mileage"} 
                        checked={props.invoiceTypeDetails.charge_mileage} 
                        updateFunc={props.updateCheckboxParams}                
                    />
                </GridItem>
                <GridItem title='Charge Materials' span={2}>
                    <CheckboxInput 
                        name={"charge_materials"} 
                        checked={props.invoiceTypeDetails.charge_materials} 
                        updateFunc={props.updateCheckboxParams}                
                    />
                </GridItem>
                <GridItem title='Charge Subcontract' span={2}>
                    <CheckboxInput 
                        name={"charge_subcontract"} 
                        checked={props.invoiceTypeDetails.charge_subcontract} 
                        updateFunc={props.updateCheckboxParams}                
                    />
                </GridItem>
                <GridItem title='Charge Hire' span={2}>
                    <CheckboxInput 
                        name={"charge_hire"} 
                        checked={props.invoiceTypeDetails.charge_hire} 
                        updateFunc={props.updateCheckboxParams}                
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default InvoiceTypeDetailsForm 