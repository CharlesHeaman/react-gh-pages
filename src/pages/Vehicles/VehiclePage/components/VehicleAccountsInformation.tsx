import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CostCentreResponseData } from "../../../../types/costCentres.types"
import CostCentreLabel from "../../../CostCentres/components/CostCentreLabel"

const VehicleAccountsInformation = (props: {
    costCentre: CostCentreResponseData
}) => {
    return (
        <section>
            <h2>Accounts Information</h2>
            <InfoGrid>
                <GridItem title='Cost Centre' span={3}>
                    <CostCentreLabel costCentre={props.costCentre}/>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default VehicleAccountsInformation