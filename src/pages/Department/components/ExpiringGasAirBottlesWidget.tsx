import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import { GasBottleCollectionResponse } from "../../../types/gasBottle.types";
import getMonthRelativeDate from "../../../utils/getMonthRelativeDate";

const ExpiringGasAirBottlesWidget = () => {
    // Data States
    const [isBottlesLoading, setIsBottlesLoading] = useState(false);
    const [bottleData, setBottlesData] = useState<GasBottleCollectionResponse>();

    useEffect(() => {
        getEngineers();
    }, []);

    const getEngineers = () => {
        getAPI('gas_bottles', {
            is_active: true,
            rental_end_before: getMonthRelativeDate(new Date(), 1),
            is_returned: false,
            is_consumable: true,
            perPage: 1
        }, (response: any) => {
            const bottleData: GasBottleCollectionResponse = response.data;
            setBottlesData(bottleData);
        }, setIsBottlesLoading);
    }

    return (
        <DashboardWidget 
            title="Gas/Air Bottles"
            count={bottleData?.total_count}
            text="Rental expiring in the next month."
            iconFont={"co2"} 
            to={`../gas_air_bottles?gas_bottles_rental_end_before=${getMonthRelativeDate(new Date(), 1).toISOString().split('T')[0]}&gas_bottles_has_searched=true`}                                    
        />
    )
}

export default ExpiringGasAirBottlesWidget;