import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { GasBottleCollectionResponse } from "../../../types/gasBottle.types";
import formatDate from "../../../utils/formatDate";
import getAPI from "../../../utils/getAPI";
import BottleAdminNavigation from "./BottleAdminNavigation";
import GasBottleList from "./components/GasBottleList";
import ReturnNoteInformationSkeleton from "./ReturnsNoteInformationSkeleton";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import ActionButton from "../../../components/form/ActionButton/ActionButton";
const ReturnsNotePage = (props: {
    isConsumable?: boolean,
}) => {
    const { referenceNumber } = useParams();

    // Data States
    const [isGasBottleLoading, setIsGasBottleLoading] = useState(false);
    const [gasBottleData, setGasBottleData] = useState<GasBottleCollectionResponse>();

    useEffect(() => {
        getBottles();
    }, [])


    const getBottles = () => {
        getAPI('gas_bottles', {
            is_consumable: props.isConsumable ? true : false,
            return_reference_number: referenceNumber
        }, (response: any) => {
            const gasBottleData: GasBottleCollectionResponse = response.data;
            setGasBottleData(gasBottleData);
        }, setIsGasBottleLoading);
    }

    const isLoading = (
        isGasBottleLoading
    )

    const bottlesReturns = gasBottleData && gasBottleData.data[0].data.supplier_returned_date;

    const { toPDF, targetRef } = usePDF({ filename: `return_${referenceNumber}`, page: { orientation: 'portrait' } });

    return (
        <>
            <BottleAdminNavigation location={props.isConsumable ? 'gas_air' : 'refrigerant'}/>
            <OuterContainer 
                title='Returns Note' 
                id={referenceNumber as string}
                bigID
                exportRef={targetRef}
                maxWidth={1200}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        {!isLoading && gasBottleData ? <>
                            <section>
                                <h2>Return Details</h2>
                                <InfoGrid>
                                    <GridItem title='Return Reference Number' span={2}>
                                        <p>{referenceNumber}</p>
                                    </GridItem>
                                    <GridItem title='Return Date' span={2}>
                                        <p>{bottlesReturns ? formatDate(bottlesReturns, true) : 'Unknown'}</p>
                                    </GridItem>
                                </InfoGrid>
                            </section>
                            <hr/>
                            <section>
                                <h2>Returned Bottles</h2>
                                <InfoGrid>
                                    <GridItem>                                    
                                        <GasBottleList 
                                            hasSearched={true} 
                                            isGasBottlesLoading={isGasBottleLoading}
                                            gasBottles={gasBottleData}
                                            perPage={20}
                                            isConsumable={props.isConsumable}
                                            isReturn
                                        />
                                    </GridItem>
                                </InfoGrid>
                            </section>
                            <ContainerFooter>
                                <ActionButton 
                                    text={"Export to PDF"} 
                                    color={"no-color"} 
                                    iconFont="file_download"
                                    clickFunc={toPDF}
                                />
                            </ContainerFooter>
                        </>
                        :
                            <ReturnNoteInformationSkeleton/>
                        }
                    </div>
                </div> 
            </OuterContainer> 
        </>
    )
}

export default ReturnsNotePage