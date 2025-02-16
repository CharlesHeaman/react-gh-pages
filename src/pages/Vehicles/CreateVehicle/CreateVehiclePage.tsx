import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CostCentreResponseData } from "../../../types/costCentres.types";
import { CreateVehicleAttributes, VehicleResponseData } from "../../../types/vehicles.types";
import postAPI from "../../../utils/postAPI";
import updateStateDateParams from "../../../utils/updateStateParams/updateStateDateParams";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import VehicleAccountsInformation from "../VehiclePage/components/VehicleAccountsInformation";
import VehicleInformationDetails from "../VehiclePage/components/VehicleInformationDetails";
import VehicleMOTTax from "../VehiclePage/components/VehicleMOTTax";
import VehicleAccountInformationForm from "./components/VehicleAccountInformationForm";
import VehicleDetailsForm from "./components/VehicleDetailsForm";
import VehicleTaxMOTForm from "./components/VehicleTaxMOTForm";
import isVehicleAccountsInformationFormValid from "./utils/isVehicleAccountsInformationFormValid";
import isVehicleDetailsFormValid from "./utils/isVehicleDetailsFormValid";

const CreateVehiclePage = () => {
    const navigate = useNavigate();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [createVehicleDetails, setCreateVehicleDetails] = useState<CreateVehicleAttributes>({
        registration_number: '',
        original_registration_number: '',
        registration_date: new Date(),
        make: '',
        model: '',
        mot_due_date: new Date(),
        tax_due_date: new Date(),
        notes: ''
    });
    const [costCentreData, setCostCentreData] = useState<CostCentreResponseData>();

    const updateVehicleParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setCreateVehicleDetails)
    }

    const updateVehicleDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, setCreateVehicleDetails)
    }

    const createVehicle = () => {
        postAPI('vehicles/create', {}, {
            ...createVehicleDetails,
            cost_centre_id: costCentreData?.id
        }, (response: any) => {
            const vehicleData: VehicleResponseData = response.data;
            navigate(`../${vehicleData.id}`, { relative: "path" })
        }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Vehicle Details',
            form: <VehicleDetailsForm 
                vehicleDetails={createVehicleDetails} 
                updateParams={updateVehicleParams} 
                updateDateParams={updateVehicleDateParams}
                showErrors={maxStepSubmitted > 0}            
            />,
            isComplete: isVehicleDetailsFormValid(createVehicleDetails)
        },
        {
            header: 'Accounts Information',
            form: <VehicleAccountInformationForm
                vehicleDetails={createVehicleDetails} 
                selectedCostCentre={costCentreData}
                setSelectedCostCentre={setCostCentreData}
                updateParams={updateVehicleParams} 
                showErrors={maxStepSubmitted > 1}            
            />,
            isComplete: isVehicleAccountsInformationFormValid(costCentreData?.id)
        },
        {
            header: 'MOT/Tax',
            form: <VehicleTaxMOTForm 
                vehicleDetails={createVehicleDetails} 
                updateDateParams={updateVehicleDateParams}
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: true
        },
        {
            header: 'Review Information',
            form: costCentreData ?
                <>
                    <VehicleInformationDetails vehicleData={{
                        ...createVehicleDetails,
                        is_active: true,
                        user_id: null,
                        tracker_vehicle_id: null,
                        cost_centre_id: costCentreData.id
                    }}/>
                    <hr/>
                    <VehicleAccountsInformation costCentre={costCentreData}/>
                    <hr/>
                    <VehicleMOTTax
                        motDueDate={createVehicleDetails.mot_due_date}
                        taxDueDate={createVehicleDetails.tax_due_date}
                        preview
                    />
                </> : null
            ,
            isComplete: true
        }     
    ]

    return (
        <OuterContainer
            title='Create Vehicle'
            description="Complete this form to create a vehicle."
            maxWidth={850}
        >
            <FormWizardFlex
                steps={formSteps}
                maxStepSubmitted={maxStepSubmitted}
                setMaxStepSubmitted={setMaxStepSubmitted}
                resourceName="Vehicle"
                isCreating={isCreating}
                createFunc={createVehicle}
            />
        </OuterContainer>
    )
}

export default CreateVehiclePage