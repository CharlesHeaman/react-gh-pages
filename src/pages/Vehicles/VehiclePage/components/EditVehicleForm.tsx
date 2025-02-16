import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { CostCentreResponseData } from "../../../../types/costCentres.types";
import { CreateVehicleAttributes, VehicleResponseData } from "../../../../types/vehicles.types";
import putAPI from "../../../../utils/putAPI";
import updateStateDateParams from "../../../../utils/updateStateParams/updateStateDateParams";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import VehicleAccountInformationForm from "../../CreateVehicle/components/VehicleAccountInformationForm";
import VehicleDetailsForm from "../../CreateVehicle/components/VehicleDetailsForm";
import isVehicleAccountsInformationFormValid from "../../CreateVehicle/utils/isVehicleAccountsInformationFormValid";
import isVehicleDetailsFormValid from "../../CreateVehicle/utils/isVehicleDetailsFormValid";

const EditVehicleForm = (props: {
    vehicle: VehicleResponseData,
    costCentre: CostCentreResponseData,
    setVehicleData: Dispatch<SetStateAction<VehicleResponseData | undefined>>
    disabledEdit: () => void
}) => {  
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [vehicleDetails, setVehicleDetails] = useState<CreateVehicleAttributes>({
        registration_number: props.vehicle.data.registration_number,
        original_registration_number: props.vehicle.data.original_registration_number,
        registration_date: new Date(props.vehicle.data.registration_date),
        make: props.vehicle.data.make,
        model: props.vehicle.data.model,
        mot_due_date: new Date(props.vehicle.data.mot_due_date),
        tax_due_date: new Date(props.vehicle.data.tax_due_date),
        notes: props.vehicle.data.notes ? props.vehicle.data.notes : ''
    });
    const [costCentreData, setCostCentreData] = useState<CostCentreResponseData | undefined>(props.costCentre);

    const formComplete = (
        isVehicleDetailsFormValid(vehicleDetails) &&
        isVehicleAccountsInformationFormValid(costCentreData?.id)
    )

    const updateVehicleParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setVehicleDetails)
    }

    const updateVehicleDateParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateDateParams(event, setVehicleDetails)
    }

    const updateVehicle = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`vehicles/${props.vehicle.id}/update`, {}, {
            ...vehicleDetails,
            cost_centre_id: costCentreData?.id
        }, (response: any) => {
            const vehicleData: VehicleResponseData = response.data;
            props.setVehicleData(vehicleData);
            props.disabledEdit();
        }, setIsUpdating)
    }

    return (
        <>
            <VehicleDetailsForm 
                vehicleDetails={vehicleDetails} 
                updateParams={updateVehicleParams} 
                updateDateParams={updateVehicleDateParams}
                showErrors
                isEdit
            />
            <hr/>
            <VehicleAccountInformationForm
                vehicleDetails={vehicleDetails} 
                selectedCostCentre={costCentreData}
                setSelectedCostCentre={setCostCentreData}
                updateParams={updateVehicleParams} 
                showErrors
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateVehicle}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditVehicleForm