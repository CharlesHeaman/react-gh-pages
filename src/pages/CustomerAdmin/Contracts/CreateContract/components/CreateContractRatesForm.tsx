import { ChangeEvent, useState } from "react";
import FormStepNavigation from "../../../../../components/form/FormStepNavigation/FormStepNavigation";
import MoneyInput from "../../../../../components/form/MoneyInput/MoneyInput";
import PercentageInput from "../../../../../components/form/PercentageInput/PercentageInput";
import TextInput from "../../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateContractAttributes } from "../../../../../types/contract.types";

const CreateContractRatesForm = (props: {
    contractDetails: CreateContractAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Rates</h2>}
            <InfoGrid>
                <GridItem title='Engineer Rate' span={2}>
                    <MoneyInput
                        name="engineer_rate"
                        value={props.contractDetails.engineer_rate}
                        label="Engineer rate"
                        required 
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors} 
                        maxWidth={75}     
                        autoFocus   
                    />
                </GridItem>
                <GridItem title='Mate Rate' span={2}>
                    <MoneyInput
                        name="mate_rate"
                        value={props.contractDetails.mate_rate}
                        label="Mate rate"
                        required 
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}  
                        maxWidth={75}                  
                    />
                </GridItem>
                <GridItem title='Mileage Rate' span={2}>
                    <MoneyInput
                        name="mileage_rate"
                        value={props.contractDetails.mileage_rate}
                        label="Mileage rate"
                        required 
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors} 
                        maxWidth={75}                   
                    />
                </GridItem>
                <GridItem title='Material Markup' span={2}>
                    <PercentageInput
                        name="material_markup"
                        value={props.contractDetails.material_markup}
                        label="Material markup"
                        required 
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}                    
                    />
                </GridItem>
                <GridItem title='Sub-contractor Markup' span={2}>
                    <PercentageInput
                        name="subcontract_markup"
                        value={props.contractDetails.subcontract_markup}
                        label="Sub-contract markup"
                        required 
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}                    
                    />
                </GridItem>
                <GridItem title='Hire Markup' span={2}>
                    <PercentageInput
                        name="hire_markup"
                        value={props.contractDetails.hire_markup}
                        label="Hire markup"
                        required 
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}                    
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default CreateContractRatesForm