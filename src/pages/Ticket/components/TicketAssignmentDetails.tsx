import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText";
import { Engineer } from "../../../types/tickets.types";
import { UserResponseData } from "../../../types/user.types";
import findUser from "../../../utils/findUser";
import formatDate from "../../../utils/formatDate";
import TicketAssignmentEngineerRow from "./TicketAssignmentEngineerRow";

const TicketAssignmentDetails = (props: {
    visitDate: Date | null,
    engineers: Array<Engineer>,
    users: Array<UserResponseData>,
    isPreview?: boolean
}) => {
    return (
        <section>
            <h2>Ticket Assignment</h2>
            <InfoGrid>
                {props.visitDate ? <GridItem title='Visit Date' span={2}>
                    <p>{formatDate(props.visitDate)}</p>
                </GridItem> : null}
                {!props.isPreview ? 
                    props.engineers.length > 0 ?
                        <GridItem title='Engineers'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Engineer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.engineers.map((engineer, index) => 
                                        <TicketAssignmentEngineerRow
                                            user={findUser(props.users, engineer.user_id)}
                                            isLead={engineer.is_lead}
                                            key={index}
                                        />
                                    )}
                                </tbody>
                            </table>
                        </GridItem> :
                        <GridItem>
                            <InnerContainer
                                color="dark-blue"
                            >
                                <IconTitleText 
                                    title='Unassigned'
                                    iconFont="person_off"
                                    color="dark-blue"
                                    text='This ticket has not been assigned to any engineers.' 
                                />
                            </InnerContainer>
                        </GridItem>
                : null}
            </InfoGrid>
        </section>
    )
}

export default TicketAssignmentDetails;