import { Dispatch, SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { StoresNotificationResponseData } from "../../../../types/storesNotifications.types"
import putAPI from "../../../../utils/putAPI"
import VanStockRequestSideBarSkeleton from "./VanStockRequestSideBarSkeleton"
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"

const VanStockRequestSideBar = (props: {
    storesNotification: StoresNotificationResponseData | undefined,
    setVanStockRequestData: Dispatch<SetStateAction<StoresNotificationResponseData | undefined>>,
    vehicleID: number | undefined
}) => {
    const navigate = useNavigate();

    const [isShowingProcess, setIsShowingProcess] = useState(false);
    const [isShowingIgnore, setIsShowingIgnore] = useState(false);
    const [isProcessLoading, setIsProcessLoading] = useState(false);

    const markAsProcessed = () => {
        putAPI(`stores_notifications/${props.storesNotification?.id}/process`, {}, {}, (response: any) => {
            const engineerEquipmentDetailsData: StoresNotificationResponseData = response.data;
            props.setVanStockRequestData(engineerEquipmentDetailsData);
            setIsShowingProcess(false);
            navigate(`/requisitions/create?vehicle_id=${props.vehicleID}`)
        }, setIsProcessLoading)
    }

    const dismissRequest = () => {
        putAPI(`stores_notifications/${props.storesNotification?.id}/dismiss`, {}, {}, (response: any) => {
            const engineerEquipmentDetailsData: StoresNotificationResponseData = response.data;
            props.setVanStockRequestData(engineerEquipmentDetailsData);
            setIsShowingIgnore(false);
        }, setIsProcessLoading)
    }
    
    return (
        props.storesNotification ? 
            <>
                {props.storesNotification.data.status === 0 ? <>
                    <SideBarModule title="Actions">
                        <SideBarButton
                            text="Process Request"
                            color="dark-blue"
                            iconFont="check_circle"
                            clickEvent={() => setIsShowingProcess(true)}
                        />
                        <SideBarButton
                            text="Dismiss Request"
                            color="red"
                            iconFont="not_interested"
                            clickEvent={() => setIsShowingIgnore(true)}
                        />
                    </SideBarModule> 
                    </>
                    : null
                }
                <SideBarModule title="Van Replenishment Request">
                    <SideBarButton
                        text="History ()"
                        iconFont="history"
                        clickEvent={() => null}
                    />
                </SideBarModule>
                <ExportResource
                    resourceData={props.storesNotification}
                    resourceName='Van Stock Request'
                />

                <WindowOverlay
                    title='Process Request?'
                    maxWidth={300} 
                    show={isShowingProcess}
                    hideFunc={() => setIsShowingProcess(false)}
                    footer={<SubmitButton 
                        text='Process Request' 
                        color='dark-blue' 
                        iconFont="check_circle"
                        clickFunc={markAsProcessed} 
                        submitting={isProcessLoading} 
                        submittingText='Marking as Processed...'
                    />}
                >
                    <p>This will create a requisition for the engineer's vehicle.</p>
                </WindowOverlay>

                <WindowOverlay
                    title='Dismiss Request'
                    maxWidth={300} 
                    show={isShowingIgnore}
                    hideFunc={() => setIsShowingIgnore(false)}
                    footer={<SubmitButton 
                        text='Dismiss Request' 
                        color='red' 
                        iconFont="not_interested"
                        clickFunc={dismissRequest} 
                        submitting={isProcessLoading} 
                        submittingText='Dismissing...'
                    />}
                >
                    <p>This will mark this Van Replenishment Request as dismissed.</p>
                </WindowOverlay>
            </> :
            <VanStockRequestSideBarSkeleton/>
    )
}

export default VanStockRequestSideBar