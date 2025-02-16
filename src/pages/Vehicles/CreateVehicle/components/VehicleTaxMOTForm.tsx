import { ChangeEvent } from "react";
import DateInput from "../../../../components/form/DateInput/DateInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateVehicleAttributes } from "../../../../types/vehicles.types";

const VehicleTaxMOTForm = (props: {
    vehicleDetails: CreateVehicleAttributes,
    updateDateParams: (date: Date, name: string) => void, 
    showErrors: boolean,
}) => {
    return (
        <section>
            <InfoGrid>                
                <GridItem title='MOT Due Date' span={3}>
                    <DateInput
                        name="mot_due_date"
                        label="MOT due date"
                        value={props.vehicleDetails.mot_due_date}
                        updateFunc={props.updateDateParams}
                        hasSubmitted={props.showErrors}
                        min={new Date()}
                        required
                    />
                </GridItem>
                <GridItem title='Tax Due Date' span={3}>
                    <DateInput
                        name="tax_due_date"
                        label="Tax due date"
                        value={props.vehicleDetails.tax_due_date}
                        updateFunc={props.updateDateParams}
                        hasSubmitted={props.showErrors}
                        min={new Date()}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default VehicleTaxMOTForm