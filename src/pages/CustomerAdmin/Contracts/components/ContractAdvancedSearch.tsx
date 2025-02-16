import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import getObjectHasValue from "../../../../utils/getObjectHasValue";
import updateAdvancedSearchParam from "../../../../utils/setAdvancedSearchParams";
import getContractAdvancedSearchParams from "../utils/getContractAdvancedSearchParams";
import ContractAdvancedSearchForm, { AdvancedContractSearchForm } from "./ContractAdvancedSearchForm";
import clearContractAdvancedSearchParams from "../utils/clearContractAdvancedSearchParams";
import { DepartmentResponseData } from "../../../../types/department.types";
import getAPI from "../../../../utils/getAPI";


const ContractAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "contracts"
    const advancedParams = getContractAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        value_greater_than: advancedParams.value_greater_than ? advancedParams.value_greater_than : '',
        value_less_than: advancedParams.value_less_than ? advancedParams.value_less_than : '',
        start_before: advancedParams.start_before ? new Date(advancedParams.start_before) : undefined,
        start_after: advancedParams.start_after ? new Date(advancedParams.start_after) : undefined,
        end_before: advancedParams.end_before ? new Date(advancedParams.end_before) : undefined,
        end_after: advancedParams.end_after ? new Date(advancedParams.end_after) : undefined,
        purchase_order_number_like: advancedParams.purchase_order_number_like ? advancedParams.purchase_order_number_like : '',
        department_id: advancedParams.department_id ? advancedParams.department_id : 0,   
    }

    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedContractSearchForm>(currentSearchParams);
    const [, setIsDepartmentLoading] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentResponseData>();

    const departmentIDParam = searchParams.get('contracts_department_id');

    useEffect(() => {
        departmentIDParam && getDepartment(parseInt(departmentIDParam));
    }, [departmentIDParam])

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setSelectedDepartment(departmentData);
        }, setIsDepartmentLoading);
    }

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

    useEffect(() => {
        setAdvancedSearchParams(currentSearchParams)
    }, [JSON.stringify(advancedParams)]);

    const doSearch = (event?: FormEvent<HTMLFormElement>) => {
        event && event.preventDefault();
        updateAdvancedSearchParam(prefix, advancedSearchParams, searchParams, setSearchParams)
        props.hideFunc();
    }

    return (
        <WindowOverlay 
            title="Contract Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={400}
            footer={<AdvancedSearchFooter 
                resourceName="Contracts"
                hasAdvancedSearch={hasAdvancedSearch} 
                searchFunc={doSearch} 
                clearFunc={() => clearContractAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
            />}
        >
            <form
                onSubmit={doSearch}
            >
                <ContractAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                />
            </form>
        </WindowOverlay>
    )
}

export default ContractAdvancedSearch