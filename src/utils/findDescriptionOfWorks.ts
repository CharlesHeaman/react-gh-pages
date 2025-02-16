import { DescriptionOfWorksResponseData } from "../types/descriptionOfWorks.types";

const findDescriptionOfWorks = (descriptionOfWorks: Array<DescriptionOfWorksResponseData>, descriptionOfWorksID: number): DescriptionOfWorksResponseData | undefined => {
    return descriptionOfWorks.find(descriptionOfWorks => descriptionOfWorks.id === descriptionOfWorksID)
}

export default findDescriptionOfWorks