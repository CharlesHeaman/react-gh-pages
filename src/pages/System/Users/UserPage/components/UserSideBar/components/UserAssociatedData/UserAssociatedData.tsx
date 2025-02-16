import { useState } from "react"
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import UserGasBottles from "./components/UserGasBottles"
import UserPlantEquipment from "./components/UserPlantEquipment"
import UserVehicles from "./components/UserVehicles"

const UserAssociatedData = (props: {
    userID: number,
    vehicleCount: number,
    assetCount: number
    gasBottleCount: number
}) => {
    const [showVehicles, setShowVehicles] = useState(false);
    const [showPlantEquipment, setShowPlantEquipment] = useState(false);
    const [showUserGasBottles, setShowUserGasBottles] = useState(false);
    
    return (
        <>
            <SideBarModule title="User">
                <SideBarButton 
                    text={`Vehicles (${props.vehicleCount})`}
                    iconFont="directions_car"
                    clickEvent={() => setShowVehicles(true)}
                />
                <SideBarButton 
                    text={`Plant/Tools (${props.assetCount})`}
                    iconFont="handyman"
                    clickEvent={() => setShowPlantEquipment(true)}
                />
                <SideBarButton 
                    text={`Gas Bottles (${props.gasBottleCount})`}
                    iconFont="propane_tank"
                    clickEvent={() => setShowUserGasBottles(true)}
                />
            </SideBarModule>

            <UserVehicles
                userID={props.userID}
                totalCount={props.vehicleCount}
                show={showVehicles}
                hideFunc={() => setShowVehicles(false)}
            />

            <UserPlantEquipment
                userID={props.userID}
                totalCount={props.assetCount}
                show={showPlantEquipment}
                hideFunc={() => setShowPlantEquipment(false)}
            />

            <UserGasBottles
                userID={props.userID}
                totalCount={props.gasBottleCount}
                show={showUserGasBottles}
                hideFunc={() => setShowUserGasBottles(false)}
            />
        </>
    )
}

export default UserAssociatedData