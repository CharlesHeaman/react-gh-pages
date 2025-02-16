import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound"
import { DepartmentResponseData } from "../../../types/department.types"
import { EquipmentResponseData } from "../../../types/equipment.types"
import { EditSiteListNoteAttributes, SiteListNoteCollectionResponse } from "../../../types/siteListNotes.types"
import findEquipment from "../../../utils/findEquipment"
import EditSiteListNoteDetails from "./components/EditSiteListNoteDetails"

const EditSiteListNotes = (props: {
    siteListNotes: SiteListNoteCollectionResponse,
    equipment: Array<EquipmentResponseData>,
    department: DepartmentResponseData,
    siteListNoteDetails: Array<EditSiteListNoteAttributes>,
    updateReports: (siteListNoteID: number, name: string, value: string | boolean) => void,
    showErrors: boolean,
    isPreview?: boolean
}) => {
    return (
        <>
            {props.siteListNotes.data.length > 0 ?
                props.siteListNotes.data.map((siteListNote, index) =>
                    <section key={index}>
                        <InnerContainer>
                            <EditSiteListNoteDetails
                                equipment={findEquipment(props.equipment, siteListNote.data.equipment_id)}
                                siteListNote={siteListNote}
                                showFGas={props.department.data.uses_refrigerant_module}
                                showGasSafety={props.department.data.uses_fuel_module}
                                siteListNoteDetails={props.siteListNoteDetails.find(details => details.site_list_note_id === siteListNote.id)}
                                updateReports={props.updateReports}
                                showErrors={props.showErrors}
                                isPreview={props.isPreview}
                            />
                        </InnerContainer>
                    </section>
                ) :
                <NoneFound
                    text="No Site List Notes Found"
                    iconFont="checklist"
                />
            }
        </>
    )
}

export default EditSiteListNotes