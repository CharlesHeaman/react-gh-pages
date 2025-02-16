import { useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import AdditionalTimeActivityAdditionalTime from "./AdditinonalTimeActivityAdditionalTime";
import AdditionalTimeActivityHistory from "./AdditionalTimeActivityHistory";

const AdditionalTimeActivityAssociatedData = (props: {
    additionalTimeActivityID: number,
    additionalTimeCount: number,
    activityCount: number,
}) => {
    const [showAdditionalTime, setShowAdditionalTime] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Additional Time Activity'>
                <SideBarButton 
                    text={`Additional Time (${props.additionalTimeCount})`}
                    iconFont='more_time'
                    clickEvent={() => setShowAdditionalTime(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <AdditionalTimeActivityAdditionalTime
                additionalTimeActivityID={props.additionalTimeActivityID}
                totalCount={props.additionalTimeCount}
                show={showAdditionalTime}
                hideFunc={() => setShowAdditionalTime(false)}
            />

            <AdditionalTimeActivityHistory
                additionalTimeActivityID={props.additionalTimeActivityID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default AdditionalTimeActivityAssociatedData