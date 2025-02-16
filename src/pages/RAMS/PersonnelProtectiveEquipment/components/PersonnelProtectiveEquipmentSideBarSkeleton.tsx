import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const PersonnelProtectiveEquipmentSideBarSkeleton = () => {
    return (
        <SideBarModule skeleton>
            <Skeleton type="side-bar-button"/>
            <Skeleton type="side-bar-button"/>
            <Skeleton type="side-bar-button"/>
        </SideBarModule>
    )
}

export default PersonnelProtectiveEquipmentSideBarSkeleton