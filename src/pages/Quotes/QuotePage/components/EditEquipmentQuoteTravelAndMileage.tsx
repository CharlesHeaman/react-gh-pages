import { ChangeEvent } from "react"
import HoursInput from "../../../../components/form/HoursInput/HoursInput"
import IntegerInput from "../../../../components/form/IntegerInput/IntegerInput"
import MilesInput from "../../../../components/form/MilesInput/MilesInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { DepartmentResponseData } from "../../../../types/department.types"
import formatMoney from "../../../../utils/formatMoney"
import getQuoteMateCount from "../utils/getQuoteMateCount"
import getEditQuoteMileageCount from "../utils/getEditQuoteMileageCount"
import getQuoteMileageTotalCost from "../utils/getQuoteMileageTotalCost"
import getEditQuoteTravelTotalCost from "../utils/getEditQuoteTravelTotalCost"
import getEditQuoteVanCount from "../utils/getEditQuoteVanCount"
import getEditVisitsMax from "../utils/getEditVisitsMax"
import EquipmentQuoteMileageRow from "./EngineerQuoteMileageRow"
import EditEquipmentQuoteTravelRow from "./EditEquipmentQuoteTravelRow"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import getQuoteEngineerCount from "../utils/getQuoteEngineerCount"
import { EditEquipmentQuoteDetails, EditQuoteVisits } from "../../../../types/quotedEquipment.types"

const EditEquipmentQuoteTravelAndMileage = (props: {
    equipmentQuoteDetails: EditEquipmentQuoteDetails,
    quoteVisits: Array<EditQuoteVisits>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
}) => {
    const showEngineer = getQuoteEngineerCount(props.equipmentQuoteDetails) > 0;
    const showMate = getQuoteMateCount(props.equipmentQuoteDetails) > 0;


    const mileageTotal = getQuoteMileageTotalCost(
        getEditQuoteMileageCount(props.equipmentQuoteDetails), 
        props.equipmentQuoteDetails.mileage_rate, 
        getEditVisitsMax(props.quoteVisits), 
        getEditQuoteVanCount(props.equipmentQuoteDetails)
    );

    const travelTotal = getEditQuoteTravelTotalCost(props.equipmentQuoteDetails, props.quoteVisits);
    
    return (
        <section>
            <h2>Travel and Mileage</h2>
            <InfoGrid columnCount={4}>
                <GridItem title='Mileage' span={1}>
                    <MilesInput 
                        name={"mileage"} 
                        value={props.equipmentQuoteDetails.mileage} 
                        label={"Mileage"} 
                        updateFunc={props.updateParams} 
                        required
                        hasSubmitted={false}
                    /> 
                </GridItem>
                <GridItem title='Travel Time' span={1}>
                    <HoursInput 
                        name={"travel_time"} 
                        value={props.equipmentQuoteDetails.travel_time} 
                        label={"Travel time"} 
                        updateFunc={props.updateParams} 
                        required
                        hasSubmitted={false}
                    /> 
                </GridItem>
                <GridItem title='Number of Vans' span={1}>
                    <IntegerInput   
                        name="number_of_vans"
                        value={props.equipmentQuoteDetails.number_of_vans} 
                        label={"Number of vans"} 
                        updateFunc={props.updateParams} 
                        prefixIcon="directions_car"
                        required
                        hasSubmitted={true}
                        maxWidth={65}
                    /> 
                </GridItem>
                <GridItem>
                    {showEngineer || showMate ?
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <th>Travel Type</th>
                                    <th>Quantity</th>
                                    <th>Rate</th>
                                    <th>Journeys</th>
                                    <th>Total</th>
                                </thead>
                                <tbody>
                                    <EquipmentQuoteMileageRow
                                        miles={getEditQuoteMileageCount(props.equipmentQuoteDetails)}
                                        mileageRate={props.equipmentQuoteDetails.mileage_rate}
                                        visits={getEditVisitsMax(props.quoteVisits)}
                                        vans={getEditQuoteVanCount(props.equipmentQuoteDetails)}
                                    />
                                    {showEngineer ? <> 
                                        <EditEquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.quoteVisits[0]}
                                        />
                                        {props.equipmentQuoteDetails.is_out_of_hours && <EditEquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.quoteVisits[1]}
                                        />}
                                        {props.equipmentQuoteDetails.is_double_time && <EditEquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.quoteVisits[2]}
                                        />}
                                    </> : null}
                                    {showMate ? <>
                                        <EditEquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.quoteVisits[3]}
                                        />
                                        {props.equipmentQuoteDetails.is_out_of_hours && <EditEquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.quoteVisits[4]}
                                        />}
                                        {props.equipmentQuoteDetails.is_double_time && <EditEquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.quoteVisits[5]}
                                        />}
                                    </> : null}
                                </tbody>
                                <tfoot>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <th className="text-right">{formatMoney(mileageTotal + travelTotal)}</th>
                                </tfoot>
                            </table>
                        </div> :
                        <InnerContainer>
                            <NoneFound
                                iconFont="directions_car"
                                text="No travel found"
                                small
                            />
                        </InnerContainer>        
                    }                
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default EditEquipmentQuoteTravelAndMileage