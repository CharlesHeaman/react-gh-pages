import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { AdditionalTimeActivityResponseData } from "../../../../types/additionalTimeActivity.types"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"

const AdditionalTimeActivityInformation = (props: {
    additionalTimeActivity: AdditionalTimeActivityResponseData,
    lastDeactivate: Date | undefined,
}) => {
    return (
        <>
            {!props.additionalTimeActivity.data.is_active ? <InactiveStatus resourceName='Additional Time Activity' inactiveDate={props.lastDeactivate}/> : null}
            <section>
                <h2>Additional Time Activity Details</h2>
                <InfoGrid>
                    <GridItem title='Name'>
                        <p>{props.additionalTimeActivity.data.name}</p>
                    </GridItem>
                    <GridItem title='Description'>
                        <p>{props.additionalTimeActivity.data.description.length > 0 ?
                            props.additionalTimeActivity.data.description : 
                            'None'
                        }</p>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default AdditionalTimeActivityInformation