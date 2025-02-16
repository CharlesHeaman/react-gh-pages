import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import Skeleton from "../../components/ui/General/Skeleton/Skeleton";
import { ContactResponseData } from "../../types/contact.types";
import { CustomerResponseData } from "../../types/customers.types";
import { DepartmentResponseData } from "../../types/department.types";
import { EquipmentCollectionResponse, EquipmentResponseData } from "../../types/equipment.types";
import { QuoteCollectionResponse, QuoteResponseData } from "../../types/quote.types";
import { QuotedEquipmentCollectionResponse, QuotedEquipmentResponseData } from "../../types/quotedEquipment.types";
import { QuotedSiteCollectionResponse, QuotedSiteResponseData } from "../../types/quotedSites.types";
import { QuoteLineCollectionResponse, QuoteLineResponseData } from "../../types/quoteLine.types";
import { SiteCollectionResponse, SiteResponseData } from "../../types/sites.types";
import { TicketResponseData } from "../../types/tickets.types";
import { UserResponseData } from "../../types/user.types";
import findEquipment from "../../utils/findEquipment";
import findSite from "../../utils/findSite";
import getAPI from "../../utils/getAPI";
import putAPI from "../../utils/putAPI";
import QuotePageEquipmentNavigation from "../CustomerAdmin/components/QuotePageEquipmentNavigation";
import QuotePageSiteNavigation from "../CustomerAdmin/components/QuotePageSiteNavigation";
import QuoteInformationSkeleton from "./components/QuoteInformationSkeleton";
import QuoteSideBarSkeleton from "./components/QuoteSideBar/components/QuoteSideBarSkeleton";
import QuoteSideBar from "./components/QuoteSideBar/QuoteSideBar";
import QuoteStatusLabel from "./components/QuoteStatusLabel";
import QuoteTypeLabel from "./components/QuoteTypeLabel";
import QuotedEquipmentTab from "./QuotePage/components/QuotedEquipmentTab";
import QuotedSiteTab from "./QuotePage/components/QuotedSiteTab";
import QuoteInformation from "./QuotePage/components/QuoteInformation";
import getMaintenanceQuoteTotalValue from "./QuotePage/utils/getMaintenanceQuoteTotalValue";
import getServiceQuoteTotalValue from "./QuotePage/utils/getServiceQuoteTotalValue";
import getIsQuoteLocked from "./utils/getIsQuoteLocked";

