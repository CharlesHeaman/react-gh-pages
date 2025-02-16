import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";
import { MethodStatementTemplateResponseData } from "../../../types/methodStatementTemplate.types";
import SelectMethodStatementTemplateHeader from "./SelectMethodStatementTemplateHeader";
import SelectMethodStatementTemplateFooter from "./SelectMethodStatementTemplateFooter";

const MethodStatementTemplateHeadersFooters = (props: {
    methodStatementTemplateID: number,
    setMethodStatementTemplateData: Dispatch<SetStateAction<MethodStatementTemplateResponseData | undefined>>,
    templateFooterID: number | null,
    templateHeaderID: number | null,
}) => {

    const [showHeaders, setShowHeaders] = useState(false);
    const [showFooters, setShowFooters] = useState(false);

    return (
        <>
            <SideBarModule title="Header/Footer">
                <SideBarButton 
                    text='Select Header'
                    iconFont="vertical_align_top"
                    clickEvent={() => setShowHeaders(true)}
                />
                <SideBarButton 
                    text='Select Footer'
                    iconFont="vertical_align_bottom"
                    clickEvent={() => setShowFooters(true)}
                />
            </SideBarModule>

            <SelectMethodStatementTemplateHeader
                methodStatementTemplateID={props.methodStatementTemplateID}
                setMethodStatementTemplateData={props.setMethodStatementTemplateData}
                templateHeaderID={props.templateHeaderID}
                show={showHeaders}
                hideFunc={() => setShowHeaders(false)}
            />

            <SelectMethodStatementTemplateFooter
                methodStatementTemplateID={props.methodStatementTemplateID}
                setMethodStatementTemplateData={props.setMethodStatementTemplateData}
                templateFooterID={props.templateFooterID}
                show={showFooters}
                hideFunc={() => setShowFooters(false)}
            />
        </>
    )
}

export default MethodStatementTemplateHeadersFooters