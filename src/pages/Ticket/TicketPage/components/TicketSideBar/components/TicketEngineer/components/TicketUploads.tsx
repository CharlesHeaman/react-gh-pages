import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketNoteCollectionResponse } from "../../../../../../../../types/ticketNotes.types";
import { UserCollectionResponse, UserResponseData } from "../../../../../../../../types/user.types";
import findUser from "../../../../../../../../utils/findUser";
import getAPI from "../../../../../../../../utils/getAPI";
import TicketNote from "./TicketNote";
import { TicketUploadCollectionResponse } from "../../../../../../../../types/ticketUploads.types";
import ListItem from "../../../../../../../../components/ui/Containers/ListItem/ListItem";
import ListWrapper from "../../../../../../../../components/ui/Containers/ListWrapper/ListWrapper";
import NoneFound from "../../../../../../../../components/ui/General/NoneFound/NoneFound";
import formatDate from "../../../../../../../../utils/formatDate";

const TicketUploads = (props: {
    tickets: Array<any>,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {

    // // Data States
    const [isUploadsLoading, setIsUploadsLoading] = useState(true);
    const [uploadData, setUploadData] = useState<TicketUploadCollectionResponse>();
    
    useEffect(() => {
        getTicketUploads();
    }, [props.tickets])

    const getTicketUploads = () => {
        getAPI('ticket_uploads', {
            tickets: props.tickets,
            perPage: 1
        }, (response: any) => {
            const uploadsData: TicketUploadCollectionResponse = response.data;
            setUploadData(uploadsData);
        }, setIsUploadsLoading)
    }

    return (
        <WindowOverlay 
            title={"Engineer Uploads"} 
            maxWidth={500} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            {uploadData ? 
                uploadData.data.length > 0 ? <ListWrapper>
                    {uploadData.data.map((upload, index) => 
                        <ListItem 
                            clickFunc={() => { window.open(`${process.env.REACT_APP_API_URL}/${upload.data.ticket_type}/${upload.data.ticket_id}/${upload.data.name}`, '_blank', 'noopener,noreferrer')}} 
                            key={index}
                        >
                            <h3 className="flex-grow">{upload.data.name}</h3>
                            <h4>{formatDate(upload.data.uploaded_at)}</h4>
                        </ListItem>
                    )}
                </ListWrapper> :
                <NoneFound text='No uploads found' iconFont="upload"/>
            : null}
        </WindowOverlay>
    )
}

export default TicketUploads