import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import SiteLink from "../../../../components/ui/Links/SiteLink"
import { SiteResponseData } from "../../../../types/sites.types"

const QuotedSiteSiteDetails = (props: {
    site: SiteResponseData
}) => {
    return (
        <section>   
            <h2>Site Details</h2>
            <InfoGrid>
                <GridItem title='Code'>
                    <p><SiteLink code={props.site.data.code}/></p>
                </GridItem>
                <GridItem title='Location' span={3}>
                    <p>{props.site.data.location}</p>
                </GridItem>
                <GridItem title='Description' span={3}>
                    <p>{props.site.data.description}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default QuotedSiteSiteDetails