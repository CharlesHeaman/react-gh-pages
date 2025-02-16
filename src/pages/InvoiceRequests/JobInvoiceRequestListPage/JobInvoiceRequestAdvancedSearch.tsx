import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { DepartmentResponseData } from "../../../types/department.types";
import getObjectHasValue from "../../../utils/getObjectHasValue";
import updateAdvancedSearchParam from "../../../utils/setAdvancedSearchParams";
import JobInvoiceRequestAdvancedSearchForm, { AdvancedJobInvoiceRequestSearchForm } from "./JobInvoiceRequestAdvancedSearchForm";
import getJobInvoiceRequestAdvancedSearchParams from "./utils/getJobInvoiceRequestAdvancedSearchParams";
import clearJobInvoiceRequestAdvancedSearchParams from "./utils/clearJobInvoiceRequestAdvancedSearchParams";

const JobInvoiceRequestAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "job_invoice_requests";
    const advancedParams = getJobInvoiceRequestAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        department_id: advancedParams.department_id ? advancedParams.department_id : 0,
    }

    // Form States 
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentResponseData>();

    // Search States
    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedJobInvoiceRequestSearchForm>(currentSearchParams);

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
            title="Job Invoice Request Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={400}
            footer={<AdvancedSearchFooter 
                resourceName="Invoice Requests"
                hasAdvancedSearch={hasAdvancedSearch} 
                searchFunc={doSearch} 
                clearFunc={() => clearJobInvoiceRequestAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
            />}
        >
            <form
                onSubmit={doSearch}
            >
                <JobInvoiceRequestAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                />
            </form>
        </WindowOverlay>
        
    )
}

export default JobInvoiceRequestAdvancedSearch