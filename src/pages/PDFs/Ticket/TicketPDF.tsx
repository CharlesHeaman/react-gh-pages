import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "../../../components/ui/Loading/Loading";
import { DepartmentCollectionResponse } from "../../../types/department.types";
import { TicketCollectionResponse } from "../../../types/tickets.types";
import getAPI from "../../../utils/getAPI";
import postAPI from "../../../utils/postAPI";

const TicketPDF = () => {
    const {departmentName, ticketNumber, ticketSuffix} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [isPDFLoading, setIsPDFLoading] = useState(false);

    useEffect(() => {
        getDepartment();
    }, [departmentName, ticketNumber, ticketSuffix])

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0]
            getTicketData(currentDepartmentData.id);
        }, setIsDepartmentLoading)
    }

    const getTicketData = (departmentID: number) => {
        getAPI(`tickets`, {
            numbers: [ticketNumber],
            suffixes: [ticketSuffix],
            department_ids: [departmentID]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            const currentTicketData = ticketData.data[0];
            generatePDFs(currentTicketData.id, currentTicketData.data.ticket_type)
        }, setIsTicketLoading);
    }

    const generatePDFs = (ticketID: number, ticketType: number) => {
        postAPI(`oldTickets/${ticketID}/${ticketType}/sendTicketPDF`, {
            internal: searchParams.get('internal')
        }, {}, () => {
            window.close();
        }, setIsPDFLoading);
    }

    return (
        <Loading text='Generating PDF...'/>
    )
}

export default TicketPDF