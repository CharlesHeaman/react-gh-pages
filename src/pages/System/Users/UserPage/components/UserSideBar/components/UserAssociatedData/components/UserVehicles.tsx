import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { VehicleCollectionResponse } from "../../../../../../../../../types/vehicles.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import VehicleList from "../../../../../../../../Vehicles/VehicleListPage/components/VehiclesList";
import getVehicleSearchParams from "../../../../../../../../Vehicles/utils/getVehicleSearchParams";

const UserVehicles = (props: {
    userID: number,
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
    }, [props.userID, JSON.stringify(vehicleSearchParams)])

    const getVehicles = () => {
        getAPI(`vehicles`, {
            user_ids: [props.userID],
            vehicleSearchParams
        }, (response: any) => {
            const vehicleData: VehicleCollectionResponse = response.data;
            setVehicleData(vehicleData);
        }, setIsVehicleLoading)    
    }

    return (
        <WindowOverlay 
            title={"User Vehicles"} 
            maxWidth={1000} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <VehicleList 
                isVehiclesLoading={isVehicleLoading} 
                vehicles={vehicleData} 
                perPage={vehicleSearchParams.perPage}  
                totalCount={props.totalCount}              
                hideAssignedTo
            />
        </WindowOverlay>
    )
}

export default UserVehicles