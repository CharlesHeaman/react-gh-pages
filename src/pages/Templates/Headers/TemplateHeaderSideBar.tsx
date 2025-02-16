import { Dispatch, SetStateAction } from "react";
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";
import { TemplateHeaderResponseData } from "../../../types/templateHeader.types";
import TemplateHeaderActions from "./TemplateHeaderActions";
import TemplateHeaderAssociatedData from "./TemplateHeaderAssociatedData";
import TemplateHeaderDeactivate from "./TemplateHeaderDeactivate";
import TemplateHeaderSideBarSkeleton from "./TemplateHeaderSideBarSkeleton";
import ExportResource from "../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";

const TemplateHeaderSideBar = (props: {
    templateHeader: TemplateHeaderResponseData | undefined,
    setTemplateHeaderData: Dispatch<SetStateAction<TemplateHeaderResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        props.templateHeader ? 
            !props.isEditMode ? <>
                {props.templateHeader.data.is_active ? 
                    <PermsProtectedComponent requiredPerms={{ templates: 2 }}>
                        <TemplateHeaderActions
                            templateHeaderID={props.templateHeader.id}
                            hasImage={props.templateHeader.data.image_url !== null}
                            setTemplateHeaderData={props.setTemplateHeaderData}
                            setIsEditMode={() => props.setIsEditMode(true)}     
                        />
                    </PermsProtectedComponent>
                : null }
                <TemplateHeaderAssociatedData 
                    templateHeaderID={props.templateHeader.id} 
                    activityCount={0}
                />
                <PermsProtectedComponent requiredPerms={{ templates: 2 }}>
                    <TemplateHeaderDeactivate
                        templateHeaderID={props.templateHeader.id}
                        setTemplateHeaderData={props.setTemplateHeaderData}
                        reactivate={!props.templateHeader.data.is_active}
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceName="Template Header"
                    resourceData={props.templateHeader}
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
        <TemplateHeaderSideBarSkeleton/>
    )
}

export default TemplateHeaderSideBar