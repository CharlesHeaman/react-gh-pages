import { CreateVehicleAttributes } from "../../../../types/vehicles.types";
import isRegistrationValid from "../../../../utils/isRegistrationValid";

const isVehicleDetailsFormValid = (vehicleDetails: CreateVehicleAttributes): boolean => {

    const registrationEntered = vehicleDetails.registration_number.length > 0;
    const registrationValid = isRegistrationValid(vehicleDetails.registration_number);
    const originalRegistrationEntered = vehicleDetails.original_registration_number.length > 0;
    const originalRegistrationValid = isRegistrationValid(vehicleDetails.original_registration_number);
    const makeEntered = vehicleDetails.make.length > 0;
    const modelEntered = vehicleDetails.model.length > 0;
   
    return (
        registrationEntered &&
        registrationValid &&
        (!originalRegistrationEntered || originalRegistrationValid) &&
        makeEntered &&
        modelEntered
    )
   
}

export default isVehicleDetailsFormValid