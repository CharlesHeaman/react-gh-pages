import { Dispatch, SetStateAction, useState } from "react";
import MarkdownEditor from "../../../../../components/form/MarkdownEditor/MarkdownEditor";
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { QuoteResponseData } from "../../../../../types/quote.types";
import putAPI from "../../../../../utils/putAPI";

const QuoteTemplates = (props: {
    quoteID: number,
    setQuoteData: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
    template: string,
}) => {
    const [showSource, setShowSource] = useState(false);
    const [showEditTemplate, setShowEditTemplate] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [template, setTemplate] = useState(props.template);

    const updateMethodStatementTemplateTemplate = () => {
        putAPI(`quotes/${props.quoteID}/update_template`, {}, {
            template: template,
        }, (response: any) => {
            const quoteData: QuoteResponseData = response.data;
            props.setQuoteData(quoteData)
            setShowEditTemplate(false);
        }, setIsSubmitting)
    }

    return (
        <>
            <SideBarModule title="Quote Text">
                <SideBarButton 
                    text='Edit Quote Text' 
                    iconFont='description' 
                    color='orange' 
                    clickEvent={() => setShowEditTemplate(true)}
                />
            </SideBarModule>

            <WindowOverlay 
                title="Edit Quote Template"
                maxWidth={800} 
                hideFunc={() => setShowEditTemplate(false)} 
                show={showEditTemplate} 
                footer={<SubmitButton
                    text="Save Changes"
                    iconFont="save"
                    color="light-green"
                    submitting={isSubmitting}
                    submittingText='Reactivating...'
                    clickFunc={updateMethodStatementTemplateTemplate}
                />
            }
            >
                <InfoGrid>
                    <GridItem title='Template'>
                        <MarkdownEditor
                            content={template} 
                            setter={setTemplate}/>
                    </GridItem>
                </InfoGrid>
            </WindowOverlay> 
        </>
    )
}

export default QuoteTemplates