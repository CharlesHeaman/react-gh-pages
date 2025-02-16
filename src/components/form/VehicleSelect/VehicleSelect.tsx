import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { VehicleResponseData, VehicleCollectionResponse } from "../../../types/vehicles.types";

const VehicleSelect = (props: {
    selectedVehicle: VehicleResponseData | undefined,
    setSelectedVehicle: Dispatch<SetStateAction<VehicleResponseData | undefined>>,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isVehiclesLoading, setIsVehiclesLoading] = useState(false);
    const [vehiclesData, setVehiclesData] = useState<VehicleCollectionResponse>();

    useEffect(() => {
        getVehicles();
    }, [searchTerm])

    const getVehicles = () => {
        getAPI('vehicles', {
            registration_number_like: searchTerm,
            is_active: true,
        }, (response: any) => {
            const costCentreData: VehicleCollectionResponse = response.data;
            setVehiclesData(costCentreData);
        }, setIsVehiclesLoading);
    }

    const showRequired = props.selectedVehicle === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="directions_car"
                resourceName="vehicle"
                resourceNamePlural="vehicles"
                selectedText={props.selectedVehicle ? props.selectedVehicle.data.registration_number : undefined}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={vehiclesData ? vehiclesData.data.map(vehicle => {
                    return {
                        text: vehicle.data.registration_number,
                        clickFunc: () => props.setSelectedVehicle(vehicle),
                        selected: props.selectedVehicle?.id === vehicle.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Vehicle is required`}
                show={showRequired}
            />}
        </>
    )
}

export default VehicleSelect