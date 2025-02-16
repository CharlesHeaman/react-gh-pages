import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import Label from "../../../components/ui/General/Label/Label"
import { TemplateFooterResponseData } from "../../../types/templateFooter.types"
import InactiveStatus from "../../Vehicles/VehiclePage/components/InactiveStatus"
import getAlignmentIcon from "../utils/getAlignmentIcon"
import getAlignmentTitle from "../utils/getAlignmentTitle"

const TemplateFooterInformation = (props: {
    templateFooter: TemplateFooterResponseData
}) => {
    return (
        <>
        {!props.templateFooter.data.is_active ? <InactiveStatus resourceName='Template Footer' inactiveDate={undefined}/> : null}
        <section>
            <h2>Template Footer Details</h2>
            <InfoGrid>
                <GridItem title='Name'>
                    <p>{props.templateFooter.data.name}</p>
                </GridItem>
                <GridItem title='Description'>
                    <p>{props.templateFooter.data.description ? props.templateFooter.data.description : 'None'}</p>
                </GridItem>
                <GridItem title='Alignment'>
                    <Label
                        text={`Align ${getAlignmentTitle(props.templateFooter.data.alignment)}`}
                        iconFont={getAlignmentIcon(props.templateFooter.data.alignment)}
                        color="grey"
                    />
                </GridItem>
                <GridItem title='Footer Image'>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: props.templateFooter.data.alignment === -1 ? 'flex-start' : props.templateFooter.data.alignment === 1 ? 'flex-end' : 'center'
                    }}>
                        <img 
                            style={{
                                maxWidth: '200px'
                            }}
                            src={`${process.env.REACT_APP_API_URL}/${props.templateFooter.data.image_url}?${Date.now()}`} 
                            alt="None"
                        />
                    </div>
                </GridItem>
            </InfoGrid> 
        </section>

        </>
    )
}

export default TemplateFooterInformation