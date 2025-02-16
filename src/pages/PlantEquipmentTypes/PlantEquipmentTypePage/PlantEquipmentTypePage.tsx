import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { PlantEquipmentTypeActivityResponseData, PlantEquipmentTypeActivityCollectionResponse } from "../../../types/PlantEquipmentTypeActivity.types";
import { PlantEquipmentTypeResponseData } from "../../../types/plantEquipmentTypes.types";
import getAPI from "../../../utils/getAPI";
import ProductCategoryInformationSkeleton from "../../ProductCategories/components/ProductCategoryInformationSkeleton";
import EditPlantEquipmentTypeForm from "./components/EditPlantEquipmentTypeForm";
import PlantEquipmentTypeInformation from "./components/PlantEquipmentTypeInformation";
import PlantEquipmentTypeSideBar from "./components/PlantEquipmentTypeSideBar/PlantEquipmentTypeSideBar";

const PlantEquipmentTypePage = () => {
    const { plantEquipmentTypeID } = useParams();

    // Data States
    const [isPlantEquipmentTypeLoading, setIsPlantEquipmentTypeLoading] = useState(true);
    const [plantEquipmentTypeData, setPlantEquipmentTypeData] = useState<PlantEquipmentTypeResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<PlantEquipmentTypeActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getPlantEquipmentTypeData();
    }, [plantEquipmentTypeID]);

    useEffect(() => {
        if (plantEquipmentTypeData === undefined) return;
        if (!plantEquipmentTypeData.data.is_active) getInactiveActivity(plantEquipmentTypeData.id);
    }, [JSON.stringify(plantEquipmentTypeData)]);


    const getPlantEquipmentTypeData = () => {
        getAPI(`plant_equipment_types/${plantEquipmentTypeID}`, {}, (response: any) => {
            const plantEquipmentTypeData: PlantEquipmentTypeResponseData = response.data;
            setPlantEquipmentTypeData(plantEquipmentTypeData);
        }, setIsPlantEquipmentTypeLoading);
    }

    const getInactiveActivity = (plantEquipmentTypeID: number) => {
        getAPI(`plant_equipment_type_activity`, {
            plant_equipment_type_id: plantEquipmentTypeID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const plantEquipmentTypeActivityData: PlantEquipmentTypeActivityCollectionResponse = response.data;
            setInactiveActivityData(plantEquipmentTypeActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isLoading = (
        isPlantEquipmentTypeLoading || 
        isInactiveActivityLoading
    )

    return (
        <OuterContainer 
            title='Plant/Tools Type' 
            id={plantEquipmentTypeID as string}
            headerContent={plantEquipmentTypeData && !plantEquipmentTypeData.data.is_active ? 
                <InactiveLabel/> : 
                null
            }
            maxWidth={800}
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && plantEquipmentTypeData ?
                        !isEditMode ?
                            <PlantEquipmentTypeInformation
                                plantEquipmentTypeData={plantEquipmentTypeData.data}
                                lastDeactivate={inactiveActivityData?.data.created_at}
                            /> : 
                            <EditPlantEquipmentTypeForm
                                plantEquipmentType={plantEquipmentTypeData}
                                setPlantEquipmentTypeData={setPlantEquipmentTypeData}
                                disabledEdit={() => setIsEditMode(false)}
                            />
                        :
                        <ProductCategoryInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <PlantEquipmentTypeSideBar 
                        plantEquipmentType={plantEquipmentTypeData}
                        setPlantEquipmentTypeData={setPlantEquipmentTypeData}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />                    
                </div>
            </div> 
        </OuterContainer> 

    )
}

export default PlantEquipmentTypePage