import { useState, useEffect } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { RefrigerantMovementCollectionResponse } from "../../../../../../types/refrigerantMovement.types";
import getAPI from "../../../../../../utils/getAPI";
import EquipmentRefrigerantMovementsList from "./EquipmentRefrigerantMovements";

const EquipmentRefrigerant = (props: {
    ticketNumbers: Array<number>,
    movementCount: number
}) => {
    const [showMovements, setShowMovements] = useState(false);

    return (
        <>
            <SideBarModule title='Refrigerant'>
                <SideBarButton 
                    text={`Refrigerant Movements (${props.movementCount})`}
                    iconFont='propane'
                    clickEvent={() => setShowMovements(true)}
                />
            </SideBarModule>

            <EquipmentRefrigerantMovementsList 
                ticketNumbers={props.ticketNumbers} 
                totalCount={props.movementCount} 
                show={showMovements} 
                hideFunc={() => setShowMovements(false)}
            />
        </>
    )
}

export default EquipmentRefrigerant