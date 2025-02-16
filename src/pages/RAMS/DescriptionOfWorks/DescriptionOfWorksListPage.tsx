import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { DescriptionOfWorksCollectionResponse } from "../../../types/descriptionOfWorks.types";
import getAPI from "../../../utils/getAPI";
import DescriptionOfWorksList from "./components/DescriptionOfWorksList";
import DescriptionOfWorksSearchHeader from "./DescriptionOfWorksSearchHeader";
import getDescriptionOfWorksSearchParams from "./utils/getDescriptionOfWorksSearchParams";
import CreateDescriptionOfWorks from "./CreateDescriptionOfWorks";

const DescriptionOfWorksListPage = () => {
    const [searchParams] = useSearchParams();

    // Form States
    const [showCreate, setShowCreate] = useState(false);

    // Data States
    const [isDescriptionOfWorksLoading, setIsDescriptionOfWorksLoading] = useState(true);
    const [descriptionOfWorksData, setDescriptionOfWorksData] = useState<DescriptionOfWorksCollectionResponse>();

    // Search Params
    const descriptionOfWorksSearchParams = getDescriptionOfWorksSearchParams(searchParams);

    useEffect(() => {
        getDescriptionOfWorks()
    }, [JSON.stringify(descriptionOfWorksSearchParams)]);

    const getDescriptionOfWorks = () => {
        getAPI('description_of_works', descriptionOfWorksSearchParams, (response: any) => {
            const descriptionOfWorksData: DescriptionOfWorksCollectionResponse = response.data;
            setDescriptionOfWorksData(descriptionOfWorksData);
        }, setIsDescriptionOfWorksLoading)
    }

    return (
        <>
            <OuterContainer
                title='Description of Works'
                maxWidth={1000}
                description="Create, edit, deactivate and manage reviews of description of works."
                noBorder
            >
                <DescriptionOfWorksSearchHeader 
                    showCreate={() => setShowCreate(true)}
                />
                <DescriptionOfWorksList
                    isDescriptionOfWorksLoading={isDescriptionOfWorksLoading}
                    descriptionOfWorks={descriptionOfWorksData}
                    perPage={descriptionOfWorksSearchParams.perPage}
                />
            </OuterContainer>
            
            <CreateDescriptionOfWorks 
                show={showCreate} 
                hideFunc={() => setShowCreate(false)}
            />
        </>
    )
}

export default DescriptionOfWorksListPage