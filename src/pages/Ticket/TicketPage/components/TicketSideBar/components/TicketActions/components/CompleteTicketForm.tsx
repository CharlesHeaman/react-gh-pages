import CheckboxInput from "../../../../../../../../components/form/CheckboxInput/CheckboxInput"
import DateInput from "../../../../../../../../components/form/DateInput/DateInput"
import TextareaInput from "../../../../../../../../components/form/TextareaInput/TextareaInput"
import BooleanLabel from "../../../../../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import Label from "../../../../../../../../components/ui/General/Label/Label"
import formatDate from "../../../../../../../../utils/formatDate"

const CompleteTicketForm = (props: {
    completionDate: Date,
    setCompletionDate: (date: Date) => void,
    report: string,
    setReport: (report: string) => void,
    awaitingCosts: boolean,
    setAwaitingCosts: (awaitingCosts: boolean) => void,
    workRequired: boolean,
    setWorkRequired: (workRequired: boolean) => void,
    hasSubmitted: boolean,
    hideDescription?: boolean,
    isPreview?: boolean
}) => {
    return (
        <InfoGrid>
            {!props.hideDescription ?
                <GridItem>
                    <p>Fill out the customer-viewable report and record the completion date to mark this ticket as complete.</p>
                </GridItem>
            : null}
            <GridItem title='Completion Date'>
                {!props.isPreview ?
                    <DateInput
                        name="completion_date"
                        value={props.completionDate}
                        updateFunc={(date: Date, _name: string) => props.setCompletionDate(new Date(date))}
                        hasSubmitted={props.hasSubmitted}
                        required
                    /> :
                    <p>{formatDate(props.completionDate)}</p>
                }
            </GridItem>
            <GridItem title='Report'>
                {!props.isPreview ?
                    <TextareaInput
                        name="customer_viewable_report"
                        label="Report"
                        value={props.report}
                        updateFunc={(event) => props.setReport(event.target.value)}
                        hasSubmitted={props.hasSubmitted}
                        autoFocus
                        required
                    /> :
                    <p>{props.report}</p>
                }
            </GridItem>
            <GridItem title='Awaiting Costs' span={3}>
                {!props.isPreview ?
                    <CheckboxInput
                        name="awaiting_cots"
                        checked={props.awaitingCosts}
                        updateFunc={(event) => props.setAwaitingCosts(event.target.checked)}
                    /> :
                    props.awaitingCosts ?
                        <Label
                            text="Awaiting Costs"
                            iconFont="hourglass_empty"
                            color="orange"
                        /> 
                        : 
                        <BooleanLabel true={false}/>
                }
            </GridItem>
            <GridItem title='Further Work Required' span={3}>
                {!props.isPreview ?
                    <CheckboxInput
                        name="work_required"
                        checked={props.workRequired}
                        updateFunc={(event) => props.setWorkRequired(event.target.checked)}
                    /> :
                    props.workRequired ?
                        <Label
                            text="Work Required"
                            iconFont="priority_high"
                            color="red"
                        /> 
                        : 
                        <BooleanLabel true={false}/>
                }
            </GridItem>
        </InfoGrid>
    )
}

export default CompleteTicketForm