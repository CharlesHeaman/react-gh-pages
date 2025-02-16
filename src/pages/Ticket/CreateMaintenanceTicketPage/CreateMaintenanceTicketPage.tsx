import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerCollectionResponse, CustomerResponseData } from "../../../types/customers.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { ScheduledMaintenanceVisitsCollectionResponse } from "../../../types/scheduledMaintenanceVisits.types";
import { SiteCollectionResponse } from "../../../types/sites.types";
import { CreateMaintenanceTicketAttributes, TicketCollectionResponse } from "../../../types/tickets.types";
import findContractScheduledMaintenanceVisit from "../../../utils/findContractScheduledMaintenanceVisit";
import getAPI from "../../../utils/getAPI";
import getMonthRelativeDate from "../../../utils/getMonthRelativeDate";
import postAPI from "../../../utils/postAPI";
import { NewSelectItem } from "../../CustomerAdmin/Sites/SitePage/components/SiteSideBar/components/SiteActions/components/SelectSiteAssignedContacts";
import TicketList from "../../Tickets/components/TicketList";
import CreateMaintenanceTicketPreview from "./components/CreateMaintenanceTicketPreview";
import MaintenanceTicketDetailsForm from "./components/MaintenanceTicketDetailsForm";
import SelectMaintenanceSitesForm from "./components/SelectMaintenanceSitesForm";

