import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import { AssetCollectionResponse } from "../../../types/asset.types";

const CalibrationWidget = () => {
    // Data States
    const [isAssetsLoading, setIsAssetsLoading] = useState(true);
    const [assetData, setAssetData] = useState<AssetCollectionResponse>();

    useEffect(() => {
        getExpiredAssets();
    }, []);

    const getExpiredAssets = () => {
        getAPI('assets', {
            is_active: true,
            requires_calibration: true,
            perPage: 1,
        }, (response: any) => {
            const assetsData: AssetCollectionResponse = response.data;
            setAssetData(assetsData);
        }, setIsAssetsLoading);
    }


    return (
        <DashboardWidget 
            title="Calibration"
            count={assetData?.total_count}
            text="Required in the next month."
            iconFont={"compass_calibration"} 
            to={"../plant_and_equipment/calibration"}                                    
        />
    )
}

export default CalibrationWidget;