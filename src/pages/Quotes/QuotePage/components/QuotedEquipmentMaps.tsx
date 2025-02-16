import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { SiteResponseData } from "../../../../types/sites.types";
import ViewSiteOnMap from "../../../CustomerAdmin/Sites/SitePage/components/SiteSideBar/ViewSiteOnMap";
import ViewJourneyToSite from "../../../CustomerAdmin/Sites/SitePage/components/SiteSideBar/ViewJourneyToSite";

const QuotedEquipmentMaps = (props: {
    quotedEquipmentID: number,
    site: SiteResponseData,
    setDistance: Dispatch<SetStateAction<google.maps.DistanceMatrixResponse | null | undefined>>,
    isEdit?: boolean
}) => {
    const [showLocation, setShowLocation] = useState(false);
    const [showJourney, setShowJourney] = useState(false);

    return (
        <>
            <SideBarModule title='Travel and Mileage'>
                {props.isEdit ? <SideBarButton
                    text='Calculate Travel and Mileage'
                    iconFont="route"
                    color="purple"
                    clickEvent={() => setShowJourney(true)}
                /> : null}
                <SideBarButton
                    text={`View Site on Map`}
                    iconFont="location_on"
                    clickEvent={() => setShowLocation(true)}
                />
            </SideBarModule>

            <ViewSiteOnMap
                site={props.site}
                show={showLocation}
                hideFunc={() => setShowLocation(false)}
            />

            <ViewJourneyToSite
                site={props.site}
                show={showJourney}
                hideFunc={() => setShowJourney(false)}
                showCopy
                distanceSetter={props.setDistance}
            />
        </>
    )
}

export default QuotedEquipmentMaps