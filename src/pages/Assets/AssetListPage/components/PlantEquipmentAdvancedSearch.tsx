import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PlantEquipmentTypeResponseData } from "../../../../types/plantEquipmentTypes.types";
import { UserResponseData } from "../../../../types/user.types";
import getObjectHasValue from "../../../../utils/getObjectHasValue";
import updateAdvancedSearchParam from "../../../../utils/setAdvancedSearchParams";
import clearPlantEquipmentAdvancedSearchParams from "../../utils/clearPlantEquipmentAdvancedSerachParams";
import getPlantEquipmentAdvancedSearchParams from "./getPlantEquipmentAdvancedSearchParams";
import PlantEquipmentAdvancedSearchForm, { AdvancedPlantEquipmentSearchFormParams } from "./PlantEquipmentAdvancedSearchForm";

const PlantEquipmentAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "plant_equipment";
    const advancedParams = getPlantEquipmentAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        plant_equipment_type_id: advancedParams.plant_equipment_type_id ? advancedParams.plant_equipment_type_id : 0,
        assigned_to_user_id: advancedParams.assigned_to_user_id ? advancedParams.assigned_to_user_id : 0,
    }

    const [typeData, setTypeData] = useState<PlantEquipmentTypeResponseData>();
    const [selectedUser, setSelectedUser] = useState<UserResponseData>();

    // Search States
    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedPlantEquipmentSearchFormParams>(currentSearchParams);

    useEffect(() => {
        setAdvancedSearchParams((prevState: any) => {
            return {
                ...prevState, 
                plant_equipment_type_id: typeData?.id
            }
        })
    }, [typeData]);

    useEffect(() => {
        if (currentSearchParams.plant_equipment_type_id === 0) {
            setTypeData(undefined);
        }
    }, [currentSearchParams.plant_equipment_type_id]);

    useEffect(() => {
        setAdvancedSearchParams((prevState: any) => {
            return {
                ...prevState, 
                assigned_to_user_id: selectedUser?.id
            }
        })
    }, [selectedUser]);

    useEffect(() => {
        if (currentSearchParams.assigned_to_user_id === 0) {
            setSelectedUser(undefined);
        }
    }, [currentSearchParams.assigned_to_user_id]);

    useEffect(() => {
        setAdvancedSearchParams(currentSearchParams)
    }, [JSON.stringify(advancedParams)])

    const doSearch = (event?: FormEvent<HTMLFormElement>) => {
        event && event.preventDefault();
        updateAdvancedSearchParam(prefix, advancedSearchParams, searchParams, setSearchParams)
        props.hideFunc();
    }

    return (
        <WindowOverlay 
            title="Plant/Tools Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={
                <AdvancedSearchFooter 
                    resourceName="Plant/Tools"
                    hasAdvancedSearch={hasAdvancedSearch} 
                    searchFunc={doSearch} 
                    clearFunc={() => clearPlantEquipmentAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                />
            }
        >
            <form
                onSubmit={doSearch}
            >
                <PlantEquipmentAdvancedSearchForm
                    selectedPlantEquipmentType={typeData}
                    setSelectedPlantEquipmentType={setTypeData}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
                
            </form>
        </WindowOverlay>
        
    )
}

export default PlantEquipmentAdvancedSearch