import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CreateButton from '../../components/form/CreateButton/CreateButton';
import SearchForm from '../../components/form/SearchForm/SearchForm';
import SideBarButton from "../../components/ui/Buttons/SideBarButton/SideBarButton";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import SideBarModule from "../../components/ui/Containers/SideBarModule/SideBarModule";
import HeaderFlex from '../../components/ui/HeaderFlex';
import PaginationNavigation from '../../components/ui/PaginationNavigation/PaginationNavigation';
import SearchTable from '../../components/ui/SearchTable/SearchTable';
import Header from "../../components/ui/Structure/Header/Header";
import { CustomerCollectionResponse, CustomerResponseData } from '../../types/customers.types';
import { DepartmentCollectionResponse, DepartmentResponseData } from '../../types/department.types';
import { RiskAssessmentMethodStatementCollectionResponse } from '../../types/riskAssessmentMethodStatements.types';
import { TicketCollectionResponse, TicketResponseData } from '../../types/tickets.types';
import findTicket from '../../utils/findTicket';
import getAPI from '../../utils/getAPI';
import SupplierManufacturerRowSkeleton from '../SuppliersManufacturers/SupplierManufacturerListPage/components/SuppliersManufacturersRowSkeleton';
import RiskAssessmentMethodStatementRow from './components/RiskAssessmentMethodStatementRow';

const DepartmentRAMS = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { departmentName } = useParams();
    const navigate = useNavigate();
    const perPage = 10;

    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isRAMSLoading, setIsRAMSLoading] = useState(true);
    const [ramsData, setRamsData] = useState<RiskAssessmentMethodStatementCollectionResponse>();
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomerData] = useState<Array<CustomerResponseData>>([]);
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();

    useEffect(() => {
        getDepartment();
    }, [departmentName])

    useEffect(() => {
        searchRams()
    }, [departmentData, searchParams.get('offset')])

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData);
        }, setIsDepartmentLoading)
    }

    const searchRams = () => {
        if (departmentData === undefined) return;
        getAPI('risk_assessment_method_statements', {
            department_id: departmentData.id,
            offset: searchParams.get('offset'),
            perPage: perPage,
        }, (response: any) => {
            const ramsData: RiskAssessmentMethodStatementCollectionResponse = response.data;
            setRamsData(ramsData);
            if (ramsData.data.length > 0) {
                getTickets([...new Set(ramsData.data.map(rams => {
                    return {
                        ticket_id: rams.data.ticket_id,
                        ticket_type: rams.data.ticket_type
                    }
                }))]);
            }
        }, setIsRAMSLoading)
    }

    const getTickets = (tickets: any) => {
        getAPI(`tickets`, {
            tickets: tickets
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data)
            if (ticketData.data.length > 0) {
                getCustomers([...new Set(ticketData.data.map(ticket => ticket.data.customer_id))])
            }
        }, setIsTicketsLoading)   
    }

    const getCustomers = (customerIDs: Array<number>) => {
        getAPI(`customers`, {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomerData(customerData.data)
        }, setIsCustomersLoading)   
    }

    const isLoading = (
        isRAMSLoading || 
        isTicketsLoading || 
        isCustomersLoading
    )

    return (
        <>
            <Header
                links={[
                    {
                        to: departmentName as string,
                        text: (departmentName as string).charAt(0).toUpperCase() + (departmentName as string).slice(1)
                    },
                    {
                        to: 'rams',
                        text: 'RAMS'
                    }
                ]}
            />
            <OuterContainer
                title='Risk Assessment Method Statements'
                headerContent={
                    <HeaderFlex>
                        <SearchForm
                            searchFunc={searchRams}
                            value={searchTerm}
                            setter={setSearchTerm}
                            showAdvancedSearch={() => setShowAdvancedSearch(true)}
                            placeHolder="Search all risk assessment method statements..."
                        />
                        <CreateButton 
                            text={'Create RAMS'} 
                            to={'/rams/create'}                        
                        />
                    </HeaderFlex>
                }
                maxWidth={1200}
                noBorder
            >
                <div className="page-grid">
                    <div className="page-main">
                        <SearchTable
                            headers={['File Name', 'Customer', 'Ticket', 'Date']}
                            isLoading={!(!isLoading && ramsData)}
                            skeletonRow={<SupplierManufacturerRowSkeleton/>}
                            skeletonCount={perPage}
                            count={ramsData ? ramsData.data.length : 0}
                            resourceName="risk assessment method statements"
                            resourceIconFont="assignment_late"
                            body={ramsData && ramsData.data.map((riskAssessmentMethodStatement, index) => 
                                <RiskAssessmentMethodStatementRow
                                    ticket={findTicket(ticketData, riskAssessmentMethodStatement.data.ticket_id, riskAssessmentMethodStatement.data.ticket_type)}
                                    customers={customerData}
                                    riskAssessmentMethodStatement={riskAssessmentMethodStatement}
                                    key={index}
                                />
                            )}
                        />
                        {(!isLoading && ramsData) && <PaginationNavigation
                            data={ramsData.data}
                            totalCount={ramsData.total_count}
                            perPage={ramsData.pages.per_page}
                        />}
                    </div>
                    <div className="page-side">
                        <SideBarModule title="Administration">
                            <SideBarButton text='Description of Works' iconFont="subject" clickEvent={() => navigate('description_of_works')}/>
                            <SideBarButton text='Risk Assessments' iconFont="assignment_late" clickEvent={() => navigate('../../rams/risk_assessments')}/>
                            <SideBarButton text="Personnel Protective Equipment" iconFont="masks" clickEvent={() => navigate('../../rams/personnel_protective_equipment')}/>
                            <SideBarButton text="Hazardous Substances" iconFont="report_problem" clickEvent={() => navigate('../../rams/hazardous_substances')}/>
                        </SideBarModule>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default DepartmentRAMS