import SubmitButton from "../../form/SubmitButton/SubmitButton"
import ClearAdvancedSearchButton from "../ClearAdvancedSearchButton/ClearAdvancedSearchButton"

const AdvancedSearchFooter = (props: {
    resourceName: string,
    hasAdvancedSearch: boolean,
    searchFunc: () => void,
    clearFunc: () => void
}) => {
    return (
        <>
            {props.hasAdvancedSearch ? 
                <ClearAdvancedSearchButton clearFunc={props.clearFunc}/> : null
            }
            <div style={{ marginLeft: 'auto'}}>
                <SubmitButton 
                    text={`Search ${props.resourceName}`}
                    color='dark-blue'
                    iconFont="search"
                    clickFunc={props.searchFunc}
                />
            </div>
        </>
    )
}

export default AdvancedSearchFooter