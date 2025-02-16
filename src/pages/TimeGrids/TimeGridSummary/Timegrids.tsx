import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SearchForm from "../../../components/form/SearchForm/SearchForm";
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import SideBar from "../../../components/ui/Containers/SideBar/SideBar";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";
import HeaderFlex from "../../../components/ui/HeaderFlex";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import Header from "../../../components/ui/Structure/Header/Header";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../types/tickets.types";
import { TimegridCollectionResponse, TimegridResponseData } from "../../../types/timegrid.types";
import { UserCollectionResponse } from "../../../types/user.types";
import formatDate from "../../../utils/formatDate";
import getAPI from "../../../utils/getAPI";
import TimegridNavigation from "../components/TimegridNavigation/TimegridNavigation";
import getTimegridListDate from "../utils/getTimegridListDate";
import TimegridList from "./components/TimegridList/components/TimegridList";
import TimegridListSkeleton from "./components/TimegridListSkeleton";

const Timegrids = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const perPage = 20;

    const {departmentName} = useParams();
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [isTimegridLoading, setIsTimegridLoading] = useState(true);
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [userData, setUserData] = useState<UserCollectionResponse>();
    const [timegridData, setTimegridData] = useState<Array<TimegridResponseData>>([]);
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);

    const date = getTimegridListDate(searchParams.get('date'));

    useEffect(() => {
        getDepartment();
    }, [departmentName])

    useEffect(() => {
        getEngineers();
    }, [departmentData, searchParams])

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data[0]);
        }, setIsDepartmentLoading)
    }

    const getEngineers = () => {
        if (departmentData === undefined) return;
        getAPI('users', {
            full_name_like: searchTerm,
            department_ids: [departmentData.id],
            is_active: true,
            is_timegrid_engineer: true,
            perPage: perPage,
            offset: searchParams.get('offset')
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData);
            getUserTimegrids([...new Set(userData.data.map((user) => user.id))]);
            getTicketData([...new Set(userData.data.map((user) => user.id))]);
        }, setIsUsersLoading);
    }

    const getUserTimegrids = (engineerIDs: Array<number>) => {
        getAPI(`timegrids`, {
            user_ids: engineerIDs,
            date: [date]
        }, (response: any) => {
            const timegridData: TimegridCollectionResponse = response.data;
            setTimegridData(timegridData.data);
        }, setIsTimegridLoading);
    }

    const getTicketData = (engineerIDs: Array<number>) => {
        getAPI('tickets', {
            engineer_user_ids: engineerIDs,
            visit_date: [date]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data);
        }, setIsTicketLoading);
    }

    const isLoading = () => {
        return (
            isDepartmentLoading || 
            isUsersLoading ||
            isTimegridLoading || 
            isTicketLoading
        )
    }

    return (
        <>
            <OuterContainer 
                title={`Timegrids for ${formatDate(date)}`}
                headerContent={
                    <HeaderFlex>
                        <SearchForm
                            searchFunc={getEngineers}
                            value={searchTerm}
                            setter={setSearchTerm}
                            showAdvancedSearch={() => setShowAdvancedSearch(true)}
                            placeHolder="Search all timegrids..."
                        />
                    </HeaderFlex>
                }
                maxWidth={750}
                noBorder
            >
                <div className="page-grid">
                    <div className="page-main">
                        <TimegridNavigation/>
                        {!isLoading() && userData ? 
                            <TimegridList 
                                userData={userData.data}
                                timegrids={timegridData}
                                tickets={ticketData}
                            /> : 
                            <TimegridListSkeleton perPage={perPage}/>
                        }
                        {(!isLoading() && userData) && <PaginationNavigation
                            data={userData.data}
                            totalCount={userData.total_count}
                            perPage={userData.pages.per_page}
                        />}
                    </div>
                    <SideBar>
                        <SideBarModule title="Navigation"> 
                            <SideBarButton text='On-call Calendar' iconFont="calendar_month" clickEvent={() => navigate('../on_call_calendar')}/>
                        </SideBarModule>
                        <SideBarModule title="Reports"> 
                            <SideBarButton text='Run Timegrid Report' iconFont="summarize" clickEvent={() => navigate('run_report')}/>
                            <SideBarButton text='Run Accounts Timegrid Report' iconFont="request_quote" clickEvent={() => navigate('run_report?accounts=true')}/>
                        </SideBarModule>
                        <SideBarModule title="Administration">
                            <SideBarButton text='Additional Time Activities' iconFont="more_time" clickEvent={() => navigate('/timegrids/additional_time_activities')}/>
                        </SideBarModule>
                    </SideBar>
                </div>
            </OuterContainer>
        </>
    )
} 

export default Timegrids