import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import ReviewDescriptionOfWorks from "./ReviewDescriptionOfWorks"
import { DescriptionOfWorksResponseData } from "../../../../types/descriptionOfWorks.types"

const DescriptionOfWorksActions = (props: {
    descriptionOfWorksID: number,
    setDescriptionOfWorksData: Dispatch<SetStateAction<DescriptionOfWorksResponseData | undefined>>
}) => {
    const [showReview, setShowReview] = useState(false)
    return (
        <>
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Record Review'
                    iconFont="verified"
                    color="dark-blue"
                    clickEvent={() => setShowReview(true)}
                />
                <SideBarButton
                    text='Edit Details'
                    iconFont="edit"
                    color="orange"
                    clickEvent={() => null}
                />
            </SideBarModule>

            <ReviewDescriptionOfWorks 
                descriptionOfWorksID={props.descriptionOfWorksID}
                setDescriptionOfWorksData={props.setDescriptionOfWorksData}
                show={showReview} 
                hideFunc={() => setShowReview(false)}
            />
        </>
    )
}

export default DescriptionOfWorksActions