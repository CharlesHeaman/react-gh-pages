import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { UserCollectionResponse } from "../../types/user.types";
import formatDate from "../../utils/formatDate";
import getAPI from "../../utils/getAPI";
import TimegridNavigation from "../TimeGrids/components/TimegridNavigation/TimegridNavigation";
import getTimegridListDate from "../TimeGrids/utils/getTimegridListDate";
import TimegridList from "./TimegridList";
import TimegridSearchHeader from "./TimegridSearchHeader";
import getTimegridSearchParams from "./getTimegridSearchParams";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";

const TimegridListPage = () => {
    const { departmentName } = useParams();
    const [searchParams] = useSearchParams();

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<UserCollectionResponse>();

    // Search Parameters 
    const date = getTimegridListDate(searchParams.get('date'));
    const timegridSearchParams = getTimegridSearchParams(searchParams);
    
    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        getEngineers();
    }, [departmentData, JSON.stringify(date), JSON.stringify(timegridSearchParams)]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData)
        }, setIsDepartmentLoading)
    }

    const getEngineers = () => {
        if (departmentData === undefined) return;
        getAPI('users', {
            ...timegridSearchParams,
            is_timegrid_engineer: true,
            department_ids: [departmentData.id],
            is_active: true,
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData);
        }, setIsUsersLoading);
    }

    return (
        <>
            <OuterContainer 
                title={`Timegrids for ${formatDate(date)}`}
                maxWidth={650}
                description="Process and return engineer timegrids."
                noBorder
            >
                <TimegridNavigation/>
                <TimegridSearchHeader/>
                <TimegridList 
                    isUserLoading={isUsersLoading} 
                    users={userData} 
                    date={date}
                    departmentName={departmentName as string}
                    perPage={timegridSearchParams.perPage}

                />
            </OuterContainer>
        </>
    )
} 

export default TimegridListPage