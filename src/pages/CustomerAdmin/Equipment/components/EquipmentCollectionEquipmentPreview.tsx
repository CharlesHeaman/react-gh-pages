import { Fragment } from "react"
import Label from "../../../../components/ui/General/Label/Label"
import SiteLink from "../../../../components/ui/Links/SiteLink"
import { CreateEquipmentCollectionAttributes } from "../../../../types/equipment.types"
import { SiteResponseData } from "../../../../types/sites.types"

const EquipmentCollectionEquipmentPreview = (props: {
    site: SiteResponseData,
    equipmentType: CreateEquipmentCollectionAttributes
}) => {
    const quantity = !isNaN(parseInt((props.equipmentType.quantity))) ? parseInt(props.equipmentType.quantity) : 1;

    return (
        <>
            {[...Array(quantity)].map((_, index) =>
                <Fragment key={index}>
                    <tr>
                        <td>{props.equipmentType.slave_quantity > 0 || props.equipmentType.variable_slave_quantity.length > 0 ?
                            <Label iconFont="arrow_downward" color="dark-blue"/> :
                            null
                        }</td>
                        <td className="text-left"><SiteLink code={props.site.data.code} name={props.site.data.name}/></td>
                        <td>
                            <Label 
                            text={props.equipmentType.equipment_type_name}
                            iconFont="local_laundry_service"
                            color="purple"
                        /></td>
                    </tr>
                    {props.equipmentType.slave_quantity > 0 ?
                        [...Array(props.equipmentType.slave_quantity)].map((_, index) => 
                            <tr key={index}>
                                <td><Label iconFont="share" color="light-blue"/></td>
                                <td className="text-left"><SiteLink code={props.site.data.code} name={props.site.data.name}/></td>
                                <td>
                                    <Label 
                                        text="FCU"
                                        iconFont="local_laundry_service"
                                        color="grey"
                                    />
                                </td>
                            </tr>
                        )
                    : null}
                    {props.equipmentType.variable_slave_quantity.length > index && parseInt(props.equipmentType.variable_slave_quantity[index]) > 0 ?
                        [...Array(parseInt(props.equipmentType.variable_slave_quantity[index]))].map((_, index) => 
                            <tr key={index}>
                                <td><Label iconFont="share" color="light-blue"/></td>
                                <td className="text-left"><SiteLink code={props.site.data.code} name={props.site.data.name}/></td>
                                <td>
                                    <Label 
                                        text="FCU"
                                        iconFont="local_laundry_service"
                                        color="grey"
                                    />
                                </td>
                            </tr>
                        )
                    : null}
                </Fragment>
            )}
        </>
    )
}

export default EquipmentCollectionEquipmentPreview