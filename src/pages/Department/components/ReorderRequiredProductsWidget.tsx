import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import { ProductCollectionResponse } from "../../../types/products.types";

const ReorderRequiredProductsWidget = () => {
    // Data States
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productData, setProductsData] = useState<ProductCollectionResponse>();

    useEffect(() => {
        getEngineers();
    }, []);

    const getEngineers = () => {
        getAPI('products', {
            reorder_required: true,
            perPage: 1
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductsData(productData);
        }, setIsProductsLoading);
    }

    return (
        <DashboardWidget 
            title="Products"
            count={productData?.total_count}
            text="Requiring reorder."
            iconFont={"inventory_2"} 
            to={"../products"}
            negative
        />
    )
}

export default ReorderRequiredProductsWidget;