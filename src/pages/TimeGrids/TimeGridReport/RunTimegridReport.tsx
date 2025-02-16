import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import Header from "../../../components/ui/Structure/Header/Header";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { UserCollectionResponse, UserResponseData } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import getMonday from "../../../utils/getMonday";

const RunTimegridReport = () => {
    const navigate = useNavigate();
    const {departmentName} = useParams();
    const [searchParams, setSearchParams] = useSearchParams(); 

    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [isEngineersLoading, setIsEngineersLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    const [engineerData, setEngineerData] = useState<Array<UserResponseData>>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
    const [selectedEngineer, setSelectedEngineer] = useState<number>(-1);
    const [selectedDate, setSelectedDate] = useState<Date>(getMonday(new Date()));

    useEffect(() => {
        getDepartments();
        getEngineers();
    }, [departmentName])

    const getDepartments = () => {
        getAPI('departments', {
            names: departmentName !== undefined ? [departmentName] : undefined
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data);
            if (departmentName !== undefined) {
                setSelectedDepartment(departmentData.data[0].id)
            }
        }, setIsDepartmentLoading);
    }

    const getEngineers = () => {
        getAPI('users', {
            is_timegrid_engineer: true 
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setEngineerData(userData.data)
        }, setIsEngineersLoading)
    }

    const runReport = () => {
        navigate(`report?department=${selectedDepartment}&engineer=${selectedEngineer}&date=${selectedDate.toISOString().split('T')[0]}${searchParams.get('accounts') === "true" ? '&accounts=true' : ''}`);
    }

    const isLoading = () => {
        return (
            isDepartmentLoading || 
            isEngineersLoading
        )
    }

    const getHeaderText = () => {
        return `Run ${searchParams.get('accounts') === "true" ? 'accounts' : ''} timegrid report for selected ${departmentName !== undefined ? `${(departmentName as string).toLocaleLowerCase()} department` : ''} engineers.`
    }

    const getBreadcrumbs = () => {
        let breadcrumbs = [
            {
                to: 'timegrids',
                text: 'Timegrids'
            },
            {
                to: `run_report${searchParams.get('accounts') === "true" ? '?accounts=true' : ''}`,
                text: `Run ${searchParams.get('accounts') === "true" ? 'Accounts' : ''} Report`
            }
        ]
        if (departmentName !== undefined) {
            breadcrumbs.unshift({
                to: departmentName as string,
                text: (departmentName as string).charAt(0).toUpperCase() + (departmentName as string).slice(1)
            })
        }
        return breadcrumbs
    }

    return (
        <>
            <Header
                links={getBreadcrumbs()}
            />
            <OuterContainer
                title={`Run ${searchParams.get('accounts') === "true" ? 'Accounts' : ''} Timegrid Report`}
                headerContent={getHeaderText()}
                stickyHeaderContent={getHeaderText()}
                maxWidth={450}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        {!isLoading() ? <>
                            <InfoGrid>
                                {departmentName === undefined && <GridItem title='Department'>
                                    <select onChange={(e) => setSelectedDepartment(parseInt(e.target.value))}>
                                        <option value={-1}>All Departments</option>
                                        {departmentData.map((department, index) =>
                                            <option value={department.id} key={index}>{department.data.name}</option>
                                        )}
                                    </select>
                                </GridItem>}
                                <GridItem title='Engineer'>
                                    <select onChange={(e) => setSelectedEngineer(parseInt(e.target.value))}>
                                        <option value={-1}>All Engineers</option>
                                        {engineerData.filter(user => selectedDepartment === -1 || user.data.department_id === selectedDepartment).map((user, index) => 
                                            <option value={user.id} key={index}>{user.data.first_name} {user.data.last_name}</option>
                                        )}
                                    </select>
                                </GridItem>
                                <GridItem title='Week Starting'>
                                    <input 
                                        type='date' 
                                        defaultValue={selectedDate.toISOString().substring(0, 10)}
                                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                        step="7"
                                        max={new Date().toISOString().substring(0, 10)}
                                    />
                                </GridItem>
                            </InfoGrid>
                            <ContainerFooter>
                                <SubmitButton text='Run Report' clickFunc={runReport}/>
                            </ContainerFooter>
                        </> :
                            <InfoGrid>
                                {departmentName === undefined && <GridItem>
                                    <Skeleton type='title'/>
                                    <Skeleton type='select-input'/>
                                </GridItem>}
                                <GridItem>
                                    <Skeleton type='title'/>
                                    <Skeleton type='select-input'/>
                                </GridItem>
                                <GridItem>
                                    <Skeleton type='title'/>
                                    <Skeleton type='select-input'/>
                                </GridItem>
                            </InfoGrid>
                        }
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default RunTimegridReport