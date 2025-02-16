import formatHours from "../../../../utils/formatHours"
import { TripSection } from "../components/JourneyMap/utils/getTripSections"

const calculateTravelTime = (tripSections:  Array<TripSection>): number => {
    return formatHours(tripSections.filter((section) => 
        section.type === "Travel" && section.isPayable
    ).reduce((onSiteTotal, currentSection) => 
        currentSection.start && currentSection.end ? 
            onSiteTotal + (new Date(currentSection.end).getTime() - new Date(currentSection.start).getTime()) / (1000 * 60 * 60):
            onSiteTotal
    , 0))
}

export default calculateTravelTime
