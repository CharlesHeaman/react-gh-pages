import { Dispatch, SetStateAction } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";

const QuotedEquipmentMaterials = (props: {
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
}) => {
    return (
        <SideBarModule title="Materials">
            <SideBarButton
                text="Edit Materials"
                iconFont="inventory_2"
                color="orange"
                clickEvent={() => props.setIsEditMode(true)}
            />
        </SideBarModule>
    )
}

export default QuotedEquipmentMaterials