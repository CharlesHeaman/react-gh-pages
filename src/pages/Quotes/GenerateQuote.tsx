import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MarkdownDisplay from "../../components/form/MarkdownEditor/components/MarkdownDisplay";
import { ContactResponseData } from "../../types/contact.types";
import { CustomerResponseData } from "../../types/customers.types";
import { DepartmentResponseData } from "../../types/department.types";
import { QuoteCollectionResponse, QuoteResponseData } from "../../types/quote.types";
import { QuotedEquipmentCollectionResponse, QuotedEquipmentResponseData } from "../../types/quotedEquipment.types";
import { TicketResponseData } from "../../types/tickets.types";
import { UserResponseData } from "../../types/user.types";
import getAllCodeSnippets, { CodeSnippet } from "../../utils/getAllCodeSnippets";
import getAPI from "../../utils/getAPI";
import replaceCodeSnippetsWithValues from "../../utils/replaceCodeSnippetsWithValues";
import getCodeSnippetReplacedEquipmentQuoteText from "./QuotePage/utils/getCodeSnippetReplacedEquipmentQuoteText";
import filterQuotedEquipmentMaterials from "./QuotePage/utils/filterQuotedEquipmentMaterials";
import { QuoteLineCollectionResponse, QuoteLineResponseData } from "../../types/quoteLine.types";

const GenerateQuote = ()  => {
    const { quoteNumber } = useParams();
    const [searchParams] = useSearchParams();

    // Data States
    const [isQuoteLoading, setIsQuoteLoading] = useState(true);
    const [quoteData, setQuoteData] = useState<QuoteResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isOriginatorLoading, setIsOriginatorLoading] = useState(false);
    const [originatorData, setOriginatorData] = useState<UserResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isRecipientLoading, setIsRecipientLoading] = useState(false);
    const [recipientData, setRecipientData] = useState<ContactResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(false);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isQuotedEquipmentLoading, setIsQuotedEquipmentLoading] = useState(false);
    const [quotedEquipmentData, setQuotedEquipmentData] = useState<Array<QuotedEquipmentResponseData>>([]);
    const [isQuoteLinesLoading, setIsQuoteLinesLoading] = useState(true);
    const [quoteLines, setQuoteLines] = useState<Array<QuoteLineResponseData>>([]);

    const [codeSnippets, setCodeSnippets] = useState<Array<CodeSnippet>>([]);
    const [associatedSnippetData, setAssociatedSnippetData] = useState({
        now: Date(),
    });

    useEffect(() => {
        getQuoteData();
    }, [quoteNumber]);

    useEffect(() => {
        quoteData && getCustomerData(quoteData.data.customer_id);
    }, [quoteData?.data.customer_id]);

    useEffect(() => {
        setAssociatedSnippetData((prevState: any) => {
            return {
                ...prevState, 
                quote: quoteData,
                customer: customerData,
                ticket: ticketData,
                originator: originatorData,
                recipient: recipientData,
            }
        });
    }, [quoteData, customerData, ticketData, originatorData, recipientData])

    useEffect(() => {
        if (departmentData === undefined) return;
        setAssociatedSnippetData((prevState: any) => {
            return {
                ...prevState, 
                equipmentQuotes: quotedEquipmentData.map(quotedEquipment => {
                    return {
                        ...quotedEquipment,
                        data: {
                            ...quotedEquipment.data,
                            quote_text: getCodeSnippetReplacedEquipmentQuoteText(quotedEquipment, filterQuotedEquipmentMaterials(quoteLines, quotedEquipment.data.equipment_id))
                        }
                    }
                })            
            }
        })    
    }, [quotedEquipmentData, departmentData])
    
    useEffect(() => {
        if (quoteData === undefined) return;
        setCodeSnippets(getAllCodeSnippets(quoteData.data.template, associatedSnippetData));
    }, [quoteData, associatedSnippetData]);

    const getQuoteData = () => {
        getAPI(`quotes`, {
            number: quoteNumber
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            const currentQuote = quoteData.data[0];
            setQuoteData(currentQuote);
            currentQuote.data.ticket_id && currentQuote.data.ticket_type && getTicketData(currentQuote.data.ticket_id, currentQuote.data.ticket_type);
            if (!currentQuote.data.is_maintenance) {
                getQuotedEquipment(currentQuote.id);
            } 
            getDepartment(currentQuote.data.department_id);
            getOriginator(currentQuote.data.created_by_id);
            getRecipient(currentQuote.data.recipient_id);
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

    const getQuotedEquipment = (quoteID: number) => {
        getAPI('quoted_equipment', {
            quote_id: quoteID
        }, (response: any) => {
            const quotedEquipmentData: QuotedEquipmentCollectionResponse = response.data;
            setQuotedEquipmentData(quotedEquipmentData.data);
        }, setIsQuotedEquipmentLoading);
    }

    const getQuoteLines = (quoteID: number) => {
        getAPI('quote_lines', {
            quote_id: quoteID
        }, (response: any) => {
            const quotedEquipmentData: QuoteLineCollectionResponse = response.data;
            setQuoteLines(quotedEquipmentData.data);
        }, setIsQuoteLinesLoading);
    }

    const isLoading = (
        isQuoteLoading || 
        isCustomerLoading ||
        isTicketLoading || 
        isQuotedEquipmentLoading || 
        isRecipientLoading ||
        isDepartmentLoading || 
        isOriginatorLoading
    )
    
    return (
        !isLoading && quoteData ? <MarkdownDisplay 
            markdown={replaceCodeSnippetsWithValues(quoteData.data.template, codeSnippets)}
            isPrint
        /> : null
    )
}

export default GenerateQuote