import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import { AssetCollectionResponse } from "../../../types/asset.types";

const InspectionWidget = () => {
    // Data States
    const [isAssetsLoading, setIsAssetsLoading] = useState(true);
    const [assetData, setAssetData] = useState<AssetCollectionResponse>();

    useEffect(() => {
        getExpiredAssets();
    }, []);

    const getExpiredAssets = () => {
        getAPI('assets', {
            is_active: true,
            requires_inspection: true,
            perPage: 1,
        }, (response: any) => {
            const assetsData: AssetCollectionResponse = response.data;
            setAssetData(assetsData);
        }, setIsAssetsLoading);
    }


    return (
        <DashboardWidget 
            title="Inspections"
            count={assetData?.total_count}
            text="Required in the next month."
            iconFont={"assignment_turned_in"} 
            to={"../plant_and_equipment/inspection"}                                    
        />
    )
}

export default InspectionWidget;