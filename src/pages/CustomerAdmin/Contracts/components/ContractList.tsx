import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchHelperText from "../../../../components/ui/SearchHelperText/SearchHelperText"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { ContractCollectionResponse } from "../../../../types/contract.types"
import { CustomerCollectionResponse, CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../../types/department.types"
import { SiteCollectionResponse, SiteResponseData } from "../../../../types/sites.types"
import countContractSites from "../../../../utils/countContractSites"
import findCustomer from "../../../../utils/findCustomer"
import findDepartment from "../../../../utils/findDepartment"
import getAPI from "../../../../utils/getAPI"
import ContractRow from "./ContractRow"
import ContractRowSkeleton from "./ContractRowSkeleton"

const ContractList = (props: {
    hasSearched: boolean,
    isContractsLoading: boolean,
    contracts: ContractCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    hideCustomer?: boolean,
    showAdvancedSearch?: () => void
}) => {
    // Data States
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomersData] = useState<Array<CustomerResponseData>>([]);
    const [isSitesLoading, setIsSiteLoading] = useState(false);
    const [sitesData, setSitesData] = useState<Array<SiteResponseData>>([]);

    // Resource Constants
    const resourceName = "contracts";
    const resourceIcon = "history_edu";

    useEffect(() => {
        setIsDepartmentsLoading(true);
        setIsSiteLoading(true);
        !props.hideCustomer && setIsCustomersLoading(true)
    }, [props.isContractsLoading])

    useEffect(() => {
        if (props.contracts && props.contracts.data.length > 0) {
            getDepartments([...new Set(props.contracts.data.map(contract => contract.data.department_id))]);
            getSites([...new Set(props.contracts.data.map(contract => contract.id))]);
            !props.hideCustomer && getCustomers([...new Set(props.contracts.data.map(contract => contract.data.customer_id))]);
        } else {
            setIsDepartmentsLoading(false);
            setIsSiteLoading(false);
            !props.hideCustomer && setIsCustomersLoading(false)
        }
    }, [props.contracts]);

    const getDepartments = (departmentIDs: Array<number>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data);
        }, setIsDepartmentsLoading);
    }

    const getSites = (contractIDs: Array<number>) => {
        getAPI(`sites`, {
            contract_ids: contractIDs,
            is_active: true,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSitesData(siteData.data);
        }, setIsSiteLoading);
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
        props.isContractsLoading || 
        isDepartmentsLoading ||
        isSitesLoading || 
        isCustomersLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Reference Number', 'Customer', 'Department', 'Contract Value', 'Contract Start', 'Contract End', 'Sites'];
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
                    isLoading={!(!isLoading && props.contracts)}
                    skeletonRow={<ContractRowSkeleton hideCustomer={props.hideCustomer}/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.contracts ? props.contracts.data.length : 0}
                    resourceName="contracts"
                    resourceIconFont="history_edu"
                    body={props.contracts && props.contracts.data.map((contract, index) => 
                        <ContractRow 
                            contract={contract}
                            department={findDepartment(departmentData, contract.data.department_id)}
                            sitesCount={countContractSites(sitesData, contract.id)}
                            customer={findCustomer(customerData, contract.data.customer_id)}
                            hideCustomer={props.hideCustomer}
                            key={index}
                        />  
                    )}
                />
                :
                props.showAdvancedSearch ? <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search contracts by reference number"
                    showAdvanced={props.showAdvancedSearch}
                /> : null
            }
            {(!isLoading && props.hasSearched && props.contracts) && <PaginationNavigation
                data={props.contracts.data}
                totalCount={props.contracts.total_count}
                perPage={props.contracts.pages.per_page}
                resourceName={resourceName}
                prefix="contracts"    
            />}
        </div>
    )
}

export default ContractList