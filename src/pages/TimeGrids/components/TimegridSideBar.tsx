import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TimegridResponseData } from "../../../types/timegrid.types"
import { TimegridAuthorisationSignatureResponseData } from "../../../types/timegridAuthorisationSignatures.types"
import TimegridActions from "../TimieGridReview/components/Actions/Actions"
import TimegridSideBarSkeleton from "./TimegridSideBarSkeleton"
import TimegridAssociatedData from "./TimegridAssociatedData"
import { TimegridActivityCollectionResponse } from "../../../types/timegridActivity.types"
import getAPI from "../../../utils/getAPI"
import ExportResource from "../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"

const TimegridSideBar = (props: {
    timegrid: TimegridResponseData | undefined,
    setTimegridData: Dispatch<SetStateAction<TimegridResponseData | undefined>>
    getTimegridNotes: (userID: number, date: Date) => void,
    noOfTickets: number,
    isAuthorised: boolean,
    currentUserCanAuth: boolean,
    setTimegridAuthorisationData: Dispatch<SetStateAction<Array<TimegridAuthorisationSignatureResponseData>>>,
}) => {
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<TimegridActivityCollectionResponse>();

    useEffect(() => {
        getActivity(props.timegrid ? props.timegrid.id : -1);
    }, [JSON.stringify(props.timegrid)]);

    const getActivity = (timegridID: number) => {
        getAPI(`timegrid_activity`, {
            timegrid_id: timegridID,
            perPage: 1
        }, (response: any) => {
            const contactActivityData: TimegridActivityCollectionResponse = response.data;
            setActivityData(contactActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isActivityLoading
    )

    return (
        !isSideBarLoading && props.timegrid && activityData ? <>
            <PermsProtectedComponent requiredPerms={{ engineer_data: 2 }}>
                {props.timegrid ? <TimegridActions
                    timegrid={props.timegrid}
                    setTimegridData={props.setTimegridData}
                    getTimegridNotes={() => props.timegrid ? props.getTimegridNotes(props.timegrid.data.user_id, props.timegrid.data.date) : null}
                    noOfTickets={props.noOfTickets}
                    isAuthorised={props.isAuthorised}
                    currentUserCanAuth={props.currentUserCanAuth}
                    setTimegridAuthorisationData={props.setTimegridAuthorisationData}
                /> : null}
            </PermsProtectedComponent>

            <TimegridAssociatedData
                timegridID={props.timegrid.id}
                activityCount={activityData.total_count}
            />
            <ExportResource
                resourceName="Timegrid"
                resourceData={props.timegrid}
            />
        </> : 
        <TimegridSideBarSkeleton/>
    )
}

export default TimegridSideBar