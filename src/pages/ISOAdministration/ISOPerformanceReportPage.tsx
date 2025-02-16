import { useState, useEffect } from "react";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../components/ui/Structure/Header/Header";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";
import { QuoteCollectionResponse, QuoteResponseData } from "../../types/quote.types";
import { TicketCollectionResponse, TicketResponseData } from "../../types/tickets.types";
import { ContractCollectionResponse, ContractResponseData } from "../../types/contract.types";
import getAPI from "../../utils/getAPI";
import getYearRelativeDate from "../../utils/getYearRelativeDate";
import parseQueryParameters from "../../utils/parseQueryParameters";
import CalloutPerformanceRow from "./components/CalloutPerformanceRow";
import CalloutPerformanceRowYear from "./components/CalloutPerformanceRowYear";
import QuoteConversionsRow from "./components/QuoteConversionsRow";
import QuoteConversionsRowYear from "./components/QuoteConversionsRowYear";
import ContractValueRow from "./components/ContractValueRow"
import filterDepartmentQuotes from "./utils/filterDepartmentQuotes";
import filterDepartmentTickets from "./utils/filterDepartmentTickets";
import filterInvoiceTypeTickets from "./utils/filterInvoiceTypeTickets";
import filterYearSentQuotes from "./utils/filterYearSentQuotes";
import filterYearVisitTickets from "./utils/filterYearVisitTickets";
import filterDepartmentContracts  from "./utils/filterDepartmentContracts";
import WarrantyTicketRow from "./components/WarrantyTicketRow"
import ContractValueRowYear from "./components/ContractValueRowYear"
import filterYearStartContracts from "./utils/filterYearStartContracts"

