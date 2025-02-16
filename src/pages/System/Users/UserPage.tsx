import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { DepartmentResponseData } from "../../../types/department.types";
import { UserCollectionResponse, UserResponseData } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import UserInformation from "./UserPage/components/UserInformation";
import UserSideBar from "./UserPage/components/UserSideBar/UserSideBar";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";

const UserPage = () => {
    const { username } = useParams();

    // Data States
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [userData, setUserData] = useState<UserResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();

    useEffect(() => {
        getUser();
    }, [username])

    const getUser = () => {
        getAPI(`users`, {
            username: username
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            const currentUserData = userData.data[0];
            currentUserData.data.department_id > 0 && getDepartment(currentUserData.data.department_id);
            setUserData(currentUserData);
        }, setIsUserLoading)
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading)
    }

    const isLoading = (
        isUserLoading || 
        isDepartmentLoading
    )

    const isHeaderLoading = (
        isUserLoading
    )

    return (
        <>
            <OuterContainer
                title='User'
                id={username}
                headerContent={!isHeaderLoading && userData && !userData.data.is_active ? 
                    <InactiveLabel/> : 
                    null
                }
                maxWidth={1000}
                bigID
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && userData ? 
                            <UserInformation
                                user={userData}
                                department={departmentData}
                            /> : 
                            <>
                                
                            </>
                        }
                    </div>
                    <div className="page-side">
                        <UserSideBar
                            user={userData}
                            setUserData={setUserData}
                        />
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default UserPage