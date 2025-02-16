import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { MethodStatementTemplateCollectionResponse } from "../../../types/methodStatementTemplate.types";
import getAPI from "../../../utils/getAPI";
import MethodStatementTemplateSearchHeader from "./components/MethodStatementTemplateSearchHeader";
import getMethodStatementTemplateSearchParams from "./utils/getRiskAssessmentTemplateSearchParams";
import MethodStatementTemplateList from "./components/MethodStatementTemplateList";
import CreateMethodStatementTemplate from "./CreateMethodStatementTemplate";

const MethodStatementTemplatesListPage = () => {
    const [searchParams] = useSearchParams();

    const [showCreate, setShowCreate] = useState(false);

    // Data States
    const [isMethodStatementTemplatesLoading, setIsMethodStatementTemplatesLoading] = useState(true);
    const [methodStatementTemplateData, setMethodStatementTemplateData] = useState<MethodStatementTemplateCollectionResponse>();

    // Search Params
    const methodStatementTemplateSearchParams = getMethodStatementTemplateSearchParams(searchParams);

    useEffect(() => {
        getMethodStatementTemplates();
    }, [JSON.stringify(methodStatementTemplateSearchParams)])

    const getMethodStatementTemplates = () => {
        getAPI('method_statement_templates', methodStatementTemplateSearchParams, (response: any) => {
            const methodStatementTemplatesData: MethodStatementTemplateCollectionResponse = response.data;
            setMethodStatementTemplateData(methodStatementTemplatesData);
        }, setIsMethodStatementTemplatesLoading)
    }

    return (
        <>
            <OuterContainer
                title='Method Statement Templates'
                description="Create, edit and deactivate method statement templates that are used to generate method statements."
                maxWidth={1000}
                noBorder
            >
                <MethodStatementTemplateSearchHeader
                    showCreate={() => setShowCreate(true)}
                />
                <MethodStatementTemplateList 
                    isMethodStatementTemplatesLoading={isMethodStatementTemplatesLoading} 
                    methodStatementTemplates={methodStatementTemplateData} 
                    perPage={methodStatementTemplateSearchParams.perPage}
                />
            </OuterContainer>

            <CreateMethodStatementTemplate
                show={showCreate}
                hideFunc={() => setShowCreate(false)}
            />

        </>
    )
}

export default MethodStatementTemplatesListPage