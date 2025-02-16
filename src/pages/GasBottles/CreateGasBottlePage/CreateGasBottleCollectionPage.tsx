import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../../components/ui/Structure/Header/Header";
import { CreateGasBottleAttributes, GasBottleResponseData } from "../../../types/gasBottle.types";
import { RefrigerantResponseData } from "../../../types/refrigerant.types";
import getAPI from "../../../utils/getAPI";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import GasBottleDetailsForm from "./components/GasBottleDetailsForm";
import isGasBottleDetailsFormValid from "./utils/IsGasBottleDetailsFormValid";
import updateStateDateParams from "../../../utils/updateStateParams/updateStateDateParams";
import GasBottleRentalInformationForm from "./components/GasBottleRentalInformationForm";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import GasBottleInformation from "../GasBottlePage/components/GasBottleInformation";
import GasBottleInformationSkeleton from "../GasBottlePage/components/GasBottleInformationSkeleton";
import isGasBottleRentalInformationFormValid from "./utils/isGasBottleRentalInformationFormValid";
import postAPI from "../../../utils/postAPI";

const CreateGasBottleCollectionPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [createGasBottleDetails, setCreateGasBottleDetails] = useState<CreateGasBottleAttributes>({
        number: '',
        code: '',
        bottle_weight: '0',
        tare_weight: '0',
        received_date: new Date(),
        rental_months: '0'
    });    
    const [isRefrigerantLoading, setIsRefrigerantLoading] = useState(false);
    const [refrigerantData, setRefrigerantData] = useState<RefrigerantResponseData>();
    const [isSupplierLoading, setIsSupplierLoading] = useState(false);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();

    const refrigerantIDParam = searchParams.get('refrigerant_id');
    const supplierIDParam = searchParams.get('supplier_id');

    useEffect(() => {
        refrigerantIDParam && getRefrigerant(parseInt(refrigerantIDParam));
    }, [refrigerantIDParam])

    useEffect(() => {
        supplierIDParam && getSupplier(parseInt(supplierIDParam));
    }, [supplierIDParam]);
    
    const getRefrigerant = (refrigerantID: number) => {
        getAPI(`refrigerants/${refrigerantID}`, {}, (response: any) => {
            const refrigerantData: RefrigerantResponseData = response.data;
            setRefrigerantData(refrigerantData);
        }, setIsRefrigerantLoading);
    }
    
    const getSupplier = (supplierID: number) => {
        getAPI(`suppliers_manufacturers/${supplierID}`, {}, (response: any) => {
            const supplierData: SupplierManufacturerResponseData = response.data;
            setSupplierData(supplierData);
        }, setIsSupplierLoading);
    }

    const updateGasBottleParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setCreateGasBottleDetails)
    }

    const updateGasBottleDateParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateDateParams(event, setCreateGasBottleDetails)
    }

    const createGasBottle = () => {
        postAPI('gas_bottles/create', {}, {
            ...createGasBottleDetails,
            supplier_id: supplierData?.id,
            refrigerant_id: refrigerantData?.id,
            current_gas_weight: parseInt(createGasBottleDetails.bottle_weight) - parseInt(createGasBottleDetails.tare_weight),
        }, (response: any) => {
            const gasBottleData: GasBottleResponseData = response.data;
            navigate(`../${gasBottleData.data.code}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Gas Bottle Details',
            form: <GasBottleDetailsForm
                gasBottleDetails={createGasBottleDetails}
                selectedRefrigerant={refrigerantData}
                setSelectedRefrigerant={setRefrigerantData}
                updateParams={updateGasBottleParams}
                showErrors={maxStepSubmitted > 0}
            />,
            isComplete: isGasBottleDetailsFormValid(createGasBottleDetails, true, refrigerantData?.id),
        },
        {
            header: 'Rental Information',
            form: <GasBottleRentalInformationForm
                gasBottleDetails={createGasBottleDetails}
                selectedSupplier={supplierData}
                setSelectedSupplier={setSupplierData}
                updateParams={updateGasBottleParams}
                updateDateParams={updateGasBottleDateParams}
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: isGasBottleRentalInformationFormValid(createGasBottleDetails, supplierData?.id)
        },
        {
            header: 'Review Information',
            form: refrigerantData && supplierData ? <GasBottleInformation 
                    gasBottleData={{
                        ...createGasBottleDetails,
                        rental_months: parseInt(createGasBottleDetails.rental_months),
                        current_gas_weight: parseInt(createGasBottleDetails.bottle_weight) - parseInt(createGasBottleDetails.tare_weight),
                        tare_weight: parseInt(createGasBottleDetails.tare_weight),
                        assigned_gas_weight: 0,
                        refrigerant_id: refrigerantData.id,
                        stores_returned_gas_weight: 0,
                        supplier_returned_gas_weight: 0,
                        supplier_returned_date: null,
                        assignment_changed_date: null,
                        assigned_to_id: null,
                        supplier_id: supplierData.id,
                        supplier_returned_by_id: null,
                        is_active: true
                    }} 
                    refrigerant={refrigerantData} 
                    supplier={supplierData} 
                    user={undefined}            
                /> : 
                <GasBottleInformationSkeleton/>,
            isComplete: true
        }     
    ]

    return (
        <>
            <OuterContainer
                title='Create a Gas Bottle Collection'
                description="Complete this form to create a collection of gas bottles."
                maxWidth={800}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Gas Bottles"
                    isCreating={isCreating}
                    createFunc={createGasBottle}
                />
            </OuterContainer>
        </>
    )
}

export default CreateGasBottleCollectionPage