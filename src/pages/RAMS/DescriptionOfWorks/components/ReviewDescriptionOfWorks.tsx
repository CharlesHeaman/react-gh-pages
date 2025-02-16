import { Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import putAPI from "../../../../utils/putAPI"
import { DescriptionOfWorksResponseData } from "../../../../types/descriptionOfWorks.types"
import DateInput from "../../../../components/form/DateInput/DateInput"

const ReviewDescriptionOfWorks = (props: {
    descriptionOfWorksID: number,
    setDescriptionOfWorksData: Dispatch<SetStateAction<DescriptionOfWorksResponseData | undefined>>
    show: boolean,
    hideFunc: () => void,
}) => {

    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastReview, setLastReview] = useState<Date>();
    const [nextReview, setNextReview] = useState<Date>();

    const formValid = (
        lastReview !== undefined &&
        nextReview !== undefined
    )

    const updateReviewDates = () => {
        setHasSubmitted(true);
        if (!formValid) return;
        putAPI(`description_of_works/${props.descriptionOfWorksID}/update`, {}, {
            last_review_at: lastReview,
            next_review_at: nextReview
        }, (response: any) => {
            props.setDescriptionOfWorksData(response.data);
            props.hideFunc();
        }, setIsSubmitting)
    }

    return (
        <WindowOverlay
            title="Record Review"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Record Review"
                submitting={isSubmitting}
                submittingText='Recording...'
                iconFont="verified"
                clickFunc={updateReviewDates}
                disabled={hasSubmitted && !formValid}
                color='dark-blue'
            />}
        >
            <InfoGrid>
                <GridItem title='Last Review'>
                    <DateInput 
                        name={"last_review"} 
                        value={lastReview} 
                        updateFunc={(date: Date) => setLastReview(date)}
                    />
                </GridItem>
                <GridItem title='Next Review'>
                    <DateInput 
                        name={"next_review"} 
                        value={nextReview} 
                        updateFunc={(date: Date) => setNextReview(date)}
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default ReviewDescriptionOfWorks