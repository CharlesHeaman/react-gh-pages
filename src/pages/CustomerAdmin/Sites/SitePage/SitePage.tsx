import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel";
import getExpiryColor from "../../../../components/ui/ExpiryDateLabel/getExpiryColor";
import Label from "../../../../components/ui/General/Label/Label";
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton";
import InactiveLabel from "../../../../components/ui/InactiveLabel/InactiveLabel";
import { ContractResponseData } from "../../../../types/contract.types";
import { CustomerResponseData } from "../../../../types/customers.types";
import { DepartmentResponseData } from "../../../../types/department.types";
import { SiteActivityCollectionResponse, SiteActivityResponseData } from "../../../../types/siteActivity.types";
import { SiteCollectionResponse, SiteResponseData } from "../../../../types/sites.types";
import getAPI from "../../../../utils/getAPI";
import CustomerAdminNavigation from "../../components/CustomerAdminNavigation";
import IsContractedLabel from "../../Customers/components/CustomerTypeLabel";
import getSiteMaintenanceTitle from "../utils/getSiteMaintenanceTitle";
import EditSiteForm from "./components/EditSiteForm";
import SiteInformation from "./components/SiteInformation";
import SiteInformationSkeleton from "./components/SiteInformationSkeleton";
import SiteSideBar from "./components/SiteSideBar/SiteSideBar";
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink";
import { ScheduledMaintenanceVisitsCollectionResponse } from "../../../../types/scheduledMaintenanceVisits.types";
import findNextScheduledMaintenanceVisit from "../../../../utils/findNextScheduledMaintenanceVisit";

const SitePage = () => {
    const { siteCode } = useParams();

    // Data States
    const [isSiteLoading, setIsSiteLoading] = useState(true);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isContractLoading, setIsContractLoading] = useState(false);
    const [contractData, setContractData] = useState<ContractResponseData>();
    const [isScheduledVisitsLoading, setIsScheduledVisitsLoading] = useState(false);
    const [scheduledVisitsData, setScheduledVisitsData] = useState<ScheduledMaintenanceVisitsCollectionResponse>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<SiteActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getSiteData();
    }, [siteCode])

    useEffect(() => {
        if (!siteData) return;
        if (siteData.data.contract_id) {
            getContract(siteData.data.contract_id);
            getScheduledVisits(siteData.data.contract_id);
        } else {
            setContractData(undefined);
        }
    }, [siteData?.data.contract_id])

    useEffect(() => {
        if (!siteData) return;
        getCustomerData(siteData.data.customer_id);
    }, [siteData?.data.customer_id]);

    useEffect(() => {
        if (siteData === undefined) return;
        if (!siteData.data.is_active) getInactiveActivity(siteData.id);
    }, [JSON.stringify(siteData)]);


    const getSiteData = () => {
        getAPI(`sites`, {
            codes: [siteCode],
        }, (response: any) => {
            const siteCollectionData: SiteCollectionResponse = response.data;
            const siteData = siteCollectionData.data[0];
            setSiteData(siteData);
            if (siteData !== undefined) {
                getDepartment(siteData.data.department_id);
            }
        }, setIsSiteLoading);
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

    const getContract = (contractID: number) => {
        getAPI(`contracts/${contractID}`, {}, (response: any) => {
            const contractData: ContractResponseData = response.data;
            setContractData(contractData);
        }, setIsContractLoading);
    }

    const getScheduledVisits = (contractID: number) => {
        getAPI(`scheduled_maintenance_visits`, {
            contract_id: contractID,
        }, (response: any) => {
            const visitData: ScheduledMaintenanceVisitsCollectionResponse = response.data;
            setScheduledVisitsData(visitData);
        }, setIsScheduledVisitsLoading)    
    } 

    const getInactiveActivity = (siteID: number) => {
        getAPI(`site_activity`, {
            site_id: siteID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const siteActivityData: SiteActivityCollectionResponse = response.data;
            setInactiveActivityData(siteActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isNavigationLoading = (
        isCustomerLoading
    )

    const isHeaderLoading = (
        isSiteLoading || 
        isContractLoading || 
        isDepartmentLoading || 
        isScheduledVisitsLoading
    )

    const isLoading = (
        isSiteLoading || 
        isCustomerLoading || 
        isContractLoading || 
        isDepartmentLoading || 
        isScheduledVisitsLoading ||
        isInactiveActivityLoading
    )

    const nextVisit = findNextScheduledMaintenanceVisit(scheduledVisitsData ? scheduledVisitsData.data : []);

    return (
        <>
            <CustomerAdminNavigation location='sites'/>
            <OuterContainer 
                title='Site' 
                id={siteCode}
                maxWidth={1050}
                headerContent={!isHeaderLoading && departmentData && siteData && scheduledVisitsData ?
                    <div className="flex">
                        {!siteData.data.is_active ? <InactiveLabel/> : null}
                        <DepartmentLabel 
                            department={departmentData}
                        />
                        <IsContractedLabel isContracted={siteData.data.contract_id !== null}/> 
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
                        {!isLoading && siteData && customerData && departmentData && scheduledVisitsData ?
                            !isEditMode ? 
                                <SiteInformation
                                    customer={customerData}
                                    site={siteData}
                                    department={departmentData}
                                    contract={contractData}
                                    scheduledVisits={scheduledVisitsData.data}
                                    lastDeactivate={inactiveActivityData?.data.created_at}
                                /> : 
                                <EditSiteForm
                                    site={siteData}
                                    setSiteData={setSiteData}
                                    department={departmentData}
                                    disabledEdit={() => setIsEditMode(false)}
                                />
                            :
                            <SiteInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <SiteSideBar 
                            site={siteData}
                            customerID={siteData?.data.customer_id}
                            customer={customerData}
                            contract={contractData}
                            isActive={siteData?.data.is_active}
                            setSiteData={setSiteData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                        />
                    </div>
                </div>
            </OuterContainer> 
        </>
    )
}

export default SitePage