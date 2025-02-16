import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import FormErrorMessage from '../../components/form/FormErrorMessage/FormErrorMessage';
import PasswordInput from '../../components/form/PasswordInput/PasswordInput';
import SubmitButton from '../../components/form/SubmitButton/SubmitButton';
import TextInput from '../../components/form/TextInput/TextInput';
import ContainerFooter from '../../components/ui/Containers/ContainerFooter/ContainerFooter';
import GridItem from '../../components/ui/Containers/GridItem/GridItem';
import InfoGrid from '../../components/ui/Containers/InfoGrid/InfoGrid';
import InnerContainer from '../../components/ui/Containers/InnerContainer/InnerContainer';
import Footer from '../../components/ui/Structure/Footer/Footer';
import handleError from '../../utils/handleError';
import { post } from '../../utils/Requests';
import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        Cookies.remove('accessToken', { sameSite: 'lax', secure: false, expires: 365 });
        Cookies.remove('refreshToken', { sameSite: 'lax', secure: false, expires: 365 });
        Cookies.remove('department_id', { sameSite: 'lax', secure: false, expires: 365 });
        Cookies.remove('permissions', { sameSite: 'lax', secure: false, expires: 365 });
    }, []);

    const submitLogin = () => {
        post('/api/login/internal', {}, {
            username: username,
            password: password
        }, (response: any) => {
            Cookies.set('accessToken', response.data.accessToken, { sameSite: 'lax', secure: false, expires: 365 });
            Cookies.set('refreshToken', response.data.refreshToken, { sameSite: 'lax', secure: false, expires: 365 });
            Cookies.set('department_id', response.data.department_id, { sameSite: 'lax', secure: false, expires: 365 });
            Cookies.set('permissions', JSON.stringify(response.data.permissions), { sameSite: 'lax', secure: false, expires: 365 });
            navigate((window.history.state && window.history.state.redirect) ? window.history.state.redirect : `/`);    
        }, (error: any) => handleError(error, () => null, setErrors), setSubmitting);
    }

    return (
        <>
            <Helmet>
                <title>Admin Login</title>
            </Helmet>
            <div className={styles['login-container']}>
                <div className={styles['image-wrapper']}>
                    <img src={`${process.env.PUBLIC_URL}/logo-Placeholder.jpg`}/>
                </div>
                <h1 style={{ marginBottom: 'var(--bigger-gap)'}}>Admin Login</h1>
                <InnerContainer>
                    <InfoGrid>
                        {errors.length > 0 ? <GridItem>
                            <FormErrorMessage 
                                text={errors[0].msg}
                                show
                            />
                        </GridItem> : null}
                        <GridItem title='Username'>
                            <TextInput
                                name='username'
                                value={username}
                                updateFunc={(event) => {
                                    setUsername(event.target.value);
                                }}
                                autoFocus
                            />
                        </GridItem>
                        <GridItem title='Password'>
                            <PasswordInput
                                name='password'
                                value={password}
                                updateFunc={(event) => {
                                    setPassword(event.target.value)
                                }}
                            />
                        </GridItem>
                    </InfoGrid>
                    <ContainerFooter>                        
                        <SubmitButton 
                            color='dark-blue' 
                            clickFunc={submitLogin} 
                            text='Log in' 
                            submitting={submitting} 
                            submittingText='Logging in...'
                            iconFont='login'
                        />
                    </ContainerFooter>
                </InnerContainer>
            </div>
            <Footer/>
        </>
    )
}

export default LoginPage