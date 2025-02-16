import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RefrigerantMovementCollectionResponse } from "../../../../../../../../types/refrigerantMovement.types";
import getAPI from "../../../../../../../../utils/getAPI";
import RefrigerantMovementList from "../../../../../../../RefrigerantMovements/components/RefrigerantMovementList/RefrigerantMovementList";

const TicketRefrigerantMovementsList = (props: {
    ticketNumber: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isRefrigerantMovementsLoading, setIsRefrigerantMovementsLoading] = useState(true);
    const [refrigerantMovementData, setRefrigerantMovementData] = useState<RefrigerantMovementCollectionResponse>();

    // Search Parameters 
    const offset = searchParams.get('refrigerant_movementsOffset');
    const paramPerPage = searchParams.get('refrigerant_movementsPerPage');
    const perPage = paramPerPage ? parseInt(paramPerPage) : 25;
    
    useEffect(() => {
        getRefrigerantMovements();
    }, [props.ticketNumber, offset, perPage])

    const getRefrigerantMovements = () => {
        getAPI(`refrigerant_movements`, {
            ticket_number: props.ticketNumber,
            offset: offset,
            perPage: perPage,
        }, (response: any) => {
            const refrigerantMovementData: RefrigerantMovementCollectionResponse = response.data;
            setRefrigerantMovementData(refrigerantMovementData);
        }, setIsRefrigerantMovementsLoading)    
    } 

    return (
        <WindowOverlay 
            title={"Refrigerant Movements"} 
            maxWidth={700} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <RefrigerantMovementList 
                isRefrigerantMovementsLoading={isRefrigerantMovementsLoading}
                refrigerantMovements={refrigerantMovementData} 
                perPage={perPage}            
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default TicketRefrigerantMovementsList