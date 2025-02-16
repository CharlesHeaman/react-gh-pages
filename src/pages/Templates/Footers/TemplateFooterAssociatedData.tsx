import { useState } from "react";
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";

const TemplateFooterAssociatedData = (props: {
    templateFooterID: number,
    activityCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Template Footer'>
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            {/* <ContactHistory
                contactID={props.contactID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            /> */}
        </>
    )
}

export default TemplateFooterAssociatedData