import Label from "../components/ui/General/Label/Label"

function getDepartmentLabel(deptID) {
    switch (deptID) {
        case 1:
            return <Label text='Service' color='light-blue'/>
        case 2:
            return <Label text='Heating' color='red'/>
        case 3:
            return <Label text='Electrical' color='orange'/>
        case 4:
            return <Label text='Projects' color='dark-blue'/>
        case 5:
            return <Label text='Facilities' color='purple'/>
        case 6:
            return <Label text='Ducting' color='light-green'/>
        default:
            return <Label text='Unknown' color='grey'/>
    }
}

export default getDepartmentLabel