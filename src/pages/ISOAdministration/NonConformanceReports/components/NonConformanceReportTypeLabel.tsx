import Label from "../../../../components/ui/General/Label/Label"

const NonConformanceReportTypeLabel = (props: {
    type: number,
    hideText?: boolean
}) => {
    return (
        props.type === 1 ?
            <Label 
                text='Customer' 
                color='dark-blue' 
                iconFont='groups' 
                hideText={props.hideText}
            /> :
            props.type === 2 ?
                <Label 
                    text='Internal' 
                    color='light-blue' 
                    iconFont='account_circle' 
                    hideText={props.hideText}
                /> :
                props.type === 3 ?
                    <Label 
                        text='Supplier' 
                        color='purple' 
                        iconFont='warehouse' 
                        hideText={props.hideText}
                    /> : 
                    <Label 
                        text='Other' 
                        color='grey' 
                        iconFont='help_center' 
                        hideText={props.hideText}
                    /> 
    )
}

export default NonConformanceReportTypeLabel