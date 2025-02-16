import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketNoteCollectionResponse } from "../../../../../../../../types/ticketNotes.types";
import { UserCollectionResponse, UserResponseData } from "../../../../../../../../types/user.types";
import findUser from "../../../../../../../../utils/findUser";
import getAPI from "../../../../../../../../utils/getAPI";
import TicketNote from "./TicketNote";

const TicketNotes = (props: {
    tickets: Array<any>,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // // Data States
    const [isNotesLoading, setIsNotesLoading] = useState(true);
    const [notesData, setNotesData] = useState<TicketNoteCollectionResponse>();
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);


    // Search Parameters 
    
    useEffect(() => {
        getNotes();
    }, [props.tickets])

    const getNotes = () => {
        getAPI('ticket_notes', {
            tickets: props.tickets,
        }, (response: any) => {
            const notesData: TicketNoteCollectionResponse = response.data;
            setNotesData(notesData);
            if (notesData.data.length > 0) {
                getUsers([...new Set(notesData.data.map(note => note.data.created_by_id))])
            }
        }, setIsNotesLoading)
    } 

    const getUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    return (
        <WindowOverlay 
            title={"Engineer Notes"} 
            maxWidth={500} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            {notesData ? notesData.data.map((note, index) =>
                <TicketNote
                    note={note}
                    user={findUser(userData, note.data.created_by_id)}
                    key={index}
                />
            ) : null}
        </WindowOverlay>
    )
}

export default TicketNotes