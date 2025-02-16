import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { AssetResponseData, CreateAssetAttributes } from "../../../types/asset.types";
import { DepartmentResponseData } from "../../../types/department.types";
import updateStateCheckboxParams from "../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateDateParams from "../../../utils/updateStateParams/updateStateDateParams";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import PlantEquipmentDetailsForm from "./PlantEquipmentDetailsForm";
import PlantEquipmentPATCalibrationMaintenanceForm from "./PlantEquipmentPATCalibrationMaintenanceForm";
import PlantEquipmentPurchaseInformationForm from "./PlantEquipmentPurchaseInformationForm";
import isPlantEquipmentDetailsFormValid from "./utils/isPlantEquipmentDetailsFormValid";
import PlantEquipmentInformationDetails from "../components/PlantEquipmentInformationDetails";
import PlantEquipmentPurchaseInformation from "../components/PlantEquipmentPurchaseInformation";
import PlantEquipmentPATesting from "../AssetPage/components/PlantEquipmentPATesting";
import { PlantEquipmentTypeResponseData } from "../../../types/plantEquipmentTypes.types";
import PlantEquipmentCalibration from "../AssetPage/components/PlantEquipmentCalibration";
import PlantEquipmentMaintenance from "../AssetPage/components/PlantEquipmentMaintenance";
import isPlantEquipmentPATCalibrationMaintenanceFormValid from "./utils/isPlantEquipmentPATCalibrationMaintenanceFormValid";
import postAPI from "../../../utils/postAPI";
import getMonthRelativeDate from "../../../utils/getMonthRelativeDate";
import PlantEquipmentInspection from "../AssetPage/components/PlantEquipmentInspection";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import getAPI from "../../../utils/getAPI";

const CreatePlantEquipmentPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [createPlantEquipmentDetails, setCreatePlantEquipmentDetails] = useState<CreateAssetAttributes>({
        description: '',
        model_no: '',
        serial_no: '',
        location: '',
        notes: '',
        purchase_order_number: '',
        purchase_date: new Date(),
        requires_pa_test: false,
        requires_calibration: false,
        requires_maintenance: false,
        requires_inspection: false,
        pa_test_volts: '0',
        pa_test_amps: '0',
        acceptable_tolerance: '',
        calibrated_externally: false,
        maintained_externally: false,
        external_maintainer: '',
        last_pa_test: null,
        last_calibration_test: null,
        last_maintenance: null,
        last_inspection: null,
        next_pa_test: null,
        next_calibration_test: null,
        next_maintenance: null,
        next_inspection: null,
    });
    const [owner, setOwner] = useState<number>(1);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [typeData, setTypeData] = useState<PlantEquipmentTypeResponseData>();
    const [isManufacturerLoading, setIsManufacturerLoading] = useState(false);
    const [manufacturerData, setManufacturerData] = useState<SupplierManufacturerResponseData>();

    const manufacturerIDParam = searchParams.get('manufacturer_id');

    useEffect(() => {
        manufacturerIDParam && getManufacturer(parseInt(manufacturerIDParam));
    }, [manufacturerIDParam]);

    const getManufacturer = (manufacturerID: number) => {
        getAPI(`suppliers_manufacturers/${manufacturerID}`, {}, (response: any) => {
            const manufacturerData: SupplierManufacturerResponseData = response.data;
            setManufacturerData(manufacturerData);
        }, setIsManufacturerLoading);
    }

    useEffect(() => {
        if (typeData === undefined) return;
        setCreatePlantEquipmentDetails((prevState: any) => {
            return {
                ...prevState, 
                requires_pa_test: typeData.data.is_pa_test_required,
                requires_calibration: typeData.data.is_calibration_test_required,
                requires_inspection: typeData.data.is_inspection_required,
                requires_maintenance: typeData.data.is_maintenance_required,
            }
        })
    }, [typeData])

    const updatePlantEquipmentParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setCreatePlantEquipmentDetails)
    }

    const updatePlantEquipmentDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, setCreatePlantEquipmentDetails)
    }

    const updatePlantEquipmentCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setCreatePlantEquipmentDetails)
    }

    const createPlantEquipment = () => {
        const patTestFrequency = typeData?.data.pa_test_frequency ? typeData.data.pa_test_frequency : 12
        const patTestParams = {
            requires_pa_test: createPlantEquipmentDetails.requires_pa_test,
            last_pa_test: createPlantEquipmentDetails.requires_pa_test ? createPlantEquipmentDetails.last_pa_test : undefined, 
            next_pa_test: createPlantEquipmentDetails.next_pa_test ? createPlantEquipmentDetails.next_pa_test :
                createPlantEquipmentDetails.requires_pa_test ?
                    createPlantEquipmentDetails.last_pa_test ? 
                        getMonthRelativeDate(createPlantEquipmentDetails.last_pa_test, patTestFrequency) :
                        getMonthRelativeDate(new Date(), patTestFrequency) 
                    : undefined,
        }
        const calibrationTestFrequency = typeData?.data.calibration_test_frequency ? typeData.data.calibration_test_frequency : 12
        const calibrationTestParams = {
            requires_calibration_test: createPlantEquipmentDetails.requires_calibration,
            last_calibration_test: createPlantEquipmentDetails.requires_calibration ? createPlantEquipmentDetails.last_calibration_test : undefined, 
            next_calibration_test: createPlantEquipmentDetails.next_calibration_test ? createPlantEquipmentDetails.next_calibration_test :
                createPlantEquipmentDetails.requires_calibration ?
                    createPlantEquipmentDetails.last_calibration_test ? 
                        getMonthRelativeDate(createPlantEquipmentDetails.last_calibration_test, calibrationTestFrequency) :
                        getMonthRelativeDate(new Date(), calibrationTestFrequency) 
                    : undefined,
        }
        const inspectionFrequency = typeData?.data.inspection_frequency ? typeData.data.inspection_frequency : 12
        const inspectionParams = {
            requires_inspection: createPlantEquipmentDetails.requires_inspection,
            last_inspection: createPlantEquipmentDetails.requires_inspection ? createPlantEquipmentDetails.last_inspection : undefined, 
            next_inspection: createPlantEquipmentDetails.next_inspection ? createPlantEquipmentDetails.next_inspection :
                createPlantEquipmentDetails.requires_inspection ?
                    createPlantEquipmentDetails.last_inspection ? 
                        getMonthRelativeDate(createPlantEquipmentDetails.last_inspection, inspectionFrequency) :
                        getMonthRelativeDate(new Date(), inspectionFrequency) 
                    : undefined,
        }
        const maintenanceFrequency = typeData?.data.maintenance_frequency ? typeData.data.maintenance_frequency : 12
        const maintenanceParams = {
            requires_maintenance: createPlantEquipmentDetails.requires_maintenance,
            last_maintenance: createPlantEquipmentDetails.requires_maintenance ? createPlantEquipmentDetails.last_maintenance : undefined, 
            next_maintenance: createPlantEquipmentDetails.next_maintenance ? createPlantEquipmentDetails.next_maintenance :
                createPlantEquipmentDetails.requires_maintenance ?
                    createPlantEquipmentDetails.last_maintenance ? 
                        getMonthRelativeDate(createPlantEquipmentDetails.last_maintenance, maintenanceFrequency) :
                        getMonthRelativeDate(new Date(), maintenanceFrequency) 
                    : undefined,
        }
        postAPI('assets/create', {}, {
            ...createPlantEquipmentDetails,
            plant_equipment_type_id: typeData?.id,
            ownership_type: owner,
            department_id: departmentData?.id,
            manufacturer_id: manufacturerData?.id,
            ...patTestParams,
            ...calibrationTestParams,
            ...inspectionParams,
            ...maintenanceParams,
        }, (response: any) => {
            const plantEquipmentData: AssetResponseData = response.data;
            navigate(`../${plantEquipmentData.data.code}`, { relative: "path" })
        }, setIsCreating)
    }

    const plantEquipmentPreviewData = {
        ...createPlantEquipmentDetails,
        code: '',
        is_active: true,
        assigned_to_user_id: 0,
        manufacturer_id: 0,
        department_id: departmentData ? departmentData.id : null,
        plant_equipment_type_id: typeData ? typeData.id : 0,
        pa_test_amps: parseFloat(createPlantEquipmentDetails.pa_test_amps),
        pa_test_volts: parseFloat(createPlantEquipmentDetails.pa_test_volts),
        ownership_type: owner,
        next_pa_test: new Date(),
        next_calibration_test: new Date(),
        next_inspection: new Date(),
        next_maintenance: new Date(),
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Plant/Tools Details',
            form: <PlantEquipmentDetailsForm
                plantEquipmentDetails={createPlantEquipmentDetails}
                selectedPlantEquipmentType={typeData}
                setSelectedPlantEquipmentType={setTypeData}
                selectedManufacturer={manufacturerData}
                setSelectedCManufacturer={setManufacturerData}
                selectedOwner={owner}
                setSelectedOwner={setOwner}
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                updateParams={updatePlantEquipmentParams}
                showErrors={maxStepSubmitted > 0}
            />,
            isComplete: isPlantEquipmentDetailsFormValid(createPlantEquipmentDetails, typeData?.id)
        },
        {
            header: 'Purchase Information',
            form: <PlantEquipmentPurchaseInformationForm
                plantEquipmentDetails={createPlantEquipmentDetails}
                updateParams={updatePlantEquipmentParams}
                updateDateParams={updatePlantEquipmentDateParams}
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: true
        },
        {
            header: 'PAT/Calibration/Inspection/Maintenance',
            form: <PlantEquipmentPATCalibrationMaintenanceForm
                plantEquipmentDetails={createPlantEquipmentDetails}
                updateParams={updatePlantEquipmentParams}
                updateDateParams={updatePlantEquipmentDateParams}
                updateCheckboxParams={updatePlantEquipmentCheckboxParams}
                showErrors={maxStepSubmitted > 2}
            />,
            isComplete: isPlantEquipmentPATCalibrationMaintenanceFormValid(createPlantEquipmentDetails)
        },
        {
            header: 'Review Information',
            form: typeData ? <>
                <PlantEquipmentInformationDetails
                    plantEquipmentData={plantEquipmentPreviewData}
                    manufacturer={manufacturerData}
                    department={departmentData}
                    plantEquipmentType={typeData}
                    isPreview
                />
                <hr/>
                <PlantEquipmentPurchaseInformation
                    plantEquipmentData={plantEquipmentPreviewData}
                />
                {createPlantEquipmentDetails.requires_pa_test && <>
                    <hr/>
                    <PlantEquipmentPATesting
                        plantEquipmentData={plantEquipmentPreviewData}
                        isPreview
                    />
                </>}
                {createPlantEquipmentDetails.requires_calibration && <>
                    <hr/>
                    <PlantEquipmentCalibration
                        plantEquipmentData={plantEquipmentPreviewData}
                        isPreview
                    />
                </>}
                {createPlantEquipmentDetails.requires_inspection && <>
                    <hr/>
                    <PlantEquipmentInspection
                        plantEquipmentData={plantEquipmentPreviewData}
                        isPreview
                    />
                </>}
                {createPlantEquipmentDetails.requires_maintenance && <>
                    <hr/>
                    <PlantEquipmentMaintenance
                        plantEquipmentData={plantEquipmentPreviewData}
                        isPreview
                    />
                </>}
            </> : null,
            isComplete: true
        }     
    ]

    return (
        <OuterContainer
            title='Create Plant/Tool'
            description="Complete this form to create a plant/tool."
            maxWidth={1000}
        >
            <FormWizardFlex
                steps={formSteps}
                maxStepSubmitted={maxStepSubmitted}
                setMaxStepSubmitted={setMaxStepSubmitted}
                resourceName="Plant/Tools"
                isCreating={isCreating}
                createFunc={createPlantEquipment}
            />
        </OuterContainer>
    )
}

export default CreatePlantEquipmentPage