import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchHelperText from "../../../../../components/ui/SearchHelperText/SearchHelperText"
import SearchTable from "../../../../../components/ui/SearchTable/SearchTable"
import { ContactCollectionResponse } from "../../../../../types/contact.types"
import { CustomerCollectionResponse, CustomerResponseData } from "../../../../../types/customers.types"
import findCustomer from "../../../../../utils/findCustomer"
import getAPI from "../../../../../utils/getAPI"
import ContactRow from "./ContactRow"
import ContactRowSkeleton from "./ContactRowSkeleton"

const ContactsList = (props: {
    hasSearched: boolean,
    isContactsLoading: boolean,
    contacts: ContactCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    hideCustomer?: boolean,
    showAdvancedSearch?: () => void,
}) => {
    // Data States
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomersData] = useState<Array<CustomerResponseData>>([]);

    // Resource Constants
    const resourceName = "contacts";
    const resourceIcon = "contact_phone";

    useEffect(() => {
        !props.hideCustomer && setIsCustomersLoading(true)
    }, [props.isContactsLoading])

    useEffect(() => {
        if (props.contacts && props.contacts.data.length > 0) {
            !props.hideCustomer && getCustomers([...new Set(props.contacts.data.map(contact => contact.data.customer_id))]);
        } else {
            !props.hideCustomer && setIsCustomersLoading(false)
        }
    }, [props.contacts])

    const getCustomers = (customerIDs: Array<number>) => {
        getAPI('customers', {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomersData(customerData.data)
        }, setIsCustomersLoading)
    }

    const isLoading = (
        props.isContactsLoading || 
        isCustomersLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Name', 'Customer', 'Email', 'Telephone', 'Mobile'];
        if (props.hideCustomer) {
            var headerIndex = tableHeader.indexOf('Customer');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        return tableHeader
    }

    return (
        <div>
            {props.hasSearched ?
                <SearchTable
                    headers={getTableHeader()}
                    isLoading={!(!isLoading && props.contacts)}
                    skeletonRow={<ContactRowSkeleton hideCustomer={props.hideCustomer}/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.contacts ? props.contacts.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.contacts && props.contacts.data.map((contact, index) => 
                        <ContactRow 
                            contact={contact}
                            customer={findCustomer(customerData, contact.data.customer_id)}
                            hideCustomer={props.hideCustomer}
                            key={index}
                        />  
                    )}
                />
                :
                props.showAdvancedSearch ? <SearchHelperText
                iconFont={resourceIcon}
                text="Search contacts by name"
                showAdvanced={props.showAdvancedSearch}
            /> : null
            }
            {(!isLoading && props.hasSearched && props.contacts) && <PaginationNavigation
                data={props.contacts.data}
                totalCount={props.contacts.total_count}
                perPage={props.contacts.pages.per_page}
                resourceName={resourceName}
                prefix="contacts"    
            />}
        </div>
    )
}

export default ContactsList