import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import getObjectHasValue from "../../../../utils/getObjectHasValue";
import getSiteAdvancedSearchParams from "../utils/getSiteAdvancedSearchParams";
import SiteAdvancedSearchForm, { AdvancedSiteSearchForm } from "./SiteAdvancedSearchForm";
import clearSiteAdvancedSearchParams from "./clearSiteAdvancedSearchParams";
import updateAdvancedSearchParam from "../../../../utils/setAdvancedSearchParams";
import { DepartmentResponseData } from "../../../../types/department.types";

const SiteAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const prefix = "sites"
    const advancedParams = getSiteAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        department_id: advancedParams.department_id ? parseInt(advancedParams.department_id) : 0,
        code_like: advancedParams.code_like ? advancedParams.code_like : '',
        name_like: advancedParams.name_like ? advancedParams.name_like : '',
        address_like: advancedParams.address_like ? advancedParams.address_like : '',
        postcode_like: advancedParams.postcode_like ? advancedParams.postcode_like : '',
        telephone_like: advancedParams.telephone_like ? advancedParams.telephone_like : '',
        location_like: advancedParams.location_like ? advancedParams.location_like : '',
        description_like: advancedParams.description_like ? advancedParams.description_like : '',
    }
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentResponseData>();

    // Search States
    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedSiteSearchForm>(currentSearchParams);

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
    }, [JSON.stringify(advancedParams)])

    const doSearch = (event?: FormEvent<HTMLFormElement>) => {
        event && event.preventDefault();
        updateAdvancedSearchParam(prefix, advancedSearchParams, searchParams, setSearchParams)
        props.hideFunc();
    }

    return (
        <WindowOverlay 
            title="Sites Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={500}
            footer={<AdvancedSearchFooter 
                resourceName="Sites"
                hasAdvancedSearch={hasAdvancedSearch} 
                searchFunc={doSearch} 
                clearFunc={() => clearSiteAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
            />}
        >
            <form
                onSubmit={doSearch}
            >
                <SiteAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                />
            </form>
        </WindowOverlay>
    )
}

export default SiteAdvancedSearch