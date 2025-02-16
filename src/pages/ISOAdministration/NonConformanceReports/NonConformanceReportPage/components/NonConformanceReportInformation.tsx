import MarkdownDisplay from "../../../../../components/form/MarkdownEditor/components/MarkdownDisplay"
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import { NonConformanceReportResponseData } from "../../../../../types/nonconformancereport.types"

const NonConformanceReportInformation = (props: {
    nonConformanceReport: NonConformanceReportResponseData,
}) => {
    return (
        <>
            <section>
                <h2>Non-conformance Report Details</h2>
                <InfoGrid>
                    <GridItem title='Source'>

                    </GridItem>
                    <GridItem title='Concern and Cause Definition'>
                        <InnerContainer>
                            <MarkdownDisplay markdown={props.nonConformanceReport.data.cause}/>
                        </InnerContainer>
                    </GridItem>
                    <GridItem title='Remedial or Corrective Action'>
                        <InnerContainer>
                            <MarkdownDisplay markdown={props.nonConformanceReport.data.corrective_action}/>
                        </InnerContainer>
                    </GridItem>
                    <GridItem title='Action to Prevent Recurrence'>
                        <InnerContainer>
                            <MarkdownDisplay markdown={props.nonConformanceReport.data.preventive_action}/>
                        </InnerContainer>
                    </GridItem>
                    <GridItem title='Action/Complete/Verified'>
                        <InnerContainer>
                            <MarkdownDisplay markdown={props.nonConformanceReport.data.verification}/>
                        </InnerContainer>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default NonConformanceReportInformation  