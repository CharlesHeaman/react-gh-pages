import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProductCategorySideBarSkeleton from "./components/ProductCategorySideBarSkeleton";
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";
import { ProductCategoryResponseData } from "../../../types/productCategory.types";
import getAPI from "../../../utils/getAPI";
import ProductCategoryDeactivate from "./components/ProductCategoryDeactivate";
import { ProductCollectionResponse } from "../../../types/products.types";
import ProductCategoryAssociatedData from "./components/ProductCategoryAssociatedData";
import { ProductCategoryActivityCollectionResponse } from "../../../types/productCategoryActivity.types";
import ExportResource from "../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";

const ProductCategorySideBar = (props: {
    productCategory: ProductCategoryResponseData | undefined,
    setProductCategoryData: Dispatch<SetStateAction<ProductCategoryResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {

    const [isProductLoading, setIsProductLoading] = useState(true);
    const [productData, setProductData] = useState<ProductCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<ProductCategoryActivityCollectionResponse>();

    useEffect(() => {
        if (props.productCategory?.id === undefined) return;
        getProduct(props.productCategory?.id);
    }, [props.productCategory?.id]);

    useEffect(() => {
        if (props.productCategory?.id === undefined) return;
        getActivity(props.productCategory.id);
    }, [JSON.stringify(props.productCategory)]);

    const getProduct = (productCategoryID: number) => {
        getAPI(`products`, {
            category_id: productCategoryID,
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData);
        }, setIsProductLoading);
    }

    const getActivity = (productCategoryID: number) => {
        getAPI(`product_category_activity`, {
            product_category_id: productCategoryID,
            perPage: 1
        }, (response: any) => {
            const productCategoryActivityData: ProductCategoryActivityCollectionResponse = response.data;
            setActivityData(productCategoryActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isProductLoading || 
        isActivityLoading
    )

    return (
        !isSideBarLoading && props.productCategory && productData && activityData ? 
            !props.isEditMode ?  <>
                {props.productCategory.data.is_active ?
                    <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                        <SideBarModule title='Actions'>
                            <SideBarButton 
                                text='Edit Product Category'
                                color="orange"
                                iconFont='edit'
                                clickEvent={() => props.setIsEditMode(true)}
                            />
                        </SideBarModule>        
                    </PermsProtectedComponent>
                : null}
                <ProductCategoryAssociatedData 
                    productCategoryID={props.productCategory.id} 
                    productCount={productData.total_count}          
                    activityCount={activityData.total_count}      
                />
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <ProductCategoryDeactivate 
                        productCategoryID={props.productCategory.id} 
                        setProductCategoryData={props.setProductCategoryData}
                        reactivate={!props.productCategory.data.is_active} 
                    /> 
                </PermsProtectedComponent>

                <ExportResource
                    resourceName="product category"
                    resourceData={props.productCategory}
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
        <ProductCategorySideBarSkeleton/>
    )
}

export default ProductCategorySideBar