import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import Skeleton from "../../../../../../components/ui/General/Skeleton/Skeleton"

const PlantEquipmentSideBarSkeleton = () => {
    return (
        <>
            <SideBarModule skeleton>
                <Skeleton type='side-bar-button'/>
            </SideBarModule>
            <SideBarModule skeleton>
                <Skeleton type='side-bar-button'/>
            </SideBarModule>
            <SideBarModule skeleton>
                <Skeleton type='side-bar-button'/>
            </SideBarModule>
            <SideBarModule skeleton>
                <Skeleton type='side-bar-button'/>
            </SideBarModule>
            <SideBarModule skeleton>
                <Skeleton type='side-bar-button'/>
            </SideBarModule>
            <SideBarModule skeleton>
                <Skeleton type='side-bar-button'/>
            </SideBarModule>
        </>
    )
}

export default PlantEquipmentSideBarSkeleton