import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerCollectionResponse } from "../../../types/customers.types";
import getAPI from "../../../utils/getAPI";
import CustomerAdminNavigation from "../components/CustomerAdminNavigation";
import CustomerAdvancedSearch from "./components/CustomerAdvancedSearch";
import CustomerList from "./components/CustomerList";
import CustomerSearchHeader from "./components/CustomerSearchHeader";
import getCustomerSearchParams from "./utils/getCustomerSearchParams";

const CustomerListPage = () => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerCollectionResponse>();

    // Search Parameters 
    const hasSearched = searchParams.get(`customers_has_searched`) === "true";
    const customerSearchParams = getCustomerSearchParams(searchParams);

    useEffect(() => {
        hasSearched && searchCustomers();
        console.log('CustomerSearchParams:', customerSearchParams);
    }, [JSON.stringify(customerSearchParams)])
    
    const searchCustomers = () => {
        setShowAdvancedSearch(false);
        getAPI('customers', customerSearchParams, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomerData(customerData);
        }, setIsCustomersLoading);
    }

    return (
        <>
            <CustomerAdminNavigation location='customers'/>
            <OuterContainer 
                title='Customers' 
                description='Create, edit and deactivate customers. Manage customer sites, equipment, contacts and contracts.'
                maxWidth={1400}
                noBorder
            >
                <CustomerSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <CustomerList 
                    hasSearched={hasSearched} 
                    isCustomersLoading={isCustomersLoading}
                    customers={customerData}
                    perPage={customerSearchParams.perPage}
                    showAdvancedSearch={() => setShowAdvancedSearch(true)} 
                />
            </OuterContainer> 

            <CustomerAdvancedSearch 
                show={showAdvancedSearch} 
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default CustomerListPage