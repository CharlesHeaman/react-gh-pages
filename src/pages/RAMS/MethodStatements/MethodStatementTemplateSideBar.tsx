import { Dispatch, SetStateAction } from "react"
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule"
import { MethodStatementTemplateResponseData } from "../../../types/methodStatementTemplate.types"
import TemplateHeaderSideBarSkeleton from "../../Templates/Headers/TemplateHeaderSideBarSkeleton"
import MethodStatementTemplateActions from "./components/MethodStatementTemplateActions"
import MethodStatementTemplateAssociatedData from "./MethodStatementTemplateAssociatedData"
import MethodStatementTemplateHeadersFooters from "./MethodStatementTemplateHeaderFooter"
import MethodStatementTemplateDeactivate from "./MethodStatementTemplateDeactivate"
import ExportResource from "../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"


const MethodStatementTemplateSideBar = (props: {
    methodStatementTemplate: MethodStatementTemplateResponseData | undefined,
    setMethodStatementTemplateData: Dispatch<SetStateAction<MethodStatementTemplateResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {

    return (
        props.methodStatementTemplate ? 
            !props.isEditMode ? <>
                {props.methodStatementTemplate.data.is_active ? 
                    <PermsProtectedComponent requiredPerms={{ templates: 2 }}>
                        <MethodStatementTemplateActions
                            methodStatementTemplateID={props.methodStatementTemplate.id}
                            setMethodStatementTemplateData={props.setMethodStatementTemplateData}
                            isDefault={props.methodStatementTemplate.data.is_default}
                            setIsEditMode={() => props.setIsEditMode(true)}     
                        />
                    </PermsProtectedComponent>

                    : null
                }
                <MethodStatementTemplateAssociatedData
                    methodStatementTemplateID={props.methodStatementTemplate.id}
                    setMethodStatementTemplateData={props.setMethodStatementTemplateData}                
                    templateContent={props.methodStatementTemplate.data.content}
                />
                <PermsProtectedComponent requiredPerms={{ templates: 2 }}>
                    <MethodStatementTemplateHeadersFooters 
                        methodStatementTemplateID={props.methodStatementTemplate.id} 
                        setMethodStatementTemplateData={props.setMethodStatementTemplateData}
                        templateHeaderID={props.methodStatementTemplate.data.template_header_id}
                        templateFooterID={props.methodStatementTemplate.data.template_footer_id}
                    />
                    <MethodStatementTemplateDeactivate
                        methodStatementTemplateID={props.methodStatementTemplate.id}
                        setMethodStatementTemplateData={props.setMethodStatementTemplateData}
                        reactivate={!props.methodStatementTemplate.data.is_active}
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceData={props.methodStatementTemplate}
                    resourceName='Method Statement Template'
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

export default MethodStatementTemplateSideBar