import Label from "../../../../components/ui/General/Label/Label";

const getChangelogSystemLabel = (system: number) => {
    switch (system) {
        case 0:
            return <Label text='' color="no-color" iconFont='phone_android' title="Mobile Client"/>
        case 1:
            return <Label text='' color="no-color" iconFont='keyboard' title="Admin Client"/>
        default:
            return <Label text='' color="no-color" iconFont='api' title="API"/>
    }
}

export default getChangelogSystemLabel