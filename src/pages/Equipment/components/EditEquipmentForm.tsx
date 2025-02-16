import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { DepartmentResponseData } from "../../../types/department.types";
import { CreateEquipmentAttributes, EquipmentResponseData } from "../../../types/equipment.types";
import { EquipmentTypeResponseData } from "../../../types/equipmentType.types";
import { RefrigerantResponseData } from "../../../types/refrigerant.types";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import putAPI from "../../../utils/putAPI";
import updateStateCheckboxParams from "../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import EquipmentGasDetailsForm from "../../CustomerAdmin/Equipment/CreateEquipment/components/EquipmentGasDetailsForm";
import EquipmentDetailsForm from "../../CustomerAdmin/Equipment/CreateEquipment/components/EquipmentDetailsForm";
import EquipmentRefrigerantDetailsForm from "../../CustomerAdmin/Equipment/CreateEquipment/components/EquipmentRefrigerantDetailsForm";
import EquipmentSupplierManufacturerForm from "../../CustomerAdmin/Equipment/CreateEquipment/components/EquipmentSupplierManufacturererForm";
import isEquipmentDetailsFormValid from "../../CustomerAdmin/Equipment/CreateEquipment/utils/isEquipmentDetailsFormValid";
import isEquipmentRefrigerantDetailsFormValid from "../../CustomerAdmin/Equipment/CreateEquipment/utils/isEquipmentRefrigerantDetailsFormValid";
import isEquipmentSupplierManufacturerFormValid from "../../CustomerAdmin/Equipment/CreateEquipment/utils/isEquipmentSupplierManufacturerFormValid";
import checkUniqueEquipmentCode from "../../CustomerAdmin/Equipment/utils/checkUniqueEquipmentCode";
import { useNavigate } from "react-router-dom";
import EquipmentOilDetailsForm from "../../CustomerAdmin/Equipment/CreateEquipment/components/EquipmentOilDetailsForm";
import isEquipmentOilDetailsFormValid from "../../CustomerAdmin/Equipment/CreateEquipment/utils/isEquipmentOilFormValid";
import isEquipmentGasDetailsFormValid from "../../CustomerAdmin/Equipment/CreateEquipment/utils/isEquipmentGasDetailsFormValid";

