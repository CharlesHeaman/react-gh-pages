import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchHelperText from "../../../../components/ui/SearchHelperText/SearchHelperText"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { ContractCollectionResponse, ContractResponseData } from "../../../../types/contract.types"
import { CustomerCollectionResponse, CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../../types/department.types"
import { EquipmentCollectionResponse, EquipmentResponseData } from "../../../../types/equipment.types"
import { SiteContactCollectionResponse, SiteContactResponseData } from "../../../../types/siteContact.types"
import { SiteCollectionResponse } from "../../../../types/sites.types"
import countSiteContacts from "../../../../utils/countSiteContacts"
import countSiteEquipment from "../../../../utils/countSiteEquipment"
import findContract from "../../../../utils/findContract"
import findCustomer from "../../../../utils/findCustomer"
import findDepartment from "../../../../utils/findDepartment"
import getAPI from "../../../../utils/getAPI"
import SiteRow from "./SiteRow"
import SiteRowSkeleton from "./SiteRowSkeleton"

const SiteList = (props: {
    hasSearched: boolean,
    isSitesLoading: boolean,
    sites: SiteCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    hideContract?: boolean,
    hideCustomer?: boolean,
    showAdvancedSearch?: () => void
}) => {
    // Data States
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    const [isContactsLoading, setIsContactsLoading] = useState(false);
    const [siteContactData, setSiteContactData] = useState<Array<SiteContactResponseData>>([]);
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<Array<EquipmentResponseData>>([]);
    const [isContractsLoading, setIsContractsLoading] = useState(false);
    const [contractsData, setContractsData] = useState<Array<ContractResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomersData] = useState<Array<CustomerResponseData>>([]);

    // Resource Constants
    const resourceName = "sites";
    const resourceIcon = "business";

    useEffect(() => {
        setIsDepartmentsLoading(true);
        setIsEquipmentLoading(true);
        setIsContactsLoading(true);
        !props.hideContract && setIsContractsLoading(true);
        !props.hideCustomer && setIsCustomersLoading(true);
    }, [props.isSitesLoading])

    useEffect(() => {
        if (props.sites && props.sites.data.length > 0) {
            getContacts([...new Set(props.sites.data.map(site => site.id))]);
            getEquipment([...new Set(props.sites.data.map(site => site.id))]);
            getDepartments([...new Set(props.sites.data.map(site => site.data.department_id))]);
            !props.hideContract && getContracts([...new Set(props.sites.data.map(site => site.data.contract_id))]);
            !props.hideCustomer && getCustomers([...new Set(props.sites.data.map(site => site.data.customer_id))]);
        } else {
            setIsDepartmentsLoading(false);
            setIsEquipmentLoading(false);
            setIsContactsLoading(false);
            !props.hideContract && setIsContractsLoading(false);
            !props.hideCustomer && setIsCustomersLoading(false);
        }
    }, [props.sites])

    const getDepartments = (departmentIDs: Array<number>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data)
        }, setIsDepartmentsLoading)
    }

    const getContacts = (siteIDs: Array<number>) => {
        getAPI(`site_contacts`, {
            site_ids: siteIDs,
        }, (response: any) => {
            const siteContactData: SiteContactCollectionResponse = response.data;
            setSiteContactData(siteContactData.data);
        }, setIsContactsLoading)
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

    const getContracts = (contractIDs: Array<number | null>) => {
        const idsArray = contractIDs.filter(contractID => contractID !== null);
        getAPI(`contracts`, {
            ids: idsArray.length > 0 ? idsArray : [-1],
        }, (response: any) => {
            const contractData: ContractCollectionResponse = response.data;
            setContractsData(contractData.data);
        }, setIsContractsLoading)
    }

    const getCustomers = (customerIDs: Array<number>) => {
        getAPI('customers', {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomersData(customerData.data)
        }, setIsCustomersLoading)
    }

    const isLoading = (
        props.isSitesLoading || 
        isDepartmentsLoading || 
        isContactsLoading || 
        isEquipmentLoading || 
        isContractsLoading ||
        isCustomersLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Code', 'Customer', 'Name', 'Location', 'Description', 'Department', 'Equipment', 'Contract', 'Contacts'];
        if (props.hideContract) {
            tableHeader.splice(tableHeader.indexOf('Contract'), 1);
        }
        if (props.hideCustomer) {
            tableHeader.splice(tableHeader.indexOf('Customer'), 1);
        }
        return tableHeader
    }

    return (
        <div>
            {props.hasSearched ?
                <SearchTable
                    headers={getTableHeader()}
                    isLoading={!(!isLoading && props.sites)}
                    skeletonRow={<SiteRowSkeleton hideCustomer={props.hideCustomer} hideContract={props.hideContract}/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.sites ? props.sites.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.sites && props.sites.data.map((site, index) => 
                        <SiteRow 
                            site={site}
                            department={findDepartment(departmentData, site.data.department_id)}
                            contactCount={countSiteContacts(siteContactData, site.id)}
                            equipmentCount={countSiteEquipment(equipmentData, site.id)}
                            contract={site.data.contract_id ? findContract(contractsData, site.data.contract_id) : undefined}
                            hideContract={props.hideContract}
                            customer={findCustomer(customerData, site.data.customer_id)}
                            hideCustomer={props.hideCustomer}
                            key={index}
                        />  
                    )}
                />
                :
                props.showAdvancedSearch ? <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search sites by name or code"
                    showAdvanced={props.showAdvancedSearch}
                /> : null
            }
            {(!isLoading && props.hasSearched && props.sites) && <PaginationNavigation
                data={props.sites.data}
                totalCount={props.sites.total_count}
                perPage={props.sites.pages.per_page}
                resourceName={resourceName}
                prefix="sites"    
            />}
        </div>
    )
}

export default SiteList