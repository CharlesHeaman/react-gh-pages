import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { UserCollectionResponse } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import UserSearchHeader from "./UserSearchHeader";
import UserList from "./UsersList";
import getUserSearchParams from "./utils/getUserSearchParams";

const UserListPage = ()  => {
    const [searchParams] = useSearchParams();

    // data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [usersData, setUsersData] = useState<UserCollectionResponse>();

    const userSearchParams = getUserSearchParams(searchParams);


    useEffect(() => {
        searchUsers();
    }, [JSON.stringify(userSearchParams)])

    const searchUsers = () => {
        getAPI('users', userSearchParams, (response: any) => {
            const usersData: UserCollectionResponse = response.data;
            setUsersData(usersData);
        }, setIsUsersLoading)
    }
    
    return (
        <OuterContainer
            title='Users'
            description="Create, edit and deactivate users. Manage user permissions."
            maxWidth={2400}
            noBorder
        >
            <UserSearchHeader/>
            <UserList
                isUsersLoading={isUsersLoading}
                userData={usersData}
                perPage={userSearchParams.perPage}
            /> 
        </OuterContainer>
    )
}

export default UserListPage