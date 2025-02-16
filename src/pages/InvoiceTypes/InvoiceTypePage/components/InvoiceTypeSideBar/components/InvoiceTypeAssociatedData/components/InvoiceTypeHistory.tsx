import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { InvoiceTypeActivityCollectionResponse } from "../../../../../../../../types/invoiceTypeActivity.types";
import getAPI from "../../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../../utils/getPaginationParams";
import InvoiceTypeActivityList from "./InvoiceTypeActivityList";

const InvoiceTypeHistory = (props: {
    invoiceTypeID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<InvoiceTypeActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'invoice_type_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.invoiceTypeID])

    const getActivity = () => {
        getAPI(`invoice_type_activity`, {
            ...paginationParams,
            invoice_type_id: props.invoiceTypeID
        }, (response: any) => {
            const costCentreActivityData: InvoiceTypeActivityCollectionResponse = response.data;
            setActivityData(costCentreActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Invoice Type History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <InvoiceTypeActivityList
                isInvoiceTypeActivityLoading={isActivityLoading}
                costCentreActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default InvoiceTypeHistory