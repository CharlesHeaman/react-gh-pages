import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RequisitionCollectionResponse } from "../../../../../../../../types/requisition.types";
import getAPI from "../../../../../../../../utils/getAPI";
import RequisitionList from "../../../../../../../Requisitions/components/RequisitionList";
import RequisitionSearchHeader from "../../../../../../../Requisitions/components/RequisitionSearchHeader";
import getRequisitionSearchParams from "../../../../../../../Requisitions/utils/getRequisitionSearchParam";

const CostCentreRequisitions = (props: {
    costCentreID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isRequisitionsLoading, setIsRequisitionsLoading] = useState(false);
    const [requisitionData, setRequisitionData] = useState<RequisitionCollectionResponse>();

    // Search Parameters 
    const requisitionSearchParams = getRequisitionSearchParams(searchParams);

    useEffect(() => {
        searchPurchaseOrders();
    }, [JSON.stringify(requisitionSearchParams), props.costCentreID])

    const searchPurchaseOrders = () => {
        getAPI('requisitions', {
            ...requisitionSearchParams,
            cost_centre_id: props.costCentreID
        }, (response: any) => {
            const requisitionData: RequisitionCollectionResponse = response.data;
            setRequisitionData(requisitionData);
        }, setIsRequisitionsLoading)
    }

    return (
        <WindowOverlay 
            title={"Cost Centre Requisitions"} 
            maxWidth={650} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <RequisitionSearchHeader/>
            <RequisitionList 
                isRequisitionLoading={isRequisitionsLoading} 
                requisitions={requisitionData} 
                perPage={requisitionSearchParams.perPage}
                totalCount={props.totalCount}
                hasSearched
                hideType
            />
        </WindowOverlay>
    )
}

export default CostCentreRequisitions