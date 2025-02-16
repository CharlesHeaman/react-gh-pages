import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import getObjectHasValue from "../../../../utils/getObjectHasValue";
import clearCustomerAdvancedSearchParams from "../utils/clearCustomerAdvancedSearchParams";
import getCustomerAdvancedSearchParams from "../utils/getCustomerAdvancedSearchParams";
import CustomerAdvancedSearchForm, { AdvancedCustomerSearchForm } from "./CustomerAdvancedSearchForm";
import updateAdvancedSearchParam from "../../../../utils/setAdvancedSearchParams";

const CustomerAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "customers";
    const advancedParams = getCustomerAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        email_like: advancedParams.email_like ? advancedParams.email_like : '',
        telephone_like: advancedParams.telephone_like ? advancedParams.telephone_like : '',
        address_like: advancedParams.address_like ? advancedParams.address_like : '',
        postcode_like: advancedParams.postcode_like ? advancedParams.postcode_like : '',
        sage_name_like: advancedParams.sage_name_like ? advancedParams.sage_name_like : '',
        accounts_email_like: advancedParams.accounts_email_like ? advancedParams.accounts_email_like : '',
        accounts_status: advancedParams.accounts_status ? parseInt(advancedParams.accounts_status) : -1,
    }

    // Search States
    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedCustomerSearchForm>(currentSearchParams);
    const [accountsStatus, setAccountsStatus] = useState<number>(currentSearchParams.accounts_status);

    useEffect(() => {
        setAdvancedSearchParams((prevState: any) => {
            return {
                ...prevState, 
                accounts_status: accountsStatus
            }
        })
    }, [accountsStatus]);

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
            title="Customer Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={500}
            footer={<AdvancedSearchFooter 
                resourceName="Customers"
                hasAdvancedSearch={hasAdvancedSearch} 
                searchFunc={doSearch} 
                clearFunc={() => clearCustomerAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
            />}
        >
            <form
                onSubmit={doSearch}
            >
                <CustomerAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                    accountsStatus={accountsStatus}
                    setAccountsStatus={setAccountsStatus}
                />
            </form>
        </WindowOverlay>
        
    )
}

export default CustomerAdvancedSearch