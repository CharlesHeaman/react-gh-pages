import { Dispatch, SetStateAction } from "react"
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule"
import OnCallEmployeeAssociatedData from "./OnCallEmployeeAssociatedData"
import OnCallEmployeeDeactivate from "./OnCallEmployeeDeactivate"
import OnCallEmployeeSideBarSkeleton from "./OnCallEmployeeSideBarSkeleton"
import ExportResource from "../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import { OnCallEngineerResponseData } from "../../../types/OnCallEngineer.types"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"

const OnCallEmployeeSideBar = (props: {
    onCallEngineer: OnCallEngineerResponseData | undefined,
    isLoading: boolean,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
}) => {    
    return (
        !props.isLoading && props.onCallEngineer ? 
            !props.isEditMode ?  <>
                <PermsProtectedComponent requiredPerms={{ calendars: 2 }}>
                    <SideBarModule title="Actions">
                        <SideBarButton
                            text='Edit On-call Employee'
                            iconFont="edit"
                            color="orange"
                            clickEvent={() => props.setIsEditMode(true)}
                        />
                    </SideBarModule>
                </PermsProtectedComponent>

                <OnCallEmployeeAssociatedData
                    onCallEngineerID={props.onCallEngineer.id} 
                    activityCount={0}

                />
                <PermsProtectedComponent requiredPerms={{ calendars: 2 }}>
                    <OnCallEmployeeDeactivate 
                        onCallEngineerID={props.onCallEngineer.id} 
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceName="on-call employee"
                    resourceData={props.onCallEngineer}
                />
            </> 
            :
            // Edit Mode
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Abandon Edit'
                    color="grey"
                    iconFont='cancel'
                    clickEvent={() => props.setIsEditMode(false)}
                />
            </SideBarModule>
        :
        // Skeleton
        <OnCallEmployeeSideBarSkeleton/>
    )
}

export default OnCallEmployeeSideBar