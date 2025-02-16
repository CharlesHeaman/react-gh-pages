import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";

const SupplierManufacturerAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "suppliers_manufacturers";
    const advancedParams = {};
    const hasAdvancedSearch = Object.entries(advancedParams).filter((param: [string, any]) => param[1] !== undefined).length > 0;

    // const currentSearchParams = {
    //     code_like: advancedParams.code_like ? advancedParams.code_like : '',
    //     name_like: advancedParams.name_like ? advancedParams.name_like : '',
    //     is_contracted: advancedParams.is_contracted ? advancedParams.is_contracted : '',
    //     email_like: advancedParams.email_like ? advancedParams.email_like : '',
    //     telephone_like: advancedParams.telephone_like ? advancedParams.telephone_like : '',
    //     address_like: advancedParams.address_like ? advancedParams.address_like : '',
    //     postcode_like: advancedParams.postcode_like ? advancedParams.postcode_like : '',
    //     sage_name_like: advancedParams.sage_name_like ? advancedParams.sage_name_like : '',
    //     accounts_email_like: advancedParams.accounts_email_like ? advancedParams.accounts_email_like : '',
    //     accounts_status: advancedParams.accounts_status ? advancedParams.accounts_status : '',
    // }

    // Search States
    // const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedSupplierManufacturerSearchForm>(currentSearchParams);

    // useEffect(() => {
    //     setAdvancedSearchParams(currentSearchParams)
    // }, [JSON.stringify(advancedParams)])

    // const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    //     updateStateParams(event, setAdvancedSearchParams)
    // }

    const doSearch = (event?: FormEvent<HTMLFormElement>) => {
        event && event.preventDefault();
        searchParams.delete(`${prefix}_offset`);
        searchParams.delete(`${prefix}_per_page`);
        searchParams.set(`${prefix}_has_searched`, "true");
        setSearchParams(searchParams);
        props.hideFunc();
    }

    return (
        <WindowOverlay 
            title="Supplier/Manufacturer Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}
        >
            <form
                onSubmit={doSearch}
            >
                <section>
                  
                </section>
                <AdvancedSearchFooter 
                    hasAdvancedSearch={hasAdvancedSearch} 
                    searchFunc={doSearch} 
                    clearFunc={() => null}
                />
            </form>
        </WindowOverlay>
        
    )
}

export default SupplierManufacturerAdvancedSearch