import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import getObjectHasValue from "../../../../utils/getObjectHasValue";
import updateAdvancedSearchParam from "../../../../utils/setAdvancedSearchParams";
import getSupplierContactAdvancedSearchParams from "../../utils/SupplierContactAdvancedSearchParams";
import clearSupplierContactAdvancedSearchParams from "../../utils/clearSupplierContactAdvancedSearchParams";
import SupplierContactAdvancedSearchForm, { AdvancedSupplierContactSearchForm } from "./SupplierContactAdvancedSearchForm";

const SupplierContactAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "supplier_contacts"
    const advancedParams = getSupplierContactAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        email_like: advancedParams.email_like ? advancedParams.email_like : '',
        telephone_like: advancedParams.telephone_like ? advancedParams.telephone_like : '',
        mobile_like: advancedParams.mobile_like ? advancedParams.mobile_like : '',
    }

    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedSupplierContactSearchForm>(currentSearchParams);

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
            title="Supplier/Manufacturer Contact Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={400}
            footer={<AdvancedSearchFooter 
                resourceName="Contacts"
                hasAdvancedSearch={hasAdvancedSearch} 
                searchFunc={doSearch} 
                clearFunc={() => clearSupplierContactAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
            />}
        >
            <form
                onSubmit={doSearch}
            >
                <SupplierContactAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                />
                
            </form>
        </WindowOverlay>
    )
}

export default SupplierContactAdvancedSearch