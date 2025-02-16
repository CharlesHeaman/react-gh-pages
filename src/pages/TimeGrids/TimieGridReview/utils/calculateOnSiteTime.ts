import formatHours from "../../../../utils/formatHours"
import { TripSection } from "../components/JourneyMap/utils/getTripSections"

const calculateOnSiteTime = (tripSections:  Array<TripSection>): number => {
    return formatHours(tripSections.filter((section) => 
        section.type === "On-site" && section.isPayable
    ).reduce((onSiteTotal, currentSection) => 
        currentSection.start && currentSection.end ? 
            onSiteTotal + (new Date(currentSection.end).getTime() - new Date(currentSection.start).getTime()) / (1000 * 60 * 60):
            onSiteTotal
    , 0))
}

export default calculateOnSiteTime