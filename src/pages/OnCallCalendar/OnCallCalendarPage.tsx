import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer"
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types"
import { OnCallEngineerCollectionResponse, OnCallEngineerResponseData } from "../../types/OnCallEngineer.types"
import { UserCollectionResponse, UserResponseData } from "../../types/user.types"
import getAPI from "../../utils/getAPI"
import getDayRelativeDate from "../../utils/getDayRelativeDate"
import getFirstDayOfMonth from "../../utils/getFirstDayOfMonth"
import getLastDayOfMonth from "../../utils/getLastDayOfMonth"
import getMonday from "../../utils/getMonday"
import AddOnCallEmployee from "./components/AddOnCallEmployee"
import OnCallCalendarNavigation from "./components/OnCallCalendar/components/OnCallCalendarNavigation"
import OnCallCalendar from "./components/OnCallCalendar/OnCallCalendar"
import getOnCallCalendarDate from "./utils/getOnCallCalendarDate"
import positionOnCallEngineers from "./utils/positionOnCallEngineers"

const OnCallCalendarPage = () => {
    const { departmentName } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [showAdd, setShowAdd] = useState(false);
    const [currentCreateDate, setCurrentCreateDate] = useState<Date>();

    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentsData, setDepartmentsData] = useState<Array<DepartmentResponseData>>([]);
    const [isOnCallEngineersLoading, setIsOnCallEngineersLoading] = useState(true);
    const [onCallEngineerData, setOnCallEngineerData] = useState<Array<OnCallEngineerResponseData>>([]);
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    const date = getOnCallCalendarDate(searchParams.get('date'));

    const firstDayOfMonth = getFirstDayOfMonth(date);
    const lastDayOfMonth = getLastDayOfMonth(date);
    const startDate = getMonday(new Date(firstDayOfMonth));

    useEffect(() => {
        (departmentName !== undefined) ? 
            getDepartment() :
            getOnCallEngineers();
    }, [searchParams, departmentName]);

    useEffect(() => {
        if (departmentName === undefined || departmentData !== undefined)
        getOnCallEngineers();
    }, [departmentData?.id])

    useEffect(() => {
        currentCreateDate && setShowAdd(true)
    }, [currentCreateDate])

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data[0]);
        }, setIsDepartmentLoading)
    }

    const getOnCallEngineers = () => {
        getAPI('on_call_engineers', {
            department_ids: departmentData ? [departmentData.id] : undefined,
            end_date_after: startDate,
            start_date_before: getDayRelativeDate(startDate, 6 * 7)
        }, (response: any) => {
            const onCallEngineerData: OnCallEngineerCollectionResponse = response.data;
            setOnCallEngineerData(onCallEngineerData.data)
            if (onCallEngineerData.data.length > 0) {
                getUsers([...new Set(onCallEngineerData.data.map(onCallEngineer => onCallEngineer.data.user_id))]);
                getDepartments([...new Set(onCallEngineerData.data.map(onCallEngineer => onCallEngineer.data.department_id))]);
            }
        }, setIsOnCallEngineersLoading)
    }

    const getDepartments = (departmentIDs: Array<number>) => {
        getAPI(`departments`, {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentsData(departmentData.data);
        }, setIsDepartmentLoading)
    }

    const getUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs,
            include_inactive: true
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)   
    }

    const isLoading = (
        isDepartmentLoading ||
        isDepartmentsLoading ||
        isOnCallEngineersLoading ||
        isUsersLoading
    )

    return (
        <>
            <OuterContainer 
                title={`On-call Calendar ${(date).toLocaleString('default', { month: 'long', year: 'numeric' })}`}
                description="Add, edit and remove on-call employees."
                maxWidth={1400}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <OnCallCalendarNavigation
                            showAdd={() => setShowAdd(true)}
                            resourceName="On-call Employee"
                        />
                        <OnCallCalendar
                            startDate={startDate}
                            firstDayOfMonth={firstDayOfMonth}
                            lastDayOfMonth={lastDayOfMonth}
                            onCallEngineers={positionOnCallEngineers(onCallEngineerData.reverse())}
                            department={departmentData}
                            departments={departmentsData}
                            users={userData}
                            setCurrentCreateDate={setCurrentCreateDate}
                            isLoading={isLoading}
                        /> 
                    </div>
                </div>
            </OuterContainer>

            <AddOnCallEmployee  
                show={showAdd}
                hideFunc={() => setShowAdd(false)}
                departmentID={departmentData?.id}
                currentCreateDate={currentCreateDate}
                resFunc={getOnCallEngineers}
            />
        </>
    )
}

export default OnCallCalendarPage