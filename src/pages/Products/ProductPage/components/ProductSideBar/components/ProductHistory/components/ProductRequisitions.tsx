import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateButton from "../../../../../../../../components/form/CreateButton/CreateButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import HeaderFlex from "../../../../../../../../components/ui/HeaderFlex";
import { RequisitionCollectionResponse } from "../../../../../../../../types/requisition.types";
import getAPI from "../../../../../../../../utils/getAPI";
import RequisitionList from "../../../../../../../Requisitions/components/RequisitionList";
import SearchForm from "../../../../../../../../components/form/SearchForm/SearchForm";
import RequisitionSearchHeader from "../../../../../../../Requisitions/components/RequisitionSearchHeader";

const ProductRequisitions = (props: {
    productID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();
    
    // Data States
    const [isRequisitionsLoading, setIsRequisitionsLoading] = useState(true);
    const [requisitionData, setRequisitionData] = useState<RequisitionCollectionResponse>();

    // Search Parameters 
    const offset = searchParams.get('requisitionsOffset');
    const paramPerPage = searchParams.get('requisitionsPerPage');
    const perPage = paramPerPage ? parseInt(paramPerPage) : 25;
    
    
    useEffect(() => {
        getRequisitions();
    }, [props.productID, offset, perPage])

    const getRequisitions = () => {
        getAPI('requisitions', {
            line_product_id: props.productID,
            perPage: perPage,
            offset: offset
        }, (response: any) => {
            const requisitionData: RequisitionCollectionResponse = response.data;
            setRequisitionData(requisitionData);
        }, setIsRequisitionsLoading)
    }

    return (
        <WindowOverlay 
            title={"Product Requisitions"} 
            maxWidth={800} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <RequisitionSearchHeader/>
            <RequisitionList 
                isRequisitionLoading={isRequisitionsLoading} 
                requisitions={requisitionData} 
                perPage={perPage}
                totalCount={props.totalCount}
                hasSearched
            />
        </WindowOverlay>
    )
}

export default ProductRequisitions