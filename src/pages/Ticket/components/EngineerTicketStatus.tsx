import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText"
import { TicketResponseData } from "../../../types/tickets.types"

const EngineerTicketStatus = (props: {
    ticket: TicketResponseData
}) => {
    return (
        <section>
            <h2>Engineer Ticket Status</h2>
            {props.ticket.data.is_unable_to_attend ?
                <InfoGrid>
                    <GridItem>
                        <InnerContainer>
                            <IconTitleText
                                iconFont="cancel"
                                title='Unable to Carry Out'
                                text="The engineer was unable to carry out work on this ticket."
                                color="red"
                            />
                        </InnerContainer>
                    </GridItem>
                    <GridItem title='Unable to Attend Reason'>
                        <p>{props.ticket.data.unable_to_attend_reason}</p>
                    </GridItem>
                </InfoGrid>
            : props.ticket.data.is_report_complete ?
                <InfoGrid>
                    <GridItem>
                        <InnerContainer>
                            <IconTitleText
                                iconFont="done"
                                title='Report Complete'
                                text="The engineer has completed their report for this ticket"
                                color="dark-blue"
                            />
                        </InnerContainer>
                    </GridItem>
                    {props.ticket.data.ticket_type === 0 ? <GridItem title='Engineer Report'>
                        <p>{props.ticket.data.engineer_report}</p>
                    </GridItem> : null}
                </InfoGrid>
            : props.ticket.data.visit_date && props.ticket.data.visit_date > new Date() ?
                <InnerContainer>
                    <IconTitleText
                        iconFont="lock"
                        title='Locked'
                        text="This ticket is locked to the engineer until the visit date."
                        color="red"
                    />
                </InnerContainer>
            : props.ticket.data.is_started ?
                <InnerContainer>
                    <IconTitleText
                        iconFont="flag"
                        title='Started'
                        text="The engineer has started work on this ticket but has not completed their report."
                        color="light-green"
                    />
                </InnerContainer>
            :
                <InnerContainer>
                    <IconTitleText
                        iconFont="lock_open"
                        title='Open'
                        text="This ticket is open but the engineer has not started work on this ticket."
                        color="light-blue"
                    />
                </InnerContainer>
            }
        </section>
    )
}

export default EngineerTicketStatus