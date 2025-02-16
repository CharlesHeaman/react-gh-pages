import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { SupplierManufacturerCollectionResponse, SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import getAPI from "../../../utils/getAPI";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";

const SupplierSelect = (props: {
    selectedSupplier: SupplierManufacturerResponseData | undefined,
    setSelectedSupplier: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>,
    required?: boolean,
    hasSubmitted?: boolean,
    isManufacturer?: boolean,
    isSupplier?: boolean,
    isGasSupplier?: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isSuppliersLoading, setIsSuppliersLoading] = useState(false);
    const [customersData, setSuppliersData] = useState<SupplierManufacturerCollectionResponse>();

    useEffect(() => {
        getSuppliers();
    }, [searchTerm, props.isManufacturer])

    const getSuppliers = () => {
        getAPI('suppliers_manufacturers', {
            name_like: searchTerm,
            is_active: true,
            is_supplier: props.isSupplier ? true : undefined,
            is_gas_supplier: props.isGasSupplier ? true : undefined,
            is_manufacturer: props.isManufacturer ? true : undefined,            
        }, (response: any) => {
            const supplierData: SupplierManufacturerCollectionResponse = response.data;
            setSuppliersData(supplierData);
        }, setIsSuppliersLoading);
    }

    const showRequired = props.selectedSupplier === undefined && props.hasSubmitted === true;

    return (
        <>
            <NewSelectMenu
                iconFont={!props.isManufacturer ? "warehouse" : "construction"}
                resourceName={!props.isManufacturer ? "supplier" : "manufacturer"}
                resourceNamePlural={!props.isManufacturer ? "suppliers" : "manufacturers"}
                selectedText={props.selectedSupplier?.data.name}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={customersData ? customersData.data.map(customer => {
                    return {
                        text: customer.data.name,
                        clickFunc: () => props.setSelectedSupplier(customer),
                        selected: props.selectedSupplier?.id === customer.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`${!props.isManufacturer ? "Supplier" : "Manufacturer"} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default SupplierSelect