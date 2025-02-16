import { useEffect, useState } from "react";
import MarkdownDisplay from "../../../../components/form/MarkdownEditor/components/MarkdownDisplay";
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer";
import { ContactResponseData } from "../../../../types/contact.types";
import { CustomerResponseData } from "../../../../types/customers.types";
import { DepartmentResponseData } from "../../../../types/department.types";
import { QuoteResponseData } from "../../../../types/quote.types";
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types";
import { TicketResponseData } from "../../../../types/tickets.types";
import { UserResponseData } from "../../../../types/user.types";
import getAllCodeSnippets, { CodeSnippet } from "../../../../utils/getAllCodeSnippets";
import replaceCodeSnippetsWithValues from "../../../../utils/replaceCodeSnippetsWithValues";
import getCodeSnippetReplacedEquipmentQuoteText from "../utils/getCodeSnippetReplacedEquipmentQuoteText";
import { QuoteLineResponseData } from "../../../../types/quoteLine.types";
import filterQuotedEquipmentMaterials from "../utils/filterQuotedEquipmentMaterials";

const QuotePreview = (props: {
    quote: QuoteResponseData,
    customerData: CustomerResponseData | undefined,
    ticket: TicketResponseData | undefined,
    originator: UserResponseData,
    recipient: ContactResponseData | undefined,
    quoteLines: Array<QuoteLineResponseData>,
    quotedEquipment: Array<QuotedEquipmentResponseData>,
    departmentData: DepartmentResponseData,
}) => {
    const [codeSnippets, setCodeSnippets] = useState<Array<CodeSnippet>>([]);
    const [associatedSnippetData, setAssociatedSnippetData] = useState({
        now: Date(),
        quote: props.quote,
        customer: props.customerData,
        ticket: props.ticket,
        originator: props.originator,
        recipient: props.recipient,
        
    });

    useEffect(() => {
        setAssociatedSnippetData((prevState: any) => {
            return {
                ...prevState, 
                equipmentQuotes: props.quotedEquipment.map(quotedEquipment => {
                    return {
                        ...quotedEquipment,
                        data: {
                            ...quotedEquipment.data,
                            quote_text: getCodeSnippetReplacedEquipmentQuoteText(quotedEquipment, filterQuotedEquipmentMaterials(props.quoteLines, quotedEquipment.data.equipment_id))
                        }
                    }
                })            
            }
        });   
    }, [props.quotedEquipment, props.departmentData])
    
    useEffect(() => {
        setCodeSnippets(getAllCodeSnippets(props.quote.data.template, associatedSnippetData));
    }, [props.quote.data.template, associatedSnippetData]);

    return (
        <section>
            <h2>Quote Preview</h2>
            <InnerContainer>
                <MarkdownDisplay markdown={replaceCodeSnippetsWithValues(props.quote.data.template, codeSnippets)}/>
            </InnerContainer>
        </section>
    )
}

export default QuotePreview