import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../../components/ui/Structure/Header/Header";
import { AdditionalTimeActivityCollectionResponse } from "../../../types/additionalTimeActivity.types";
import getAPI from "../../../utils/getAPI";
import CreateAdditionalTimeActivity from "./AdditionalTimeActivityCreate";
import AdditionalTimeActivityList from "./components/AdditionalTimeActivityList";
import AdditionalTimeActivitySearchHeader from "./components/AdditionalTimeActivitySearchHeader";
import getAdditionalTimeActivitySearchParams from "./utils/getAdditionalTimeActivitySearchParams";

const AdditionalTimeActivityListPage = () => {
    const [searchParams] = useSearchParams();

    const [showCreate, setShowCreate] = useState(false);

    // Data states
    const [isAdditionalTimeActivityLoading, setIsAdditionalTimeActivityLoading] = useState(false);
    const [additionalTimeActivityData, setAdditionalTimeActivityData] = useState<AdditionalTimeActivityCollectionResponse>();
    
    const additionalTimeActivitySearchParams = getAdditionalTimeActivitySearchParams(searchParams);

    useEffect(() => {
        getAdditionalTimeActivity();
    }, [JSON.stringify(additionalTimeActivitySearchParams)])

    const getAdditionalTimeActivity = () => {
        getAPI(`additional_time_activity`, additionalTimeActivitySearchParams, (response: any) => {
            const additionalTimeActivity: AdditionalTimeActivityCollectionResponse = response.data;
            setAdditionalTimeActivityData(additionalTimeActivity);
        }, setIsAdditionalTimeActivityLoading)
    }

    return (
        <>
            <OuterContainer
                title={`Additional Time Activities`}
                description="Create, edit and deactivate additinal time activities."
                maxWidth={500}
                noBorder
            >
                <AdditionalTimeActivitySearchHeader
                    showCreate={() => setShowCreate(true)}
                />
                <AdditionalTimeActivityList
                    isAdditionalTimeActivityLoading={isAdditionalTimeActivityLoading}
                    additionalTimeActivityData={additionalTimeActivityData}
                    perPage={additionalTimeActivitySearchParams.perPage}
                />
            </OuterContainer>

            <CreateAdditionalTimeActivity
                show={showCreate}
                hideFunc={() => setShowCreate(false)}
            />
        </>
    )
}

export default AdditionalTimeActivityListPage