const EditEquipmentForm = (props: {
    department: DepartmentResponseData
    equipment: EquipmentResponseData,
    equipmentType: EquipmentTypeResponseData | undefined,
    supplierData: SupplierManufacturerResponseData | undefined,
    manufacturerData: SupplierManufacturerResponseData | undefined,
    refrigerant: RefrigerantResponseData | undefined,
    setEquipmentData: Dispatch<SetStateAction<EquipmentResponseData | undefined>>
    disabledEdit: () => void
}) => {  
    const navigate = useNavigate();
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [equipmentDetails, setEquipmentDetails] = useState<CreateEquipmentAttributes>({
        code: props.equipment.data.code,
        location: props.equipment.data.location,
        description: props.equipment.data.description,
        notes: props.equipment.data.notes ? props.equipment.data.notes : '',
        internal_notes: props.equipment.data.internal_notes ? props.equipment.data.internal_notes : '',
        model_number: props.equipment.data.model_number,
        serial_number: props.equipment.data.serial_number,
        model_number_2: props.equipment.data.model_number_2,
        serial_number_2: props.equipment.data.serial_number_2,
        refrigerant_charge: props.equipment.data.refrigerant_charge.toString(),
        is_leak_detection_fitted: props.equipment.data.is_leak_detection_fitted,
        is_hermetically_sealed: props.equipment.data.is_hermetically_sealed,
        fuel_type: props.equipment.data.fuel_type,
        gas_council_number: props.equipment.data.gas_council_number ? props.equipment.data.gas_council_number : '',
        nozzle: props.equipment.data.nozzle ? props.equipment.data.nozzle : '',
        pump: props.equipment.data.pump ? props.equipment.data.pump : '',
    });
    const [equipmentTypeData, setEquipmentTypeData] = useState<EquipmentTypeResponseData | undefined>(props.equipmentType);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData | undefined>(props.supplierData);
    const [manufacturerData, setManufacturerData] = useState<SupplierManufacturerResponseData | undefined>(props.manufacturerData);
    const [refrigerantData, setRefrigerantData] = useState<RefrigerantResponseData | undefined>(props.refrigerant);
    const [selectedFGasType, setSelectedFGasType] = useState(props.equipment.data.f_gas_type);
    const [, setIsCodeLoading] = useState(false);
    const [codeUnique, setCodeUnique] = useState(true);

    const formComplete = (
        isEquipmentDetailsFormValid(equipmentDetails, codeUnique, equipmentTypeData?.id) &&
        isEquipmentSupplierManufacturerFormValid(equipmentDetails) &&
        (isEquipmentRefrigerantDetailsFormValid(equipmentDetails, refrigerantData?.id) || !(equipmentTypeData?.data.energy_source === 0)) && 
        (isEquipmentGasDetailsFormValid(equipmentDetails) || !(equipmentTypeData?.data.energy_source === 1)) &&
        (isEquipmentOilDetailsFormValid(equipmentDetails) || !(equipmentTypeData?.data.energy_source === 2))
    )

    const updateEquipmentParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setEquipmentDetails)
    }

    const updateEquipmentCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setEquipmentDetails)
    }

    const updateEquipment = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`equipment/${props.equipment.id}/update`, {}, {
            ...equipmentDetails,
            equipment_type_id: equipmentTypeData?.id,
            supplier_id: supplierData?.id,
            manufacturer_id: manufacturerData?.id,
            refrigerant_id: refrigerantData?.id
        }, (response: any) => {
            const equipmentData: EquipmentResponseData = response.data;
            props.setEquipmentData(equipmentData);
            props.disabledEdit();
            navigate(`../${equipmentData.data.code}`, { replace: true, relative: 'path' })
        }, setIsUpdating)
    }

    return (
        <>
            <EquipmentDetailsForm
                selectedEquipmentType={equipmentTypeData}
                setSelectedEquipmentType={setEquipmentTypeData}
                equipmentDetails={equipmentDetails}
                departmentID={props.department.id}
                updateParams={updateEquipmentParams} 
                equipmentCodeUnique={codeUnique}
                checkUniqueEquipmentCode={() => checkUniqueEquipmentCode(equipmentDetails.code, setCodeUnique, setIsCodeLoading, props.equipment.id)}
                showErrors     
                isEdit     
            />
            <hr/>
            <EquipmentSupplierManufacturerForm
                selectedSupplier={supplierData}
                setSelectedSupplier={setSupplierData}
                selectedManufacturer={manufacturerData}
                setSelectedManufacturer={setManufacturerData}
                equipmentDetails={equipmentDetails}
                setSupplierData={setSupplierData}
                setManufacturerData={setManufacturerData}
                updateParams={updateEquipmentParams} 
                showErrors
                isEdit
            />
            {props.equipmentType?.data.energy_source === 0 ? <>
                <hr/>
                <EquipmentRefrigerantDetailsForm 
                    equipmentDetails={equipmentDetails} 
                    selectedRefrigerant={refrigerantData}
                    setSelectedRefrigerant={setRefrigerantData}
                    updateParams={updateEquipmentParams} 
                    selectedFGasType={selectedFGasType}
                    setSelectedFGasType={setSelectedFGasType}
                    updateCheckboxParams={updateEquipmentCheckboxParams}
                    showErrors
                    isEdit
                />
            </> : null}
            {props.equipmentType?.data.energy_source === 1 ? <>
                <hr/>
                <EquipmentGasDetailsForm 
                    equipmentDetails={equipmentDetails} 
                    updateParams={updateEquipmentParams} 
                    showErrors
                    isEdit
                />
            </> : null}
            {props.equipmentType?.data.energy_source === 2 ? <>
                <hr/>
                <EquipmentOilDetailsForm 
                    equipmentDetails={equipmentDetails} 
                    updateParams={updateEquipmentParams} 
                    showErrors
                    isEdit
                />
            </> : null}
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateEquipment}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditEquipmentForm