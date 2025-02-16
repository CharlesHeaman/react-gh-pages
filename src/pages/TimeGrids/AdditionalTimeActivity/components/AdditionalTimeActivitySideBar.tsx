import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { AdditionalTimeCollectionResponse } from "../../../../types/additionalTime.types"
import { AdditionalTimeActivityResponseData } from "../../../../types/additionalTimeActivity.types"
import { AdditionalTimeActivityActivityCollectionResponse } from "../../../../types/additionalTimeActivityActivity.types"
import getAPI from "../../../../utils/getAPI"
import AdditionalTimeActivityAssociatedData from "./AdditionalTimeActivityAssociatedData"
import AdditionalTimeActivityDeactivate from "./AdditionalTimeActivityDeactivate"
import AdditionalTimeActivitySideBarSkeleton from "./AdditionalTimeActivitySideBarSkeleton"
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"

const AdditionalTimeActivitySideBar = (props: {
    additionalTimeActivity: AdditionalTimeActivityResponseData | undefined,
    setAdditionalTimeActivityData: Dispatch<SetStateAction<AdditionalTimeActivityResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {

    const [isAdditionalTimeLoading, setIsAdditionalTimeLoading] = useState(true);
    const [additionalTimeData, setAdditionalTimeData] = useState<AdditionalTimeCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<AdditionalTimeActivityActivityCollectionResponse>();

    useEffect(() => {
        if (props.additionalTimeActivity?.id === undefined) return;
        getAdditionalTime(props.additionalTimeActivity?.id);
    }, [props.additionalTimeActivity?.id]);

    useEffect(() => {
        if (props.additionalTimeActivity?.id === undefined) return;
        getActivity(props.additionalTimeActivity.id);
    }, [JSON.stringify(props.additionalTimeActivity)]);

    const getAdditionalTime = (additionalTimeActivityID: number) => {
        getAPI(`additional_time`, {
            activity_id: additionalTimeActivityID,
            perPage: 1
        }, (response: any) => {
            const productData: AdditionalTimeCollectionResponse = response.data;
            setAdditionalTimeData(productData);
        }, setIsAdditionalTimeLoading);
    }

    const getActivity = (additionalTimeActivityID: number) => {
        getAPI(`additional_time_activity_activity`, {
            additional_time_activity_id: additionalTimeActivityID,
            perPage: 1
        }, (response: any) => {
            const vehicleActivityData: AdditionalTimeActivityActivityCollectionResponse = response.data;
            setActivityData(vehicleActivityData);
        }, setIsActivityLoading)    
    } 

    const isLoading = (
        isAdditionalTimeLoading ||
        isActivityLoading
    )

    return (
        !isLoading && props.additionalTimeActivity && additionalTimeData && activityData ? 
            !props.isEditMode ? <>
                {props.additionalTimeActivity.data.is_active ? 
                    <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                        <SideBarModule title='Actions'>
                            <SideBarButton 
                                text='Edit Additional Time Activity'
                                color="orange"
                                iconFont='edit'
                                clickEvent={() => props.setIsEditMode(true)}
                            />
                        </SideBarModule> 
                    </PermsProtectedComponent>
                : null }
                <AdditionalTimeActivityAssociatedData
                    additionalTimeActivityID={props.additionalTimeActivity.id}
                    additionalTimeCount={additionalTimeData.total_count}
                    activityCount={activityData.total_count}
                />
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <AdditionalTimeActivityDeactivate
                        additionalTimeActivityID={props.additionalTimeActivity.id}
                        setAdditionalTimeActivityData={props.setAdditionalTimeActivityData}
                        reactivate={!props.additionalTimeActivity.data.is_active}
                    />
                </PermsProtectedComponent>
                
                <ExportResource
                    resourceName="Additional Time Activity"
                    resourceData={props.additionalTimeActivity}
                />
            </> 
            :
            // Edit Mode
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Abandon Edit'
                    color="grey"
                    iconFont='cancel'
                    clickEvent={() => props.setIsEditMode(false)}
                />
            </SideBarModule>
        :
        // Skeleton
        <AdditionalTimeActivitySideBarSkeleton/>
    )
}

export default AdditionalTimeActivitySideBar    