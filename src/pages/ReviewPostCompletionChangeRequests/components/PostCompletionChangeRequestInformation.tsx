import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText"
import NewCustomerLink from "../../../components/ui/Links/NewCustomerLink"
import SiteLink from "../../../components/ui/Links/SiteLink"
import TicketLink from "../../../components/ui/Links/TicketLink"
import UserLink from "../../../components/ui/Links/UserLink"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { PostCompletionChangeRequestResponseData } from "../../../types/postCompletionChangeRequets.types"
import { SiteResponseData } from "../../../types/sites.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { UserResponseData } from "../../../types/user.types"
import getPostCompletionChangeRequestStatusColor from "../utils/getPostCompletionChangeRequestStatusColor"
import getPostCompletionChangeRequestStatusIcon from "../utils/getPostCompletionChangeRequestStatusIcon"
import getPostCompletionChangeRequestStatusText from "../utils/getPostCompletionChangeRequestStatusText"
import getPostCompletionChangeRequestStatusTitle from "../utils/getPostCompletionChangeRequestStatusTitle"

const PostCompletionChangeRequestInformation = (props: {
    postCompletionChangeRequest: PostCompletionChangeRequestResponseData,
    createdByUser: UserResponseData,
    ticket: TicketResponseData,
    department: DepartmentResponseData,
    customer: CustomerResponseData,
    site: SiteResponseData,
    lastProcess: Date | undefined,
}) => {
    return (
        <>
            {props.ticket.data.is_invoice_requested && props.postCompletionChangeRequest.data.status === 0 && <section>
                <InnerContainer
                    color='red'
                >
                    <IconTitleText
                        iconFont="credit_card"
                        title="Invoice Requested"
                        color="red"
                        text="Acceptance locked as invoice has been requested."
                    />
                </InnerContainer>
            </section>}
            <section>
                <InnerContainer
                    color={getPostCompletionChangeRequestStatusColor(props.postCompletionChangeRequest.data.status)}
                >
                    <IconTitleText
                        iconFont={getPostCompletionChangeRequestStatusIcon(props.postCompletionChangeRequest.data.status)}
                        title={`Request ${getPostCompletionChangeRequestStatusTitle(props.postCompletionChangeRequest.data.status)}`}
                        color={getPostCompletionChangeRequestStatusColor(props.postCompletionChangeRequest.data.status)}
                        text={getPostCompletionChangeRequestStatusText(props.postCompletionChangeRequest.data.status, props.lastProcess)}
                    />
                </InnerContainer>
            </section>
            <section>
                <h2>Ticket Information</h2>
                <InfoGrid>
                    <GridItem title='Ticket'>
                        <TicketLink 
                            ticket={props.ticket}
                            departmentName={props.department.data.name} 
                        />
                    </GridItem>
                    <GridItem title='Customer' span={3}>
                        <p><NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/></p>
                    </GridItem>
                    <GridItem title='Site' span={3}>
                        <p><SiteLink code={props.site.data.code} name={props.site.data.name}/></p>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <h2>Request Information</h2>
                <InfoGrid>
                    {/* Request Description */}
                    <GridItem title='Request Description'>
                        <p>{props.postCompletionChangeRequest.data.text}</p>
                    </GridItem>
                    <GridItem title='Requested By'>
                        <p><UserLink username={props.createdByUser.data.username} firstName={props.createdByUser.data.first_name} lastName={props.createdByUser.data.last_name}/></p>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default PostCompletionChangeRequestInformation