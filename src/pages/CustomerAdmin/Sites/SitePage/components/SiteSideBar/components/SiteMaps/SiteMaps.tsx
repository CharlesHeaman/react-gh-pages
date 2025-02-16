import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { SiteResponseData } from "../../../../../../../../types/sites.types"
import UpdateSiteLocation from "../../UpdateSiteLocation"
import ViewJourneyToSite from "../../ViewJourneyToSite"
import PermsProtectedComponent from "../../../../../../../../components/PermsProtectedComponent"

const SiteMaps = (props: {
    site: SiteResponseData,
    setSiteData: Dispatch<SetStateAction<SiteResponseData | undefined>>,
}) => {
    const [showJourney, setShowJourney] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const hasCoordinates = props.site.data.coordinates !== null;

    return (
        <>
            <PermsProtectedComponent requiredPerms={{ customers: hasCoordinates ? 1 : 2 }}>
                <SideBarModule title='Location'>
                    <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                        <SideBarButton
                            text={`${hasCoordinates ? 'Update' : "Set"} Site Location`}
                            iconFont="my_location"
                            color={hasCoordinates ? '' : "light-green"}
                            clickEvent={() => setShowUpdate(true)}
                        />
                    </PermsProtectedComponent>
                    {hasCoordinates ? <>
                        <SideBarButton
                            text={`View Journey from ${process.env.REACT_APP_COMPANY_NAME}`}
                            iconFont="route"
                            clickEvent={() => setShowJourney(true)}
                        />
                    </> : null}
                </SideBarModule>
            </PermsProtectedComponent>


            <UpdateSiteLocation
                site={props.site}
                show={showUpdate}
                hideFunc={() => setShowUpdate(false)}   
                setSiteData={props.setSiteData}
            />

            <ViewJourneyToSite
                site={props.site}
                show={showJourney}
                hideFunc={() => setShowJourney(false)}
            />
        </>
    )
}

export default SiteMaps