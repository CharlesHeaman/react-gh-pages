export interface SupplierContactAdvancedSearchParams {
    email_like?: string,
    telephone_like?: string,
    mobile_like?: string,
}

const getSupplierContactAdvancedSearchParams = (searchParams: URLSearchParams): SupplierContactAdvancedSearchParams => {
    const email_like = searchParams.get('supplier_contacts_email_like');
    const telephone_like = searchParams.get('supplier_contacts_telephone_like');
    const mobile_like = searchParams.get('supplier_contacts_mobile_like');

    return {
        email_like: email_like ? email_like : undefined,
        telephone_like: telephone_like ? telephone_like : undefined,
        mobile_like: mobile_like ? mobile_like : undefined,
    }
}

export default getSupplierContactAdvancedSearchParams