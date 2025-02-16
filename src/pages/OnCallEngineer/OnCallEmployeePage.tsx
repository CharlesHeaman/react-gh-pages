import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer"
import { DepartmentResponseData } from "../../types/department.types"
import { OnCallEngineerResponseData } from "../../types/OnCallEngineer.types"
import { UserResponseData } from "../../types/user.types"
import getAPI from "../../utils/getAPI"
import EditOnCallEngineer from "./components/EditOnCallEngineer"
import OnCallEmployeeSideBar from "./components/OnCallEmployeeSideBar"
import OnCallEngineerInfo from "./components/OnCallEngineerInfo"
import OnCallEmployeeInformationSkeleton from "./components/OnCallEmployeeInformationSkeleton"

const OnCallEmployeePage = () => {
    const { onCallEngineerID } = useParams();

    const [isEditMode, setIsEditMode] = useState(false);
    const [isOnCallEngineerLoading, setIsOnCallEngineerLoading] = useState(true);
    const [onCallEngineerData, setOnCallEngineerData] = useState<OnCallEngineerResponseData>();
    const [isEngineerLoading, setIsEngineerLoading] = useState(true);
    const [engineerData, setEngineerData] = useState<UserResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();

    useEffect(() => {
        getOnCallEngineerData();
    }, [onCallEngineerID]);

    useEffect(() => {
        if (onCallEngineerData === undefined) return;
        getEngineerData(onCallEngineerData.data.user_id);
    }, [onCallEngineerData?.data.user_id]);

    useEffect(() => {
        if (onCallEngineerData === undefined) return;
        getDepartmentData(onCallEngineerData.data.department_id);
    }, [onCallEngineerData?.data.department_id]);

    const getOnCallEngineerData = () => {
        getAPI(`on_call_engineers/${onCallEngineerID}`, {}, getOnCallEngineerDataResponse, setIsOnCallEngineerLoading)
    }

    const getOnCallEngineerDataResponse = (response: any) => {
        const onCallEngineerData: OnCallEngineerResponseData = response.data;
        setOnCallEngineerData(onCallEngineerData);
    }

    const getDepartmentData = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading)
    }

    const getEngineerData = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setEngineerData(userData);
        }, setIsEngineerLoading)
    }

    const isLoading = () => {
        return (
            isOnCallEngineerLoading ||
            isEngineerLoading || 
            isDepartmentLoading 
        )
    }

    return (
        <>
            <OuterContainer
                title="On-call Employee"
                id={onCallEngineerID}
                maxWidth={750}
            >                 
                <div className="page-grid">
                    <div className="page-main">
                        {(!isLoading() && onCallEngineerData && engineerData && departmentData) ?
                            !isEditMode ?
                                <OnCallEngineerInfo
                                    onCallEngineerData={onCallEngineerData}
                                    engineerData={engineerData}
                                    department={departmentData}
                                /> :
                                <EditOnCallEngineer
                                    onCallEngineerData={onCallEngineerData}
                                    engineerData={engineerData}
                                    setOnCallEngineerData={setOnCallEngineerData}
                                    disabledEdit={() => setIsEditMode(false)}
                                />
                            :
                            <OnCallEmployeeInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <OnCallEmployeeSideBar
                            onCallEngineer={onCallEngineerData}
                            isEditMode={isEditMode}
                            isLoading={isOnCallEngineerLoading}
                            setIsEditMode={setIsEditMode}
                        />
                    </div>
                </div> 
            </OuterContainer>
        </>
    )
}

export default OnCallEmployeePage