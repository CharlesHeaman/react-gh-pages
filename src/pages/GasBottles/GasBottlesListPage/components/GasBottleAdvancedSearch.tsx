import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RefrigerantResponseData } from "../../../../types/refrigerant.types";
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types";
import { UserResponseData } from "../../../../types/user.types";
import getObjectHasValue from "../../../../utils/getObjectHasValue";
import updateAdvancedSearchParam from "../../../../utils/setAdvancedSearchParams";
import clearGasBottleAdvancedSearchParams from "./clearGasBottleAdvancedSearchParam";
import GasBottleAdvancedSearchForm, { AdvancedGasBottleSearchFormParams } from "./GasBottleAdvancedSearchForm";
import getGasBottleAdvancedSearchParams from "./getGasBottleAdvancedSearchParam";

const GasBottleAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "gas_bottles";
    const advancedParams = getGasBottleAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        refrigerant_id: advancedParams.refrigerant_id ? advancedParams.refrigerant_id : 0,
        assigned_to_id: advancedParams.assigned_to_id ? advancedParams.assigned_to_id : 0,
        supplier_id: advancedParams.supplier_id ? advancedParams.supplier_id : 0,
        rental_end_before: advancedParams.rental_end_before ? new Date(advancedParams.rental_end_before) : undefined,
    }

    // Form States
    const [selectedUser, setSelectedUser] = useState<UserResponseData>();
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierManufacturerResponseData>();
    const [selectedRefrigerant, setSelectedRefrigerant] = useState<RefrigerantResponseData>();

    // Search States
    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedGasBottleSearchFormParams>(currentSearchParams);

    useEffect(() => {
        setAdvancedSearchParams((prevState: any) => {
            return {
                ...prevState, 
                assigned_to_id: selectedUser?.id
            }
        })
    }, [selectedUser]);

    useEffect(() => {
        if (currentSearchParams.assigned_to_id === 0) {
            setSelectedUser(undefined);
        }
    }, [currentSearchParams.assigned_to_id]);

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

    useEffect(() => {
        setAdvancedSearchParams((prevState: any) => {
            return {
                ...prevState, 
                refrigerant_id: selectedRefrigerant?.id
            }
        })
    }, [selectedRefrigerant]);

    useEffect(() => {
        if (currentSearchParams.refrigerant_id === 0) {
            setSelectedRefrigerant(undefined);
        }
    }, [currentSearchParams.refrigerant_id]);

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
            title="Gas Bottle Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={
                <AdvancedSearchFooter 
                    resourceName="Gas Bottles"
                    hasAdvancedSearch={hasAdvancedSearch} 
                    searchFunc={doSearch} 
                    clearFunc={() => clearGasBottleAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                />
            }
        >
            <form
                onSubmit={doSearch}
            >
                <GasBottleAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    selectedSupplier={selectedSupplier}
                    setSelectedSupplier={setSelectedSupplier}
                    selectedRefrigerant={selectedRefrigerant}
                    setSelectedRefrigerant={setSelectedRefrigerant}
                />
                
            </form>
        </WindowOverlay>
        
    )
}

export default GasBottleAdvancedSearch