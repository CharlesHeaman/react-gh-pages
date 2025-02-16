import { ReactNode } from "react"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import getExpiryColor from "../../../../components/ui/ExpiryDateLabel/getExpiryColor"
import getExpiryStatus from "../../../../components/ui/ExpiryDateLabel/getExpiryStatus"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import SupplierManufacturerLink from "../../../../components/ui/Links/SupplierManufacturerLink"
import { GasBottle } from "../../../../types/gasBottle.types"
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import formatDate from "../../../../utils/formatDate"
import getGasBottleRentalTitle from "../../utils/getGasBottleRentalTitle"
import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"

const BottleRentalDetails = (props: {
    gasBottle: GasBottle,
    supplier: SupplierManufacturerResponseData,
    isPreview?: boolean,
}) => {

    const rentalStatus = getExpiryStatus(props.gasBottle.rental_end_date);

    const getRentalText = (): ReactNode => {
        switch (rentalStatus) {
            case -1:
                return `This bottle's rental expired on ${formatDate(props.gasBottle.rental_end_date)}.`
            case 0:
                return `This bottle's rental will expire soon on ${formatDate(props.gasBottle.rental_end_date)}.`
            default:
                return `This bottle's rental is good until ${formatDate(props.gasBottle.rental_end_date)}.`
        }
    }

    return (
        <section>
            <h2>Rental Information</h2>
            <InfoGrid>
                {!props.isPreview ? <GridItem>
                    {props.gasBottle.supplier_returned_by_id && props.gasBottle.supplier_returned_date ?
                        <InnerContainer color="purple">
                            <IconTitleText
                            iconFont='assignment_return'
                                title='Bottle Returned'
                                color="purple"
                                text={<>
                                    This bottle was returned on {formatDate(props.gasBottle.supplier_returned_date)}.
                                </>}
                            />
                        </InnerContainer> :
                        <InnerContainer color={getExpiryColor(props.gasBottle.rental_end_date)}>                                
                            <IconTitleText
                                iconFont='shop_two'
                                title={getGasBottleRentalTitle(rentalStatus)}
                                color={getExpiryColor(props.gasBottle.rental_end_date)}
                                text={getRentalText()}
                            /> 
                        </InnerContainer>
                    }
                </GridItem> : null}
                <GridItem title='Supplier'>
                    <SupplierManufacturerLink code={props.supplier.data.code} name={props.supplier.data.name}/>
                </GridItem>
                <GridItem title='Rental Start' span={2}>
                    <p>{formatDate(props.gasBottle.received_date)}</p>
                </GridItem>
                <GridItem title='Rental End' span={2}>
                    <ExpiryDateLabel date={props.gasBottle.rental_end_date}/>
                </GridItem>
                <GridItem title='Rental Period' span={2}>
                    <p>{props.gasBottle.rental_months} months</p>
                </GridItem>
                {props.gasBottle.supplier_returned_by_id ? <>
                    <GridItem title='Return Reference Number'>
                        <p>{props.gasBottle.return_reference_number}</p>
                    </GridItem>
                </> : null}
            </InfoGrid>
        </section>
    )
}

export default BottleRentalDetails