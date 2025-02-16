import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RequisitionCollectionResponse } from "../../../../../../../types/requisition.types";
import { RequisitionLineCollectionResponse } from "../../../../../../../types/requisitionLines.types";
import getAPI from "../../../../../../../utils/getAPI";
import RequisitionedItemsList from "../../../../../../Requisitions/components/RequisitionedItemsList";
import RequisitionSearchHeader from "../../../../../../Requisitions/components/RequisitionSearchHeader";

const JobRequisitionedItemsList = (props: {
    jobID: number,
    jobNumber: number,
    departmentID: number,
    tickets: Array<any>
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isJobRequisitionsLoading, setIsJobRequisitionsLoading] = useState(true);
    const [jobRequisitionNumbers, setJobRequisitionNumber] = useState<Array<number>>([]);
    const [isTicketRequisitionsLoading, setIsTicketRequisitionsLoading] = useState(true);
    const [ticketRequisitionNumbers, setTicketRequisitionNumber] = useState<Array<number>>([]);
    const [isRequisitionLinesLoading, setIsRequisitionLinesLoading] = useState(true);
    const [requisitionLinesData, setRequisitionLinesData] = useState<RequisitionLineCollectionResponse>();

    useEffect(() => {
        getJobRequisitions();
    }, [props.jobNumber]);

    useEffect(() => {
        getTicketRequisitions(props.tickets);
    }, [props.tickets]);

    useEffect(() => {
        const allRequisitionNumbers = jobRequisitionNumbers.concat(ticketRequisitionNumbers);
        if (allRequisitionNumbers.length > 0) {
            getRequisitionLines([...new Set(allRequisitionNumbers)]);
        } else {
            getRequisitionLines([-1]);
        }
    }, [jobRequisitionNumbers, ticketRequisitionNumbers]);

    const getJobRequisitions = () => {
        getAPI('requisitions', {
            jobs: [{
                department_id: props.departmentID,
                job_number: props.jobNumber
            }],
            is_complete: true,
        }, (response: any) => {
            const requisitionsData: RequisitionCollectionResponse = response.data;
            setJobRequisitionNumber([...new Set(requisitionsData.data.map(requisition => requisition.data.number))])
        }, setIsJobRequisitionsLoading)
    }

    const getTicketRequisitions = (tickets: Array<any>) => {
        getAPI('requisitions', {
            tickets: tickets,
            is_complete: true,
        }, (response: any) => {
            const requisitionsData: RequisitionCollectionResponse = response.data;
            setTicketRequisitionNumber([...new Set(requisitionsData.data.map(requisition => requisition.data.number))])
        }, setIsTicketRequisitionsLoading)
    }
    
    const getRequisitionLines = (requisitionNumber: Array<number>) => {
        getAPI('requisition_lines', {
            req_no: requisitionNumber,
            perPage: 2000
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
                jobID={props.jobID}
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

export default JobRequisitionedItemsList