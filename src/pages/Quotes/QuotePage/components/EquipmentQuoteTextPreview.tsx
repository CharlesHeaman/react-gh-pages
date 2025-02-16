import { useEffect, useState } from "react";
import MarkdownDisplay from "../../../../components/form/MarkdownEditor/components/MarkdownDisplay";
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer";
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types";
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types";
import { QuoteLineResponseData } from "../../../../types/quoteLine.types";
import getCodeSnippetReplacedEquipmentQuoteText from "../utils/getCodeSnippetReplacedEquipmentQuoteText";

const EquipmentQuoteTextPreview = (props: {
    quotedEquipment: QuotedEquipmentResponseData | QuotedSiteResponseData,
    quoteLines: Array<QuoteLineResponseData>,
}) => {

    const [codeSnippetReplacedText, setCodeSnippetReplacedText] = useState('');

    useEffect(() => {
        setCodeSnippetReplacedText(getCodeSnippetReplacedEquipmentQuoteText(props.quotedEquipment, props.quoteLines));
    }, [props.quotedEquipment, props.quoteLines])

    return (
        <section>
            <h2>Quote Text</h2>
            <InnerContainer>
                <MarkdownDisplay markdown={codeSnippetReplacedText}/>
            </InnerContainer>
        </section>
    )
}

export default EquipmentQuoteTextPreview