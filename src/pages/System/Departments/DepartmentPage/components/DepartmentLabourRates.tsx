import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { Department } from "../../../../../types/department.types"
import formatMoney from "../../../../../utils/formatMoney"

const DepartmentLabourRates = (props: {
    departmentData: Department
}) => {
    return (
        <>
            <section>
                <h2>Contract Rates</h2>
                <InfoGrid>
                    <GridItem title='Engineer Labour Rate' span={2}>
                        <p>{formatMoney(props.departmentData.contract_engineer_rate)}</p>
                    </GridItem>
                    <GridItem title='Mate Labour Rate' span={2}>
                        <p>{formatMoney(props.departmentData.contract_mate_rate)}</p>
                    </GridItem>
                    <GridItem title='Mileage Rate' span={2}>
                        <p>{formatMoney(props.departmentData.contract_mileage_rate)}</p>
                    </GridItem>
                    <GridItem title='Material Markup' span={2}>
                        <p>{props.departmentData.contract_material_markup}%</p>
                    </GridItem>
                    <GridItem title='Subcontract Markup' span={2}>
                        <p>{props.departmentData.contract_subcontract_markup}%</p>
                    </GridItem>
                    <GridItem title='Hire Markup' span={2}>
                        <p>{props.departmentData.contract_hire_markup}%</p>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <h2>Non-contract Rates</h2>
                <InfoGrid>
                    <GridItem title='Engineer Labour Rate' span={2}>
                        <p>{formatMoney(props.departmentData.engineer_rate)}</p>
                    </GridItem>
                    <GridItem title='Mate Labour Rate' span={2}>
                        <p>{formatMoney(props.departmentData.mate_rate)}</p>
                    </GridItem>
                    <GridItem title='Mileage Rate' span={2}>
                        <p>{formatMoney(props.departmentData.mileage_rate)}</p>
                    </GridItem>
                    <GridItem title='Material Markup' span={2}>
                        <p>{props.departmentData.material_markup}%</p>
                    </GridItem>
                    <GridItem title='Subcontract Markup' span={2}>
                        <p>{props.departmentData.subcontract_markup}%</p>
                    </GridItem>
                    <GridItem title='Hire Markup' span={2}>
                        <p>{props.departmentData.hire_markup}%</p>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default DepartmentLabourRates