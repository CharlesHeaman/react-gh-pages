import { ChangeEvent } from "react";
import MoneyInput from "../../../../../components/form/MoneyInput/MoneyInput";
import PercentageInput from "../../../../../components/form/PercentageInput/PercentageInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateDepartmentAttributes } from "../../../../../types/department.types";

const DepartmentLabourRatesForm = (props: {
    departmentDetails: CreateDepartmentAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
}) => {
    return (
        <div>
            <section>
                <h2>Contract Rates</h2>
                <InfoGrid>                
                    <GridItem title='Engineer Rate' span={2}>
                        <MoneyInput
                            name="contract_engineer_rate"
                            label="Engineer rate"
                            value={props.departmentDetails.contract_engineer_rate}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            maxWidth={80}
                            autoFocus
                            required
                        />
                    </GridItem>
                    <GridItem title='Mate Rate' span={2}>
                        <MoneyInput
                            name="contract_mate_rate"
                            label="Mate rate"
                            value={props.departmentDetails.contract_mate_rate}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            maxWidth={80}
                            required
                        />
                    </GridItem>
                    <GridItem title='Mileage Rate' span={2}>
                        <MoneyInput
                            name="contract_mileage_rate"
                            label="Mileage rate"
                            value={props.departmentDetails.contract_mileage_rate}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            maxWidth={80}
                            required
                        />
                    </GridItem>
                    <GridItem title='Material Markup' span={2}>
                        <PercentageInput
                            name="contract_material_markup"
                            label="Material markup"
                            value={props.departmentDetails.contract_material_markup}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                    <GridItem title='Subcontract Markup' span={2}>
                        <PercentageInput
                            name="contract_subcontract_markup"
                            label="Subcontract markup"
                            value={props.departmentDetails.contract_subcontract_markup}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                    <GridItem title='Hire Markup' span={2}>
                        <PercentageInput
                            name="contract_hire_markup"
                            label="Hire markup"
                            value={props.departmentDetails.contract_hire_markup}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <h2>Non-contract Rates</h2>
                <InfoGrid>                
                    <GridItem title='Engineer Rate' span={2}>
                        <MoneyInput
                            name="engineer_rate"
                            label="Engineer rate"
                            value={props.departmentDetails.engineer_rate}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            maxWidth={80}
                            required
                        />
                    </GridItem>
                    <GridItem title='Mate Rate' span={2}>
                        <MoneyInput
                            name="mate_rate"
                            label="Mate rate"
                            value={props.departmentDetails.mate_rate}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            maxWidth={80}
                            required
                        />
                    </GridItem>
                    <GridItem title='Mileage Rate' span={2}>
                        <MoneyInput
                            name="mileage_rate"
                            label="Mileage rate"
                            value={props.departmentDetails.mileage_rate}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            maxWidth={80}
                            required
                        />
                    </GridItem>
                    <GridItem title='Material Markup' span={2}>
                        <PercentageInput
                            name="material_markup"
                            label="Material markup"
                            value={props.departmentDetails.material_markup}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                    <GridItem title='Subcontract Markup' span={2}>
                        <PercentageInput
                            name="subcontract_markup"
                            label="Subcontract markup"
                            value={props.departmentDetails.subcontract_markup}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                    <GridItem title='Hire Markup' span={2}>
                        <PercentageInput
                            name="hire_markup"
                            label="Hire markup"
                            value={props.departmentDetails.hire_markup}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </div>
    )
}

export default DepartmentLabourRatesForm