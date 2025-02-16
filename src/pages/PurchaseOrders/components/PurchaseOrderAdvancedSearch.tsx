import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CustomerResponseData } from "../../../types/customers.types";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import getObjectHasValue from "../../../utils/getObjectHasValue";
import updateAdvancedSearchParam from "../../../utils/setAdvancedSearchParams";
import clearPurchaseOrderAdvancedSearchParams from "../utils/clearPurchaseOrderAdvancedSearchParams";
import getPurchaseOrderAdvancedSearchParams from "../utils/getPurchaseOrderAdvancedSearchParams";
import PurchaseOrderAdvancedSearchForm, { AdvancedPurchaseOrderSearchForm } from "./PurchaseOrderAdvancedSearchForm";
const PurchaseOrderAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "purchase_orders";
    const advancedParams = getPurchaseOrderAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        customer_id: advancedParams.customer_id ? advancedParams.customer_id : 0,
        supplier_id: advancedParams.supplier_id ? advancedParams.supplier_id : 0,
    }

    // Form States 
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierManufacturerResponseData>();
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponseData>();

    // Search States
    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedPurchaseOrderSearchForm>(currentSearchParams);

    useEffect(() => {
        setAdvancedSearchParams(currentSearchParams)
    }, [JSON.stringify(advancedParams)])

    useEffect(() => {
        setAdvancedSearchParams((prevState: any) => {
            return {
                ...prevState, 
                customer_id: selectedCustomer?.id
            }
        })
    }, [selectedCustomer]);

    useEffect(() => {
        if (currentSearchParams.customer_id === 0) {
            setSelectedCustomer(undefined);
        }
    }, [currentSearchParams.customer_id]);

    useEffect(() => {
        setAdvancedSearchParams((prevState: any) => {
            return {
                ...prevState, 
                supplier_id: selectedSupplier?.id
            }
        })
    }, [selectedSupplier]);

    useEffect(() => {
        if (currentSearchParams.supplier_id === 0) {
            setSelectedSupplier(undefined);
        }
    }, [currentSearchParams.supplier_id]);

    const doSearch = (event?: FormEvent<HTMLFormElement>) => {
        event && event.preventDefault();
        updateAdvancedSearchParam(prefix, advancedSearchParams, searchParams, setSearchParams)
        props.hideFunc();
    }

    return (
        <WindowOverlay 
            title="Purchase Order Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={400}
            footer={<AdvancedSearchFooter 
                resourceName="Purchase Orders"
                hasAdvancedSearch={hasAdvancedSearch} 
                searchFunc={doSearch} 
                clearFunc={() => clearPurchaseOrderAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
            />}
        >
            <form
                onSubmit={doSearch}
            >
                <PurchaseOrderAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                    selectedSupplier={selectedSupplier}
                    setSelectedSupplier={setSelectedSupplier}
                    selectedCustomer={selectedCustomer}
                    setSelectedCustomer={setSelectedCustomer}
                />
            </form>
        </WindowOverlay>
        
    )
}

export default PurchaseOrderAdvancedSearch