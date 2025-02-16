import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import Label from "../../../components/ui/General/Label/Label"
import { TemplateHeaderResponseData } from "../../../types/templateHeader.types"
import InactiveStatus from "../../Vehicles/VehiclePage/components/InactiveStatus"
import getAlignmentIcon from "../utils/getAlignmentIcon"
import getAlignmentTitle from "../utils/getAlignmentTitle"

const TemplateHeaderInformation = (props: {
    templateHeader: TemplateHeaderResponseData
}) => {
    return (
        <>
        {!props.templateHeader.data.is_active ? <InactiveStatus resourceName='Template Header' inactiveDate={undefined}/> : null}
        <section>
            <h2>Template Header Details</h2>
            <InfoGrid>
                <GridItem title='Name'>
                    <p>{props.templateHeader.data.name}</p>
                </GridItem>
                <GridItem title='Description'>
                    <p>{props.templateHeader.data.description ? props.templateHeader.data.description : 'None'}</p>
                </GridItem>
                <GridItem title='Alignment'>
                    <Label
                        text={`Align ${getAlignmentTitle(props.templateHeader.data.alignment)}`}
                        iconFont={getAlignmentIcon(props.templateHeader.data.alignment)}
                        color="grey"
                    />
                </GridItem>
                <GridItem title='Header Image'>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: props.templateHeader.data.alignment === -1 ? 'flex-start' : props.templateHeader.data.alignment === 1 ? 'flex-end' : 'center'
                    }}>
                        <img 
                            style={{
                                maxWidth: '200px'
                            }}
                            src={`${process.env.REACT_APP_API_URL}/${props.templateHeader.data.image_url}?${Date.now()}`} 
                            alt="None"
                        />
                    </div>
                </GridItem>
            </InfoGrid> 
        </section>

        </>
    )
}

export default TemplateHeaderInformation