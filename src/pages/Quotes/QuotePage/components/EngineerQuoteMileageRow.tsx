import Label from "../../../../components/ui/General/Label/Label"
import formatMiles from "../../../../utils/formatMiles"
import formatMoney from "../../../../utils/formatMoney"
import getQuoteMileageTotalCost from "../utils/getQuoteMileageTotalCost"

const EquipmentQuoteMileageRow = (props: {
    miles: number,
    mileageRate: number,
    visits: number,
    vans: number
}) => {
    return (
        <tr>
            <td>
                <Label
                    text='Mileage'
                    color='no-color'
                    iconFont="directions_car"
                />
            </td>
            <td className="text-right">{formatMiles(props.miles)} mi</td>
            <td className="text-right">{formatMoney(props.mileageRate)}</td>
            
            <td><div className="flex">
                <div className="flex">
                    <span className="material-icons">timeline</span>
                    {props.visits}
                </div>
                x
                <div className="flex">
                    <span className="material-icons">directions_car</span>
                    {props.vans}
                </div>
            </div></td>
            <td className="text-right">{formatMoney(getQuoteMileageTotalCost(props.miles, props.mileageRate, props.visits, props.vans))}</td>
        </tr>
    )
}

export default EquipmentQuoteMileageRow