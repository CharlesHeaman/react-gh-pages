import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import formatMoney from "../../../../utils/formatMoney"
import getQuoteMileageTotalCost from "../utils/getQuoteMileageTotalCost"
import getQuoteTravelTotalCost from "../utils/getQuoteTravelTotalCost"
import getVisitsMax from "../utils/getVisitsMax"
import EquipmentQuoteMileageRow from "./EngineerQuoteMileageRow"
import EquipmentQuoteTravelRow from "./EquipmentQuoteTravelRow"

const EquipmentQuoteTravelAndMileage = (props: {
    equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData,
}) => {
    const showEngineer = props.equipmentQuoteDetails.data.number_of_engineers > 0;
    const showMate = props.equipmentQuoteDetails.data.number_of_mates > 0;

    const mileageTotal = getQuoteMileageTotalCost(
        props.equipmentQuoteDetails.data.mileage, 
        props.equipmentQuoteDetails.data.mileage_rate, 
        getVisitsMax(props.equipmentQuoteDetails.data.visits), 
        props.equipmentQuoteDetails.data.number_of_vans
    );

    const travelTotal = getQuoteTravelTotalCost(props.equipmentQuoteDetails);
    
    return (
        <section>
            <h2>Travel and Mileage</h2>
            <InfoGrid columnCount={4}>
                <GridItem title='Mileage' span={1}>
                    <p>{props.equipmentQuoteDetails.data.mileage} mi</p>
                </GridItem>
                <GridItem title='Travel Time' span={1}>
                    <p>{props.equipmentQuoteDetails.data.travel_time} hrs</p>
                </GridItem>
                <GridItem title='No. of Vans' span={1}>
                    <div className="flex">
                        <span className="material-icons">directions_car</span>
                        {props.equipmentQuoteDetails.data.number_of_vans}
                    </div>
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
                                        miles={props.equipmentQuoteDetails.data.mileage}
                                        mileageRate={props.equipmentQuoteDetails.data.mileage_rate}
                                        visits={getVisitsMax(props.equipmentQuoteDetails.data.visits)}
                                        vans={props.equipmentQuoteDetails.data.number_of_vans}
                                    />
                                    {showEngineer ? <>
                                        <EquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.equipmentQuoteDetails.data.visits[0]}
                                        />
                                        {props.equipmentQuoteDetails.data.is_out_of_hours && <EquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.equipmentQuoteDetails.data.visits[1]}
                                        />}
                                        {props.equipmentQuoteDetails.data.is_double_time && <EquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.equipmentQuoteDetails.data.visits[2]}
                                        />}
                                    </> : null}
                                    {showMate ? <>
                                        <EquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.equipmentQuoteDetails.data.visits[3]}
                                        />
                                        {props.equipmentQuoteDetails.data.is_out_of_hours && <EquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.equipmentQuoteDetails.data.visits[4]}
                                        />}
                                        {props.equipmentQuoteDetails.data.is_double_time && <EquipmentQuoteTravelRow
                                            equipmentQuoteDetails={props.equipmentQuoteDetails}
                                            quoteVisits={props.equipmentQuoteDetails.data.visits[5]}
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

export default EquipmentQuoteTravelAndMileage