const ISOPerformanceReport = () => {

    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(true);
    const [departmentsData, setDepartmentsData] = useState<Array<DepartmentResponseData>>([]);
    const [isQuotesLoading, setIsQuotesLoading] = useState(true);
    const [quotesData, setQuotesData] = useState<Array<QuoteResponseData>>([]);
    const [isCalloutTicketsLoading, setIsCalloutTicketsLoading] = useState(true);
    const [calloutTicketData, setCalloutTicketData] = useState<Array<TicketResponseData>>([]);
    const [isWarrantyTicketsLoading, setIsWarrantyTicketsLoading] = useState(true);
    const [warrantyITicketData, setWarrantyITicketData] = useState<Array<TicketResponseData>>([]);
    const [warrantySTicketData, setWarrantySTicketData] = useState<Array<TicketResponseData>>([]);
    const [isContractsLoading, setIsContractsLoading] = useState(true);
    const [contractData, setContractData] = useState<Array<ContractResponseData>>([]);

    const startDate = new Date(getYearRelativeDate(new Date(), -3).getFullYear(), 0, 1);
    const endDate = new Date(getYearRelativeDate(new Date(), -1).getFullYear(), 11, 31, 23, 59, 59, 999);

    useEffect(() => {
        getDepartments();
        setQuotesData([]);
        getQuotes();
        getCalloutTickets();
        getWarrantyTickets();
        getContracts();
    }, []);

    const getDepartments = () => {
        getAPI('departments', {
            is_active: true,
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentsData(departmentData.data);
        }, setIsDepartmentsLoading);
    }

    const getQuotes = (offset?: number) => {
        getAPI('quotes', {
            sent_after: startDate,
            sent_before: endDate,
            offset: offset ? offset : 0
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setQuotesData((prevState: any) => prevState.concat(quoteData.data))
            quoteData.pages.next_url && getQuotes(parseQueryParameters(quoteData.pages.next_url).offset);
        }, setIsQuotesLoading);
    }

    const getCalloutTickets = () => {
        getAPI('tickets', {
            visit_after: startDate,
            visit_before: endDate,
            suffixes: [0, 1],
            ticket_type: 0,
            perPage: 100000
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setCalloutTicketData(ticketData.data)
        }, setIsQuotesLoading);
    }

    const getWarrantyTickets = () => {
        getAPI('tickets', {
            visit_after: startDate,
            visit_before: endDate,
            suffixes: [0],
            invoice_types: [5, 6],
            perPage: 100000
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setWarrantyITicketData(filterInvoiceTypeTickets(ticketData.data, 5))
            setWarrantySTicketData(filterInvoiceTypeTickets(ticketData.data, 6))
        }, setIsWarrantyTicketsLoading);
    }

    const getContracts = () => {
        getAPI('contracts', {
            start_after: startDate,
            start_before: endDate,
        }, (response: any) => {
            const contractData: ContractCollectionResponse = response.data;
            setContractData(contractData.data)
        }, setIsContractsLoading);
    }

    return (
        <>
            <Header
                links={[
                    {
                        to: 'iso',
                        text: 'ISO Administration'
                    },
                    {
                        to: 'performance',
                        text: 'Performance Report'
                    }
                ]}
            />
            <OuterContainer
                title='ISO Performance Report'
                maxWidth={800}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <section>
                            <h2>Quote Conversions</h2>
                            <p style={{ 
                                color: 'var(--light-grey-text-color)',
                                marginBottom: 'var(--normal-gap)'
                            }}>Percentage of sent quotes that have been accepted.</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Department</th>
                                        <th>{getYearRelativeDate(new Date(), -3).getFullYear()}</th>
                                        <th>{getYearRelativeDate(new Date(), -2).getFullYear()}</th>
                                        <th>{getYearRelativeDate(new Date(), -1).getFullYear()}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departmentsData.map((department, index) => 
                                        <QuoteConversionsRow
                                            department={department}
                                            quotes={filterDepartmentQuotes(quotesData, department.id)}
                                            key={index}
                                        />
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <th>
                                            <QuoteConversionsRowYear
                                                quotes={filterYearSentQuotes(quotesData, getYearRelativeDate(new Date(), -3).getFullYear())}
                                            />
                                        </th>
                                        <th>
                                            <QuoteConversionsRowYear
                                                quotes={filterYearSentQuotes(quotesData, getYearRelativeDate(new Date(), -2).getFullYear())}
                                            />
                                        </th>
                                        <th>
                                            <QuoteConversionsRowYear
                                                quotes={filterYearSentQuotes(quotesData, getYearRelativeDate(new Date(), -1).getFullYear())}
                                            />
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </section>
                        <hr/>
                        <section>
                            <h2>Callout Performance</h2>
                            <p style={{ 
                                color: 'var(--light-grey-text-color)',
                                marginBottom: 'var(--normal-gap)'
                            }}>Percentage of callout jobs that were completed on the first visit.</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Department</th>
                                        <th>{getYearRelativeDate(new Date(), -3).getFullYear()}</th>
                                        <th>{getYearRelativeDate(new Date(), -2).getFullYear()}</th>
                                        <th>{getYearRelativeDate(new Date(), -1).getFullYear()}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departmentsData.map((department, index) => 
                                        <CalloutPerformanceRow
                                            department={department}
                                            tickets={filterDepartmentTickets(calloutTicketData, department.id)}
                                            key={index}
                                        />
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <th>
                                            <CalloutPerformanceRowYear
                                                tickets={filterYearVisitTickets(calloutTicketData, getYearRelativeDate(new Date(), -3).getFullYear())}
                                            />
                                        </th>
                                        <th>
                                            <CalloutPerformanceRowYear
                                                tickets={filterYearVisitTickets(calloutTicketData, getYearRelativeDate(new Date(), -2).getFullYear())}
                                            />
                                        </th>
                                        <th>
                                            <CalloutPerformanceRowYear
                                                tickets={filterYearVisitTickets(calloutTicketData, getYearRelativeDate(new Date(), -1).getFullYear())}
                                            />
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </section>
                        <hr/>
                        <section>
                            <h2>Warranty Tickets</h2>
                            <p style={{ 
                                color: 'var(--light-grey-text-color)',
                                marginBottom: 'var(--normal-gap)'
                            }}>Number of warranty tickets raised.</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th colSpan={2}>{getYearRelativeDate(new Date(), -3).getFullYear()}</th>
                                        <th colSpan={2}>{getYearRelativeDate(new Date(), -2).getFullYear()}</th>
                                        <th colSpan={2}>{getYearRelativeDate(new Date(), -1).getFullYear()}</th>
                                    </tr>
                                    <tr>
                                        <th>Department</th>
                                        <th>Warranty I</th>
                                        <th>Warranty S</th>
                                        <th>Warranty I</th>
                                        <th>Warranty S</th>
                                        <th>Warranty I</th>
                                        <th>Warranty S</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departmentsData.map((department, index) => 
                                        <WarrantyTicketRow
                                            department={department}
                                            warrantyITickets={filterDepartmentTickets(warrantyITicketData, department.id)}
                                            warrantySTickets={filterDepartmentTickets(warrantySTicketData, department.id)}
                                            key={index}
                                        />
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <th>{filterYearVisitTickets(warrantyITicketData, getYearRelativeDate(new Date(), -3).getFullYear()).length}</th>
                                        <th>{filterYearVisitTickets(warrantySTicketData, getYearRelativeDate(new Date(), -3).getFullYear()).length}</th>
                                        <th>{filterYearVisitTickets(warrantyITicketData, getYearRelativeDate(new Date(), -2).getFullYear()).length}</th>
                                        <th>{filterYearVisitTickets(warrantySTicketData, getYearRelativeDate(new Date(), -2).getFullYear()).length}</th>
                                        <th>{filterYearVisitTickets(warrantyITicketData, getYearRelativeDate(new Date(), -1).getFullYear()).length}</th>
                                        <th>{filterYearVisitTickets(warrantySTicketData, getYearRelativeDate(new Date(), -1).getFullYear()).length}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </section>
                        <hr/>
                        <section>
                            <h2>Contract Value</h2>
                            <p style={{ 
                                color: 'var(--light-grey-text-color)',
                                marginBottom: 'var(--normal-gap)'
                            }}>Total value of all contracts by start date.</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Department</th>
                                        <th>{getYearRelativeDate(new Date(), -3).getFullYear()}</th>
                                        <th>{getYearRelativeDate(new Date(), -2).getFullYear()}</th>
                                        <th>{getYearRelativeDate(new Date(), -1).getFullYear()}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departmentsData.map((department, index) => 
                                        <ContractValueRow
                                            department={department}
                                            contracts={filterDepartmentContracts(contractData, department.id)}
                                            key={index}
                                        />
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <th>
                                            <ContractValueRowYear
                                                contracts={filterYearStartContracts(contractData, getYearRelativeDate(new Date(), -3).getFullYear())}
                                            />
                                        </th>
                                        <th>
                                            <ContractValueRowYear
                                                contracts={filterYearStartContracts(contractData, getYearRelativeDate(new Date(), -2).getFullYear())}
                                            />
                                        </th>
                                        <th>
                                            <ContractValueRowYear
                                                contracts={filterYearStartContracts(contractData, getYearRelativeDate(new Date(), -1).getFullYear())}
                                            />
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </section>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default ISOPerformanceReport