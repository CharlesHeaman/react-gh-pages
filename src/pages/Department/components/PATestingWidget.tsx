import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import { AssetCollectionResponse } from "../../../types/asset.types";

const PATestingWidget = () => {
    // Data States
    const [isAssetsLoading, setIsAssetsLoading] = useState(true);
    const [assetData, setAssetData] = useState<AssetCollectionResponse>();

    useEffect(() => {
        getExpiredAssets();
    }, []);

    const getExpiredAssets = () => {
        getAPI('assets', {
            is_active: true,
            requires_pa_test: true,
            perPage: 1,
        }, (response: any) => {
            const assetsData: AssetCollectionResponse = response.data;
            setAssetData(assetsData);
        }, setIsAssetsLoading);
    }


    return (
        <DashboardWidget 
            title="PA Tests"
            count={assetData?.total_count}
            text="Required in the next month."
            iconFont={"domain_verification"} 
            to={"../plant_and_equipment/pa_testing"}                                    
        />
    )
}

export default PATestingWidget;