import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { AssetResponseData } from "../../../../../../../types/asset.types"
import RecordCalibration from "./RecordCalibration"

const PlantEquipmentCalibration = (props: {
    plantEquipmentID: number,
    calibrationTestFrequency: number,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>
}) => {
    const [showRecordTest, setShowRecordTest] = useState(false);
    
    return (
        <>
            <SideBarModule title="Calibration">
                <SideBarButton 
                    text="Record Calibration" 
                    iconFont="compass_calibration" 
                    clickEvent={() => setShowRecordTest(true)}
                />
            </SideBarModule>

            <RecordCalibration
                plantEquipmentID={props.plantEquipmentID}
                calibrationTestFrequency={props.calibrationTestFrequency}
                show={showRecordTest}
                hideFunc={() => setShowRecordTest(false)}
                setPlantEquipmentData={props.setPlantEquipmentData}
            />
        </>
    )
}

export default PlantEquipmentCalibration