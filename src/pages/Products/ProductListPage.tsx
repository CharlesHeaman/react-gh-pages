import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { ProductCollectionResponse } from "../../types/products.types";
import getAPI from "../../utils/getAPI";
import ProductAdvancedSearch from "./components/ProductAdvancedSearch";
import ProductList from "./components/ProductList";
import ProductSearchHeader from "./components/ProductSearchHeader";
import getProductSearchParams from "./utils/getProductSearchParams";

const ProductListPage = () => {
    const [searchParams] = useSearchParams();

    // Search States 
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    
    // Data States
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productData, setProductData] = useState<ProductCollectionResponse>();

    // Search Parameters 
    const hasSearched = searchParams.get(`products_has_searched`) === "true";
    const productSearchParams = getProductSearchParams(searchParams);
    
    useEffect(() => {
        hasSearched && searchStock();
    }, [JSON.stringify(productSearchParams)])

    const searchStock = () => {
        setShowAdvancedSearch(false);
        getAPI('products', productSearchParams, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData);
        }, setIsProductsLoading)
    }

    return (
        <>
            <OuterContainer
                title='Products'
                maxWidth={2200}
                description="Create, edit and deactivate products. View stock movements and run stock reports."
                noBorder
            >
                {/* <div className="page-grid">
                    <div className="page-main"> */}
                        <ProductSearchHeader 
                            showAdvancedSearch={() => setShowAdvancedSearch(true)}                            
                        />
                        <ProductList 
                            hasSearched={hasSearched} 
                            isProductsLoading={isProductsLoading} 
                            products={productData} 
                            perPage={productSearchParams.perPage}      
                            showAdvancedSearch={() => setShowAdvancedSearch(true)}                  
                        />
                    {/* </div> */}
                    {/* <div className="page-side">
                        <SideBarModule title="Queries & Reports">
                            <SideBarButton 
                                text="Stock Queries"
                                iconFont="query_stats"
                                clickEvent={() => navigate('queries')}
                            />
                            <SideBarButton 
                                text="Stock Reports"
                                iconFont="summarize"
                                clickEvent={() => navigate('reports')}
                            />
                        </SideBarModule>
                        <SideBarModule title="Notifications">
                            <SideBarButton
                                text="Van Replenishment Requests"
                                iconFont="mark_unread_chat_alt"
                                clickEvent={() => navigate('stores_notifications')}
                            />
                        </SideBarModule>
                        <SideBarModule title="Actions">
                            <SideBarButton 
                                text="Perform Stocktake"
                                iconFont="format_list_numbered"
                                clickEvent={() => navigate('queries')}
                            />
                        </SideBarModule>
                    </div> */}
                {/* </div> */}
            </OuterContainer>

            <ProductAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default ProductListPage