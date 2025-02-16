import { useEffect, useState } from "react";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { SystemConfigsResponseData } from "../../../types/SystemConfigs.types";
import getAPI from "../../../utils/getAPI";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import Label from "../../../components/ui/General/Label/Label";
import SupplierManufacturerLink from "../../../components/ui/Links/SupplierManufacturerLink";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import formatMoney from "../../../utils/formatMoney";
import { ProductCategoryResponseData } from "../../../types/productCategory.types";
import ProductCategoryLink from "../../ProductCategories/components/ProductCategoryLink";

const SystemPage = () => {

    // Data States
    const [isSystemLoading, setIsSystemLoading] = useState(true);
    const [systemData, setSystemData] = useState<SystemConfigsResponseData>();
    const [isGasSupplierLoading, setIsGasSupplierLoading] = useState(false);
    const [gasSupplierData, setGasSupplierData] = useState<SupplierManufacturerResponseData>();
    const [isRefrigerantProductCategoryLoading, setIsRefrigerantProductCategoryLoading] = useState(false);
    const [refrigerantProductCategory, setRefrigerantProductCategory] = useState<ProductCategoryResponseData>();
    // const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    // const [inactiveActivityData, setInactiveActivityData] = useState<SystemActivityResponseData>();

    // Edit States
    // const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getSystem();
    }, []);

    // useEffect(() => {
    //     if (SystemData === undefined) return;
    //     if (!SystemData.data.is_active) getInactiveActivity(SystemData.id);
    // }, [JSON.stringify(SystemData)]);

    const getSystem = () => {
        getAPI('system_configs', {}, (response: any) => {
            const systemData: SystemConfigsResponseData = response.data;
            setSystemData(systemData);
            systemData.data.default_gas_supplier_id && getGasSupplier(systemData.data.default_gas_supplier_id);
            systemData.data.refrigerant_product_category_id && getRefrigerantProductCategory(systemData.data.refrigerant_product_category_id);
        }, setIsSystemLoading);
    }

    const getGasSupplier = (supplierID: number) => {
        getAPI(`suppliers_manufacturers/${supplierID}`, {}, (response: any) => {
            const supplierData: SupplierManufacturerResponseData = response.data;
            setGasSupplierData(supplierData);
        }, setIsGasSupplierLoading);
    }

    const getRefrigerantProductCategory = (productCategoryID: number) => {
        getAPI(`product_categories/${productCategoryID}`, {}, (response: any) => {
            const productCategoryData: ProductCategoryResponseData = response.data;
            setRefrigerantProductCategory(productCategoryData);
        }, setIsRefrigerantProductCategoryLoading);
    }

    // const getInactiveActivity = (SystemID: number) => {
    //     getAPI(`System_activity`, {
    //         System_id: SystemID,
    //         type: 2,
    //         perPage: 1
    //     }, (response: any) => {
    //         const SystemActivityData: SystemActivityCollectionResponse = response.data;
    //         setInactiveActivityData(SystemActivityData.data[0]);
    //     }, setIsInactiveActivityLoading)    
    // } 

    const isLoading = (
        isSystemLoading ||
        isGasSupplierLoading || 
        isRefrigerantProductCategoryLoading
    )

    return (
        <>
            <OuterContainer
                title='System Administration'
                maxWidth={1000}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        {!isLoading && systemData ? <>
                            <section>
                                <h2>System Seeds</h2>
                                <InfoGrid columnCount={4}>
                                    <GridItem title='Bottle Seed' span={1}>
                                        <Label 
                                            iconFont="propane_tank" 
                                            text={systemData.data.bottled_seed.toString()}
                                            color="no-color"
                                        />
                                    </GridItem>
                                    <GridItem title='Bottle Returns Seed' span={1}>
                                        <Label 
                                            iconFont="assignment_return" 
                                            text={systemData.data.bottle_returns_seed.toString()}
                                            color="no-color"
                                        />
                                    </GridItem>
                                    <GridItem title='Requisition Seed' span={1}>
                                        <Label 
                                            iconFont="all_inbox" 
                                            text={systemData.data.requisition_seed.toString()}
                                            color="no-color"
                                        />
                                    </GridItem>
                                    <GridItem title='Plant/Tools Seed' span={1}>
                                        <Label 
                                            iconFont="handyman" 
                                            text={systemData.data.plant_tools_seed.toString()}
                                            color="no-color"
                                        />
                                    </GridItem>
                                </InfoGrid>
                            </section>
                            <hr/>
                            <section>
                                <h2>Gas Bottles</h2>
                                <InfoGrid>
                                    <GridItem title='Default Gas Supplier' span={3}>
                                        {gasSupplierData ? 
                                            <SupplierManufacturerLink code={gasSupplierData.data.code} name={gasSupplierData.data.name}/> :
                                            <p>None</p>
                                        }
                                    </GridItem>
                                    <GridItem title='Refrigerant Product Category' span={3}>
                                        {refrigerantProductCategory ?
                                            <ProductCategoryLink productCategoryID={refrigerantProductCategory.id} name={refrigerantProductCategory.data.name}/> :
                                            <p>None</p>
                                        }
                                    </GridItem>
                                </InfoGrid>
                            </section>
                            <hr/>
                            <section>
                                <h2>Costing</h2>
                                <InfoGrid>
                                    <GridItem title='Mileage Cost Rate' span={3}>
                                        <p>{formatMoney(systemData.data.mileage_cost_rate)}</p>
                                    </GridItem>
                                </InfoGrid>
                            </section>
                            <hr/>
                            <section>
                                <h2>Timegrids</h2>
                                <InfoGrid>
                                    <GridItem title='Required Authorisation Signatures' span={3}>
                                        <p>{`${systemData.data.required_timegrid_authorisation_signatures} signatures`}</p>
                                    </GridItem>
                                </InfoGrid>
                            </section>
                        </> : null}
                    </div>
                    {/* <div className="page-side">
                    </div> */}
                </div>
            </OuterContainer>
        </>
    )
}

export default SystemPage