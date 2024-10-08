import {useContext, useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {IoMdAdd} from "react-icons/io";
import {FaUserEdit} from "react-icons/fa";
import "react-phone-number-input/style.css";
import SearchableDropdown from "../../components/SearchableDropdown/SearchableDropdown";
import {useAuth} from "../../AuthContext";
import api, {setAuthToken} from "../../utility/api";
import {toast,ToastContainer} from "react-toastify";
import {ApiContext} from "../../ApiContext";

function AddAccount(props) {
    const [lgShow, setLgShow] = useState(false);
    const [value, setValue] = useState("Select bank...");
    const {target, type,callback} = props
    const [banks, setBanks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {authToken} = useAuth();
    const [selectedBank, setSelectedBank] = useState(false)
    const [nuban, setNuban] = useState('');
    const [accountName, setAccountName] = useState("")
    const [veriError, setVeriError] = useState("")
    const [ready, setReady] = useState(false)
    const [creating,setCreating]=useState(false)
    const { data, loading, error, fetchData, postData } = useContext(ApiContext);
    const handleNubanChange = (e) => {
        const value = e.target.value;
        // Allow only numbers to be input
        if (/^\d*$/.test(value) && value.length <= 10) {
            setNuban(value);
        }

        // Trigger API call when the input length is exactly 10
        if (value.length === 10 && selectedBank) {
            triggerApiCall(value);
        }
    };

    useEffect(() => {
        setReady(!!(selectedBank && nuban && accountName))
    }, [selectedBank, nuban, accountName])

    async function createAccount(){
        let payload={
            bank_code:selectedBank.bank_code,
            bank_name:selectedBank.bank_name,
            account_number:nuban,
            account_name:accountName,
        }
        if (type==='zone')
            payload.zone_id=target.id;
        else if (type==='state')
            payload.state_id=target.id;
        else if (type==='lga')
            payload.lga_id=target.id;
        else if (type==='ward')
            payload.ward_id=target.id;
        else if (type==='federal')
            payload.is_federal=1;
        else if (type==='educare')
            payload.is_educare=1;
        setCreating(true)
        // console.log(payload)
        try {
            setAuthToken(authToken)
            await postData('/create-account',payload)
        } catch (e) {
            setTimeout(()=>{
                setCreating(false)
            },2000)
            console.error(e)
            setVeriError(e.statusText)
        }

    }

    useEffect(()=>{
        if(!data||!creating)return
        setTimeout(()=>{
            setCreating(false)
            setLgShow(false)
        },2000)
        toast.success('Account number created successfully')
        return (callback?callback:null);
    },[data])

    useEffect(()=>{
        if(!error)return
        setTimeout(()=>{
            setCreating(false)
        },2000)
        console.error(error)
        setVeriError(error.statusText)
    },[error])

    const triggerApiCall = (nuban) => {
        setVeriError("")
        // console.log(`API call triggered with NUBAN: ${nuban}`);
        setIsLoading(true)
        try {
            api.get('resolve-nuban/' + nuban + '/' + selectedBank?.bank_code)
                .then(resp => {
                    // console.log(resp)
                    setIsLoading(false)
                    setAccountName(resp.data)
                    if (resp.data === "") {
                        setVeriError("Account Number could not be verified. Kindly review.")
                    }
                }).catch((e) => {
                setIsLoading(false)
                console.error(e)
                setVeriError(e.statusText)
            });
        } catch (e) {
            setIsLoading(false)
            console.error(e)
            setVeriError(e.statusText)
        }
    };

    useEffect(() => {
        if (!selectedBank) return;
        // alert(selectedBank.bank_name)
    }, [selectedBank])

    async function fetchBankList() {
        setIsLoading(true);
        try {
            const response = await api.get(`/create-account`);
            setBanks(response.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        } catch (errorResponse) {
            toast.error('Error initializing bank list: ' + errorResponse.response?.status);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(!lgShow)return;
        fetchBankList()
    }, [lgShow])

    useEffect(() => {
        if (!target || !type) return;

    }, [target, type])
    return (
        <>
            <button onClick={() => setLgShow(true)} className="btn btn-sm btn-light text-dark">
                <IoMdAdd/> Add/Edit
            </button>

            <Modal
                size="md"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <h6 style={{fontFamily: "montSB"}}>Add Bank Account</h6>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="coord-modal">
                    <div className="row row-cols-1 row-cols-lg-1 g-2 g-lg-3">
                        <div className="col">
                            <h6>Select Bank</h6>
                            <div className="App">
                                <SearchableDropdown
                                    options={banks}
                                    label="bank_name"
                                    id="id"
                                    selectedVal={selectedBank}
                                    handleChange={(val) => setSelectedBank(val)}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <h6>NUBAN (10 digit Account Number)</h6>
                            <input
                                type="text"
                                value={nuban}
                                maxLength={10}
                                placeholder="Enter NUBAN (10 digit Account Number)"
                                onChange={handleNubanChange}
                            />
                        </div>
                        <div className="col">
                            <h5>Account Name</h5>
                            <input type="text" readOnly id='accountName' value={accountName}
                                   placeholder="Enter your account name here"/>
                            {isLoading && <small className={"text-muted"}>...verifying.</small>}
                            {veriError && <small className={"text-danger"}>{veriError}</small>}
                        </div>
                        {" "}
                    </div>
                    {ready && <button disabled={creating||loading} onClick={()=>createAccount()}
                                      className={`cont-btn btn ${creating||loading?'btn-light':'btn-success'}`}>{creating||loading?'Creating...':'+ Add'}</button>}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddAccount;
