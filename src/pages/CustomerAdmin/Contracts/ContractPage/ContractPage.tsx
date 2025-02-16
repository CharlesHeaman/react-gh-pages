import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel";
import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus";
import Label from "../../../../components/ui/General/Label/Label";
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton";
import InactiveLabel from "../../../../components/ui/InactiveLabel/InactiveLabel";
import { ContractCollectionResponse, ContractResponseData } from "../../../../types/contract.types";
import { ContractActivityCollectionResponse, ContractActivityResponseData } from "../../../../types/contractActivity.types";
import { CustomerResponseData } from "../../../../types/customers.types";
import { DepartmentResponseData } from "../../../../types/department.types";
import getAPI from "../../../../utils/getAPI";
import CustomerAdminNavigation from "../../components/CustomerAdminNavigation";
import ContractInformation from "./components/ContractInformation";
import ContractInformationSkeleton from "./components/ContractInformationSkeleton";
import EditContractForm from "./components/EditContractForm";
import ContractSideBar from "./components/SideBar/ContractSideBar";
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink";
import { ScheduledMaintenanceVisitsCollectionResponse } from "../../../../types/scheduledMaintenanceVisits.types";
import getExpiryColor from "../../../../components/ui/ExpiryDateLabel/getExpiryColor";
import getSiteMaintenanceTitle from "../../Sites/utils/getSiteMaintenanceTitle";
import findNextScheduledMaintenanceVisit from "../../../../utils/findNextScheduledMaintenanceVisit";

const ContractPage = () => {
    const { contractReferenceNumber } = useParams();

    // Data States
    const [isContractLoading, setIsContractLoading] = useState(true);
    const [contractData, setContractData] = useState<ContractResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isScheduledVisitsLoading, setIsScheduledVisitsLoading] = useState(false);
    const [scheduledVisitsData, setScheduledVisitsData] = useState<ScheduledMaintenanceVisitsCollectionResponse>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<ContractActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getContractData();
    }, [contractReferenceNumber]);

    useEffect(() => {
        contractData && getCustomerData(contractData.data.customer_id);
    }, [contractData?.data.customer_id]);

    useEffect(() => {
        if (contractData === undefined) return;
        if (!contractData.data.is_active) getInactiveActivity(contractData.id);
    }, [JSON.stringify(contractData)]);

    const getContractData = () => {
        getAPI(`contracts`, {
            reference_number: contractReferenceNumber,
        }, (response: any) => {
            const contractDataCollection: ContractCollectionResponse = response.data;
            const contractData = contractDataCollection.data[0];
            setContractData(contractData);
            if (contractData !== undefined) {
                getDepartment(contractData.data.department_id);
                getScheduledVisits(contractData.id);
            }
        }, setIsContractLoading);
    }

    const getCustomerData = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getScheduledVisits = (contractID: number) => {
        getAPI(`scheduled_maintenance_visits`, {
            contract_id: contractID,
        }, (response: any) => {
            const visitData: ScheduledMaintenanceVisitsCollectionResponse = response.data;
            setScheduledVisitsData(visitData);
        }, setIsScheduledVisitsLoading)    
    } 

    const getInactiveActivity = (contractID: number) => {
        getAPI(`contract_activity`, {
            contract_id: contractID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const contractActivityData: ContractActivityCollectionResponse = response.data;
            setInactiveActivityData(contractActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isNavigationLoading = (
        isCustomerLoading
    )

    const isHeaderLoading = (
        isContractLoading || 
        isDepartmentLoading || 
        isScheduledVisitsLoading
    )

    const isLoading = (
        isContractLoading || 
        isCustomerLoading ||
        isDepartmentLoading || 
        isScheduledVisitsLoading || 
        isInactiveActivityLoading 
    )

    const expiryStatus = contractData ? getExpiryStatus(contractData.data.end_at) : 0;
    const startStatus = contractData ? getExpiryStatus(contractData.data.start_at, true) : 0;

    
    const nextVisit = findNextScheduledMaintenanceVisit(scheduledVisitsData ? scheduledVisitsData.data : []);

    return (
        <>
            <CustomerAdminNavigation location='contracts'/>
            <OuterContainer 
                title='Contract' 
                id={contractReferenceNumber}
                maxWidth={1050}
                headerContent={!isHeaderLoading && contractData && departmentData && scheduledVisitsData ?
                    <div className="flex">
                        {!contractData.data.is_active ? <InactiveLabel/> : null}
                        <DepartmentLabel 
                            department={departmentData}
                        />
                        {expiryStatus === -1 || startStatus === -1 ? 
                            <Label text="Invalid" color="red" iconFont="event_busy"/> :
                            expiryStatus === 0 ?
                            <Label text="Expiring Soon" color="orange" iconFont="date_range"/> : 
                            <Label text="Valid" color="light-green" iconFont="event_available"/> 
                        }
                        {contractData && nextVisit ? <Label
                            iconFont="confirmation_number"
                            text={getSiteMaintenanceTitle(nextVisit.data.visit_date)}
                            color={getExpiryColor(nextVisit.data.visit_date)}
                        /> : null}
                    </div>
                    :
                    <div className="flex">
                        <Skeleton type='label'/>
                        <Skeleton type='label'/>
                    </div>
                }
                navigation={!isNavigationLoading && customerData ?
                    <NewCustomerLink name={customerData.data.name} code={customerData.data.code}/>
                    : <Skeleton type='navigation' width={250}/>
                }
                bigID
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && contractData && customerData && departmentData && scheduledVisitsData ?
                            !isEditMode ? 
                                <ContractInformation
                                    customerData={customerData.data}
                                    contractData={contractData.data}
                                    department={departmentData}
                                    scheduledVisits={scheduledVisitsData.data}
                                    lastDeactivate={inactiveActivityData?.data.created_at}
                                /> : 
                                <EditContractForm
                                    contract={contractData}
                                    setContractData={setContractData}
                                    department={departmentData}
                                    disabledEdit={() => setIsEditMode(false)}
                                />
                            :
                            <ContractInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <ContractSideBar 
                            contract={contractData}
                            customer={customerData} 
                            setContractData={setContractData} 
                            setIsEditMode={setIsEditMode}                        
                        />
                    </div>
                </div>
            </OuterContainer> 
        </>
    )
}

export default ContractPage