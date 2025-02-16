import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EquipmentTypeCollectionResponse, EquipmentTypeResponseData } from "../../../../types/equipmentType.types";
import getAPI from "../../../../utils/getAPI";
import EquipmentTypeList from "../../../EquipmentTypes/components/EquipmentTypeList";
import EquipmentTypeSearchHeader from "../../../EquipmentTypes/components/EquipmentTypeSearchHeader";
import getEquipmentTypeSearchParams from "../../../EquipmentTypes/utils/getEquipmentTypeSearchParams";

const AddedEquipmentTypeToList = (props: {
    departmentID: number,
    show: boolean,
    hideFunc: () => void,
    addFunc: (equipmentType: EquipmentTypeResponseData) => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States 
    const [isEquipmentTypesLoading, setIsEquipmentTypesLoading] = useState(true);
    const [equipmentTypeData, setEquipmentTypeData] = useState<EquipmentTypeCollectionResponse>();

    // Search Parameters 
    const equipmentTypeSearchParams = getEquipmentTypeSearchParams(searchParams);

    useEffect(() => {
        searchEquipmentTypes();
    }, [JSON.stringify(equipmentTypeSearchParams), props.departmentID])

    const searchEquipmentTypes = () => {
        getAPI('equipment_types', {
            ...equipmentTypeSearchParams,
            department_id: props.departmentID,
            is_active: true,
        }, (response: any) => {
            const costCentreData: EquipmentTypeCollectionResponse = response.data;
            setEquipmentTypeData(costCentreData);
        }, setIsEquipmentTypesLoading);
    }

    return (
        <WindowOverlay 
            title={`Add Equipment Type to Costing`} 
            maxWidth={650} 
            show={props.show}
            hideFunc={props.hideFunc}
            top
        >
            <EquipmentTypeSearchHeader/>
            <EquipmentTypeList 
                isEquipmentTypesLoading={isEquipmentTypesLoading} 
                equipmentTypes={equipmentTypeData} 
                perPage={equipmentTypeSearchParams.perPage}    
                hideDepartment                
                hideEnergySource
                showAdd
                addFunc={props.addFunc}
            />
        </WindowOverlay>
    )
}

export default AddedEquipmentTypeToList