import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel"
import Label from "../../../../components/ui/General/Label/Label"
import { CostCentre } from "../../../../types/costCentres.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"
import AssociatedResourceTypeLabel from "../../utils/AssociatedResourceTypeLabel"

const CostCentreInformation = (props: {
    costCentreData: CostCentre,
    department: DepartmentResponseData | undefined,
    lastDeactivate: Date | undefined,
}) => {
    return (
        <>
            {!props.costCentreData.is_active ? <InactiveStatus resourceName='Cost Centre' inactiveDate={props.lastDeactivate}/> : null}
            <section>
                <h2>Cost Centre Details</h2>
                <InfoGrid>
                    <GridItem title='Name' span={3}>
                        <p>{props.costCentreData.name}</p>
                    </GridItem>
                    <GridItem title='Description'>
                        <p>{props.costCentreData.description ? props.costCentreData.description : 'None'}</p>
                    </GridItem>
                    <GridItem title='Associated Resource' span={3}>
                        <AssociatedResourceTypeLabel resourceType={props.costCentreData.associated_resource_type}/>
                    </GridItem>
                    <GridItem title='Department' span={3}>
                        {props.department ? 
                            <DepartmentLabel department={props.department}/> :
                            <Label iconFont="not_interested" text="None" color="no-color"/>
                        }       
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default CostCentreInformation