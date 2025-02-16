import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { FilterSelection } from "../../../components/ui/FilterSelect/FilterSelect";
import { CreateGasBottleAttributes, GasBottleResponseData } from "../../../types/gasBottle.types";
import { RefrigerantResponseData } from "../../../types/refrigerant.types";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import getAPI from "../../../utils/getAPI";
import postAPI from "../../../utils/postAPI";
import updateStateCheckboxParams from "../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import BottleInformationDetails from "../GasBottlePage/components/BottleInformationDetails";
import BottleRentalDetails from "../GasBottlePage/components/BottleRentalDetails";
import GasBottleInformationSkeleton from "../GasBottlePage/components/GasBottleInformationSkeleton";
import GasBottleDetailsForm from "./components/GasBottleDetailsForm";
import GasBottleRentalInformationForm from "./components/GasBottleRentalInformationForm";
import isGasBottleDetailsFormValid from "./utils/IsGasBottleDetailsFormValid";
import isGasBottleRentalInformationFormValid from "./utils/isGasBottleRentalInformationFormValid";
import BottleAdminNavigation from "../GasBottlesListPage/BottleAdminNavigation";
import { SystemConfigsResponseData } from "../../../types/systemConfigs.types";

const CreateBottlePage = (props: {
    isConsumable?: boolean
}) => {
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
        rental_months: '18',
        is_decant: false,
    });    
    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>([
        {
            text: 'Charge',
            value: false,
            iconFont: 'arrow_forward',
            selected: true
        },
        {
            text: 'Decant',
            value: true,
            iconFont: 'arrow_back',
        }
    ]);
    const selectValue =  selectOptions.find(selection => selection.selected)?.value;
    const [isSystemConfigsLoading, setIsSystemConfigsLoading] = useState(true);
    const [systemConfigsData, setSystemConfigsData] = useState<SystemConfigsResponseData>();
    const [isRefrigerantLoading, setIsRefrigerantLoading] = useState(false);
    const [refrigerantData, setRefrigerantData] = useState<RefrigerantResponseData>();
    const [isSupplierLoading, setIsSupplierLoading] = useState(false);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();

    const refrigerantIDParam = searchParams.get('refrigerant_id');
    const supplierIDParam = searchParams.get('supplier_id');

    useEffect(() => {
        getSystemConfigs();
    }, []);

    useEffect(() => {
        refrigerantIDParam && getRefrigerant(parseInt(refrigerantIDParam));
    }, [refrigerantIDParam])

    useEffect(() => {
        supplierIDParam && getSupplier(parseInt(supplierIDParam));
    }, [supplierIDParam]);

    const getSystemConfigs = () => {
        getAPI('system_configs', {}, (response: any) => {
            const systemConfigsData: SystemConfigsResponseData = response.data;
            setSystemConfigsData(systemConfigsData);
            systemConfigsData.data.default_gas_supplier_id && getSupplier(systemConfigsData.data.default_gas_supplier_id);
        }, setIsSystemConfigsLoading);
    }
    
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

    const updateGasBottleCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setCreateGasBottleDetails)
    }

    const updateGasBottleDateParams = (date: Date, name: string) => {
        setCreateGasBottleDetails((prevState: any) => {
            return {
                ...prevState, 
                [name]: date
            }
        })
    }

    const createGasBottle = () => {
        postAPI('gas_bottles/create', {}, {
            ...createGasBottleDetails,
            supplier_id: supplierData?.id,
            refrigerant_id: refrigerantData?.id,
            current_gas_weight: parseInt(createGasBottleDetails.bottle_weight) - parseInt(createGasBottleDetails.tare_weight),
            is_consumable: props.isConsumable,
            is_decant: selectValue
        }, (response: any) => {
            const gasBottleData: GasBottleResponseData = response.data;
            navigate(`../${gasBottleData.data.code}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Rental Information',
            form: <GasBottleRentalInformationForm
            gasBottleDetails={createGasBottleDetails}
            selectedSupplier={supplierData}
            setSelectedSupplier={setSupplierData}
            updateParams={updateGasBottleParams}
            updateDateParams={updateGasBottleDateParams}
            updateCheckboxParams={updateGasBottleCheckboxParams}
            showErrors={maxStepSubmitted > 0}
            />,
            isComplete: isGasBottleRentalInformationFormValid(createGasBottleDetails, supplierData?.id)
        },
        {
            header: 'Bottle Details',
            form: <GasBottleDetailsForm
                gasBottleDetails={createGasBottleDetails}
                selectedRefrigerant={refrigerantData}
                setSelectedRefrigerant={setRefrigerantData}
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                updateParams={updateGasBottleParams}
                showErrors={maxStepSubmitted > 1}
                isConsumable={props.isConsumable}
            />,
            isComplete: isGasBottleDetailsFormValid(createGasBottleDetails, true, refrigerantData?.id),
        },
        {
            header: 'Review Information',
            form: supplierData && refrigerantData ? <>
                <BottleInformationDetails 
                    gasBottle={{
                        ...createGasBottleDetails,
                        is_decant: selectValue ? true : false,
                        tare_weight: parseFloat(createGasBottleDetails.tare_weight),
                        current_gas_weight: parseFloat(createGasBottleDetails.bottle_weight) - parseFloat(createGasBottleDetails.tare_weight)
                    }}
                    refrigerant={refrigerantData}
                    isConsumable={props.isConsumable}
                />
                <hr/>
                <BottleRentalDetails 
                    gasBottle={{
                        ...createGasBottleDetails,
                        is_decant: selectValue ? true : false,
                    }}
                    supplier={supplierData}
                    isPreview
                />
            </> : 
            <GasBottleInformationSkeleton/>,
            isComplete: true
        }     
    ]

    return (
        <>
            <BottleAdminNavigation location={props.isConsumable ? 'gas_air' : 'refrigerant'}/>
            <OuterContainer
                title={`Create ${props.isConsumable ? 'Gas/Air' : 'Refrigerant'} Bottle`}
                description={`Complete this form to create a ${props.isConsumable ? 'gas/air' : 'refrigerant'} bottle.`}
                maxWidth={900}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName={`${props.isConsumable ? 'Gas/Air' : 'Refrigerant'} Bottle`}
                    isCreating={isCreating}
                    createFunc={createGasBottle}
                />
            </OuterContainer>
        </>
    )
}

export default CreateBottlePage