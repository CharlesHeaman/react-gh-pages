import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { RequisitionCollectionResponse } from "../../types/requisition.types";
import getAPI from "../../utils/getAPI";
import RequisitionList from "./components/RequisitionList";
import RequisitionSearchHeader from "./components/RequisitionSearchHeader";
import getRequisitionSearchParams from "./utils/getRequisitionSearchParam";

const RequisitionListPage = ()  => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isRequisitionsLoading, setIsRequisitionsLoading] = useState(false);
    const [requisitionData, setRequisitionData] = useState<RequisitionCollectionResponse>();

    // Search Parameters 
    const hasSearched = searchParams.get(`requisitions_has_searched`) === "true";
    const requisitionSearchParams = getRequisitionSearchParams(searchParams);

    useEffect(() => {
        hasSearched && searchPurchaseOrders();
    }, [JSON.stringify(requisitionSearchParams)])

    const searchPurchaseOrders = () => {
        getAPI('requisitions', {
            ...requisitionSearchParams
        }, (response: any) => {
            const requisitionData: RequisitionCollectionResponse = response.data;
            setRequisitionData(requisitionData);
        }, setIsRequisitionsLoading)
    }

    return (
        <>
            <OuterContainer
                title='Requisitions'
                maxWidth={950}
                noBorder
                description="Create, edit and return requisitions."
            >
                <RequisitionSearchHeader/>
                <RequisitionList 
                    hasSearched={hasSearched} 
                    isRequisitionLoading={isRequisitionsLoading} 
                    requisitions={requisitionData} 
                    perPage={requisitionSearchParams.perPage}
                />
            </OuterContainer>
        </>
    )
}

export default RequisitionListPage