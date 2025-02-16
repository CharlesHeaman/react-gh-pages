import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../../components/ui/SearchTable/SearchTable";
import { ContactActivityCollectionResponse } from "../../../../../../../../types/contactActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../../types/user.types";
import findUser from "../../../../../../../../utils/findUser";
import getAPI from "../../../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import ContactActivityRow from "./ContactActivityRow";

const ContactActivityList = (props: {
    isContactActivityLoading: boolean,
    contactActivity: ContactActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "contact history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isContactActivityLoading])

    useEffect(() => {
        if (props.contactActivity && props.contactActivity.data.length > 0) {
            getUsers([...new Set(props.contactActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.contactActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isContactActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.contactActivity ? props.contactActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.contactActivity)}
                body={props.contactActivity && props.contactActivity.data.map((contactActivity, index) => 
                    <ContactActivityRow
                        contactActivity={contactActivity}
                        user={findUser(userData, contactActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.contactActivity) && <PaginationNavigation
                data={props.contactActivity.data}
                totalCount={props.contactActivity.total_count}
                perPage={props.contactActivity.pages.per_page}
                resourceName={resourceName}
                prefix="contact_history"
            />}
        </div>
    )
}

export default ContactActivityList