import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { UserCollectionResponse, UserResponseData } from "../../../types/user.types";
import getUserFullName from "../../../utils/getUserFullName";

const UserSelect = (props: {
    selectedUser: UserResponseData | undefined,
    setSelectedUser: Dispatch<SetStateAction<UserResponseData | undefined>>,
    required?: boolean,
    departmentID?: number,
    hasSubmitted?: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [usersData, setUsersData] = useState<UserCollectionResponse>();

    useEffect(() => {
        getUsers();
    }, [searchTerm])

    const getUsers = () => {
        getAPI('users', {
            full_name_like: searchTerm,
            department_ids: props.departmentID ? [props.departmentID] : undefined,
            is_active: true,
        }, (response: any) => {
            const costCentreData: UserCollectionResponse = response.data;
            setUsersData(costCentreData);
        }, setIsUsersLoading);
    }

    const showRequired = props.selectedUser === undefined && props.hasSubmitted === true;

    return (
        <>
            <NewSelectMenu
                iconFont="account_circle"
                resourceName="user"
                resourceNamePlural="users"
                selectedText={props.selectedUser ? getUserFullName(props.selectedUser) : undefined}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={usersData ? usersData.data.map(user => {
                    return {
                        text: getUserFullName(user),
                        clickFunc: () => props.setSelectedUser(user),
                        selected: props.selectedUser?.id === user.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`User is required`}
                show={showRequired}
            />}
        </>
    )
}

export default UserSelect