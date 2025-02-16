import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import getVehicleSearchParams from "../../../../../../../Vehicles/utils/getVehicleSearchParams";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { VehicleCollectionResponse } from "../../../../../../../../types/vehicles.types";
import getAPI from "../../../../../../../../utils/getAPI";
import VehicleList from "../../../../../../../Vehicles/VehicleListPage/components/VehiclesList";

const CostCentreVehicles = (props: {
    costCentreID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States 
    const [isVehicleLoading, setIsVehicleLoading] = useState(true)
    const [vehicleData, setVehicleData] = useState<VehicleCollectionResponse>();
    
    // Search Parameters 
    const vehicleSearchParams = getVehicleSearchParams(searchParams);

    useEffect(() => {
        getVehicles();
    }, [props.costCentreID, JSON.stringify(vehicleSearchParams)])

    const getVehicles = () => {
        getAPI(`vehicles`, {
            cost_centre_id: props.costCentreID,
            ...vehicleSearchParams
        }, (response: any) => {
            const vehicleData: VehicleCollectionResponse = response.data;
            setVehicleData(vehicleData);
        }, setIsVehicleLoading)    
    }

    return (
        <WindowOverlay 
            title={"Cost Centre Vehicles"} 
            maxWidth={900} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <VehicleList 
                isVehiclesLoading={isVehicleLoading} 
                vehicles={vehicleData} 
                perPage={vehicleSearchParams.perPage}  
                totalCount={props.totalCount}        
                hideCostCentre      
                hideAssignedTo
            />
        </WindowOverlay>
    )
}

export default CostCentreVehicles