import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { MethodStatementTemplateResponseData } from "../../../types/methodStatementTemplate.types";
import { TemplateHeaderCollectionResponse } from "../../../types/templateHeader.types";
import getAPI from "../../../utils/getAPI";
import putAPI from "../../../utils/putAPI";
import SelectTemplateHeaderList from "../../Templates/Headers/SelectTemplateHeaderList";

const SelectMethodStatementTemplateHeader = (props: {
    methodStatementTemplateID: number,
    setMethodStatementTemplateData: Dispatch<SetStateAction<MethodStatementTemplateResponseData | undefined>>,
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
        putAPI(`method_statement_templates/${props.methodStatementTemplateID}/update`, {}, {
            template_header_id: selectedID,
        }, (response: any) => {
            const methodStatementTemplateData: MethodStatementTemplateResponseData = response.data;
            props.setMethodStatementTemplateData(methodStatementTemplateData);
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

export default SelectMethodStatementTemplateHeader