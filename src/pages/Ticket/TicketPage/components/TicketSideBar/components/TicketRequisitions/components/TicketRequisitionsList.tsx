import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RequisitionCollectionResponse } from "../../../../../../../../types/requisition.types";
import getAPI from "../../../../../../../../utils/getAPI";
import RequisitionList from "../../../../../../../Requisitions/components/RequisitionList";

const TicketRequisitionsList = (props: {
    ticketNumber: number,
    departmentID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isRequisitionsLoading, setIsRequisitionsLoading] = useState(true);
    const [requisitionsData, setRequisitionsData] = useState<RequisitionCollectionResponse>();

    // Search Parameters 
    const offset = searchParams.get('refrigerant_movementsOffset');
    const paramPerPage = searchParams.get('refrigerant_movementsPerPage');
    const perPage = paramPerPage ? parseInt(paramPerPage) : 25;
    
    useEffect(() => {
        getRequisitions();
    }, [props.ticketNumber, offset, perPage])

    const getRequisitions = () => {
        getAPI('requisitions', {
            tickets: [{
                department_id: props.departmentID,
                ticket_number: props.ticketNumber
            }],
            offset: offset,
            perPage: perPage
        }, (response: any) => {
            const requisitionsData: RequisitionCollectionResponse = response.data;
            setRequisitionsData(requisitionsData);
        }, setIsRequisitionsLoading)
    }

    return (
        <WindowOverlay 
            title={"Requisitions"} 
            maxWidth={600} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <RequisitionList 
                isRequisitionLoading={isRequisitionsLoading}
                requisitions={requisitionsData} 
                perPage={perPage}            
                totalCount={props.totalCount}
                hasSearched
            />
        </WindowOverlay>
    )
}

export default TicketRequisitionsList