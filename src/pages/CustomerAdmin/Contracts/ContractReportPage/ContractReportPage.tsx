import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import Label from "../../../../components/ui/General/Label/Label";
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound";
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton";
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink";
import { ContractCollectionResponse, ContractResponseData } from "../../../../types/contract.types";
import { CustomerResponseData } from "../../../../types/customers.types";
import { DepartmentResponseData } from "../../../../types/department.types";
import { SiteCollectionResponse } from "../../../../types/sites.types";
import { TicketInvoiceRequestCollectionResponse, TicketInvoiceRequestResponseData } from "../../../../types/TicketInvoiceRequest.types";
import { TicketCollectionResponse } from "../../../../types/tickets.types";
import findSite from "../../../../utils/findSite";
import findTicketInvoiceRequest from "../../../../utils/findTicketInvoiceRequest";
import formatMoney from "../../../../utils/formatMoney";
import getAPI from "../../../../utils/getAPI";
import reduceInvoiceRequestCost from "../../../InvoiceRequests/utils/reduceInvoiceRequestCost";
import reduceInvoiceValue from "../../../InvoiceRequests/utils/reduceInvoiceValue";
import CustomerAdminNavigation from "../../components/CustomerAdminNavigation";
import ContractInformationDetails from "../ContractPage/components/ContractInformationDetails";
import ContractInformationSkeleton from "../ContractPage/components/ContractInformationSkeleton";
import ContractReportTicketRow from "./ContractReportTicketRow";

