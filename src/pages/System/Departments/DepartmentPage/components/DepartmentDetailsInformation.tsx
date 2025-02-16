import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { Department } from "../../../../../types/department.types"

const DepartmentDetailsInformation = (props: {
    departmentData: Department
}) => {
    return (
        <section>
            <h2>Department Details</h2>
            <InfoGrid>
                <GridItem title='Name'>
                    <p>{props.departmentData.name}</p>
                </GridItem>
                <GridItem title='Description'>
                    <p>{props.departmentData.description ? 
                        props.departmentData.description : 'None.'
                    }</p>
                </GridItem>
                <GridItem title='Max Day Length' span={2}>
                    <p>{props.departmentData.day_max_hours} hours</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default DepartmentDetailsInformation