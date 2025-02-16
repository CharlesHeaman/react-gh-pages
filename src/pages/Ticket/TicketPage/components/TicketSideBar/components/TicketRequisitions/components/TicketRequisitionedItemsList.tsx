import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RequisitionCollectionResponse } from "../../../../../../../../types/requisition.types";
import { RequisitionLineCollectionResponse } from "../../../../../../../../types/requisitionLines.types";
import getAPI from "../../../../../../../../utils/getAPI";
import RequisitionedItemsList from "../../../../../../../Requisitions/components/RequisitionedItemsList";
import RequisitionSearchHeader from "../../../../../../../Requisitions/components/RequisitionSearchHeader";

const TicketRequisitionedItemsList = (props: {
    ticketID: number,
    ticketType: number,
    ticketNumber: number,
    departmentID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isRequisitionsLoading, setIsRequisitionsLoading] = useState(true);
    const [requisitionsData, setRequisitionsData] = useState<RequisitionCollectionResponse>();
    const [isRequisitionLinesLoading, setIsRequisitionLinesLoading] = useState(false);
    const [requisitionLinesData, setRequisitionLinesData] = useState<RequisitionLineCollectionResponse>();

    useEffect(() => {
        getRequisitions();
    }, [props.ticketNumber])

    const getRequisitions = () => {
        getAPI('requisitions', {
            tickets: [{
                department_id: props.departmentID,
                ticket_number: props.ticketNumber
            }],
            is_complete: true
        }, (response: any) => {
            const requisitionsData: RequisitionCollectionResponse = response.data;
            setRequisitionsData(requisitionsData);
            if (requisitionsData.data.length > 0) {
                getRequisitionLines([...new Set(requisitionsData.data.map(requisition => requisition.data.number))]);
            } else {
                getRequisitionLines([-1]);
            }
        }, setIsRequisitionsLoading)
    }
    
    const getRequisitionLines = (requisitionNumber: Array<number>) => {
        getAPI('requisition_lines', {
            requisition_numbers: requisitionNumber,
        }, (response: any) => {
            const requisitionLinesData: RequisitionLineCollectionResponse = response.data;
            setRequisitionLinesData(requisitionLinesData);
        }, setIsRequisitionLinesLoading)
    }

    return (
        <WindowOverlay 
            title={"Requisitioned Items"} 
            maxWidth={1200} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <RequisitionSearchHeader
                ticketID={props.ticketID}
                ticketType={props.ticketType}            
                showAdvancedSearch={() => setShowAdvancedSearch(true)}
            />
            <RequisitionedItemsList 
                isRequisitionLinesLoading={isRequisitionLinesLoading} 
                requisitionLines={requisitionLinesData} 
                totalCount={props.totalCount}
                perPage={props.totalCount}            
            />
        </WindowOverlay>
    )
}

export default TicketRequisitionedItemsList