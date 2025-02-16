import { ReactNode } from "react"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel"
import Label from "../../../../components/ui/General/Label/Label"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import SupplierManufacturerLink from "../../../../components/ui/Links/SupplierManufacturerLink"
import { DepartmentResponseData } from "../../../../types/department.types"
import { ProductCategoryResponseData } from "../../../../types/productCategory.types"
import { Product, ProductResponseData } from "../../../../types/products.types"
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import formatMoney from "../../../../utils/formatMoney"
import ProductCategoryLink from "../../../ProductCategories/components/ProductCategoryLink"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"
import ProductLink from "../../components/ProductLink"
import getOrderThresholdColor from "../../utils/getOrderThresholdColor"
import getOrderThresholdStatus from "../../utils/getOrderThresholdStatus"
import getOrderThresholdTitle from "../../utils/getOrderThresholdTitle"
import getNettPrice from "../../utils/getNettPrice"
import getAdjustedPrice from "../../utils/getAdjustedPrice"

const ProductInformation = (props: {
    productData: Product,
    department: DepartmentResponseData | undefined,
    supplier: SupplierManufacturerResponseData | undefined,
    manufacturer: SupplierManufacturerResponseData | undefined,
    parentProduct: ProductResponseData | undefined,
    category: ProductCategoryResponseData,
    isPreview?: boolean,
    lastDeactivate: Date | undefined
}) => {
    const orderThresholdStatus = getOrderThresholdStatus(props.productData.stock_level, props.productData.order_threshold, props.productData.order_outstanding);    

    const getOrderThresholdText = (): ReactNode => {
        switch (orderThresholdStatus) {
            case -1:
                return <>
                    This product's stock level is below the reorder level.
                </>
            case 0:
                return <>
                    This product's stock level is nearing the reorder level.
                </>
            default:
                return <>
                    This product's stock level is good.
                </>
        }
    }

    return (

        <>
            {!props.productData.is_active ? <InactiveStatus resourceName='Product' inactiveDate={props.lastDeactivate}/> : null}
            {props.productData.is_active && props.productData.order_threshold && props.productData.is_stock ? <section>
                <InnerContainer color={getOrderThresholdColor(props.productData.stock_level, props.productData.order_threshold, props.productData.order_outstanding)}>
                    <IconTitleText
                        title={getOrderThresholdTitle(orderThresholdStatus)}
                        text={getOrderThresholdText()}
                        iconFont={"data_thresholding"}
                        color={getOrderThresholdColor(props.productData.stock_level, props.productData.order_threshold, props.productData.order_outstanding)}
                    />
                </InnerContainer>
            </section> : null}
            <section>
                <h2>Product Details</h2>
                <InfoGrid>
                    <GridItem title='Description'>
                        <p>{props.productData.description}</p>
                    </GridItem>
                    <GridItem title='Size or Model' span={3}>
                        <p>{props.productData.size_or_model}</p>
                    </GridItem>
                    <GridItem title='Unit' span={3}>
                        <p>{props.productData.unit}</p>
                    </GridItem>
                    <GridItem title='Category' span={3}>
                        <p><ProductCategoryLink productCategoryID={props.category.id} name={props.category.data.name}/></p>
                    </GridItem>
                    <GridItem title='Primary Department' span={3}>
                        {props.department ?
                            <DepartmentLabel department={props.department}/> :
                            'None'}
                    </GridItem>
                    {props.parentProduct ? 
                        <GridItem title='Parent Product'>
                            <p><ProductLink 
                                productID={props.parentProduct.id} 
                                description={props.parentProduct.data.description}
                                isStock={props.parentProduct.data.is_stock}
                            /></p>
                        </GridItem> :
                        null
                    }
                    {!props.isPreview && <GridItem title='Image'>
                        {props.productData.image_file_name ? 
                            <a href={`${process.env.REACT_APP_API_URL}/product_images/${props.productData.image_file_name}?${Date.now()}`} target="_blank">
                                <img 
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '200px'
                                    }}
                                    src={`${process.env.REACT_APP_API_URL}/product_images/${props.productData.image_file_name}?${Date.now()}`} 
                                    alt="Not Found"
                                /> 
                            </a> :
                            <Label bigIcon iconFont="hide_image" color="grey"/>
                        }
                    </GridItem>}
                </InfoGrid>
            </section>
            {props.productData.is_stock && !props.productData.is_sundry ? <>
                <hr/>
                <section>
                    <h2>Stock Information</h2>
                    <InfoGrid>
                        <GridItem title='Stock Level' span={3}>
                            <p>
                                <span style={{ fontSize: '1.75em', fontWeight: 600}}>{props.productData.stock_level}</span>
                                {props.productData.order_outstanding && props.productData.order_outstanding > 0 ? <span style={{ color: 'rgb(var(--dark-blue-hl))', fontWeight: 600}}> (+{props.productData.order_outstanding} ordered)</span> : null}                           
                            </p>
                        </GridItem>
                        <GridItem title='Reorder Level' span={3}>
                            <p>{props.productData.order_threshold ? <Label text={props.productData.order_threshold.toString()} iconFont="data_thresholding" color="grey"/> : 'None'}</p>
                        </GridItem>
                        <GridItem title='Stores Area' span={2}>
                            <p>{props.productData.stores_area ? props.productData.stores_area : 'None'}</p>
                        </GridItem>
                        <GridItem title='Stores Rack' span={2}>
                            <p>{props.productData.stores_rack ? props.productData.stores_rack : 'None'}</p>
                        </GridItem>
                        <GridItem title='Stores Bin' span={2}>
                            <p>{props.productData.stores_bin ? props.productData.stores_bin : 'None'}</p>
                        </GridItem>
                        {/* <GridItem title='Alternative Stores Location'>
                            <p>{props.productData.alternative_stores_location ? props.productData.alternative_stores_location : 'None'}</p>
                        </GridItem> */}
                    </InfoGrid>
                </section>
            </> : null}
            {!props.productData.is_sundry && <>
                <hr />
                <section>
                    <h2>Order Information</h2>
                    <InfoGrid>
                        <GridItem title='Supplier' span={3}>
                            <p>{props.supplier ?
                                <SupplierManufacturerLink code={props.supplier.data.code} name={props.supplier.data.name} /> :
                                'None'}</p>
                        </GridItem>
                        <GridItem title='Manufacturer' span={3}>
                            <p>{props.manufacturer ? 
                                <SupplierManufacturerLink code={props.manufacturer.data.code} name={props.manufacturer.data.name}/> : 
                                props.productData.manufacturer.length > 0 ? 
                                    props.productData.manufacturer :
                                    'Unknown'
                            }</p>
                        </GridItem>
                        <GridItem title='Catalogue Number' span={3}>
                            <p>{props.productData.catalogue_number}</p>
                        </GridItem>
                        <GridItem title='Manufacturer Part Number' span={3}>
                            <p>{props.productData.part_number}</p>
                        </GridItem>
                    </InfoGrid>
                </section>
            </>}
            <hr/>
            <section>
                <h2>Pricing</h2>
                <InfoGrid>
                    <GridItem title='List Price' span={2}>
                        <p>{formatMoney(props.productData.price)}</p>
                    </GridItem>
                    {!props.productData.is_sundry ? 
                        <>
                            <GridItem title='Nett Price' span={2}>
                                <p>{formatMoney(getNettPrice(props.productData.price, props.productData.percentage_discount))}</p>
                            </GridItem>
                            <GridItem title='Adjusted Price' span={2}>
                                <p>{formatMoney(getAdjustedPrice(props.productData.price, props.productData.percentage_markup))}</p>
                            </GridItem>
                            <GridItem span={2}>

                            </GridItem>
                            <GridItem title='Discount' span={2}>
                                <p>{props.productData.percentage_discount > 0 ? <Label text={`${props.productData.percentage_discount}%`} color='red' iconFont='discount'/> : <Label text="0%" color='grey' iconFont='discount'/>}</p>
                            </GridItem>
                            <GridItem title='Uplift' span={2}>
                                <p>{props.productData.percentage_markup > 0 ? <Label text={`${props.productData.percentage_markup}%`} color='light-green' iconFont='arrow_circle_up'/> : <Label text="0%" color='grey' iconFont='discount'/>}</p>
                            </GridItem>
                        </> : 
                        <GridItem title='Parent Product Price Percentage' span={4}>
                            <p>{props.productData.parent_price_percentage}%</p>
                        </GridItem>
                
                    }
                </InfoGrid>
            </section>
        </>
    )
}

export default ProductInformation