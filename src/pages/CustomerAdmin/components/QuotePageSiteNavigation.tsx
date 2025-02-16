import { useSearchParams } from "react-router-dom";
import findSite from "../../../utils/findSite";
import styles from "./CustomerAdminNavigation.module.css";
import { QuotedSiteResponseData } from "../../../types/quotedSites.types";
import { SiteResponseData } from "../../../types/sites.types";
import QuotePageSiteNavigationLink from "./QuotePageSiteNavigationLink";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";

const QuotePageSiteNavigation = (props: {
    quotedSites: Array<QuotedSiteResponseData>,
    sites: Array<SiteResponseData>,
    isLoading: boolean,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentSite = searchParams.get('quoted_site_id');

    const updateLocation = (quotedSiteID: number | null) => {
        if (quotedSiteID) {
            searchParams.set('quoted_site_id', quotedSiteID.toString());
        } else {
            searchParams.delete('quoted_site_id');
        }
        setSearchParams(searchParams);
    } 

    return (
        <div className={styles['navigation']}>
            <nav>
                <ul>
                    {!props.isLoading ? <>
                        <li>
                            <a 
                                href="#" 
                                className={currentSite === null ? styles['focus'] : ''}
                                onClick={(event) => {
                                    event.preventDefault()
                                    updateLocation(null)
                                }}
                                >
                                <span className="material-icons">request_quote</span>
                                Home Page
                            </a>
                        </li>
                        {props.quotedSites.map((quotedSite, index) =>
                            <QuotePageSiteNavigationLink
                                quotedSite={quotedSite}
                                currentSite={currentSite}
                                site={quotedSite.data.site_id ? findSite(props.sites, quotedSite.data.site_id) : undefined}
                                updateLocation={updateLocation}
                                key={index}
                            />
                        )}
                    </> :
                    [...Array(3)].map((_, index) => 
                        <li key={index}>
                            <Skeleton type="navigation-tab"/>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default QuotePageSiteNavigation