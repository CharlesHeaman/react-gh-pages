import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { CustomerCollectionResponse, CustomerResponseData } from "../../../types/customers.types";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";

const CustomerSelect = (props: {
    selectedCustomer: CustomerResponseData | undefined,
    setSelectedCustomer: Dispatch<SetStateAction<CustomerResponseData | undefined>>,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customersData, setCustomersData] = useState<CustomerCollectionResponse>();

    useEffect(() => {
        getCustomers();
    }, [searchTerm])

    const getCustomers = () => {
        getAPI('customers', {
            code_or_name_like: searchTerm,
            is_active: true,
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomersData(customerData);
        }, setIsCustomersLoading);
    }

    const showRequired = props.selectedCustomer === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="groups"
                resourceName="customer"
                resourceNamePlural="customers"
                selectedText={props.selectedCustomer?.data.name}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={customersData ? customersData.data.map(customer => {
                    return {
                        text: customer.data.name,
                        clickFunc: () => props.setSelectedCustomer(customer),
                        selected: props.selectedCustomer?.id === customer.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Customer is required`}
                show={showRequired}
            />}
        </>
    )
}

export default CustomerSelect