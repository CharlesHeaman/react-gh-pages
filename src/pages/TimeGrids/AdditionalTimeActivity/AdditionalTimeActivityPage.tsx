import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { AdditionalTimeActivityResponseData } from "../../../types/additionalTimeActivity.types";
import { AdditionalTimeActivityActivityCollectionResponse, AdditionalTimeActivityActivityResponseData } from "../../../types/additionalTimeActivityActivity.types";
import getAPI from "../../../utils/getAPI";
import AdditionalTimeActivityEdit from "./components/AdditionalTimeActivityEdit";
import AdditionalTimeActivityInformation from "./components/AdditionalTimeActivityInformation";
import AdditionalTimeActivitySideBar from "./components/AdditionalTimeActivitySideBar";
import AdditionalTimeActivityInformationSkeleton from "./components/AdditionalTimeActivitySkeleton";

const AdditionalTimeActivityPage = () => {
    const { additionalTimeActivityID } = useParams();

    // Data States
    const [isAdditionalTimeActivityLoading, setIsAdditionalTimeActivityLoading] = useState(false);
    const [additionalTimeActivityData, setAdditionalTimeActivityData] = useState<AdditionalTimeActivityResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<AdditionalTimeActivityActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getAdditionalTimeActivity();
    }, [additionalTimeActivityID]);

    useEffect(() => {
        if (additionalTimeActivityData === undefined) return;
        if (!additionalTimeActivityData.data.is_active) getInactiveActivity(additionalTimeActivityData.id);
    }, [JSON.stringify(additionalTimeActivityData)]);

    const getAdditionalTimeActivity = () => {
        getAPI(`additional_time_activity/${additionalTimeActivityID}`, {}, (response: any) => {
            const additionalTimeActivity: AdditionalTimeActivityResponseData = response.data;
            setAdditionalTimeActivityData(additionalTimeActivity);
        }, setIsAdditionalTimeActivityLoading)
    }

    const getInactiveActivity = (additionalTimeActivityID: number) => {
        getAPI(`additional_time_activity_activity`, {
            additional_time_activity_id: additionalTimeActivityID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const additionalTimeActivityActivityData: AdditionalTimeActivityActivityCollectionResponse = response.data;
            setInactiveActivityData(additionalTimeActivityActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isLoading = (
        isAdditionalTimeActivityLoading
    )

    return (
        <OuterContainer
            title={`Additional Time Activity`}
            id={additionalTimeActivityID}
            headerContent={additionalTimeActivityData && !additionalTimeActivityData.data.is_active ? 
                <InactiveLabel/> : 
                null
            }
            maxWidth={700}
        >
            <div className="page-grid">
                <div className="page-main">
                    {(!isLoading && additionalTimeActivityData) ? 
                        !isEditMode ?
                            <AdditionalTimeActivityInformation
                                additionalTimeActivity={additionalTimeActivityData}
                                lastDeactivate={inactiveActivityData?.data.created_at}
                            /> :
                            <AdditionalTimeActivityEdit
                                additionalTimeActivity={additionalTimeActivityData}
                                setAdditionalTimeActivityData={setAdditionalTimeActivityData}
                                disabledEdit={() => setIsEditMode(false)}
                            />
                        : 
                        <AdditionalTimeActivityInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <AdditionalTimeActivitySideBar
                        additionalTimeActivity={additionalTimeActivityData}
                        setAdditionalTimeActivityData={setAdditionalTimeActivityData}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    /> 
                </div>
            </div>
        </OuterContainer>
    )
}

export default AdditionalTimeActivityPage