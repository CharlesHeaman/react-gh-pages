import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule"
import RequisitionAssociatedData from "./RequisitionAssociatedData/RequisitionAssociatedData"
import RequisitionSideBarSkeleton from "./RequisitionSideBarSkeleton"
import { RequisitionResponseData } from "../../../types/requisition.types"
import { RequisitionActivityCollectionResponse } from "../../../types/requisitionActivity.types"
import getAPI from "../../../utils/getAPI"
import { RequisitionLineCollectionResponse } from "../../../types/requisitionLines.types"
import RequisitionActions from "../../PurchaseOrders/components/PurchaseOrderSideBar/PurchaseOrderActions/components/RequisitionActions/RequisitionActions"
import ExportResource from "../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"

const RequisitionSideBar = (props: {
    requisition: RequisitionResponseData | undefined,
    requisitionLines: RequisitionLineCollectionResponse | undefined,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setRequisitionData: Dispatch<SetStateAction<RequisitionResponseData | undefined>>
}) => {

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<RequisitionActivityCollectionResponse>();

    useEffect(() => {
        if (props.requisition?.id === undefined) return;
        getActivity(props.requisition.id);
    }, [JSON.stringify(props.requisition), JSON.stringify(props.requisitionLines)]);

    const getActivity = (requisitionID: number) => {
        getAPI(`requisition_activity`, {
            requisition_id: requisitionID,
            perPage: 1
        }, (response: any) => {
            const requisitionActivityData: RequisitionActivityCollectionResponse = response.data;
            setActivityData(requisitionActivityData);
        }, setIsActivityLoading)    
    } 

    const isLoading = (
        isActivityLoading 
    )

    return (
        !isLoading && props.requisition && activityData ? 
            !props.isEditMode ? 
                <>
                    <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                        {!props.requisition.data.is_complete &&
                            <RequisitionActions
                                requisitionID={props.requisition.id}
                                setIsEditMode={props.setIsEditMode}
                                setRequisitionData={props.setRequisitionData}
                            />
                        }
                    </PermsProtectedComponent>

                    <RequisitionAssociatedData
                        requisitionID={props.requisition.id}
                        activityCount={activityData.total_count}
                    />

                    <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                        {props.requisition.data.is_complete && <SideBarModule title="Return Items">
                            <SideBarButton text='Return Items' color="red" iconFont="assignment_return" clickEvent={() => null}/>
                        </SideBarModule>}
                    </PermsProtectedComponent>

                    <ExportResource
                        resourceData={props.requisition}
                        resourceName='Requisition'
                    />
                </> : 
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
        <RequisitionSideBarSkeleton/>    
    )
}

export default RequisitionSideBar