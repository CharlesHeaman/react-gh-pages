import Label from "../../../../../../components/ui/General/Label/Label"

const getTrackerEventLabel = (type: string) => {
    switch (type) {
        case 'Home': 
            return <Label text='Home' color='light-blue'/>
        case 'Ignition On':
            return <Label text='Ignition On' color='light-green'/>
        case 'Geofence Entered':
            return <Label text='Geofence Triggered' color='orange'/>
        case 'Ignition Off':
            return <Label text='Ignition Off' color='red'/>
    }
}

export default getTrackerEventLabel