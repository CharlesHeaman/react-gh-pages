import { QuotedSiteResponseData } from "../../../types/quotedSites.types";
import { SiteResponseData } from "../../../types/sites.types";
import QuotedEquipmentStatusLabel from "../../Quotes/components/QuotedEquipmentStatusLabel";
import styles from "./CustomerAdminNavigation.module.css";

const QuotePageSiteNavigationLink = (props: {
    quotedSite: QuotedSiteResponseData,
    currentSite: string | null,
    site: SiteResponseData | undefined,
    updateLocation: (quotedSiteID: number | null) => void
}) => {
    return (
        <li>
            <a
                href="#" 
                className={parseInt(props.currentSite ? props.currentSite : '-1') === props.quotedSite.id ? styles['focus'] : ''}
                onClick={(event) => {
                    event.preventDefault()
                    props.updateLocation(props.quotedSite.id)
                }}
            >
                <QuotedEquipmentStatusLabel 
                    status={props.quotedSite.data.status}
                    noBackground
                    hideText
                />
                {props.site ? props.site.data.code : 'Unknown'}
            </a>
        </li>
    )
}

export default QuotePageSiteNavigationLink