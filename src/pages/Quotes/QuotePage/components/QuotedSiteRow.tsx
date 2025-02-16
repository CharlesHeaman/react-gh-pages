import { useSearchParams } from "react-router-dom"
import SiteLink from "../../../../components/ui/Links/SiteLink"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import { SiteResponseData } from "../../../../types/sites.types"
import formatHours from "../../../../utils/formatHours"
import formatMoney from "../../../../utils/formatMoney"
import QuotedEquipmentStatusLabel from "../../components/QuotedEquipmentStatusLabel"
import getQuotedEquipmentTotalHours from "../utils/getQuotedEquipmentTotalHours"
import filterQuotedSiteMaterials from "../utils/filterQuotedSiteMaterials"
import getQuotedEquipmentTotalValue from "./getQuotedEquipmentTotalValue"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"

const QuotedSiteRow = (props: {
    quotedSite: QuotedSiteResponseData,
    site: SiteResponseData | undefined,
    quoteLines: Array<QuoteLineResponseData>,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateLocation = (quotedSiteID: number | null) => {
        if (quotedSiteID) {
            searchParams.set('quoted_site_id', quotedSiteID.toString());
        } else {
            searchParams.delete('quoted_site_id');
        }
        setSearchParams(searchParams);
    } 

    const filteredMaterialLines = filterQuotedSiteMaterials(props.quoteLines, props.site ? props.site.id : null);
    
    return (
        <tr
            onClick={(event) => {
                event.preventDefault()
                updateLocation(props.quotedSite.id)
            }}
        >            
            <td className="text-left">{props.site ? <SiteLink code={props.site.data.code}/> : 'Unknown'}</td>
            <td className="text-left">{props.site ? props.site.data.location : 'Unknown'}</td>
            <td className="text-left">{props.site ? props.site.data.description : 'Unknown'}</td>
            <td>{formatMoney(getQuotedEquipmentTotalValue(props.quotedSite, filteredMaterialLines))}</td>
            <td>{formatHours(getQuotedEquipmentTotalHours(props.quotedSite.data.labour))} hrs</td>
            <td><QuotedEquipmentStatusLabel 
                status={props.quotedSite.data.status}
                hideText
            /></td>
        </tr>
    )
}

export default QuotedSiteRow