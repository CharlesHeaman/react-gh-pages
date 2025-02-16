import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ContractActivityCollectionResponse } from "../../../../../../../../../types/contractActivity.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../../../utils/getPaginationParams";
import ContractActivityList from "./ContractActivityList";


const ContractHistory = (props: {
    contractID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<ContractActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'contract_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.contractID])

    const getActivity = () => {
        getAPI(`contract_activity`, {
            ...paginationParams,
            contract_id: props.contractID
        }, (response: any) => {
            const contractActivityData: ContractActivityCollectionResponse = response.data;
            setActivityData(contractActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Contract History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <ContractActivityList
                isContractActivityLoading={isActivityLoading}
                contractActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default ContractHistory