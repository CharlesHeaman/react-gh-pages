import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import getMonthRelativeDate from "../../../utils/getMonthRelativeDate";
import { VehicleCollectionResponse } from "../../../types/vehicles.types";

const ExpiringVehiclesWidget = () => {
    // Data States
    const [isVehiclesLoading, setIsVehiclesLoading] = useState(false);
    const [vehicleData, setVehiclesData] = useState<VehicleCollectionResponse>();

    useEffect(() => {
        getEngineers();
    }, []);

    const getEngineers = () => {
        getAPI('vehicles', {
            is_active: true,
            mot_due_date_or_tax_due_date_before: getMonthRelativeDate(new Date(), 1),
            perPage: 1
        }, (response: any) => {
            const vehicleData: VehicleCollectionResponse = response.data;
            setVehiclesData(vehicleData);
        }, setIsVehiclesLoading);
    }

    return (
        <DashboardWidget 
            title="Vehicles"
            count={vehicleData?.total_count}
            text="MOT or tax requiring review in the next month."
            iconFont={"directions_car"} 
            to={`../vehicles?vehicles_mot_due_date_or_tax_due_date_before=${getMonthRelativeDate(new Date(), 1).toISOString().split('T')[0]}`}                                
        />
    )
}

export default ExpiringVehiclesWidget;