import { Dispatch, SetStateAction } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";

const QuotedEquipmentLabourTravel = (props: {
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
}) => {
    return (
        <SideBarModule title="Labour/Travel">
            <SideBarButton
                text="Edit Labour/Travel"
                iconFont="person"
                color="orange"
                clickEvent={() => props.setIsEditMode(true)}
            />
        </SideBarModule>
    )
}

export default QuotedEquipmentLabourTravel