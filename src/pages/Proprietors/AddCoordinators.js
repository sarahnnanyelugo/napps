import React, {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {IoMdAdd} from "react-icons/io";
import {FileUpload} from "../../components/FileUpload/FileUpload";
import {FaUserEdit} from "react-icons/fa";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {Password} from "../../components/Password/Password";
import {coordinatorRoles, zonesAndStates} from "../../Data/States";
import api from "../../utility/api";
import {ToastContainer, toast} from "react-toastify";
import {ApiContext} from "../../ApiContext";
import Spinner from 'react-bootstrap/Spinner';

function AddCoordinators({proprietor}) {
    const [lgShow, setLgShow] = useState(false);
    const [contact, setContact] = useState(null);
    const [value, setValue] = useState();
    const [disabled, setDisabled] = useState(true)
    const [role, setRole] = useState(null)
    const [zones, setZones] = useState({})
    const [selectedZone, setSelectedZone] = useState({});
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState({});
    const [lgas, setLgas] = useState([]);
    const [selectedLga, setSelectedLga] = useState({});
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState({});
    const {data, error, postData} = useContext(ApiContext);
    const [isLoading, setIsLoading] = useState(false)
    const [requesting, setRequesting] = useState(false)

    async function fetchZones() {
        setIsLoading(true);
        try {
            const response = await api.get(`/zone-chart-data`);
            setZones(response.data);
            setIsLoading(false);
        } catch (errorResponse) {
            toast.error('Error initializing search scheme: ' + errorResponse.response?.status);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setDisabled(!proprietor)
    }, [proprietor])
    useEffect(() => {
        if (lgShow)
            fetchZones();
    }, [lgShow])
    const handleRoleChange = (e) => {
        const role = coordinatorRoles.find(
            (item) => item.id === parseInt(e.target.value)
        );
        setRole(role);
    };
    const handleZoneChange = (e) => {
        const zone = zones?.zones.find(
            (item) => item.id === parseInt(e.target.value)
        );
        setSelectedZone(zone);
    };
    useEffect(() => {
        if (selectedZone)
            setStates(selectedZone.states)
        else
            setStates(null)
    }, [selectedZone])

    const handleStateChange = (e) => {
        const state = states.find(
            (item) => item.id === parseInt(e.target.value)
        );
        setSelectedState(state);
    };
    useEffect(() => {
        setLgas(selectedState?.lgas || null);
    }, [selectedState]);

    const handleLgaChange = (e) => {
        const lga = lgas.find(
            (item) => item.id === parseInt(e.target.value)
        );
        setSelectedLga(lga);
    };

    useEffect(() => {
        setWards(selectedLga?.wards || null);
    }, [selectedLga]);

    const handleWardChange = (e) => {
        const ward = wards.find(
            (item) => item.id === parseInt(e.target.value)
        );
        setSelectedWard(ward);
    };

    const handleAssignCoordinator = () => {

        let payload={user_id:proprietor.id};
        // Validate that role is set
        if (!role) {
            toast.error('Role must be selected');
            return;
        }
        payload.role_id=role.id

        // Role-based validations
        switch (role.id) {
            case 3: // Zone Level
                if (!selectedZone.id) {
                    toast.error('Zone must be selected');
                    return;
                }
                payload.zone_id=selectedZone.id
                break;
            case 4: // State Level
                if (!selectedState.id) {
                    toast.error('State must be selected');
                    return;
                }
                payload.state_id=selectedState.id
                break;
            case 5: // LGA Level
                if (!selectedLga.id) {
                    toast.error('LGA must be selected');
                    return;
                }
                payload.lga_id=selectedLga.id
                break;
            case 6: // Ward Level
                if (!selectedWard.id) {
                    toast.error('Ward must be selected');
                    return;
                }
                payload.ward_id=selectedWard.id;
                break;
            default:
                toast.warning("You are creating a Federal Agent!")
                break;
        }

        // If all validations pass, proceed with the form submission
        console.log('Form is valid, proceeding with submission...',payload);
        // Your form submission logic here
        setRequesting(true)
        try {
            postData('/admin/add-coordinator',payload)
        }catch (e) {
            toast.error(e.message||'Error occurred')
        }


    }

    useEffect(()=>{
        toast.error(error?.response?.data?.message||error?.response?.statusText)
        setTimeout(() => {
            setRequesting(false)
        }, 2000)
    },[error])
    useEffect(()=>{
        if(!data)return;
        toast.success(data?.response?.data?.message||data||"Coordinator created successfully")
        setTimeout(() => {
            setRequesting(false)
            window.location.reload();
        }, 1000)
        setTimeout(() => {
            setLgShow(false)
        }, 2000)

    },[data])

    return (
        <>
            <ToastContainer/>
            <button disabled={disabled} onClick={() => setLgShow(true)}
                    className={`btn btn-${disabled ? 'light text-muted' : 'success'}`}>
                <IoMdAdd/> Assign Coordinators
            </button>

            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <h6 style={{fontFamily: "montSB"}}>New Coordinator</h6>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="coord-modal">
                    <center>
                        <div
                            className="contact-frame2 modal-contact"
                            style={{backgroundImage: "url(" + proprietor?.dp + ")"}}
                        >
                            {" "}

                            {" "}
                            <div className="import-contact">
                                {" "}
                                <FileUpload
                                    defaultIcon={<FaUserEdit/>}
                                    uploadable="Picture"
                                    colr="white"
                                    callBack={(img) => {
                                        setContact(img);
                                    }}
                                />
                            </div>

                        </div>
                    </center>
                    <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3">
                        <div className="col">
                            <h6>Name</h6>
                            <input type="text" disabled value={proprietor?.name}/>
                        </div>
                        <div className="col">
                            <h6>Email</h6>
                            <input type="email" disabled value={proprietor?.email}/>
                        </div>
                        <div className="col">
                            <h5>School Phone Number</h5>
                            <input type="text" disabled value={proprietor?.phone}/>
                        </div>
                        <div className="col">
                            <h6>Coordinator Type</h6>
                            <select onChange={handleRoleChange}>
                                <option value="" disabled selected>
                                    Select Type of Coordinator
                                </option>
                                {coordinatorRoles.map((state) => (
                                    <option key={state.id} value={state.id}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {role && role.id > 2 && <div className="col">
                            <h6>Zones</h6>
                            <div className="selections">
                                <select onChange={handleZoneChange}>
                                    <option value="" disabled selected>
                                        Select your zone
                                    </option>
                                    {zones?.zones.map((zone) => (
                                        <option key={zone.id} value={zone.id}>
                                            {zone.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>}
                        {role && role.id >= 4 && selectedZone && states && <div className="col">
                            <h6>State</h6>
                            <div className="selections">
                                <select disabled={!selectedZone} onChange={handleStateChange}>
                                    <option value="" disabled selected>
                                        {selectedZone ? "Select state" : "Select zone First"}
                                    </option>
                                    {states?.map((state, index) => (
                                        <option key={index} value={state.id}>
                                            {state.name} - Capital: {state.capital}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>}
                        {role && role.id >= 5 && selectedState && lgas && <div className="col">
                            <h6>LGA</h6>
                            <div className="selections">
                                <select disabled={!selectedState} onChange={handleLgaChange}>
                                    <option value="" disabled selected>
                                        {selectedState ? "Select LGA" : "Select State First"}
                                    </option>
                                    {lgas?.map((lga, index) => (
                                        <option key={index} value={lga.id}>
                                            {lga.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>}
                        {role && role.id >= 6 && selectedLga && lgas && <div className="col">
                            <h6>Ward</h6>
                            <div className="selections">
                                <select disabled={!selectedLga} onChange={handleWardChange}>
                                    <option value="" disabled selected>
                                        {selectedLga ? "Select Ward" : "Select LGA First"}
                                    </option>
                                    {wards?.map((ward, index) => (
                                        <option key={index} value={ward.id}>
                                            {ward.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>}
                    </div>
                    <button disabled={requesting}
                            className={`cont-btn btn ${!requesting ? 'btn-success' : 'btn-default'}`}
                            onClick={handleAssignCoordinator}>
                        {requesting && <Spinner animation="border" role="status" size={'sm'}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                        &nbsp; Continue
                    </button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddCoordinators;
