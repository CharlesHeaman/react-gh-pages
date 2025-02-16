import { ChangeEvent } from "react";
import DateInput from "../../../../components/form/DateInput/DateInput";
import TextInput from "../../../../components/form/TextInput/TextInput";
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput";
import VehicleRegistrationInput from "../../../../components/form/VehicleRegistrationInput/VehicleRegistrationInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateVehicleAttributes } from "../../../../types/vehicles.types";

const VehicleDetailsForm = (props: {
    vehicleDetails: CreateVehicleAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateDateParams: (date: Date, name: string) => void, 
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Vehicle Details</h2>}
            <InfoGrid>                
                <GridItem title='Vehicle Registration' span={3}>
                    <VehicleRegistrationInput
                        name="registration_number"
                        value={props.vehicleDetails.registration_number}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Original Registration' span={3} secondaryTitle="(optional)">
                    <VehicleRegistrationInput
                        name="original_registration_number"
                        label="Original registration"
                        value={props.vehicleDetails.original_registration_number}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Registration Date'>
                    <DateInput
                        name="registration_date"
                        label="Registration date"
                        value={props.vehicleDetails.registration_date}
                        updateFunc={props.updateDateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Make' span={3}>
                    <TextInput
                        name="make"
                        value={props.vehicleDetails.make}
                        label="Make"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Model' span={3}>
                    <TextInput
                        name="model"
                        value={props.vehicleDetails.model}
                        label="Model"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Notes' secondaryTitle="(optional)">
                    <TextareaInput
                        name="notes"
                        value={props.vehicleDetails.notes}
                        label="Notes"
                        updateFunc={props.updateParams}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default VehicleDetailsForm