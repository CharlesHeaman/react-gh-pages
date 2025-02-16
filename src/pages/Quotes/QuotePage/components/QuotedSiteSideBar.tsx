import { Dispatch, SetStateAction } from "react"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import { SiteResponseData } from "../../../../types/sites.types"
import QuotedEquipmentLabourTravel from "./QuotedEquipmentLabourTravel"
import QuotedEquipmentMaterials from "./QuotedEquipmentMaterials"
import QuotedSiteActions from "./QuotedSiteActions"
import QuotedSiteMaps from "./QuotedSiteMap"
import QuotedSiteQuoteText from "./QuotedSiteQuoteText"
import RemoveQuotedSite from "./RemoveQuotedSite"
import QuotedSiteAssociatedEquipment from "./QuotedSiteAssociatedEquipment"
import { EditQuoteLineData } from "./EditEquipmentQuoteMaterials"

const QuotedSiteSideBar = (props: {
    quotedSite: QuotedSiteResponseData,
    site: SiteResponseData | undefined,
    isEditLabourMode: boolean,
    setIsEditLabourMode: Dispatch<SetStateAction<boolean>>,
    isEditMaterialsMode: boolean,
    setIsEditMaterialsMode: Dispatch<SetStateAction<boolean>>,
    setDistance: Dispatch<SetStateAction<google.maps.DistanceMatrixResponse | null | undefined>>;
    setAutoAddedQuoteLines: Dispatch<SetStateAction<Array<EditQuoteLineData>>>,
    getQuotedSites: () => void,
    isLocked: boolean,
}) => {
    return (
        <>
            {!props.isEditLabourMode && !props.isEditMaterialsMode ? <>
                {!props.isLocked && <>
                    <QuotedSiteActions
                        quotedSiteID={props.quotedSite.id}
                        quotedSiteStatus={props.quotedSite.data.status}
                        getQuotedSites={props.getQuotedSites}
                    />
                    <QuotedSiteQuoteText
                        quotedSite={props.quotedSite}
                        getQuotedSites={props.getQuotedSites}
                    />
                    <QuotedEquipmentMaterials
                        setIsEditMode={props.setIsEditMaterialsMode}
                    />
                    <QuotedEquipmentLabourTravel
                        setIsEditMode={props.setIsEditLabourMode}
                    />
                </>}
                {props.quotedSite.data.site_id ? <QuotedSiteAssociatedEquipment
                    quotedSite={props.quotedSite}
                /> : null}
                {props.site ? <QuotedSiteMaps
                    quotedSiteID={props.quotedSite.id}
                    site={props.site}
                    setDistance={props.setDistance}
                /> : null}
                {!props.isLocked ? <>
                    {/* <QuoteCosting
                        quotedSite={props.quotedSite}
                        getQuotedSite={props.getQuotedSite}
                    />  */}
                    <RemoveQuotedSite 
                        quotedSiteID={props.quotedSite.id} 
                        getQuotedSites={props.getQuotedSites}
                    />
                </> : null}
            </> 
            :
            // Edit Mode
            <>
                <SideBarModule title='Actions'>
                    <SideBarButton 
                        text='Abandon Edit'
                        color="grey"
                        iconFont='cancel'
                        clickEvent={() => {
                            props.setIsEditLabourMode(false);
                            props.setIsEditMaterialsMode(false);
                        }}
                    />
                </SideBarModule>
                {props.site ? <QuotedSiteAssociatedEquipment
                    quotedSite={props.quotedSite}
                    setAutoAddedQuoteLines={props.setAutoAddedQuoteLines}
                    isEdit
                /> : null}
                {props.site && props.isEditLabourMode ? <QuotedSiteMaps
                    quotedSiteID={props.quotedSite.id}
                    site={props.site}
                    setDistance={props.setDistance}
                    isEdit
                /> : null}
            </>
            }
        </>
    )
}

export default QuotedSiteSideBar