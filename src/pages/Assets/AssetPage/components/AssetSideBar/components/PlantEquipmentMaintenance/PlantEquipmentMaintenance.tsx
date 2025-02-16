import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { AssetResponseData } from "../../../../../../../types/asset.types"
import RecordMaintenance from "./RecordMaintenance"

const PlantEquipmentMaintenance = (props: {
    plantEquipmentID: number,
    maintenanceFrequency: number,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>
}) => {
    const [showRecordTest, setShowRecordTest] = useState(false);
    
    return (
        <>
            <SideBarModule title="Maintenance">
                <SideBarButton 
                    text="Record Maintenance" 
                    iconFont="home_repair_service" 
                    clickEvent={() => setShowRecordTest(true)}
                />
            </SideBarModule>

            <RecordMaintenance
                plantEquipmentID={props.plantEquipmentID}
                maintenanceFrequency={props.maintenanceFrequency}
                show={showRecordTest}
                hideFunc={() => setShowRecordTest(false)}
                setPlantEquipmentData={props.setPlantEquipmentData}
            />
        </>
    )
}

export default PlantEquipmentMaintenance