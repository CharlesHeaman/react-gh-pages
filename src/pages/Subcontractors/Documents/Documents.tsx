import MainWrapper from "../../../components/ui/Structure/MainWrapper/MainWrapper"
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import { get } from "../../../utils/Requests";
import handleError from "../../../utils/handleError";
import formatDate from "../../../utils/formatDate";
import { useEffect, useState } from "react"
import { Supplier } from "../../../types/suppliers.types";
import Label from "../../../components/ui/General/Label/Label";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import DocumentsSkeleton from "./components/DocumentSkeleton";
import Header from "../../../components/ui/Structure/Header/Header";
import getAPI from "../../../utils/getAPI";

const Documents = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [suppliers, setSuppliers] = useState<Array<Supplier>>([]);

    useEffect(() => {
        getDocuments();
    }, [])

    const getDocuments = () => {
        getAPI(`oldSubcontractors/documents`, {}, (response : any) => {
            setIsLoading(false);
            setSuppliers(response.data)
        }, setIsLoading);
    }

    const getExpiryLabel = (expiry: Date) => {
        const today = new Date();
        const expiryDate = new Date(expiry)
        const nextMonth = new Date(new Date().setMonth(today.getMonth() + 1))
        return (
            <Label 
                text={formatDate(expiry)}
                color={today > expiryDate ?
                    'red' : nextMonth > expiryDate ?
                        'orange' : 
                        'light-green'
                }
            />
        )
    }

    return (
        <>
            <Header
                links={[
                    {
                        to: 'sub_contractors',
                        text: 'Sub-contractors'
                    },
                    {
                        to: 'documents',
                        text: 'Documents'
                    }
                ]}
            />
            <OuterContainer
                title='Sub-contractor Documents'
                headerContent={`All sub-contractor documents for sub-contracts with purchase order raised in the past year.`}
                stickyHeaderContent={<p style={{ fontSize: '0.85em' }}>All sub-contractor documents for sub-contracts with purchase order raised in the past year.</p>}
                maxWidth={1200}
                noBorder
            >
                    {!isLoading ? 
                        <table>
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Review Expiry</th>
                                    <th>Insurance Expiry</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.map((supplier: Supplier, index: number) => 
                                    <tr key={index}>
                                        <td className='text-left'><a href={`${process.env.REACT_APP_OLD_SITE_URL}/supplieradmin.asp?a=editsupplier&supplierid=${supplier.id}`}>{supplier.fullName}</a></td>
                                        <td className='text-left'><a href={`mailto:${supplier.email}`}>{supplier.email}</a></td>
                                        <td>{supplier.docs.filter(doc => doc.isReview).length > 0 ? getExpiryLabel(supplier.docs.filter(doc => doc.isReview)[0].endDate) : <Label text='No Document' color='grey'/>}</td>
                                        <td>{supplier.docs.filter(doc => doc.isInsurance).length > 0 ? getExpiryLabel(supplier.docs.filter(doc => doc.isInsurance)[0].endDate) : <Label text='No Document' color='grey'/>}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table> :
                        <DocumentsSkeleton/>
                    }
            </OuterContainer>
        </>
    )
}

export default Documents
