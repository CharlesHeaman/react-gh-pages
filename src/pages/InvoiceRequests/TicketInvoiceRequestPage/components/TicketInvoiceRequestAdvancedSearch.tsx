import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import getObjectHasValue from "../../../../utils/getObjectHasValue";
import updateAdvancedSearchParam from "../../../../utils/setAdvancedSearchParams";
import getTicketInvoiceRequestAdvancedSearchParams from "../../TicketInvoiceRequestListPage/utils/getTicketInvoiceRequestAdvancedSearchParams";
import TicketInvoiceRequestAdvancedSearchForm, { AdvancedTicketInvoiceRequestSearchForm } from "./TicketInvoiceRequestAdvancedSearchForm";
import clearTicketInvoiceRequestAdvancedSearchParams from "./utils/clearTicketInvoiceRequestAdvancedSearchParams";
import { DepartmentResponseData } from "../../../../types/department.types";

const TicketInvoiceRequestAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "ticket_invoice_requests";
    const advancedParams = getTicketInvoiceRequestAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        department_id: advancedParams.department_id ? advancedParams.department_id : 0,
    }

    // Form States 
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentResponseData>();

    // Search States
    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedTicketInvoiceRequestSearchForm>(currentSearchParams);

    useEffect(() => {
        setAdvancedSearchParams(currentSearchParams)
    }, [JSON.stringify(advancedParams)])

    useEffect(() => {
        setAdvancedSearchParams((prevState: any) => {
            return {
                ...prevState, 
                department_id: selectedDepartment?.id
            }
        })
    }, [selectedDepartment]);

    useEffect(() => {
        if (currentSearchParams.department_id === 0) {
            setSelectedDepartment(undefined);
        }
    }, [currentSearchParams.department_id]);

    const doSearch = (event?: FormEvent<HTMLFormElement>) => {
        event && event.preventDefault();
        updateAdvancedSearchParam(prefix, advancedSearchParams, searchParams, setSearchParams)
        props.hideFunc();
    }

    return (
        <WindowOverlay 
            title="Ticket Invoice Request Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={400}
            footer={<AdvancedSearchFooter 
                resourceName="Invoice Requests"
                hasAdvancedSearch={hasAdvancedSearch} 
                searchFunc={doSearch} 
                clearFunc={() => clearTicketInvoiceRequestAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
            />}
        >
            <form
                onSubmit={doSearch}
            >
                <TicketInvoiceRequestAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                />
            </form>
        </WindowOverlay>
        
    )
}

export default TicketInvoiceRequestAdvancedSearch