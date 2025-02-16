import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { TemplateFooterCollectionResponse } from "../../../types/templateFooter.types";
import getAPI from "../../../utils/getAPI";
import getTemplateFooterSearchParams from "./utils/getTemplateFooterSearchParams";
import TemplateFooterSearchHeader from "./TemplateFooterSearchHeader";
import TemplateFooterList from "./TemplateFooterList";
import CreateTemplateFooter from "./CreateTemplateHeader";

const TemplateFootersListPage = () => {
    const [searchParams] = useSearchParams();

    // Form States
    const [showCreate, setShowCreate] = useState(false);

    // Data States
    const [isFooterLoading, setIsFooterLoading] = useState(true);
    const [templateFootersData, setTemplateFootersData] = useState<TemplateFooterCollectionResponse>();

    // Search Params
    const templateFooterSearchParams = getTemplateFooterSearchParams(searchParams);

    useEffect(() => {
        getTemplateFooters();
    }, [JSON.stringify(templateFooterSearchParams)]);


    const getTemplateFooters = () => {
        getAPI('template_footers', templateFooterSearchParams, (response: any) => {
            const templateFooterData: TemplateFooterCollectionResponse = response.data;
            setTemplateFootersData(templateFooterData);
        }, setIsFooterLoading)
    }

    return (
        <>
            <OuterContainer
                title='Template Footers'
                maxWidth={1000}
                description="Create, edit and deactivate template footers."
                noBorder
            >
                <TemplateFooterSearchHeader
                    showCreate={() => setShowCreate(true)}
                />
                <TemplateFooterList 
                    isTemplateFootersLoading={isFooterLoading} 
                    templateFooters={templateFootersData} 
                    perPage={templateFooterSearchParams.perPage}
                />
            </OuterContainer>

            <CreateTemplateFooter 
                show={showCreate} 
                hideFunc={() => setShowCreate(false)}
            />
        </>
    )
}

export default TemplateFootersListPage