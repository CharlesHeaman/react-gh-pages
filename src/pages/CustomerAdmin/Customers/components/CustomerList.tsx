import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { ContactCollectionResponse, ContactResponseData } from "../../../../types/contact.types"
import { ContractCollectionResponse, ContractResponseData } from "../../../../types/contract.types"
import { CustomerCollectionResponse } from "../../../../types/customers.types"
import { EquipmentCollectionResponse, EquipmentResponseData } from "../../../../types/equipment.types"
import { SiteCollectionResponse, SiteResponseData } from "../../../../types/sites.types"
import getAPI from "../../../../utils/getAPI"
import countCustomerContacts from "../../../../utils/countCustomerContacts"
import countCustomerContracts from "../../../../utils/countCustomerContracts"
import countCustomerEquipment from "../../../../utils/countCustomerEquipment"
import countCustomerSites from "../../../../utils/countCustomerSites"
import CustomerRow from "./CustomerRow"
import CustomerRowSkeleton from "./CustomerRowSkeleton"
import SearchHelperText from "../../../../components/ui/SearchHelperText/SearchHelperText"

const CustomerList = (props: {
    hasSearched: boolean,
    isCustomersLoading: boolean,
    customers: CustomerCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void
}) => {
    // Data States
    const [isSitesLoading, setIsSiteLoading] = useState(false);
    const [sitesData, setSitesData] = useState<Array<SiteResponseData>>([]);
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<Array<EquipmentResponseData>>([]);
    const [isContactsLoading, setIsContactsLoading] = useState(false);
    const [contactData, setContactData] = useState<Array<ContactResponseData>>([]);
    const [isContractsLoading, setIsContractsLoading] = useState(false);
    const [contractsData, setContractsData] = useState<Array<ContractResponseData>>([]);

    // Resource Constants
    const resourceName = "customers";
    const resourceIcon = "groups";

    useEffect(() => {
        setIsSiteLoading(true);
        setIsContactsLoading(true);
        setIsContractsLoading(true)
    }, [props.isCustomersLoading])

    useEffect(() => {
        if (props.customers && props.customers.data.length > 0) {
            getSites([...new Set(props.customers.data.map(customer => customer.id))]);
            getContacts([...new Set(props.customers.data.map(customer => customer.id))]);
            getContracts([...new Set(props.customers.data.map(customer => customer.id))]);
        } else {
            setIsSiteLoading(false);
            setIsEquipmentLoading(false);
            setIsContactsLoading(false);
            setIsContractsLoading(false)
        }
    }, [props.customers])

    const getSites = (customerIDs: Array<number>) => {
        getAPI(`sites`, {
            customer_ids: customerIDs,
            is_active: true,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSitesData(siteData.data);
            if (siteData.data.length > 0) {
                setIsEquipmentLoading(true);
                getEquipment([...new Set(siteData.data.map(site => site.id))]);
            }
        }, setIsSiteLoading);
    }
    
    const getContacts = (customerIDs: Array<number>) => {
        getAPI(`contacts`, {
            customer_ids: customerIDs,
            is_active: true,
        }, (response: any) => {
            const contactData: ContactCollectionResponse = response.data;
            setContactData(contactData.data);
        }, setIsContactsLoading)
    }

    const getContracts = (customerIDs: Array<number>) => {
        getAPI(`contracts`, {
            customer_ids: customerIDs,
            is_active: true,
        }, (response: any) => {
            const contractData: ContractCollectionResponse = response.data;
            setContractsData(contractData.data);
        }, setIsContractsLoading)
    }

    const getEquipment = (siteIDs: Array<number>) => {
        getAPI(`equipment`, {
            site_ids: siteIDs,
            is_active: true,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData.data);
        }, setIsEquipmentLoading)    
    }    

    const isLoading = (
        props.isCustomersLoading || 
        isSitesLoading || 
        isEquipmentLoading || 
        isContactsLoading || 
        isContractsLoading
    )

    return (
        <>
            {props.hasSearched ?
                <SearchTable
                    headers={['Code', 'Name', 'Type', 'Accounts Status', 'Sites', 'Equipment', 'Contracts', 'Contacts']}
                    isLoading={!(!isLoading && props.customers)}
                    skeletonRow={<CustomerRowSkeleton/>}
                    skeletonCount={props.perPage}
                    count={props.customers ? props.customers.data.length : 0}
                    resourceName="customers"
                    resourceIconFont="groups"
                    body={props.customers && props.customers.data.map((customer, index) => 
                        <CustomerRow
                            customer={customer}
                            siteCount={countCustomerSites(sitesData, customer.id)}
                            contactCount={countCustomerContacts(contactData, customer.id)}
                            equipmentCount={countCustomerEquipment(equipmentData, sitesData, customer.id)}
                            contractCount={countCustomerContracts(contractsData, customer.id)}
                            key={index}
                        />
                    )}
                />
                :
                props.showAdvancedSearch ? <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search customers by name or code"
                    showAdvanced={props.showAdvancedSearch}
                /> : null
            }
            {(!isLoading && props.hasSearched && props.customers) && <PaginationNavigation
                data={props.customers.data}
                totalCount={props.customers.total_count}
                perPage={props.customers.pages.per_page}
                resourceName={resourceName}
                prefix="customers"    
            />}
        </>
    )
}

export default CustomerList