import formatMiles from "../../../../utils/formatMiles"
import { TripSection } from "../components/JourneyMap/utils/getTripSections"

const calculateMileage = (tripSections:  Array<TripSection>): number => {
    return formatMiles(tripSections.filter((section) => 
        section.type === "Travel" && section.isPayable
    ).reduce((onSiteTotal, currentSection) => 
        currentSection.distance ? 
            onSiteTotal +  currentSection.distance: 
            onSiteTotal
    , 0))
}

export default calculateMileage