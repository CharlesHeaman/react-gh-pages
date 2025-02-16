import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { VehicleCollectionResponse } from "../../../types/vehicles.types";
import getAPI from "../../../utils/getAPI";
import VehicleSearchHeader from "../components/VehicleSearchHeader";
import getVehicleSearchParams from "../utils/getVehicleSearchParams";
import VehicleList from "./components/VehiclesList";
import VehicleAdvancedSearch from "./VehicleAdvancedSearch";

const VehicleListPage = ()  => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States 
    const [isVehicleLoading, setIsVehicleLoading] = useState(true);
    const [vehicleData, setVehicleData] = useState<VehicleCollectionResponse>();

    // Search Parameters 
    const vehicleSearchParams = getVehicleSearchParams(searchParams);

    useEffect(() => {
        searchVehicles();
    }, [JSON.stringify(vehicleSearchParams)])

    const searchVehicles = () => {
        getAPI('vehicles', {
            ...vehicleSearchParams
        }, (response: any) => {
            const vehicleData: VehicleCollectionResponse = response.data;
            setVehicleData(vehicleData);
        }, setIsVehicleLoading);
    }
    
    return (
        <>
            <OuterContainer
                title='Vehicles'
                maxWidth={1200}
                description="Create, edit and deactivate vehicles. Mange vehicle assignment. Manage vehicle MOT and TAX."
                noBorder
            >
                <VehicleSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <VehicleList 
                    isVehiclesLoading={isVehicleLoading} 
                    vehicles={vehicleData} 
                    perPage={vehicleSearchParams.perPage}                
                />
            </OuterContainer>

            <VehicleAdvancedSearch
                show={showAdvancedSearch} 
                hideFunc={() => setShowAdvancedSearch(false)}            
            />
        </>
    )
}

export default VehicleListPage