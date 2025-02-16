import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { VehicleResponseData } from "../../../../../../types/vehicles.types"
import RecordMOT from "./components/RecordMOT"
import RecordTax from "./components/RecordTax"

const VehicleMOTTax = (props: {
    vehicleID: number,
    setVehicleData: Dispatch<SetStateAction<VehicleResponseData | undefined>>
}) => {

    const [showMOT, setShowMOT] = useState(false);
    const [showTax, setShowTax] = useState(false);
    
    return (
        <>
            <SideBarModule title="MOT/Tax">
                <SideBarButton 
                    text="Record MOT" 
                    iconFont="garage" 
                    clickEvent={() => setShowMOT(true)}
                />
                <SideBarButton 
                    text="Record Tax" 
                    iconFont="fact_check" 
                    clickEvent={() => setShowTax(true)}
                />
            </SideBarModule>

            <RecordMOT 
                vehicleID={props.vehicleID} 
                setVehicleData={props.setVehicleData} 
                show={showMOT} 
                hideFunc={() => setShowMOT(false)}            
            />

            <RecordTax
                vehicleID={props.vehicleID} 
                setVehicleData={props.setVehicleData} 
                show={showTax} 
                hideFunc={() => setShowTax(false)}            
            />
        </>
    )
}

export default VehicleMOTTax