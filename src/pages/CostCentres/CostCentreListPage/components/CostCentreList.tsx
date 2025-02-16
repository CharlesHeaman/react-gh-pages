import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { CostCentreCollectionResponse } from "../../../../types/costCentres.types"
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../../types/department.types"
import findDepartment from "../../../../utils/findDepartment"
import getAPI from "../../../../utils/getAPI"
import CostCentreRow from "./CostCentreRow"
import CostCentreRowSkeleton from "./CostCentreRowSkeleton"

const CostCentreList = (props: {
    isCostCentresLoading: boolean,
    costCentreData: CostCentreCollectionResponse | undefined,
    perPage: number,
}) => {
    // Data States
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    
    // Resource Constants
    const resourceName = 'cost centres';
    const resourceIcon = 'point_of_sale';    

    useEffect(() => {
        setIsDepartmentsLoading(true);
    }, [props.isCostCentresLoading])

    useEffect(() => {
        if (props.costCentreData && props.costCentreData.data.length > 0) {
            getDepartments([...new Set(props.costCentreData.data.map(costCentre => costCentre.data.department_id))]);
        } else {
            setIsDepartmentsLoading(false);
        }
    }, [props.costCentreData])

    const getDepartments = (departmentIDs: Array<number | null>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data);
        }, setIsDepartmentsLoading);
    }

    const isLoading = (
        props.isCostCentresLoading || 
        isDepartmentsLoading
    )

    return (
        <div>
            <SearchTable
                    headers={['Name', 'Resource', 'Department']}
                    isLoading={!(!isLoading && props.costCentreData)}
                    skeletonRow={<CostCentreRowSkeleton/>}
                    skeletonCount={props.perPage}
                    count={props.costCentreData ? props.costCentreData.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.costCentreData && props.costCentreData.data.map((costCentre, index) => 
                        <CostCentreRow 
                            costCentre={costCentre}
                            department={findDepartment(departmentData, costCentre.data.department_id ? costCentre.data.department_id : 0)}
                            key={index}
                        />  
                    )}
                />
            {(!isLoading && props.costCentreData) && <PaginationNavigation
                data={props.costCentreData.data}
                totalCount={props.costCentreData.total_count}
                perPage={props.costCentreData.pages.per_page}
                resourceName={resourceName}
                prefix="cost_centres"
            />}
        </div>
    )
}

export default CostCentreList 