import Label from "../../../../../../../../components/ui/General/Label/Label"

const ProductActivityLabel = (props: {
    action: number
}) => {
    const getLabel = () => {
        switch (props.action) {
            case 1:
                return <Label text="Edit" iconFont="edit" color="orange"/>
            case 2:
                return <Label text="Deactivate" iconFont="highlight_off" color="red"/>
            case 3:
                return <Label text="Reactivate" iconFont="check_circle" color="light-green"/>
            case 4:
                return <Label text="Order Threshold Updated" iconFont="data_thresholding" color="no-color"/>
            case 5:
                return <Label text="Order Threshold Removed" iconFont="not_interested" color="no-color"/>
            case 6:
                return <Label text="Image Uploaded" iconFont="add_photo_alternate" color="no-color"/>
            case 7:
                return <Label text="Pricing Updated" iconFont="sell" color="no-color"/>
            case 8:
                return <Label text="Stock Level Adjusted" iconFont="auto_graph" color="no-color"/>
            case 9:
                return <Label text="Converted to Stock" iconFont="inbox" color="purple"/>
            default:
                return <Label text="Create" iconFont="add" color="dark-blue"/>
        }
    }

    return getLabel();
}
    
export default ProductActivityLabel