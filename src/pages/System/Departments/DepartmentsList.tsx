import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { DepartmentCollectionResponse } from "../../../types/department.types";
import DepartmentRow from "./DepartmentsRow";
import DepartmentRowSkeleton from "./DepartmentsRowSkeleton";

const DepartmentList = (props: {
    isDepartmentsLoading: boolean,
    departmentData: DepartmentCollectionResponse | undefined,
    perPage: number,
}) => {
    // Resource Constants
    const resourceName = 'departments';
    const resourceIcon = 'dashboard';    

    const isLoading = (
        props.isDepartmentsLoading
    )

    return (
        <div>
            <SearchTable
                headers={['Name', 'Labour', 'Mate', 'Mileage', 'Materials', 'Subcontract', 'Hire', 'Equipment Module', 'Refrigerant Module', 'Fuel Module', 'Job Module', 'Collection Module']}
                isLoading={!(!isLoading && props.departmentData)}
                skeletonRow={<DepartmentRowSkeleton/>}
                skeletonCount={props.perPage}
                count={props.departmentData ? props.departmentData.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.departmentData && props.departmentData.data.map((department, index) => 
                    <DepartmentRow 
                        department={department}
                        key={index}
                    />  
                )}
            />
            {(!isLoading && props.departmentData) && <PaginationNavigation
                data={props.departmentData.data}
                totalCount={props.departmentData.total_count}
                perPage={props.departmentData.pages.per_page}
                resourceName={resourceName}
                prefix={resourceName}
            />}
        </div>
    )
}

export default DepartmentList 