import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound"
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText"
import { DepartmentResponseData } from "../../../types/department.types"
import { EquipmentResponseData } from "../../../types/equipment.types"
import { SiteListNoteCollectionResponse } from "../../../types/siteListNotes.types"
import findEquipment from "../../../utils/findEquipment"
import SiteListNoteDetails from "./components/SiteListNoteDetails"

const SiteListNotes = (props: {
    siteListNotes: SiteListNoteCollectionResponse,
    equipment: Array<EquipmentResponseData>,
    department: DepartmentResponseData,
}) => {
    const isComplete = props.siteListNotes.data.length >= props.equipment.length;
    const isWorkRequired = props.siteListNotes.data.filter(siteListNote => siteListNote.data.is_work_required).length > 0;  

    return (
        <>
            <section>
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px'
                }}>
                    <InnerContainer color={isComplete ? 'dark-blue' : 'light-blue'}>
                        <IconTitleText
                            title={`${props.siteListNotes.data.length}/${props.equipment.length} Complete`}
                            iconFont="done"
                            text={isComplete ? 'All site list notes have been marked as complete.' : 'There are still site list notes that need to be completed.'}
                            color={isComplete ? 'dark-blue' : 'light-blue'}
                        />
                    </InnerContainer>
                    <InnerContainer color={isWorkRequired ? 'red' : 'light-green'}>
                        <IconTitleText
                            title={`${props.siteListNotes.data.filter(siteListNote => siteListNote.data.is_work_required).length} Work Required`}
                            iconFont="priority_high"
                            text={isWorkRequired ? 'There are equipment that require work.' : 'All site list notes are marked as not requiring work.'}
                            color={isWorkRequired ? 'red' : 'light-green'}
                        />
                    </InnerContainer>
                </div>
            </section>
            {props.siteListNotes.data.length > 0 ?
                props.siteListNotes.data.map((siteListNote, index) =>
                    <section key={index}>
                        <InnerContainer>
                            <SiteListNoteDetails
                                equipment={findEquipment(props.equipment, siteListNote.data.equipment_id)}
                                siteListNote={siteListNote}
                                showFGas={props.department.data.uses_refrigerant_module}
                                showGasSafety={props.department.data.uses_fuel_module}
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

export default SiteListNotes