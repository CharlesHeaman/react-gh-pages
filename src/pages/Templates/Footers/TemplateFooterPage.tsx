import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { TemplateFooterResponseData } from "../../../types/templateFooter.types";
import getAPI from "../../../utils/getAPI";
import EditTemplateFooterForm from "./EditTemplateFooterForm";
import TemplateFooterInformation from "./TemplateFooterInformation";
import TemplateFooterInformationSkeleton from "./TemplateFooterInformationSkeleton";
import TemplateFooterSideBar from "./TemplateFooterSideBar";


const TemplateFooterPage = () => {
    const { templateFooterID } = useParams();
    
    const [isTemplateFooterLoading, setIsTemplateFooterLoading] = useState(true);
    const [templateFooterData, setTemplateFooterData] = useState<TemplateFooterResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getTemplateFooterData();
    }, [templateFooterID])

    const getTemplateFooterData = () => {
        getAPI(`template_footers/${templateFooterID}`, {}, (response: any) => {
            const templateFooterData: TemplateFooterResponseData = response.data;
            setTemplateFooterData(templateFooterData);
        }, setIsTemplateFooterLoading)
    }

    const isLoading =  (
        isTemplateFooterLoading
    )

    const isFooterLoading = (
        isTemplateFooterLoading 
    )
    
    return (
        <>
            <OuterContainer
                title='Template Footer'
                id={templateFooterID}
                headerContent={!isFooterLoading && templateFooterData && !templateFooterData.data.is_active ? 
                    <InactiveLabel/> : 
                    null
                }
                maxWidth={1000}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && templateFooterData ?
                            !isEditMode ?
                                <TemplateFooterInformation 
                                    templateFooter={templateFooterData}
                                /> :
                                <EditTemplateFooterForm
                                    templateFooter={templateFooterData}
                                    setTemplateFooterData={setTemplateFooterData}
                                    disabledEdit={() => setIsEditMode(false)}
                                />
                            : 
                            <TemplateFooterInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <TemplateFooterSideBar
                            templateFooter={templateFooterData}
                            setTemplateFooterData={setTemplateFooterData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                        /> 
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default TemplateFooterPage