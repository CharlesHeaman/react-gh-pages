import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import SubmitButton from "../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../components/ui/Containers/InfoGrid/InfoGrid";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../components/ui/Structure/Header/Header";
import { ProductQueryResponseData } from "../../types/productQuery.types";
import postAPI from "../../utils/postAPI";
import StockQueryEditor, { StockQueryParameters } from "./components/StockQueryEditor";

const CreateStockQuery = () => {
    const navigate = useNavigate();

    const [parameters, setParameters] = useState<StockQueryParameters>({
        is_active: true
    });
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateParameters = (name: string, value: any) => {
        setParameters(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const createStockQuery = () => {
        postAPI('product_queries/create', {}, {
            name: name,
            description: description,
            ...parameters
        }, (response: any) => {
            const productQueryData: ProductQueryResponseData = response.data;
            navigate(`../${productQueryData.id}`)
        }, setIsSubmitting)
    }

    const headerText = `Create a new stock query. Empty fields will be ignored.`

    const isDisabled = !(name.length > 0);

    return (
        <>
            <Header
                links={[
                    {
                        to: 'stock',
                        text: 'Stock'
                    },
                    {
                        to: 'queries',
                        text: 'Queries'
                    },
                    {
                        to: 'create',
                        text: 'Create'
                    }
                ]}
            />
            <OuterContainer
                title='Create Stock Query'
                headerContent={headerText}
                stickyHeaderContent={<p style={{ fontSize: '0.85em' }}>{headerText}</p>}
                maxWidth={650}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <section>
                            <h2>Query Details</h2>
                            <InfoGrid>
                                <GridItem title='Query Name'>
                                    <input 
                                        type='text'
                                        placeholder='Name...'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </GridItem>
                                <GridItem title='Query Description'>
                                    <TextareaAutosize
                                        placeholder='Description...'
                                        minRows={2}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </GridItem>
                            </InfoGrid>
                        </section>
                        <div style={{ width: '100%', margin: 'var(--big-gap) 0 var(--big-gap)', borderBottom: '1px solid var(--high-contrast)'}}></div>
                        <section>
                            <StockQueryEditor
                                updateParameters={updateParameters}
                                startParameters={parameters}
                            />
                        </section>
                        <div style={{ width: '100%', margin: 'var(--big-gap) 0 var(--big-gap)', borderBottom: '1px solid var(--high-contrast)'}}></div>
                        <section>
                            <SubmitButton 
                                text='Create Query'
                                disabled={isDisabled}
                                clickFunc={createStockQuery}
                            />
                        </section>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default CreateStockQuery