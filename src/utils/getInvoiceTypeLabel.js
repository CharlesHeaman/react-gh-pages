import Label from "../components/ui/General/Label/Label";

function getInvoiceTypeLabel(invType, ticketType) {
    if (ticketType == 0) {
        switch (invType) {
            case 1:
                return <Label text='Non-Contract Rate' color='grey'/>       
            case 2:
                return <Label text='Parts Only - A-Type Contract' color='grey'/>       
            case 3:
                return <Label text='A-Type Contract Rate' color='grey'/>       
            case 4:
                return <Label text='B-Type Contract Rate' color='grey'/>       
            case 5:
                return <Label text='Warranty I' color='grey'/>       
            case 6:
                return <Label text='Warranty S' color='grey'/>       
            case 7:
                return <Label text='Quoted' color='grey'/>       
            case 8:
                return <Label text='CASH SALE' color='grey'/>       
            case 9:
                return <Label text='Zero Invoice - Charge Costs to Contract' color='grey'/>       
            case 10:
                return <Label text='C-Type Contract Rate' color='grey'/>     
            default:
                return <Label text='Unknown' color='grey'/>  
        }
    } else {
        return <Label text='Contracted' color='grey'/>  
    }
}

export default getInvoiceTypeLabel