const QuotePage = ()  => {
    const { quoteNumber, quoteSuffix } = useParams();
    const [searchParams] = useSearchParams();

    // Data States
    const [updatingValue, setUpdatingValue] = useState(false);
    const [isQuoteLoading, setIsQuoteLoading] = useState(true);
    const [quoteData, setQuoteData] = useState<QuoteResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isOriginatorLoading, setIsOriginatorLoading] = useState(false);
    const [originatorData, setOriginatorData] = useState<UserResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isRecipientLoading, setIsRecipientLoading] = useState(false);
    const [recipientData, setRecipientData] = useState<ContactResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(false);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isQuotedEquipmentLoading, setIsQuotedEquipmentLoading] = useState(false);
    const [quotedEquipmentData, setQuotedEquipmentData] = useState<Array<QuotedEquipmentResponseData>>([]);
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<Array<EquipmentResponseData>>([]);
    const [isQuotedSitesLoading, setIsQuotedSitesLoading] = useState(false);
    const [quotedSitesData, setQuotedSitesData] = useState<Array<QuotedSiteResponseData>>([]);
    const [isSitesLoading, setIsSitesLoading] = useState(false);
    const [sitesData, setSitesData] = useState<Array<SiteResponseData>>([]);
    const [isQuoteLinesLoading, setIsQuoteLinesLoading] = useState(true);
    const [quoteLines, setQuoteLines] = useState<Array<QuoteLineResponseData>>([]);

    useEffect(() => {
        getQuoteData();
    }, [quoteNumber, quoteSuffix]);

    useEffect(() => {
        quoteData && getCustomerData(quoteData.data.customer_id);
    }, [quoteData?.data.customer_id]);

    useEffect(() => {
        quoteData?.data.site_id && getSiteData(quoteData.data.site_id);
    }, [quoteData?.data.site_id]);

    // Update Quote Value 
    useEffect(() => {
        if (quoteData === undefined) return;
        if (quotedEquipmentData === undefined) return;
        if (quotedSitesData === undefined) return;
        if (quoteLines === undefined) return;
        if (getIsQuoteLocked(quoteData.data.status)) return;
        if (quoteData.data.is_project) return;

        const quoteValue = quoteData && !quoteData.data.is_maintenance ? 
            getServiceQuoteTotalValue(quotedEquipmentData, quoteLines) :
            getMaintenanceQuoteTotalValue(quotedSitesData, quoteLines);

        if (quoteValue !== quoteData.data.value) {
            putAPI(`quotes/${quoteData.id}/update_value`, {}, {
                value: quoteValue
            }, () => null, setUpdatingValue)
        }

        console.log("quoteValue", quoteValue);
        console.log("savedValue", quoteData?.data.value);
    }, [quoteData, quotedEquipmentData, quotedSitesData, quoteLines]);

    const getQuoteData = () => {
        getAPI(`quotes`, {
            number: quoteNumber,
            suffix: quoteSuffix ? quoteSuffix : 0
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            const currentQuote = quoteData.data[0];
            setQuoteData(currentQuote);
            currentQuote.data.ticket_id && currentQuote.data.ticket_type !== null && getTicketData(currentQuote.data.ticket_id, currentQuote.data.ticket_type);
            getQuoteLines(currentQuote.id);
            if (!currentQuote.data.is_maintenance) {
                getQuotedEquipment(currentQuote.id);
            } else {
                getQuotedSites(currentQuote.id);
            }
            getDepartment(currentQuote.data.department_id);
            getOriginator(currentQuote.data.created_by_id);
            currentQuote.data.recipient_id && getRecipient(currentQuote.data.recipient_id);
        }, setIsQuoteLoading);
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getOriginator = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setOriginatorData(userData);
        }, setIsOriginatorLoading);
    }

    const getCustomerData = (customerID: number) => {
        if (customerID === 0) return;
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getSiteData = (siteID: number) => {
        getAPI(`sites/${siteID}`, {}, (response: any) => {
            const siteData: SiteResponseData = response.data;
            setSiteData(siteData);
        }, setIsSiteLoading);
    }
    
    const getRecipient = (contactID: number) => {
        getAPI(`contacts/${contactID}`, {}, (response: any) => {
            const contactData: ContactResponseData = response.data;
            setRecipientData(contactData);
        }, setIsRecipientLoading);
    }
    
    const getTicketData = (ticketID: number, ticketType: number) => {
        getAPI(`tickets/${ticketType}/${ticketID}`, {}, (response: any) => {
            const ticketData: TicketResponseData = response.data;
            setTicketData(ticketData);
        }, setIsTicketLoading);
    }

    const getQuoteLines = (quoteID: number) => {
        getAPI('quote_lines', {
            quote_id: quoteID
        }, (response: any) => {
            const quotedEquipmentData: QuoteLineCollectionResponse = response.data;
            setQuoteLines(quotedEquipmentData.data);
        }, setIsQuoteLinesLoading);
    }

    const getQuotedEquipment = (quoteID: number) => {
        getAPI('quoted_equipment', {
            quote_id: quoteID
        }, (response: any) => {
            const quotedEquipmentData: QuotedEquipmentCollectionResponse = response.data;
            setQuotedEquipmentData(quotedEquipmentData.data);
            if (quotedEquipmentData.data.length > 0) {
                getEquipment([...new Set(quotedEquipmentData.data.map(quotedEquipment => quotedEquipment.data.equipment_id))])
            } else {
                setIsEquipmentLoading(false)
            }
        }, setIsQuotedEquipmentLoading);
    }

    const getQuotedSites = (quoteID: number) => {
        getAPI('quoted_sites', {
            quote_id: quoteID
        }, (response: any) => {
            const quotedSiteData: QuotedSiteCollectionResponse = response.data;
            setQuotedSitesData(quotedSiteData.data);
            if (quotedSiteData.data.length > 0) {
                getSites([...new Set(quotedSiteData.data.map(quotedSite => quotedSite.data.site_id))])
            } else {
                setIsSiteLoading(false)
            }
        }, setIsQuotedSitesLoading);
    }

    const getEquipment = (equipmentIDs: Array<number | null>) => {
        getAPI(`equipment`, {
            ids: equipmentIDs,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData.data);
        }, setIsEquipmentLoading)    
    } 

    const getSites = (siteIDs: Array<number | null>) => {
        getAPI(`sites`, {
            ids: siteIDs,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSitesData(siteData.data);
        }, setIsSitesLoading)    
    } 

    const isLoading = (
        isQuoteLoading || 
        isCustomerLoading ||
        isSiteLoading || 
        isTicketLoading || 
        isQuotedEquipmentLoading || 
        isEquipmentLoading || 
        isRecipientLoading ||
        isDepartmentLoading || 
        isQuoteLinesLoading || 
        isOriginatorLoading
    )

    const isHeaderLoading = (
        isQuoteLoading
    )

    const currentEquipment = searchParams.get('quoted_equipment_id');
    const currentQuoteEquipment = quotedEquipmentData.find(quotedEquipment => quotedEquipment.id === parseInt(currentEquipment ? currentEquipment : '-1'));

    const currentSite = searchParams.get('quoted_site_id');
    const currentQuoteSite = quotedSitesData.find(quotedSite => quotedSite.id === parseInt(currentSite ? currentSite : '-1'));

    
    return (
        <>
            <OuterContainer
                title='Quote'
                id={`${quoteNumber}${parseInt(quoteSuffix as string) > 0 ? `/${quoteSuffix}` : ''}`}
                headerContent={
                    !isHeaderLoading && quoteData ?
                        <div className="flex">
                            <QuoteTypeLabel 
                                isReactive={quoteData.data.is_reactive}
                                isProject={quoteData.data.is_project}
                                isMaintenance={quoteData.data.is_maintenance}
                            />
                            <QuoteStatusLabel status={quoteData.data.status}/> 
                        </div>
                        :
                        <div className="flex">
                            <Skeleton type='label'/>
                            <Skeleton type='label'/>
                        </div>
                }
                tabs={!quoteData?.data.is_project ? 
                    !quoteData?.data.is_maintenance ? 
                        <QuotePageEquipmentNavigation 
                            quotedEquipment={quotedEquipmentData}
                            equipment={equipmentData}
                            isLoading={isQuoteLoading || isEquipmentLoading || isQuotedEquipmentLoading}
                        /> : 
                        <QuotePageSiteNavigation
                            quotedSites={quotedSitesData}
                            sites={sitesData}
                            isLoading={isQuoteLoading || isSitesLoading || isQuotedSitesLoading}
                        />
                    : undefined
                }
                maxWidth={currentEquipment === null && currentSite === null ? 1200 : 1000}
                noBorder={!quoteData?.data.is_project}
                bigID
            >
                <div className="page-grid">
                    {currentEquipment === null && currentSite === null ? <>
                        <div className="page-main">
                            {!isLoading && quoteData && departmentData && originatorData ? 
                                <QuoteInformation
                                    quote={quoteData}
                                    departmentData={departmentData}
                                    customerData={customerData}
                                    siteData={siteData?.data}
                                    ticket={ticketData}
                                    quoteLines={quoteLines}
                                    quotedEquipment={quotedEquipmentData}
                                    equipment={equipmentData}
                                    quotedSites={quotedSitesData}
                                    sites={sitesData}
                                    originator={originatorData}
                                    recipient={recipientData}
                                /> :
                                <QuoteInformationSkeleton/>
                            }
                        </div>
                        <div className="page-side">
                            <QuoteSideBar
                                quote={quoteData}
                                siteID={siteData?.id}
                                getQuotedEquipment={getQuotedEquipment}
                                getQuotedSites={getQuotedSites}
                                setQuoteData={setQuoteData}
                            />
                        </div>
                    </> : 
                    !quoteData?.data.is_maintenance ?
                        quoteData && currentQuoteEquipment && departmentData ? <QuotedEquipmentTab
                            quotedEquipment={currentQuoteEquipment}
                            equipment={findEquipment(equipmentData, currentQuoteEquipment.data.equipment_id ? currentQuoteEquipment.data.equipment_id : 0)}
                            site={siteData}
                            quoteLines={quoteLines}
                            departmentData={departmentData}
                            getQuotedEquipment={() => getQuotedEquipment(quoteData.id)}
                            getQuoteLines={() => getQuoteLines(quoteData.id)}
                            isLocked={quoteData.data.status !== 2}
                        /> :
                        <>
                            <div className="page-main">
                                <QuoteInformationSkeleton/>
                            </div>
                            <div className="page-side">
                                <QuoteSideBarSkeleton/>
                            </div>
                        </> 
                        :
                        quoteData && currentQuoteSite && departmentData ? <QuotedSiteTab
                                quotedSite={currentQuoteSite}
                                site={findSite(sitesData, currentQuoteSite.data.site_id ? currentQuoteSite.data.site_id : 0)}
                                departmentData={departmentData}
                                quoteLines={quoteLines} 
                                getQuotedSites={() => getQuotedSites(quoteData.id)} 
                                getQuoteLines={() => getQuoteLines(quoteData.id)}
                                isLocked={quoteData.data.status !== 2}
                            /> 
                            : 
                        <>
                            <div className="page-main">
                                <QuoteInformationSkeleton/>
                            </div>
                            <div className="page-side">
                                <QuoteSideBarSkeleton/>
                            </div>
                        </> 
                    }
                </div>
            </OuterContainer>
        </>
    )
}

export default QuotePage