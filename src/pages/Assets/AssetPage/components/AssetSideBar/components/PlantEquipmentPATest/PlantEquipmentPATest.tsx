import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { AssetResponseData } from "../../../../../../../types/asset.types"
import RecordPATest from "./RecordPATest"

const PlantEquipmentPATest = (props: {
    plantEquipmentID: number,
    paTestFrequency: number,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>
}) => {
    const [showRecordTest, setShowRecordTest] = useState(false);
    
    return (
        <>
            <SideBarModule title="PA Test">
                <SideBarButton 
                    text="Record PA Test" 
                    iconFont="domain_verification" 
                    clickEvent={() => setShowRecordTest(true)}
                />
            </SideBarModule>

            <RecordPATest
                plantEquipmentID={props.plantEquipmentID}
                paTestFrequency={props.paTestFrequency}
                show={showRecordTest}
                hideFunc={() => setShowRecordTest(false)}
                setPlantEquipmentData={props.setPlantEquipmentData}
            />
        </>
    )
}

export default PlantEquipmentPATest