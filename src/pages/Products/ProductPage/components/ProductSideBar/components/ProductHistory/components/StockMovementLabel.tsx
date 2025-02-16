import Label from "../../../../../../../../components/ui/General/Label/Label"

const StockMovementLabel = (props: {
    type: number
}) => {
    const getLabel = () => {
        switch (props.type) {
            case 1:
                return <Label text="Purchase Order" iconFont="receipt_long" color="light-green"/>
            case 2:
                return <Label text="Bottle Admin" iconFont="propane_tank" color="dark-blue"/>
            case 3:
                return <Label text="Manual Adjustment" iconFont="auto_graph" color="orange"/>
            case 4:
                return <Label text="Initial Stock Level" iconFont="add" color="dark-blue"/>
            case 5:
                return <Label text="Stocktake" iconFont="fact_check" color="orange"/>
            default:
                return <Label text="Requisition" iconFont="all_inbox" color="red"/>
        }
    }

    return getLabel();
}
    
export default StockMovementLabel