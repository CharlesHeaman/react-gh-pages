import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../../types/department.types"
import { DescriptionOfWorksCollectionResponse } from "../../../../types/descriptionOfWorks.types"
import findDepartment from "../../../../utils/findDepartment"
import getAPI from "../../../../utils/getAPI"
import DescriptionOfWorksRow from "./DescriptionOfWorksRow"
import DescriptionOfWorksRowSkeleton from "./DescriptionOfWorksRowSkeleton"

const DescriptionOfWorksList = (props: {
    isDescriptionOfWorksLoading: boolean,
    descriptionOfWorks: DescriptionOfWorksCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
}) => {
    // Data States
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    
    // Resource Constants
    const resourceName = 'description of works';
    const resourceIcon = 'description';

    useEffect(() => {
        setIsDepartmentsLoading(true);
    }, [props.isDescriptionOfWorksLoading])

    useEffect(() => {
        if (props.descriptionOfWorks && props.descriptionOfWorks.data.length > 0) {
            getDepartments([...new Set(props.descriptionOfWorks.data.map(descriptionOfWorks => descriptionOfWorks.data.department_id))]);
        } else {
            setIsDepartmentsLoading(false);
        }
    }, [props.descriptionOfWorks])

    const getDepartments = (departmentIDs: Array<number | null>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data);
        }, setIsDepartmentsLoading);
    }

    const isLoading = (
        props.isDescriptionOfWorksLoading || 
        isDepartmentsLoading
    )

    return (
        <div>
            <SearchTable
                headers={['Name', 'Department', 'Next Review']}
                isLoading={!(!isLoading && props.descriptionOfWorks)}
                skeletonRow={<DescriptionOfWorksRowSkeleton/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.descriptionOfWorks ? props.descriptionOfWorks.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.descriptionOfWorks && props.descriptionOfWorks.data.map((descriptionOfWorks, index) => 
                    <DescriptionOfWorksRow
                        department={findDepartment(departmentData, descriptionOfWorks.data.department_id)}
                        descriptionOfWorks={descriptionOfWorks}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.descriptionOfWorks) && <PaginationNavigation
                data={props.descriptionOfWorks.data}
                totalCount={props.descriptionOfWorks.total_count}
                perPage={props.descriptionOfWorks.pages.per_page}
                prefix="description_of_works"
                resourceName="description of works"
            />}
        </div>
    )
}

export default DescriptionOfWorksList