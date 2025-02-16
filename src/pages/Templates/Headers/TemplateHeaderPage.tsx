import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { TemplateHeaderResponseData } from "../../../types/templateHeader.types";
import getAPI from "../../../utils/getAPI";
import EditTemplateHeaderForm from "./EditTemplateHeaderForm";
import TemplateHeaderInformation from "./TemplateHeaderInformation";
import TemplateHeaderInformationSkeleton from "./TemplateHeaderInformationSkeleton";
import TemplateHeaderSideBar from "./TemplateHeaderSideBar";


const TemplateHeaderPage = () => {
    const { templateHeaderID } = useParams();
    
    const [isTemplateHeaderLoading, setIsTemplateHeaderLoading] = useState(true);
    const [templateHeaderData, setTemplateHeaderData] = useState<TemplateHeaderResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getTemplateHeaderData();
    }, [templateHeaderID])

    const getTemplateHeaderData = () => {
        getAPI(`template_headers/${templateHeaderID}`, {}, (response: any) => {
            const templateHeaderData: TemplateHeaderResponseData = response.data;
            setTemplateHeaderData(templateHeaderData);
        }, setIsTemplateHeaderLoading)
    }

    const isLoading =  (
        isTemplateHeaderLoading
    )

    const isHeaderLoading = (
        isTemplateHeaderLoading 
    )
    
    return (
        <>
            <OuterContainer
                title='Template Header'
                id={templateHeaderID}
                headerContent={!isHeaderLoading && templateHeaderData && !templateHeaderData.data.is_active ? 
                    <InactiveLabel/> : 
                    null
                }
                maxWidth={1000}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && templateHeaderData ?
                            !isEditMode ?
                                <TemplateHeaderInformation 
                                    templateHeader={templateHeaderData}
                                /> :
                                <EditTemplateHeaderForm
                                    templateHeader={templateHeaderData}
                                    setTemplateHeaderData={setTemplateHeaderData}
                                    disabledEdit={() => setIsEditMode(false)}
                                />
                            : 
                            <TemplateHeaderInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <TemplateHeaderSideBar
                            templateHeader={templateHeaderData}
                            setTemplateHeaderData={setTemplateHeaderData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                        /> 
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default TemplateHeaderPage