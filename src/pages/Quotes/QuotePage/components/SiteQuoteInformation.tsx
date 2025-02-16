import { DepartmentResponseData } from "../../../../types/department.types"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import { SiteResponseData } from "../../../../types/sites.types"
import filterQuotedSiteMaterials from "../utils/filterQuotedSiteMaterials"
import EquipmentQuoteLabour from "./EquipmentQuoteLabour"
import EquipmentQuoteMaterials from "./EquipmentQuoteMaterials"
import EquipmentQuoteNumberOfVisits from "./EquipmentQuoteNumberOfVisits"
import EquipmentQuoteTextPreview from "./EquipmentQuoteTextPreview"
import EquipmentQuoteTotalBreakdown from "./EquipmentQuoteTotalBreakdown"
import EquipmentQuoteTravelAndMileage from "./EquipmentQuoteTravelAndMileage"
import QuotedSiteSiteDetails from "./QuotedSiteSiteDetails"
import QuotedEquipmentStatusDisplay from "./QuoteEquipmentStatusDisplay"
import SiteQuoteEquipment from "./SiteQuoteEquipment"

const SiteQuoteInformation = (props: {
    quotedSite: QuotedSiteResponseData,
    site: SiteResponseData | undefined,
    materialLines: Array<QuoteLineResponseData>,
    equipmentLines: Array<QuoteLineResponseData>,
    departmentData: DepartmentResponseData
}) => {
    return (
        <>
            <QuotedEquipmentStatusDisplay status={props.quotedSite.data.status} isSite/>
            <EquipmentQuoteTotalBreakdown
                equipmentQuoteDetails={props.quotedSite}
                quoteLines={props.materialLines}
                isSite
            />
            <hr/>
            {props.site ? <>
                <QuotedSiteSiteDetails site={props.site}/>
                <hr/>
            </> : null}
            <EquipmentQuoteTextPreview
                quotedEquipment={props.quotedSite}
                quoteLines={props.materialLines}
            />
            <hr/>
            <EquipmentQuoteMaterials
                quoteLines={props.materialLines}
            />
            <hr/>
            <SiteQuoteEquipment
                quoteLines={props.equipmentLines}
            />
            <hr/>
            <EquipmentQuoteLabour
                equipmentQuoteDetails={props.quotedSite}
            />
            <hr/>
            <EquipmentQuoteNumberOfVisits
                equipmentQuoteDetails={props.quotedSite}
                dayMaxHours={props.departmentData.data.day_max_hours}            
            />
            <hr/>
            <EquipmentQuoteTravelAndMileage
                equipmentQuoteDetails={props.quotedSite}
            />
        </>
    )
}

export default SiteQuoteInformation