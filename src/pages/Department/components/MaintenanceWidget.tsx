import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import { AssetCollectionResponse } from "../../../types/asset.types";

const MaintenanceWidget = () => {
    // Data States
    const [isAssetsLoading, setIsAssetsLoading] = useState(true);
    const [assetData, setAssetData] = useState<AssetCollectionResponse>();

    useEffect(() => {
        getExpiredAssets();
    }, []);

    const getExpiredAssets = () => {
        getAPI('assets', {
            is_active: true,
            requires_maintenance: true,
            perPage: 1,
        }, (response: any) => {
            const assetsData: AssetCollectionResponse = response.data;
            setAssetData(assetsData);
        }, setIsAssetsLoading);
    }


    return (
        <DashboardWidget 
            title="Maintenances"
            count={assetData?.total_count}
            text="Required in the next month."
            iconFont={"home_repair_service"} 
            to={"../plant_and_equipment/maintenance"}                                    
        />
    )
}

export default MaintenanceWidget;