export interface ContactAdvancedSearchParams {
    email_like?: string,
    telephone_like?: string,
    mobile_like?: string,
}

const getContactAdvancedSearchParams = (searchParams: URLSearchParams): ContactAdvancedSearchParams => {
    const email_like = searchParams.get('contacts_email_like');
    const telephone_like = searchParams.get('contacts_telephone_like');
    const mobile_like = searchParams.get('contacts_mobile_like');

    return {
        email_like: email_like ? email_like : undefined,
        telephone_like: telephone_like ? telephone_like : undefined,
        mobile_like: mobile_like ? mobile_like : undefined,
    }
}

export default getContactAdvancedSearchParams