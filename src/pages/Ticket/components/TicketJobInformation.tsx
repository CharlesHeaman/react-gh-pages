import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import JobLink from "../../../components/ui/Links/JobLink"
import { DepartmentResponseData } from "../../../types/department.types"
import { QuoteResponseData } from "../../../types/quote.types"

const TicketJobInformation = (props: {
    job: QuoteResponseData,
    jobDepartment: DepartmentResponseData
}) => {
    return (
        <section>
            <h2>Job Details</h2>
            <InfoGrid>
                <GridItem title='Job' span={2}>
                    <JobLink
                        departmentName={props.jobDepartment.data.name} 
                        number={props.job.data.number}                            
                    />
                </GridItem>
                <GridItem title='Job Description' span={4}>
                    <p>{props.job.data.description}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default TicketJobInformation