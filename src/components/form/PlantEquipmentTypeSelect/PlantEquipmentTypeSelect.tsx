import { Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { PlantEquipmentTypeResponseData, PlantEquipmentTypeCollectionResponse } from "../../../types/plantEquipmentTypes.types";

const PlantEquipmentTypeSelect = (props: {
    selectedPlantEquipmentType: PlantEquipmentTypeResponseData | undefined,
    setSelectedPlantEquipmentType: Dispatch<SetStateAction<PlantEquipmentTypeResponseData | undefined>>,
    setSelectedPlantEquipmentTypeID?: (plantEquipmentTypeID: number) => void,
    required?: boolean,
    hasSubmitted?: boolean
}) => {

    // Data States
    const [isPlantEquipmentTypesLoading, setIsPlantEquipmentTypesLoading] = useState(false);
    const [plantEquipmentTypesData, setPlantEquipmentTypesData] = useState<PlantEquipmentTypeCollectionResponse>();

    useEffect(() => {
        getPlantEquipmentTypes();
    }, [])

    const getPlantEquipmentTypes = () => {
        getAPI('plant_equipment_types', {
            is_active: true,
        }, (response: any) => {
            const plantEquipmentTypeData: PlantEquipmentTypeCollectionResponse = response.data;
            setPlantEquipmentTypesData(plantEquipmentTypeData);
        }, setIsPlantEquipmentTypesLoading);
    }

    const showRequired = props.selectedPlantEquipmentType === undefined && props.hasSubmitted === true;

    return (
        <>
            <NewSelectMenu
                iconFont="handyman"
                resourceName="type"
                resourceNamePlural="plant/tools types"
                selectedText={props.selectedPlantEquipmentType?.data.name}
                selectItems={plantEquipmentTypesData ? plantEquipmentTypesData.data.map(plantEquipmentType => {
                    return {
                        text: plantEquipmentType.data.name,
                        clickFunc: () => {
                            props.setSelectedPlantEquipmentType(plantEquipmentType);
                            props.setSelectedPlantEquipmentTypeID && props.setSelectedPlantEquipmentTypeID(plantEquipmentType.id)
                        },
                        selected: props.selectedPlantEquipmentType?.id === plantEquipmentType.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Plant/Tools type is required`}
                show={showRequired}
            />}

        </>
    )
}

export default PlantEquipmentTypeSelect