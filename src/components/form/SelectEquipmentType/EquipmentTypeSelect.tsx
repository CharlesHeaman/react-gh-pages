import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { EquipmentTypeCollectionResponse, EquipmentTypeResponseData } from "../../../types/equipmentType.types";
import getAPI from "../../../utils/getAPI";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";

const EquipmentTypeSelect = (props: {
    selectedEquipmentType: EquipmentTypeResponseData | undefined,
    setSelectedEquipmentType: Dispatch<SetStateAction<EquipmentTypeResponseData | undefined>>,
    required?: boolean,
    hasSubmitted: boolean,
    departmentID?: number,
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isEquipmentTypesLoading, setIsEquipmentTypesLoading] = useState(false);
    const [equipmentTypesData, setEquipmentTypesData] = useState<EquipmentTypeCollectionResponse>();

    useEffect(() => {
        getEquipmentTypes();
    }, [searchTerm, props.departmentID])

    const getEquipmentTypes = () => {
        getAPI('equipment_types', {
            name_like: searchTerm,
            department_id: props.departmentID ? [props.departmentID] : undefined,
            is_active: true,
        }, (response: any) => {
            const equipmentTypeData: EquipmentTypeCollectionResponse = response.data;
            setEquipmentTypesData(equipmentTypeData);
        }, setIsEquipmentTypesLoading);
    }

    const showRequired = props.selectedEquipmentType === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="local_laundry_service"
                resourceName="equipment type"
                resourceNamePlural="equipment types"
                selectedText={props.selectedEquipmentType?.data.name}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={equipmentTypesData ? equipmentTypesData.data.map(equipmentType => {
                    return {
                        text: equipmentType.data.name,
                        clickFunc: () => props.setSelectedEquipmentType(equipmentType),
                        selected: props.selectedEquipmentType?.id === equipmentType.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Equipment type is required`}
                show={showRequired}
            />}
        </>
    )
}

export default EquipmentTypeSelect