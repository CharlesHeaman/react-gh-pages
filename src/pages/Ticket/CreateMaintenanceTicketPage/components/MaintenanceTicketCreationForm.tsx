import CheckboxInput from "../../../../components/form/CheckboxInput/CheckboxInput"
import HoursInput from "../../../../components/form/HoursInput/HoursInput"
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import SiteLink from "../../../../components/ui/Links/SiteLink"
import { SiteResponseData } from "../../../../types/sites.types"
import { CreateMaintenanceTicketAttributes } from "../../../../types/tickets.types"
import formatDate from "../../../../utils/formatDate"

const MaintenanceTicketCreationForm = (props: {
    site: SiteResponseData,
    ticketDetails: CreateMaintenanceTicketAttributes | undefined,
    updateTicketDetails: (siteId: number, name: string, value: string | boolean) => void,
    showErrors: boolean
}) => {
    return (
        props.ticketDetails ? <section>
            <h2><SiteLink code={props.site.data.code} name={props.site.data.name}/></h2>
            <InfoGrid>
                <GridItem title="Description" span={3}>
                    <p>{props.site.data.description}</p>
                </GridItem>
                <GridItem title="Location" span={3}>
                    <p>{props.site.data.location}</p>
                </GridItem>
                <GridItem title='Visit Date'>
                    <p>{props.ticketDetails.visit_date ? formatDate(props.ticketDetails.visit_date) : 'Unknown'}</p>
                </GridItem>
                <GridItem title="Job Description">
                    <TextareaInput 
                        name="job_description"
                        label="Job description"
                        value={props.ticketDetails.job_description} 
                        updateFunc={(event) => props.updateTicketDetails(props.site.id, 'job_description', event.target.value)}
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title="Estimated Time" span={2}>
                    <HoursInput 
                        name="estimated_time"
                        value={props.ticketDetails.estimated_time} 
                        label="Estimated time"
                        updateFunc={(event) => props.updateTicketDetails(props.site.id, 'estimated_time', event.target.value)}
                        required
                        hasSubmitted={props.showErrors} 
                    />
                </GridItem>
                <GridItem title="Mate Required" span={2}>
                    <CheckboxInput
                        name="is_mate_required" 
                        checked={props.ticketDetails.is_mate_required}
                        updateFunc={(event) => props.updateTicketDetails(props.site.id, 'is_mate_required', event.target.checked)}
                    />
                </GridItem>
                <GridItem title="RAMS Required" span={2}>
                    <CheckboxInput
                        name="is_rams_required" 
                        checked={props.ticketDetails.is_rams_required}
                        updateFunc={(event) => props.updateTicketDetails(props.site.id, 'is_rams_required', event.target.checked)}
                    />
                </GridItem>
            </InfoGrid>
        </section> : null
    )
}

export default MaintenanceTicketCreationForm