const CreateMaintenanceTicketPage = () => {
    const { departmentName } = useParams();
    const [searchParams] = useSearchParams();

    const stepParam = searchParams.get('step');

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);    
    const [isSitesLoading, setIsSitesLoading] = useState(false);
    const [sitesData, setSitesData] = useState<SiteCollectionResponse>();
    const [selectedSites, setSelectedSites] = useState<Array<NewSelectItem>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomersData] = useState<Array<CustomerResponseData>>([]);
    const [isScheduledVisitsLoading, setIsScheduledVisitsLoading] = useState(false);
    const [scheduledVisitsData, setScheduledVisitsData] = useState<ScheduledMaintenanceVisitsCollectionResponse>();
    const [createdTickets, setCreatedTickets] = useState<TicketCollectionResponse>();

    // Form States
    const [ticketDetails, setTicketDetails] = useState<Array<CreateMaintenanceTicketAttributes>>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [isCreated, setIsCreated] = useState(false);

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        if (departmentData === undefined) return;
        getScheduledVisits(departmentData.id);
    }, [departmentData?.id]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData)
        }, setIsDepartmentLoading)
    }

    const getScheduledVisits = (departmentID: number) => {
        getAPI(`scheduled_maintenance_visits`, {
            department_id: departmentID,
            visit_before: getMonthRelativeDate(new Date(), 1),
            is_created: false
        }, (response: any) => {
            const visitData: ScheduledMaintenanceVisitsCollectionResponse = response.data;
            setScheduledVisitsData(visitData);
            if (visitData.data.length > 0) {
                getSites(visitData.data.map(visit => visit.data.contract_id), visitData);
            } else {
                getSites([-1], visitData);
            }
        }, setIsScheduledVisitsLoading)    
    } 

    const getSites = (contractIDs: Array<number>, visitData: ScheduledMaintenanceVisitsCollectionResponse) => {
        getAPI('sites', {
            is_active: true,
            contract_ids: contractIDs
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSitesData(siteData);
            const selectedSites: Array<NewSelectItem> = siteData.data.map(site => {
                return {
                    id: site.id,
                    selected: true
                }
            })
            setSelectedSites(selectedSites);
            const ticketDetails: Array<CreateMaintenanceTicketAttributes> = siteData.data.map(site => {
                return {
                    department_id: departmentData ? departmentData.id : 0,
                    visit_date: findContractScheduledMaintenanceVisit(visitData.data, site.data.contract_id ? site.data.contract_id : 0)?.data.visit_date,
                    customer_id: site.data.customer_id,
                    contract_id: site.data.contract_id ? site.data.contract_id : 0,
                    site_id: site.id,
                    job_description: 'Carry out Planned Maintenance',
                    estimated_time: '0',
                    is_mate_required: false,
                    is_rams_required: false,
                }
            })
            setTicketDetails(ticketDetails);
            getCustomers([...new Set(siteData.data.map(site => site.data.customer_id))]);
        }, setIsSitesLoading);
    }

    const getCustomers = (customerIDs: Array<number>) => {
        getAPI('customers', {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomersData(customerData.data);
            const requiredRAMSCustomers = customerData.data.filter(customer => customer.data.tickets_always_require_rams);
            for (const customer of requiredRAMSCustomers) {
                setTicketDetails(prevState => 
                    prevState.map(ticket => {
                        if (ticket.customer_id === customer.id) {
                            return {
                                ...ticket,
                                is_rams_required: true
                            }
                        }
                        return ticket
                    })
                )
            }
        }, setIsCustomersLoading)
    }

    const updateSelection = (siteID: number) => {
        const updatedSite = sitesData?.data.find(site => site.id === siteID);
        const updatedContractID = updatedSite?.data.contract_id;
        const filteredSiteIDs = sitesData?.data.filter(site => site.data.contract_id === updatedContractID).map(site => site.id);
        setSelectedSites(prevState => 
            prevState.map(selectItem => {
                if (filteredSiteIDs?.includes(selectItem.id)) {
                    return {
                        ...selectItem,
                        selected: !selectItem.selected
                    }
                }
                return selectItem
            })
        )
    }

    const updateTicketDetails = (siteID: number, name: string, value: string | boolean) => {
        setTicketDetails(prevState => {
            return prevState.map(currentLine => {
                return (siteID === currentLine.site_id ? 
                        {
                            ...currentLine,
                            [name]: value
                        } :
                        currentLine
                    )
            })
        })
    }

    const createTickets = () => {
        postAPI('tickets/1/create_collection', {}, {
            tickets: ticketDetails,
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setCreatedTickets(ticketData);
            setIsCreated(true);
        }, setIsCreating);
    }


    const formSteps: Array<FormStep> = [
        {
            header: 'Select Sites',
            form: <SelectMaintenanceSitesForm
                isSitesLoading={isSitesLoading}
                updateSelection={updateSelection}
                sitesData={sitesData}
                selectedSites={selectedSites}
            />,
            isComplete: true,
        },
        {
            header: 'Ticket Details',
            form: <MaintenanceTicketDetailsForm
                sites={sitesData ? sitesData.data.filter(site => selectedSites.filter(selectItem => selectItem.selected).map(selectItem => selectItem.id).includes(site.id)) : []}
                ticketDetails={ticketDetails}
                updateTicketDetails={updateTicketDetails}
                showErrors={maxStepSubmitted > 1}   
            />,
            isComplete: true,
        },
        {
            header: 'Review Information',
            form: <CreateMaintenanceTicketPreview
                sites={sitesData ? sitesData.data.filter(site => selectedSites.filter(selectItem => selectItem.selected).map(selectItem => selectItem.id).includes(site.id)) : []}
                ticketDetails={ticketDetails}
                customers={customerData}
            />,
            isComplete: true,
        }
    ]

    return (
        <>
            <OuterContainer
                title={!isCreated ? 'Create Maintenance Tickets' : 'Created Maintenance Tickets'}
                description={!isCreated ? "Complete this form to create maintenance tickets." : "The following maintenance tickets have been created."}
                maxWidth={stepParam === "1" || stepParam === null || isCreated ? 1800 : 1000}
            >
                {!isCreated ?
                    <FormWizardFlex
                        steps={formSteps}
                        maxStepSubmitted={maxStepSubmitted}
                        setMaxStepSubmitted={setMaxStepSubmitted}
                        resourceName="Tickets"
                        isCreating={isCreating}
                        createFunc={createTickets}
                    /> : 
                    <TicketList 
                        isTicketsLoading={isCreating} 
                        tickets={createdTickets}                        
                    />
                }
            </OuterContainer>
        </>
    )
}

export default CreateMaintenanceTicketPage