import Label from "../../../../components/ui/General/Label/Label"

const RefrigerantGasAirTypeLabel = (props: {
    isConsumable: boolean
}) => {
    return (
        props.isConsumable ?
            <Label text="Gas/Air" color="dark-blue" iconFont="co2"/> :
            <Label text="Refrigerant" color="purple" iconFont="propane"/>
    )
}

export default RefrigerantGasAirTypeLabel