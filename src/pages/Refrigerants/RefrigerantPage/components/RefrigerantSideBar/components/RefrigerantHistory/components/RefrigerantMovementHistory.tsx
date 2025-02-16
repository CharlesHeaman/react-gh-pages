import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RefrigerantMovementCollectionResponse } from "../../../../../../../../types/refrigerantMovement.types";
import getAPI from "../../../../../../../../utils/getAPI";
import RefrigerantMovementList from "../../../../../../../RefrigerantMovements/components/RefrigerantMovementList/RefrigerantMovementList";
import getRefrigerantMovementSearchParams from "../../../../../../../RefrigerantMovements/utils/getRefrigerantMovementSearchParams";

const RefrigerantMovementHistory = (props: {
    refrigerant_id: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isRefrigerantMovementsLoading, setIsRefrigerantMovementsLoading] = useState(true);
    const [refrigerantMovementData, setRefrigerantMovementData] = useState<RefrigerantMovementCollectionResponse>();

    // Search Parameters 
    const refrigerantMovementSearchParams = getRefrigerantMovementSearchParams(searchParams);

    useEffect(() => {
        getRefrigerantMovements();
    }, [props.refrigerant_id, JSON.stringify(refrigerantMovementSearchParams)])

    const getRefrigerantMovements = () => {
        getAPI(`refrigerant_movements`, {
            refrigerant_id: props.refrigerant_id,
            ...refrigerantMovementSearchParams,
        }, (response: any) => {
            const refrigerantMovementData: RefrigerantMovementCollectionResponse = response.data;
            setRefrigerantMovementData(refrigerantMovementData);
        }, setIsRefrigerantMovementsLoading)    
    } 

    return (
        <WindowOverlay 
            title={"Refrigerant Movements"} 
            maxWidth={800} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <RefrigerantMovementList 
                isRefrigerantMovementsLoading={isRefrigerantMovementsLoading}
                refrigerantMovements={refrigerantMovementData} 
                perPage={refrigerantMovementSearchParams.perPage}            
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default RefrigerantMovementHistory