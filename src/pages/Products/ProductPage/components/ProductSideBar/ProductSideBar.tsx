import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { ProductActivityCollectionResponse } from "../../../../../types/productActivity.types"
import { ProductCollectionResponse, ProductResponseData } from "../../../../../types/products.types"
import { PurchaseOrderCollectionResponse } from "../../../../../types/purchaseOrder.types"
import { RequisitionCollectionResponse } from "../../../../../types/requisition.types"
import getAPI from "../../../../../utils/getAPI"
import ProductActions from "./components/ProductActions/ProductActions"
import ProductAssociatedData from "./components/ProductAssociatedData/ProductAssociatedData"
import ProductDeactivate from "./components/ProductDeactivate/ProductDeactivate"
import ProductStockHistory from "./components/ProductHistory/ProductHistory"
import ProductSideBarSkeleton from "./components/ProductSideBarSkeleton"
import { StockMovementsCollectionResponse } from "../../../../../types/stockMovements.types"
import ExportResource from "../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent"

const ProductSideBar = (props: {
    product: ProductResponseData | undefined,
    setProductData: Dispatch<SetStateAction<ProductResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {

    // Data States 
    const [isSundryLoading, setIsSundryLoading] = useState(true);
    const [sundryData, setSundryData] = useState<ProductCollectionResponse>();
    const [isRequisitionsLoading, setIsRequisitionsLoading] = useState(false);
    const [requisitionData, setRequisitionData] = useState<RequisitionCollectionResponse>();
    const [isPurchaseOrdersLoading, setIsPurchaseOrdersLoading] = useState(false);
    const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderCollectionResponse>();
    const [isStockMovementsLoading, setIsStockMovementsLoading] = useState(true);
    const [stockMovementsData, setStockMovementsData] = useState<StockMovementsCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<ProductActivityCollectionResponse>();

    useEffect(() => {
        if (props.product && props.product.id) {
            getSundryProducts(props.product.id);
            getRequisitions(props.product.id);
            getPurchaseOrders(props.product.id);
        }
    }, [props.product && props.product.id]);
    
    useEffect(() => {
        if (props.product?.id === undefined) return;
        getActivity(props.product.id);
        getStockMovements(props.product.id);
    }, [JSON.stringify(props.product)]);

    const getSundryProducts = (parentProductID: number) => {
        getAPI('products', {
            parent_product_id: parentProductID,
            is_sundry: true,
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setSundryData(productData);
        }, setIsSundryLoading);
    }

    const getRequisitions = (productID: number) => {
        getAPI('requisitions', {
            line_product_id: productID,
            perPage: 1
        }, (response: any) => {
            const requisitionData: RequisitionCollectionResponse = response.data;
            setRequisitionData(requisitionData);
        }, setIsRequisitionsLoading);
    }

    const getPurchaseOrders = (productID: number) => {
        getAPI('purchase_orders', {
            product_id: productID,
            perPage: 1
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading);
    }

    const getStockMovements = (productID: number) => {
        getAPI('stock_movements', {
            product_id: productID,
            perPage: 1
        }, (response: any) => {
            const stockMovementData: StockMovementsCollectionResponse = response.data;
            setStockMovementsData(stockMovementData);
        }, setIsStockMovementsLoading);
    }

    const getActivity = (productID: number) => {
        getAPI(`product_activity`, {
            product_id: productID,
            perPage: 1
        }, (response: any) => {
            const productActivityData: ProductActivityCollectionResponse = response.data;
            setActivityData(productActivityData);
        }, setIsActivityLoading)    
    } 

    const isLoading = (
        isSundryLoading || 
        isRequisitionsLoading ||
        isPurchaseOrdersLoading ||
        isStockMovementsLoading || 
        isActivityLoading 
    )

    return (
        !isLoading && props.product && sundryData && requisitionData && purchaseOrderData && stockMovementsData && activityData ? 
            !props.isEditMode ? <>
                {props.product.data.is_active ?
                    <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                        <ProductActions
                            productID={props.product.id}
                            product={props.product}
                            orderThreshold={props.product.data.order_threshold}
                            setProductData={props.setProductData}
                            setIsEditMode={() => props.setIsEditMode(true)}  
                            isStock={props.product.data.is_stock}
                            isSundry={props.product.data.is_sundry}
                            sundryCount={sundryData.total_count}
                        />
                    </PermsProtectedComponent>
                : null}
                <ProductAssociatedData
                    productID={props.product.id}
                    sundryCount={sundryData.total_count}
                    activityCount={activityData.total_count}
                    isSundry={props.product.data.is_sundry}
                    isStock={props.product.data.is_stock}
                />
                <ProductStockHistory
                    productID={props.product.id}
                    requisitionCount={requisitionData.total_count}
                    purchaseOrderCount={purchaseOrderData.total_count}
                    stockMovementCount={stockMovementsData.total_count}
                    isSundry={props.product.data.is_sundry}
                    isStock={props.product.data.is_stock}
                />
                <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                    <ProductDeactivate
                        productID={props.product.id} 
                        setProductData={props.setProductData}
                        reactivate={!props.product.data.is_active} 
                        sundryCount={sundryData.total_count}
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceName="product"
                    resourceData={props.product}
                />
            </> 
            :
            // Edit Mode
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Abandon Edit'
                    color="grey"
                    iconFont='cancel'
                    clickEvent={() => props.setIsEditMode(false)}
                />
            </SideBarModule>
        : 
        // Skeleton
        <ProductSideBarSkeleton/>

    )
}

export default ProductSideBar