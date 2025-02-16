import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ContactActivityCollectionResponse } from "../../../../../../../../types/contactActivity.types";
import getAPI from "../../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../../utils/getPaginationParams";
import ContactActivityList from "./ContactActivityList";

const ContactHistory = (props: {
    contactID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<ContactActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'contact_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.contactID])

    const getActivity = () => {
        getAPI(`contact_activity`, {
            ...paginationParams,
            contact_id: props.contactID
        }, (response: any) => {
            const contactActivityData: ContactActivityCollectionResponse = response.data;
            setActivityData(contactActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Contact History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <ContactActivityList
                isContactActivityLoading={isActivityLoading}
                contactActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default ContactHistory