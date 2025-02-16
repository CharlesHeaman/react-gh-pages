import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { AssetCollectionResponse } from "../../../../../../../../../types/asset.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import PlantEquipmentList from "../../../../../../../../Assets/AssetListPage/components/PlantEquipmentList";
import VehicleList from "../../../../../../../../Vehicles/VehicleListPage/components/VehiclesList";

const UserPlantEquipment = (props: {
    userID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States 
    const [isAssetsLoading, setIsAssetsLoading] = useState(true);
    const [assetData, setAssetData] = useState<AssetCollectionResponse>();
    
    // Search Parameters 
    const offset = searchParams.get('offset');
    const paramPerPage = searchParams.get('perPage');
    const perPage = paramPerPage ? parseInt(paramPerPage) : 25;

    useEffect(() => {
        getAssets();
    }, [props.userID, offset, perPage])

    const getAssets = () => {
        getAPI(`assets`, {
            assigned_to_user_ids: [props.userID],
            offset: offset,
            perPage: perPage,
            is_active: true,
        }, (response: any) => {
            const assetData: AssetCollectionResponse = response.data;
            setAssetData(assetData);
        }, setIsAssetsLoading)    
    }

    return (
        <WindowOverlay 
            title={"User Plant/Tools"} 
            maxWidth={1000} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <PlantEquipmentList 
                isPlantEquipmentLoading={isAssetsLoading} 
                plantEquipment={assetData} 
                perPage={perPage}
                totalCount={props.totalCount}
                hideAssignedTo
            />
        </WindowOverlay>
    )
}

export default UserPlantEquipment