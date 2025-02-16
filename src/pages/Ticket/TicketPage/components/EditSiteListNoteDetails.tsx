import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput";
import BooleanLabel from "../../../../components/ui/BooleanLabel/BooleanLabel";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import Label from "../../../../components/ui/General/Label/Label";
import NewEquipmentLink from "../../../../components/ui/Links/NewEquipmentLink";
import { EquipmentResponseData } from "../../../../types/equipment.types";
import { EditSiteListNoteAttributes, SiteListNoteResponseData } from "../../../../types/siteListNotes.types";

const EditSiteListNoteDetails = (props: {
    equipment: EquipmentResponseData | undefined,
    siteListNote: SiteListNoteResponseData,
    showFGas: boolean,
    showGasSafety: boolean,
    siteListNoteDetails: EditSiteListNoteAttributes | undefined,
    updateReports: (siteListNoteID: number, name: string, value: string | boolean) => void,
    showErrors: boolean,
    isPreview: boolean
}) => {
    return (
        <section>
            <h2>{props.equipment ? <NewEquipmentLink code={props.equipment.data.code}/> : 'Unknown'}</h2>
            <InfoGrid>
                <GridItem title='Report' span={2}>
                    {props.siteListNote.data.is_report_complete ?
                        <Label text="Complete" iconFont="done" color="dark-blue"/> :
                        <Label text="Pending" iconFont="pending" color="light-blue"/>
                    }
                </GridItem>
                {props.showFGas ? <GridItem title='F-gas' span={2}>
                    {props.siteListNote.data.is_fgas_checked ? 
                        <Label text="F-gas Checked" iconFont="propane_tank" color="purple"/> :
                        <BooleanLabel true={props.siteListNote.data.is_gas_safety_checked}
                    />}
                </GridItem> : null}
                {props.showGasSafety ? <GridItem title='Gas Safety' span={2}>
                    {props.siteListNote.data.is_gas_safety_checked ? 
                        <Label text="Gas Safety Checked" iconFont="gas_meter" color="dark-purple"/> : 
                        <BooleanLabel true={props.siteListNote.data.is_gas_safety_checked}
                    />}
                </GridItem> : null}
                <GridItem title='Work Required' span={2}>
                    {props.siteListNote.data.is_work_required ? 
                        <Label text="Work Required" iconFont="priority_high" color="red"/> : 
                        <BooleanLabel true={props.siteListNote.data.is_work_required}
                    />}
                </GridItem>
                <GridItem title='Engineer Report'>
                    <p>{props.siteListNote.data.report}</p>
                </GridItem>
                <GridItem title='Customer Viewable Report'>
                    {!props.isPreview ?
                        <TextareaInput 
                            name="customer_viewable_report"
                            label="Customer viewable report"
                            value={props.siteListNoteDetails ? props.siteListNoteDetails.customer_viewable_report : ''}
                            updateFunc={(event) => props.updateReports(props.siteListNote.id, 'customer_viewable_report', event.target.value)}
                            required
                            hasSubmitted={props.showErrors}
                        /> :
                        <p>{props.siteListNoteDetails?.customer_viewable_report}</p>
                    }
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default EditSiteListNoteDetails;