import { useState, useEffect } from "react";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { DepartmentResponseData, DepartmentCollectionResponse } from "../../../types/department.types";
import { UserCollectionResponse } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import UserRow from "../../Users/components/UserRow";
import findDepartment from "../../../utils/findDepartment";
import UserRowSkeleton from "./UserRowSkeleton";


const UserList = (props: {
    isUsersLoading: boolean,
    userData: UserCollectionResponse | undefined,
    perPage: number,
}) => {
    // Data States
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    
    // Resource Constants
    const resourceName = 'users';
    const resourceIcon = 'account_circle';    

    useEffect(() => {
        setIsDepartmentsLoading(true);
    }, [props.isUsersLoading])

    useEffect(() => {
        if (props.userData && props.userData.data.length > 0) {
            getDepartments([...new Set(props.userData.data.map(user => user.data.department_id))]);
        } else {
            setIsDepartmentsLoading(false);
        }
    }, [props.userData])

    const getDepartments = (departmentIDs: Array<number | null>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data);
        }, setIsDepartmentsLoading);
    }

    const isLoading = (
        props.isUsersLoading ||
        isDepartmentsLoading
    )

    return (
        <div>
            <SearchTable
                    headers={['Username', 'Name', 'Internal ID', 'Email', 'Mobile', 'Primary Department', 'Accounts', 'Calendars', 'Customers', 'Engineer Assets', 'Engineer Data', 'ISO', 'Quotes', 'RAMS', 'Stock', 'System', 'Templates', 'Tickets']}
                    isLoading={!(!isLoading && props.userData)}
                    skeletonRow={<UserRowSkeleton/>}
                    skeletonCount={props.perPage}
                    count={props.userData ? props.userData.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.userData && props.userData.data.map((user, index) => 
                        <UserRow 
                            user={user}
                            department={findDepartment(departmentData, user.data.department_id ? user.data.department_id : 0)}
                            key={index}
                        />  
                    )}
                />
            {(!isLoading && props.userData) && <PaginationNavigation
                data={props.userData.data}
                totalCount={props.userData.total_count}
                perPage={props.userData.pages.per_page}
                resourceName={resourceName}
                prefix="users"
            />}
        </div>
    )
}

export default UserList 