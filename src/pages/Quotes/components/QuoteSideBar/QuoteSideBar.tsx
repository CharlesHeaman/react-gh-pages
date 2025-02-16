import { Dispatch, SetStateAction } from "react"
import { QuoteResponseData } from "../../../../types/quote.types"
import QuoteQuotedEquipment from "./components/QuoteQuotedEquipment"
import QuoteQuotedSites from "./components/QuoteQuotedSites"
import QuoteSideBarSkeleton from "./components/QuoteSideBarSkeleton"
import QuoteTemplates from "./components/QuoteTemplates"
import QuoteActions from "./QuoteActions"
import QuoteUploads from "./QuoteUploads"
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"

const QuoteSideBar = (props: {
    quote: QuoteResponseData | undefined,
    siteID: number | undefined,
    getQuotedEquipment: (quoteID: number) => void,
    getQuotedSites: (quoteID: number) => void,
    setQuoteData: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
}) => {
    return (
        props.quote ? <>
            <PermsProtectedComponent requiredPerms={{ quotes: 2 }}>
                <QuoteActions
                    quote={props.quote}
                    setQuoteData={props.setQuoteData}
                />
                {props.quote.data.status === 2 && <>
                    {props.siteID && !props.quote.data.is_maintenance ? <QuoteQuotedEquipment
                        quoteID={props.quote.id}
                        siteID={props.siteID}
                        getQuotedEquipment={props.getQuotedEquipment}
                    /> : null}
                    {props.quote.data.is_maintenance ? <QuoteQuotedSites
                        quoteID={props.quote.id}
                        customerID={props.quote.data.customer_id}
                        getQuotedSites={props.getQuotedSites}
                    /> : null}
                    {!props.quote.data.is_project ? <QuoteTemplates
                        quoteID={props.quote.id}
                        setQuoteData={props.setQuoteData}
                        template={props.quote.data.template}
                    /> : null}
                </>}
            </PermsProtectedComponent>

            <ExportResource
                resourceData={props.quote}
                resourceName="Quote"
            />
        </> : 
        // Skeleton
        <QuoteSideBarSkeleton/>
    )
}

export default QuoteSideBar