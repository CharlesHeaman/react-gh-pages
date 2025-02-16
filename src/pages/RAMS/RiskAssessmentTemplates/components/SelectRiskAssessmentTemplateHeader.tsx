import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RiskAssessmentTemplateResponseData } from "../../../../types/riskAssessmentTemplate.types";
import { TemplateHeaderCollectionResponse } from "../../../../types/templateHeader.types";
import getAPI from "../../../../utils/getAPI";
import putAPI from "../../../../utils/putAPI";
import SelectTemplateHeaderList from "../../../Templates/Headers/SelectTemplateHeaderList";

const SelectRiskAssessmentTemplateHeader = (props: {
    riskAssessmentTemplateID: number,
    setRiskAssessmentTemplateData: Dispatch<SetStateAction<RiskAssessmentTemplateResponseData | undefined>>,
    templateHeaderID: number | null
    show: boolean,
    hideFunc: () => void,
}) => {
    // Form States 
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedID, setSelectedID] = useState(props.templateHeaderID ? props.templateHeaderID : 0);
    
    // Data States
    const [isHeaderLoading, setIsHeaderLoading] = useState(true);
    const [templateHeadersData, setTemplateHeadersData] = useState<TemplateHeaderCollectionResponse>();

    useEffect(() => {
        getTemplateHeaders();
    }, [])

    const getTemplateHeaders = () => {
        getAPI('template_headers', {
            is_active: true,
        }, (response: any) => {
            const templateHeaderData: TemplateHeaderCollectionResponse = response.data;
            setTemplateHeadersData(templateHeaderData);
        }, setIsHeaderLoading)
    }

    const updateSelection = (templateID: number) => {
        setSelectedID(templateID);
    }

    const selectHeader = () => {
        if (!formComplete) return;
        putAPI(`risk_assessment_templates/${props.riskAssessmentTemplateID}/update`, {}, {
            template_header_id: selectedID,
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
                title='Select Header'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={500}
                footer={<SubmitButton
                    text="Select Header"
                    iconFont="vertical_align_top"
                    clickFunc={selectHeader}
                    disabled={!formComplete}
                    submitting={isUpdating}
                    submittingText="Selecting..."
                />}
            >
                <SelectTemplateHeaderList 
                    isTemplateHeadersLoading={isHeaderLoading} 
                    templateHeaders={templateHeadersData} 
                    selectedID={selectedID}
                    updateSelection={updateSelection}
                    perPage={5}
                />
            </WindowOverlay>

        </>
    )
}

export default SelectRiskAssessmentTemplateHeader