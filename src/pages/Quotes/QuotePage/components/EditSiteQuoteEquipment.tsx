import { useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import { EquipmentTypeResponseData } from "../../../../types/equipmentType.types"
import formatHours from "../../../../utils/formatHours"
import reduceEditQuoteEquipmentQuantity from "../utils/reduceEditQuoteEquipmentQuantity"
import reduceEditQuoteEquipmentTotal from "../utils/reduceEditQuoteEquipmentTotal"
import AddedEquipmentTypeToList from "./AddEquipmentTypeToList"
import { EditQuoteLineData } from "./EditEquipmentQuoteMaterials"
import EditQuoteEquipmentLineRow from "./EditQuoteEquipmentLineRow"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"

const EditSiteQuoteEquipment = (props: {
    quotedSite: QuotedSiteResponseData,
    quoteLinesEditData: Array<EditQuoteLineData>,
    addQuoteLine: (equipmentType: EquipmentTypeResponseData) => void,
    updateQuoteLine: (lineID: number, name: string, value: string) => void,
    removeQuoteLine: (lineID: number) => void,
    departmentID: number,
}) => {  

    const [showAddEquipment, setShowAddEquipment] = useState(false);

    return (
        <>
            <section>
                <h2>Equipment</h2>
                <InfoGrid>
                    <GridItem>
                        {props.quoteLinesEditData.length > 0 ? 
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Quantity</th>
                                            <th>Equipment Type</th>
                                            <th>Maintenance Time</th>
                                            <th>Total Time</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.quoteLinesEditData.map((quoteLine, index) => <EditQuoteEquipmentLineRow
                                            quoteLine={quoteLine}
                                            updateFunc={props.updateQuoteLine}
                                            removeFunc={props.removeQuoteLine}
                                            key={index}
                                        />)}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>{reduceEditQuoteEquipmentQuantity(props.quoteLinesEditData)}</th>
                                            <td></td>
                                            <td></td>
                                            <th className="text-right">{formatHours(reduceEditQuoteEquipmentTotal(props.quoteLinesEditData))} hrs</th>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div> : 
                            <InnerContainer>
                                <NoneFound 
                                    iconFont={"local_laundry_service"} 
                                    text={"No equipment found"}
                                    small
                                />
                            </InnerContainer>
                        }
                    </GridItem>
                    <GridItem>
                        <div className="flex">
                            <div>
                                <SubmitButton
                                    text="Add Equipment"
                                    clickFunc={() => setShowAddEquipment(true)}
                                    color="dark-blue"
                                    iconFont="add"
                                />   
                            </div>
                        </div>
                    </GridItem>
                </InfoGrid>
            </section>

            <AddedEquipmentTypeToList
                departmentID={props.departmentID}
                show={showAddEquipment}
                hideFunc={() => setShowAddEquipment(false)}
                addFunc={(quoteType) => {
                    props.addQuoteLine(quoteType)
                    setShowAddEquipment(false);
                }}
            />
        </>
    )
}

export default EditSiteQuoteEquipment