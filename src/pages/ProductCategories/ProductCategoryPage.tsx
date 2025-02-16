import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import InactiveLabel from "../../components/ui/InactiveLabel/InactiveLabel";
import { ProductCategoryResponseData } from "../../types/productCategory.types";
import { ProductCategoryActivityCollectionResponse, ProductCategoryActivityResponseData } from "../../types/productCategoryActivity.types";
import getAPI from "../../utils/getAPI";
import EditProductCategoryForm from "./components/EditProductCategoryForm";
import ProductCategoryInformation from "./components/ProductCategoryInformation";
import ProductCategoryInformationSkeleton from "./components/ProductCategoryInformationSkeleton";
import ProductCategorySideBar from "./components/ProductCategorySideBar";

const ProductCategoryPage = () => {
    const { productCategoryID } = useParams();

    // Data States
    const [isProductCategoryLoading, setIsProductCategoryLoading] = useState(true);
    const [productCategoryData, setProductCategoryData] = useState<ProductCategoryResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<ProductCategoryActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getProductCategoryData();
    }, [productCategoryID]);

    useEffect(() => {
        if (productCategoryData === undefined) return;
        if (!productCategoryData.data.is_active) getInactiveActivity(productCategoryData.id);
    }, [JSON.stringify(productCategoryData)]);


    const getProductCategoryData = () => {
        getAPI(`product_categories/${productCategoryID}`, {}, (response: any) => {
            const productCategoryData: ProductCategoryResponseData = response.data;
            setProductCategoryData(productCategoryData);
        }, setIsProductCategoryLoading);
    }

    const getInactiveActivity = (productCategoryID: number) => {
        getAPI(`product_category_activity`, {
            product_category_id: productCategoryID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const productCategoryActivityData: ProductCategoryActivityCollectionResponse = response.data;
            setInactiveActivityData(productCategoryActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isLoading = (
        isProductCategoryLoading || 
        isInactiveActivityLoading
    )

    return (
        <OuterContainer 
            title='Product Category' 
            id={productCategoryID as string}
            headerContent={productCategoryData && !productCategoryData.data.is_active ? 
                <InactiveLabel/> : 
                null
            }
            maxWidth={700}
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && productCategoryData ?
                        !isEditMode ?
                            <ProductCategoryInformation
                                productCategoryData={productCategoryData.data}
                                lastDeactivate={inactiveActivityData?.data.created_at}
                            /> : 
                            <EditProductCategoryForm
                                productCategory={productCategoryData}
                                setProductCategoryData={setProductCategoryData}
                                disabledEdit={() => setIsEditMode(false)}
                            />
                        :
                        <ProductCategoryInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <ProductCategorySideBar 
                        productCategory={productCategoryData}
                        setProductCategoryData={setProductCategoryData}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />                    
                </div>
            </div> 
        </OuterContainer> 

    )
}

export default ProductCategoryPage