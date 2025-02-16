import { useState, useEffect } from "react";
import PaginationNavigation from "../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../components/ui/SearchTable/SearchTable";
import { JobInvoiceRequestActivityCollectionResponse } from "../../../../../../../types/jobInvoiceRequestActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../types/user.types";
import findUser from "../../../../../../../utils/findUser";
import getAPI from "../../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import JobInvoiceRequestActivityRow from "./JobInvoiceRequestActivityList";

const JobInvoiceRequestActivityList = (props: {
    isJobInvoiceRequestActivityLoading: boolean,
    jobInvoiceRequestActivity: JobInvoiceRequestActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "job invoice request history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isJobInvoiceRequestActivityLoading])

    useEffect(() => {
        if (props.jobInvoiceRequestActivity && props.jobInvoiceRequestActivity.data.length > 0) {
            getUsers([...new Set(props.jobInvoiceRequestActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.jobInvoiceRequestActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isJobInvoiceRequestActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.jobInvoiceRequestActivity ? props.jobInvoiceRequestActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.jobInvoiceRequestActivity)}
                body={props.jobInvoiceRequestActivity && props.jobInvoiceRequestActivity.data.map((jobInvoiceRequestActivity, index) => 
                    <JobInvoiceRequestActivityRow
                        jobInvoiceRequestActivity={jobInvoiceRequestActivity}
                        user={findUser(userData, jobInvoiceRequestActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.jobInvoiceRequestActivity) && <PaginationNavigation
                data={props.jobInvoiceRequestActivity.data}
                totalCount={props.jobInvoiceRequestActivity.total_count}
                perPage={props.jobInvoiceRequestActivity.pages.per_page}
                resourceName={resourceName}
                prefix="job_invoice_request_history"
            />}
        </div>
    )
}

export default JobInvoiceRequestActivityList