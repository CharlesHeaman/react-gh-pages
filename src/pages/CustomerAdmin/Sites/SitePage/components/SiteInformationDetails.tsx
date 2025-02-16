import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import DepartmentLabel from "../../../../../components/ui/Department/DepartmentLabel"
import TelephoneLink from "../../../../../components/ui/TelephoneLink/TelephoneLink"
import { DepartmentResponseData } from "../../../../../types/department.types"
import { Site } from "../../../../../types/sites.types"

const SiteInformationDetails = (props: {
    siteData: Site,
    department: DepartmentResponseData,
    isPreview?: boolean,
}) => {
    return (
        <section>
            <h2>Site Details</h2>
            <InfoGrid>
                {props.isPreview ? <GridItem title='Code'>
                    <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>#{props.siteData.code.toLocaleUpperCase()}</span></p>
                </GridItem> : null}
                <GridItem title='Name' span={4}>
                    <p>{props.siteData.name}</p>
                </GridItem>
                <GridItem title='Department' span={2}>
                    <DepartmentLabel department={props.department}/>
                </GridItem>
                <GridItem title='Description' span={3}>
                    <p>{props.siteData.description.length ? props.siteData.description : 'None'}</p>
                </GridItem>
                <GridItem title='Location' span={3}>
                    <p>{props.siteData.location.length ? props.siteData.location : 'None'}</p>
                </GridItem>
                <GridItem title='Telephone' span={3}>
                    <p>{props.siteData.telephone ? <TelephoneLink number={props.siteData.telephone}/> : 'None'}</p>
                </GridItem>
                <GridItem title='Special Instructions'>
                    <p>{props.siteData.special_instructions ? props.siteData.special_instructions : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SiteInformationDetails