import { Dispatch, SetStateAction } from "react";
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";
import { TemplateFooterResponseData } from "../../../types/templateFooter.types";
import TemplateFooterActions from "./TemplateFooterActions";
import TemplateFooterAssociatedData from "./TemplateFooterAssociatedData";
import TemplateFooterDeactivate from "./TemplateFooterDeactivate";
import TemplateFooterSideBarSkeleton from "./TemplateFooterSideBarSkeleton";
import ExportResource from "../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";

const TemplateFooterSideBar = (props: {
    templateFooter: TemplateFooterResponseData | undefined,
    setTemplateFooterData: Dispatch<SetStateAction<TemplateFooterResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        props.templateFooter ? 
            !props.isEditMode ? <>
                {props.templateFooter.data.is_active ? 
                    <PermsProtectedComponent requiredPerms={{ templates: 2 }}>
                        <TemplateFooterActions
                            templateFooterID={props.templateFooter.id}
                            hasImage={props.templateFooter.data.image_url !== null}
                            setTemplateFooterData={props.setTemplateFooterData}
                            setIsEditMode={() => props.setIsEditMode(true)}     
                        />
                    </PermsProtectedComponent>
                : null}
                <TemplateFooterAssociatedData 
                    templateFooterID={props.templateFooter.id} 
                    activityCount={0}
                />
                <PermsProtectedComponent requiredPerms={{ templates: 2 }}>
                    <TemplateFooterDeactivate
                        templateFooterID={props.templateFooter.id}
                        setTemplateFooterData={props.setTemplateFooterData}
                        reactivate={!props.templateFooter.data.is_active}
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceName="Template Footer"
                    resourceData={props.templateFooter}
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
        <TemplateFooterSideBarSkeleton/>
    )
}

export default TemplateFooterSideBar