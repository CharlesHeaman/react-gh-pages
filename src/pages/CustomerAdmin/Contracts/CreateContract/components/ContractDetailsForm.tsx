import { ChangeEvent, Dispatch, SetStateAction } from "react";
import CheckboxInput from "../../../../../components/form/CheckboxInput/CheckboxInput";
import CodeInput from "../../../../../components/form/CodeInput/CodeInput";
import DateInput from "../../../../../components/form/DateInput/DateInput";
import DepartmentSelect from "../../../../../components/form/DepartmentSelect/DepartmentSelect";
import IntegerInput from "../../../../../components/form/IntegerInput/IntegerInput";
import MoneyInput from "../../../../../components/form/MoneyInput/MoneyInput";
import TextareaInput from "../../../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateContractAttributes } from "../../../../../types/contract.types";
import { DepartmentResponseData } from "../../../../../types/department.types";
import formatMoney from "../../../../../utils/formatMoney";
import ContractTypeSelect from "./ContractTypeSelect";

const ContractDetailsForm = (props: {
    contractDetails: CreateContractAttributes,
    selectedDepartment: DepartmentResponseData | undefined,
    setSelectedDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
    selectedContractType: number,
    setSelectedContractType: Dispatch<SetStateAction<number>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    updateDateParams: (date: Date, name: string) => void,
    referenceNumberUnique: boolean,
    checkUniqueReferenceNumber: () => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Contract Details</h2>}
            <InfoGrid>
                <GridItem title='Reference Number'>
                    <CodeInput
                        name="reference_number"
                        value={props.contractDetails.reference_number} 
                        updateFunc={props.updateParams}
                        isUnique={props.referenceNumberUnique} 
                        checkUnique={props.checkUniqueReferenceNumber} 
                        hasSubmitted={props.showErrors}    
                        maxWidth={300}    
                        autoFocus
                        required        
                    />
                </GridItem>
                <GridItem title='Contract Value' span={2}>
                    <MoneyInput
                        name="contract_value"
                        value={props.contractDetails.contract_value}
                        label='Contract value'
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}     
                        required            
                    />
                </GridItem>
                <GridItem title='Maintenance Frequency' span={2}>
                    <IntegerInput
                        name='service_per_year' 
                        label="Service frequency"
                        value={props.contractDetails.service_per_year}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}      
                        min={1}
                        tooSmallText="Must be at least 1"
                        suffix="per year"  
                        required  
                    />
                </GridItem>
                <GridItem title='Value Per Visit' span={2}>
                    <p>{formatMoney(parseFloat(props.contractDetails.contract_value) / parseInt(props.contractDetails.service_per_year))}</p>
                </GridItem>
                <GridItem title='Department' span={2}>
                    <DepartmentSelect
                        selectedDepartment={props.selectedDepartment}
                        setSelectedDepartment={props.setSelectedDepartment}
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Type' span={4}>
                    <ContractTypeSelect 
                        selectedContractType={props.selectedContractType}
                        setSelectedContractType={props.setSelectedContractType}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Contract Start' span={2}>
                    <DateInput
                        name='start_at' 
                        value={props.contractDetails.start_at}
                        label='Contract start'
                        hasSubmitted={props.showErrors} 
                        updateFunc={props.updateDateParams}
                        required
                    />
                </GridItem>
                <GridItem title='Contract End' span={2}>
                    <DateInput
                        name='end_at' 
                        value={props.contractDetails.end_at}
                        label='Contract end'
                        hasSubmitted={props.showErrors} 
                        min={props.contractDetails.start_at}
                        updateFunc={props.updateDateParams}
                        required
                    />
                </GridItem>
                <GridItem title='Fixed Three Year' span={2}>
                    <CheckboxInput
                        name="is_fixed_three_year"
                        checked={props.contractDetails.is_fixed_three_year}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
                <GridItem title='Notes' secondaryTitle="(optional)">
                    <TextareaInput
                        name="notes"
                        value={props.contractDetails.notes}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default ContractDetailsForm