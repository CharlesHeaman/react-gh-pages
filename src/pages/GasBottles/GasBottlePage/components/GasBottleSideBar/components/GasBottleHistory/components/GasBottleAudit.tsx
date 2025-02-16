import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { GasBottleActivityCollectionResponse } from "../../../../../../../../types/gasBottleActivity";
import getAPI from "../../../../../../../../utils/getAPI";
import GasBottleActivityList from "../../../../../../../GasBottleActivity/GasBottleActivityList";
import getPaginationParams from "../../../../../../../../utils/getPaginationParams";

const GasBottleAudit = (props: {
    bottleID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
    isConsumable?: boolean,
}) => {
    const [searchParams] = useSearchParams();
    
    // Data States
    const [isGasHistoryLoading, setIsGasHistoryLoading] = useState(true);
    const [gasHistoryData, setGasHistoryData] = useState<GasBottleActivityCollectionResponse>();

    // Search Parameters 
    const paginationParams = getPaginationParams(searchParams, 'bottle_history');
    
    useEffect(() => {
        getRefrigerantMovements();
    }, [JSON.stringify(paginationParams), props.bottleID])

    const getRefrigerantMovements = () => {
        getAPI(`gas_bottle_activity`, {
            ...paginationParams,
            gas_bottle_ids: [props.bottleID],
        }, (response: any) => {
            const gasHistoryData: GasBottleActivityCollectionResponse = response.data;
            setGasHistoryData(gasHistoryData);
        }, setIsGasHistoryLoading)    
    } 
    return (
        <WindowOverlay 
            title={"Bottle History"} 
            maxWidth={800} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <GasBottleActivityList 
                isGasBottleActivityLoading={isGasHistoryLoading} 
                gasBottleActivity={gasHistoryData} 
                perPage={paginationParams.perPage} 
                totalCount={props.totalCount}  
                isConsumable={props.isConsumable}          
            />
        </WindowOverlay>
    )
}

export default GasBottleAudit