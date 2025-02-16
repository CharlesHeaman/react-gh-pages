import { useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types";
import EditQuotedSiteQuoteText from "./EditQuotedSiteQuoteText";

const QuotedSiteQuoteText = (props: {
    quotedSite: QuotedSiteResponseData,
    getQuotedSites: () => void,
}) => {
    const [showText, setShowText] = useState(false);

    return (
        <>
            <SideBarModule title='Quote Text'>
                <SideBarButton
                    text='Edit Quote Text'
                    iconFont="description"
                    color="orange"
                    clickEvent={() => setShowText(true)}
                />
            </SideBarModule>

            <EditQuotedSiteQuoteText
                quotedSiteID={props.quotedSite.id}
                quoteText={props.quotedSite.data.quote_text}
                getQuotedSites={props.getQuotedSites}
                show={showText}
                hideFunc={() => setShowText(false)}
            />
        </>
    )
}

export default QuotedSiteQuoteText