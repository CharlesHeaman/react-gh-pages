import { useEffect, useState } from "react"
import SearchHelperText from "../../../../components/ui/SearchHelperText/SearchHelperText"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../../types/department.types"
import { SiteCollectionResponse } from "../../../../types/sites.types"
import findDepartment from "../../../../utils/findDepartment"
import getAPI from "../../../../utils/getAPI"
import SiteSelectRow from "./SiteSelectRow"
import SiteSelectRowSkeleton from "./SiteSelectRowSkeleton"
import { ContractCollectionResponse, ContractResponseData } from "../../../../types/contract.types"
import findContract from "../../../../utils/findContract"

const SiteSelectList = (props: {
    hasSearched: boolean,
    isSitesLoading: boolean,
    sites: SiteCollectionResponse | undefined,
    selectedIDs: Array<number>,
    updateSelection: (siteID: number) => void,
    perPage: number,
    totalCount?: number,
    hideDepartment?: boolean,
    hideContract?: boolean,
    showAdvancedSearch?: () => void
}) => {
    // Data States
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    const [isContractsLoading, setIsContractsLoading] = useState(false);
    const [contractsData, setContractsData] = useState<Array<ContractResponseData>>([]);

    // Resource Constants
    const resourceName = "sites";
    const resourceIcon = "business";

    useEffect(() => {
        !props.hideDepartment && setIsDepartmentsLoading(true);
        !props.hideContract && setIsContractsLoading(true);
    }, [props.isSitesLoading])

    useEffect(() => {
        if (props.sites && props.sites.data.length > 0) {
            !props.hideDepartment && getDepartments([...new Set(props.sites.data.map(site => site.data.department_id))]);
            !props.hideContract && getContracts([...new Set(props.sites.data.map(site => site.data.contract_id))]);

        } else {
            !props.hideDepartment && setIsDepartmentsLoading(false);
            !props.hideContract && setIsContractsLoading(false);
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

    const getContracts = (contractIDs: Array<number | null>) => {
        const idsArray = contractIDs.filter(contractID => contractID !== null);
        getAPI(`contracts`, {
            ids: idsArray.length > 0 ? idsArray : [-1],
        }, (response: any) => {
            const contractData: ContractCollectionResponse = response.data;
            setContractsData(contractData.data);
        }, setIsContractsLoading)
    }

    const isLoading = (
        props.isSitesLoading || 
        isDepartmentsLoading || 
        isContractsLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['', 'Code', 'Name', 'Location', 'Description', 'Department', 'Contract']
        if (props.hideContract) {
            var headerIndex = tableHeader.indexOf('Contract');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.hideDepartment) {
            var headerIndex = tableHeader.indexOf('Department');
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
                    isLoading={!(!isLoading && props.sites)}
                    skeletonRow={<SiteSelectRowSkeleton/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.sites ? props.sites.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.sites && props.sites.data.map((site, index) => 
                        <SiteSelectRow 
                            site={site}
                            department={findDepartment(departmentData, site.data.department_id)}
                            hideDepartment={props.hideDepartment}
                            contract={site.data.contract_id ? findContract(contractsData, site.data.contract_id) : undefined}
                            hideContract={props.hideContract}
                            selected={props.selectedIDs.includes(site.id)}
                            updateSelection={props.updateSelection}
                            key={index}
                        />  
                    )}
                    selectTable
                />
                :
                props.showAdvancedSearch ? <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search sites by name or code"
                    showAdvanced={props.showAdvancedSearch}
                /> : null
            }
        </div>
    )
}

export default SiteSelectList