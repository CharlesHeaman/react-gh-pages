import getGasBottleURL from "../utils/getGasBottleURL"

const GasBottleLink = (props: {
    code: string,
    isConsumable?: boolean,
}) => {
    return (
        <a 
            href={getGasBottleURL(props.code, props.isConsumable)}
            className="icon-link"
        >   
            <span className="material-icons">propane_tank</span>
            <span>{props.code}</span>
        </a>
    )
}

export default GasBottleLink