import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import PlantEquipmentTypeHistory from "./components/PlantEquipmentTypeHistory";
import PlantEquipmentTypePlantEquipment from "./components/PlantEquipmentTypePlantEquipment";

const PlantEquipmentTypeAssociatedData = (props: {
    plantEquipmentTypeID: number,
    plantEquipmentCount: number,
    activityCount: number,
}) => {
    const [showProducts, setShowProducts] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Plant/Tools Type'>
                <SideBarButton 
                    text={`Plant and Equipment (${props.plantEquipmentCount})`}
                    iconFont='handyman'
                    clickEvent={() => setShowProducts(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <PlantEquipmentTypePlantEquipment
                plantEquipmentTypeID={props.plantEquipmentTypeID}
                totalCount={props.plantEquipmentCount}
                show={showProducts}
                hideFunc={() => setShowProducts(false)}
            />

            <PlantEquipmentTypeHistory
                plantEquipmentTypeID={props.plantEquipmentTypeID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default PlantEquipmentTypeAssociatedData