import { Dispatch, SetStateAction } from "react"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { RiskAssessmentTemplateResponseData } from "../../../../types/riskAssessmentTemplate.types"
import TemplateHeaderSideBarSkeleton from "../../../Templates/Headers/TemplateHeaderSideBarSkeleton"
import RiskAssessmentTemplateActions from "./RiskAssessmentTemplateActions"
import RiskAssessmentTemplateAssociatedData from "./RiskAssessmentTemplateAssociatedData"
import RiskAssessmentTemplateDeactivate from "./RiskAssessmentTemplateDeactivate"
import RiskAssessmentTemplateHeadersFooters from "./RiskAssessmentTemplateHeaderFooters"
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"

const RiskAssessmentTemplateSideBar = (props: {
    riskAssessmentTemplate: RiskAssessmentTemplateResponseData | undefined,
    setRiskAssessmentTemplateData: Dispatch<SetStateAction<RiskAssessmentTemplateResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {

    return (
        props.riskAssessmentTemplate ? 
            !props.isEditMode ? <>
                {props.riskAssessmentTemplate.data.is_active ? 
                    <PermsProtectedComponent requiredPerms={{ templates: 2 }}>
                        <RiskAssessmentTemplateActions
                            riskAssessmentTemplateID={props.riskAssessmentTemplate.id}
                            setRiskAssessmentTemplateData={props.setRiskAssessmentTemplateData}
                            isDefault={props.riskAssessmentTemplate.data.is_default}
                            setIsEditMode={() => props.setIsEditMode(true)}     
                        />
                    </PermsProtectedComponent>

                    : null
                }
                <RiskAssessmentTemplateAssociatedData
                    riskAssessmentTemplateID={props.riskAssessmentTemplate.id}
                    setRiskAssessmentTemplateData={props.setRiskAssessmentTemplateData}                
                    templateContent={props.riskAssessmentTemplate.data.content}
                />
                <PermsProtectedComponent requiredPerms={{ templates: 2 }}>                    
                    <RiskAssessmentTemplateHeadersFooters 
                        riskAssessmentTemplateID={props.riskAssessmentTemplate.id} 
                        setRiskAssessmentTemplateData={props.setRiskAssessmentTemplateData}
                        templateHeaderID={props.riskAssessmentTemplate.data.template_header_id}
                        templateFooterID={props.riskAssessmentTemplate.data.template_footer_id}
                    />
                    <RiskAssessmentTemplateDeactivate
                        riskAssessmentTemplateID={props.riskAssessmentTemplate.id}
                        setRiskAssessmentTemplateData={props.setRiskAssessmentTemplateData}
                        reactivate={!props.riskAssessmentTemplate.data.is_active}
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceData={props.riskAssessmentTemplate}
                    resourceName='Risk Assessment Template'
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

export default RiskAssessmentTemplateSideBar