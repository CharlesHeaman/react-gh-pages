import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RiskAssessmentTemplateResponseData } from "../../../../types/riskAssessmentTemplate.types";
import { TemplateFooterCollectionResponse } from "../../../../types/templateFooter.types";
import getAPI from "../../../../utils/getAPI";
import putAPI from "../../../../utils/putAPI";
import SelectTemplateFooterList from "./SelectTemplateFooterList";

const SelectRiskAssessmentTemplateFooter = (props: {
    riskAssessmentTemplateID: number,
    setRiskAssessmentTemplateData: Dispatch<SetStateAction<RiskAssessmentTemplateResponseData | undefined>>,
    templateFooterID: number | null
    show: boolean,
    hideFunc: () => void,
}) => {
    // Form States 
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedID, setSelectedID] = useState(props.templateFooterID ? props.templateFooterID : 0);
    
    // Data States
    const [isFooterLoading, setIsFooterLoading] = useState(true);
    const [templateFootersData, setTemplateFootersData] = useState<TemplateFooterCollectionResponse>();

    useEffect(() => {
        getTemplateFooters();
    }, [])

    const getTemplateFooters = () => {
        getAPI('template_Footers', {
            is_active: true,
        }, (response: any) => {
            const templateFooterData: TemplateFooterCollectionResponse = response.data;
            setTemplateFootersData(templateFooterData);
        }, setIsFooterLoading)
    }

    const updateSelection = (templateID: number) => {
        setSelectedID(templateID);
    }

    const selectFooter = () => {
        if (!formComplete) return;
        putAPI(`risk_assessment_templates/${props.riskAssessmentTemplateID}/update`, {}, {
            template_footer_id: selectedID,
        }, (response: any) => {
            const riskAssessmentTemplateData: RiskAssessmentTemplateResponseData = response.data;
            props.setRiskAssessmentTemplateData(riskAssessmentTemplateData);
            props.hideFunc()
        }, setIsUpdating)
    }

    const formComplete = selectedID > 0;

    return (
        <>
            <WindowOverlay
                title='Select Footer'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={500}
                footer={<SubmitButton
                    text="Select Footer"
                    iconFont="vertical_align_top"
                    clickFunc={selectFooter}
                    disabled={!formComplete}
                    submitting={isUpdating}
                    submittingText="Selecting..."
                />}
            >
                <SelectTemplateFooterList 
                    isTemplateFootersLoading={isFooterLoading} 
                    templateFooters={templateFootersData} 
                    selectedID={selectedID}
                    updateSelection={updateSelection}
                    perPage={5}
                />
            </WindowOverlay>

        </>
    )
}

export default SelectRiskAssessmentTemplateFooter