const ContractReportPage = () => {
    const { contractReferenceNumber } = useParams();

    // Data States
    const [isContractLoading, setIsContractLoading] = useState(true);
    const [contractData, setContractData] = useState<ContractResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    const [tickets, setTickets] = useState<TicketCollectionResponse>();
    const [isSitesLoading, setIsSiteLoading] = useState(true);
    const [sitesData, setSitesData] = useState<SiteCollectionResponse>();
    const [isInvoiceRequestsLoading, setIsInvoiceRequestsLoading] = useState(false);
    const [invoiceRequests, setInvoiceRequests] = useState<Array<TicketInvoiceRequestResponseData>>([]);

    useEffect(() => {
        getContractData();
    }, [contractReferenceNumber]);

    useEffect(() => {
        contractData && getCustomerData(contractData.data.customer_id);
    }, [contractData?.data.customer_id]);

    const getContractData = () => {
        getAPI(`contracts`, {
            reference_number: contractReferenceNumber,
        }, (response: any) => {
            const contractDataCollection: ContractCollectionResponse = response.data;
            const contractData = contractDataCollection.data[0];
            setContractData(contractData);
            getTickets(contractData.id);
            if (contractData !== undefined) {
                getDepartment(contractData.data.department_id);
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

    const getTickets = (contractID: number) => {
        getAPI(`tickets`, {
            contract_id: contractID,
            suffixes: [0]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTickets(ticketData);
            getSites(ticketData.data.map(ticket => ticket.data.site_id));
            getInvoiceRequests([...new Set(ticketData.data.map(ticket => {
                return {
                    ticket_number: ticket.data.number,
                    department_id: ticket.data.department_id
                }
            }))]);
        }, setIsTicketsLoading)    
    } 

    const getSites = (siteIDs: Array<number>) => {
        getAPI(`sites`, {
            ids: siteIDs,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSitesData(siteData);
        }, setIsSiteLoading);
    }

    const getInvoiceRequests = (tickets: Array<any>) => {
        getAPI(`ticket_invoice_requests`, {
            tickets: tickets
        }, (response: any) => {
            const invoiceRequestData: TicketInvoiceRequestCollectionResponse = response.data;
            setInvoiceRequests(invoiceRequestData.data);
        }, setIsInvoiceRequestsLoading);
    }

    const isNavigationLoading = (
        isCustomerLoading
    )

    const isLoading = (
        isContractLoading || 
        isCustomerLoading ||
        isDepartmentLoading || 
        isTicketsLoading || 
        isSitesLoading || 
        isInvoiceRequestsLoading
    )

    const maintenanceTicketNumbers = tickets ? tickets.data.filter(ticket => ticket.data.ticket_type >= 1).map(ticket => ticket.data.number) : [];
    const maintenanceInvoices = invoiceRequests.filter(invoiceRequest => maintenanceTicketNumbers.includes(invoiceRequest.data.ticket_number));

    const totalCost = reduceInvoiceRequestCost(invoiceRequests);
    const totalInvoiceValue = reduceInvoiceValue(invoiceRequests);
    const totalProfit = totalInvoiceValue - totalCost;
    
    const maintenanceCost = reduceInvoiceRequestCost(maintenanceInvoices);
    const maintenanceInvoiceValue = reduceInvoiceValue(maintenanceInvoices);
    const maintenanceProfit = maintenanceInvoiceValue - maintenanceCost;

    return (
        <>
            <CustomerAdminNavigation location='contracts'/>
            <OuterContainer 
                title='Contract Profit Report' 
                id={contractReferenceNumber}
                maxWidth={1000}
                navigation={!isNavigationLoading && customerData ?
                    <NewCustomerLink name={customerData.data.name} code={customerData.data.code}/>
                    : <Skeleton type='navigation' width={250}/>
                }
                bigID
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        {!isLoading && contractData && customerData && departmentData && tickets && sitesData && invoiceRequests ? <>
                            <ContractInformationDetails
                                contractData={contractData.data}
                                department={departmentData}
                            />
                            <hr/>
                            <section>   
                                <h2>Profit / Loss Summary</h2>                             
                                <InfoGrid>
                                    <GridItem title='Total Cost' span={2}>
                                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(totalCost)}</span></p>
                                    </GridItem>
                                    <GridItem title='Total Invoice' span={2}>
                                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(totalInvoiceValue)}</span></p>
                                    </GridItem>
                                    <GridItem title='Total Profit / Loss' span={2}>
                                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}><Label
                                            text={formatMoney(totalProfit)}
                                            color={totalProfit > 0 ? 'light-green' : 'red'}
                                            iconFont={totalProfit > 0 ? 'trending_up' : 'trending_down'}
                                        /></span></p>
                                    </GridItem>
                                    <GridItem title='Maintenance Cost' span={2}>
                                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(maintenanceCost)}</span></p>
                                    </GridItem>
                                    <GridItem title='Maintenance Invoice' span={2}>
                                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(maintenanceInvoiceValue)}</span></p>
                                    </GridItem>
                                    <GridItem title='Maintenance Profit / Loss' span={2}>
                                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}><Label
                                            text={formatMoney(maintenanceProfit)}
                                            color={maintenanceProfit > 0 ? 'light-green' : 'red'}
                                            iconFont={maintenanceProfit > 0 ? 'trending_up' : 'trending_down'}
                                        /></span></p>
                                    </GridItem>
                                </InfoGrid>
                            </section>
                            <hr/>
                            <section>
                                <h2>Service Tickets</h2>
                                {tickets.data.filter(ticket => ticket.data.ticket_type === 0).length > 0 ?
                                    <div className="table-wrapper">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Ticket</th>
                                                    <th>Site</th>
                                                    <th>Visit Date</th>
                                                    <th>Invoice Number</th>
                                                    <th>Cost</th>
                                                    <th>Invoice Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tickets.data.filter(ticket => ticket.data.ticket_type === 0).map(ticket => 
                                                    <ContractReportTicketRow
                                                        ticket={ticket}
                                                        department={departmentData}
                                                        site={findSite(sitesData.data, ticket.data.site_id)}
                                                        invoiceRequest={findTicketInvoiceRequest(invoiceRequests, ticket.data.number, ticket.data.department_id)}
                                                    />
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <InnerContainer>
                                        <NoneFound
                                            text="No service tickets found"
                                            iconFont="local_activity"
                                            small
                                        />
                                    </InnerContainer>
                                }
                            </section>
                            <hr/>
                            <section>
                                <h2>Planned Maintenances Tickets</h2>
                                {tickets.data.filter(ticket => ticket.data.ticket_type === 1).length > 0 ?
                                    <div className="table-wrapper">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Ticket</th>
                                                    <th>Site</th>
                                                    <th>Visit Date</th>
                                                    <th>Invoice Number</th>
                                                    <th>Cost</th>
                                                    <th>Invoice Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tickets.data.filter(ticket => ticket.data.ticket_type === 1).map(ticket => 
                                                    <ContractReportTicketRow
                                                        ticket={ticket}
                                                        department={departmentData}
                                                        site={findSite(sitesData.data, ticket.data.site_id)}
                                                        invoiceRequest={findTicketInvoiceRequest(invoiceRequests, ticket.data.number, ticket.data.department_id)}
                                                    />
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <InnerContainer>
                                        <NoneFound
                                            text="No service tickets found"
                                            iconFont="confirmation_number"
                                            small
                                        />
                                    </InnerContainer>
                                }
                            </section>
                        </> : <ContractInformationSkeleton/>
                        }
                    </div>
                </div>
            </OuterContainer> 
        </>
    )
}

export default ContractReportPage