import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { AssetResponseData } from "../../../../../../../types/asset.types"
import RecordInspection from "./RecordInspection"

const PlantEquipmentInspection = (props: {
    plantEquipmentID: number,
    inspectionFrequency: number,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>
}) => {
    const [showRecordTest, setShowRecordTest] = useState(false);
    
    return (
        <>
            <SideBarModule title="Inspection">
                <SideBarButton 
                    text="Record Inspection" 
                    iconFont="assignment_turned_in" 
                    clickEvent={() => setShowRecordTest(true)}
                />
            </SideBarModule>

            <RecordInspection
                plantEquipmentID={props.plantEquipmentID}
                inspectionFrequency={props.inspectionFrequency}
                show={showRecordTest}
                hideFunc={() => setShowRecordTest(false)}
                setPlantEquipmentData={props.setPlantEquipmentData}
            />
        </>
    )
}

export default PlantEquipmentInspection