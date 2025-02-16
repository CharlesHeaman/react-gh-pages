import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { TemplateHeaderCollectionResponse } from "../../../types/templateHeader.types";
import getAPI from "../../../utils/getAPI";
import CreateTemplateHeader from "./CreateTemplateHeader";
import TemplateHeaderList from "./TemplateHeaderList";
import TemplateHeaderSearchHeader from "./TemplateHeaderSearchHeader";
import getTemplateHeaderSearchParams from "./utils/getTemplateHeaderSearchParams";

const TemplateHeadersListPage = () => {
    const [searchParams] = useSearchParams();

    // Form States
    const [showCreate, setShowCreate] = useState(false);

    // Data States
    const [isHeaderLoading, setIsHeaderLoading] = useState(true);
    const [templateHeadersData, setTemplateHeadersData] = useState<TemplateHeaderCollectionResponse>();

    // Search Params
    const templateHeaderSearchParams = getTemplateHeaderSearchParams(searchParams);

    useEffect(() => {
        getTemplateHeaders();
    }, [JSON.stringify(templateHeaderSearchParams)]);


    const getTemplateHeaders = () => {
        getAPI('template_headers', templateHeaderSearchParams, (response: any) => {
            const templateHeaderData: TemplateHeaderCollectionResponse = response.data;
            setTemplateHeadersData(templateHeaderData);
        }, setIsHeaderLoading)
    }

    return (
        <>
            <OuterContainer
                title='Template Headers'
                maxWidth={1000}
                description="Create, edit and deactivate template headers."
                noBorder
            >
                <TemplateHeaderSearchHeader 
                    showCreate={() => setShowCreate(true)}
                />
                <TemplateHeaderList 
                    isTemplateHeadersLoading={isHeaderLoading} 
                    templateHeaders={templateHeadersData} 
                    perPage={templateHeaderSearchParams.perPage}
                />
            </OuterContainer>

            <CreateTemplateHeader 
                show={showCreate} 
                hideFunc={() => setShowCreate(false)}
            />
        </>
    )
}

export default TemplateHeadersListPage