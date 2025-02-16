import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const ProductCategoryInformationSkeleton = () => {
    return (
        <>
            <section>
                <Skeleton type='title' width={200}/>
                <InfoGrid>
                    <GridItem>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default ProductCategoryInformationSkeleton