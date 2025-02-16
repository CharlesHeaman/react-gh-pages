import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import { TicketNoteResponseData } from "../../../../../../../../types/ticketNotes.types"
import { UserResponseData } from "../../../../../../../../types/user.types"
import formatDate from "../../../../../../../../utils/formatDate"
import getUserFullName from "../../../../../../../../utils/getUserFullName"

const TicketNote = (props: {
    note: TicketNoteResponseData,
    user: UserResponseData | undefined
}) => {
    return (
        <InnerContainer 
            title={getUserFullName(props.user)} 
            collapsible
        >
            <InfoGrid>
                <GridItem title='Date'>
                    <p>{formatDate(props.note.data.created_at)}</p>
                </GridItem>
                <GridItem title='Note'>
                    <p>{props.note.data.text}</p>
                </GridItem>
            </InfoGrid>
        </InnerContainer>
    )
}

export default TicketNote