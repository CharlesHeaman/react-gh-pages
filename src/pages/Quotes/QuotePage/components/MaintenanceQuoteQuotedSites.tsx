import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import { SiteResponseData } from "../../../../types/sites.types"
import findSite from "../../../../utils/findSite"
import QuotedSiteRow from "./QuotedSiteRow"

const MaintenanceQuoteQuotedSites = (props: {
    quotedSites: Array<QuotedSiteResponseData>,
    sites: Array<SiteResponseData>,
    quoteLines: Array<QuoteLineResponseData>
}) => {
    return (
        <>
            <section>
                <h2>Quoted Sites</h2>
                {props.quotedSites.length > 0 ?
                    <div className="table-wrapper">
                        <table className="selectTable">
                            <thead>
                                <th>Site</th>
                                <th>Location</th>
                                <th>Description</th>
                                <th>Quote</th>
                                <th>Labour</th>
                                <th>Status</th>
                            </thead>
                            <tbody>
                                {props.quotedSites.map((quotedSite, index) => 
                                    <QuotedSiteRow
                                        quotedSite={quotedSite}
                                        site={findSite(props.sites, quotedSite.data.site_id ? quotedSite.data.site_id : 0)}
                                        quoteLines={props.quoteLines}
                                        key={index}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div> :
                    <InnerContainer>
                        <NoneFound 
                            iconFont={"business"} 
                            text={"No Quoted Sites Found"}
                            small
                        />
                    </InnerContainer>
                }            
            </section>
        </>
    )
}

export default MaintenanceQuoteQuotedSites