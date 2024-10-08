import React, {useContext, useEffect, useState} from "react";
import "./payment-verify-page.scss";
import Switch from "../../assets/images/switch.png";
import {ToastContainer, toast} from "react-toastify";
import {getLocalStorage, removeLocalStorage, setLocalStorage} from "../../utility/localStorage";
import {ApiContext} from "../../ApiContext";
import api, {setAuthToken} from "../../utility/api";
import {Spinner} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import Receipt from "../../components/Receipt/Receipt";
import {useAuth} from "../../AuthContext";

export const PaymentVerifyPage = () => {
    const {data, loading, error, fetchData, postData} = useContext(ApiContext);
    const [currentSchool, setCurrentSchool] = useState(() => {
        return getLocalStorage('current_school') || null;
    });
    const [currentState, setCurrentState] = useState(102);
    const [subscription, setSubscription] = useState({});
    const {authToken,userStated}=useAuth();
    const location = useLocation();

    async function verifySubscription(ref) {
        try {
            setAuthToken(authToken);
            await postData(`/payment/verify/${ref}`);
        } catch (errorResponse) {
            toast.error('Error initializing subscription: ' + errorResponse.response?.status);
            setCurrentState(errorResponse?.response?.status || 500);
            if (errorResponse?.response?.status === 401) {
                removeLocalStorage('authToken')
                removeLocalStorage('isLoggedIn')
            }
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tx_ref = params.get('tx_ref');
        const status = params.get('status');

        console.log('Transaction Reference:', tx_ref);
        console.log('Status:', status);

        // Now use tx_ref and status in component logic
        verifySubscription(tx_ref)
    }, [location]);

    useEffect(() => {
        if (!data || loading) return;
        setCurrentState(200);
        setSubscription(data);
        removeLocalStorage('current_school');
        removeLocalStorage('schools');
        console.log('Transaction', data);
    }, [data]);

    useEffect(() => {
        if (!error) return;
        setCurrentState(500);
        setSubscription(data);
        removeLocalStorage('current_school');
        removeLocalStorage('schools');
        console.log(error.response?.data)
        setTimeout(() => {
            window.location.reload();
        }, 10000)
    }, [error]);
    return (
        <>
            <ToastContainer/>
            {(currentState === 102 || loading) &&
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="payment-form text-center">
                    <h6>Verifying &nbsp; <Spinner animation="border" size="sm" variant="info"/></h6>
                </div>
            </div>
            }
            {(currentState === 500 || error) &&
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="payment-form text-center alert alert-warning d-flex flex-column">
                    <h6>Payment Confirmation failed</h6>
                    <p>If you have already been debited for this invoice, <br/> this may be Payment gateway yet to confirm receipt of your payment.</p>
                    <p>We'll retry in 10 seconds</p>
                    <p>Want to Try again yourself? </p>
                    <div className="btn-group">
                        <a href={""} className={'btn btn-warning btn-rounded'}>Retry</a>
                        {error?.response?.data && <a className={"btn btn-info btn-rounded"} href={error?.response?.data.hosted_page}>Pay Now</a>}
                    </div>

                </div>
            </div>
            }
            {(currentState === 200 || currentState === 201) &&
            <div className="payment-section d-flex justify-content-center align-items-center vh-100">
                {" "}
                <center>
                    <div className="col-md-9 payment-form ">
                        <div className="payment-form">
                            <Receipt receipt={data}/>
                        </div>

                        <center className="no-print">
                            <Link to={"/dashboard-selector"}>
                                <button>Go to Dashboard</button>
                            </Link>
                        </center>
                    </div>
                </center>
            </div>}
        </>
    );
};
