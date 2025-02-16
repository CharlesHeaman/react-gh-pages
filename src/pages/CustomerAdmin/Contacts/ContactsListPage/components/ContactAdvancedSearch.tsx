import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import getObjectHasValue from "../../../../../utils/getObjectHasValue";
import updateAdvancedSearchParam from "../../../../../utils/setAdvancedSearchParams";
import clearContactAdvancedSearchParams from "../../utils/clearContactAdvancedSearchParams";
import getContactAdvancedSearchParams from "../../utils/getContactAdvancedSearchParams";
import ContactAdvancedSearchForm, { AdvancedContactSearchForm } from "./ContactAdvancedSearchForm";


const ContactAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "contacts"
    const advancedParams = getContactAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        email_like: advancedParams.email_like ? advancedParams.email_like : '',
        telephone_like: advancedParams.telephone_like ? advancedParams.telephone_like : '',
        mobile_like: advancedParams.mobile_like ? advancedParams.mobile_like : '',
    }

    // Search States
    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedContactSearchForm>(currentSearchParams);

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
            title="Customer Contact Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={400}
            footer={<AdvancedSearchFooter 
                resourceName="Contacts"
                hasAdvancedSearch={hasAdvancedSearch} 
                searchFunc={doSearch} 
                clearFunc={() => clearContactAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
            />}
        >
            <form
                onSubmit={doSearch}
            >
                <ContactAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                />
            </form>
        </WindowOverlay>
    )
}

export default ContactAdvancedSearch