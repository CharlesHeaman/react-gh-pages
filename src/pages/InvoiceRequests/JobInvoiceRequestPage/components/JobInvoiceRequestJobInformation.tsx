import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink";
import { QuoteResponseData } from "../../../../types/quote.types";
import { DepartmentResponseData } from "../../../../types/department.types";
import { CustomerResponseData } from "../../../../types/customers.types";
import JobLink from "../../../../components/ui/Links/JobLink";
import formatDate from "../../../../utils/formatDate";

const JobInvoiceRequestJobInformation = (props: {
    job: QuoteResponseData,
    department: DepartmentResponseData,
    customer: CustomerResponseData | undefined,
}) => {
    return (
        <section>
            <h2>Job Information</h2>
            <InfoGrid>
                <GridItem title='Job' span={2}>
                    <p><JobLink number={props.job.data.number} departmentName={props.department.data.name}/></p>
                </GridItem>
                <GridItem title='Completion Date' span={3}>
                    <p>{props.job.data.completion_date ? formatDate(props.job.data.completion_date) : 'None'}</p>
                </GridItem>
                <GridItem title='Customer' span={4}>
                    <p>{props.customer ? <NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/> : 'Unknown'}</p>
                </GridItem>
                <GridItem title='Job Description'>
                    <p>{props.job.data.description}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default JobInvoiceRequestJobInformation;