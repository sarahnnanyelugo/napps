import React, {useState, useEffect} from 'react';
import {Table, Form, Button, Accordion, Card} from 'react-bootstrap';
import {useAuth} from "../../AuthContext";
import api, {setAuthToken} from "../../utility/api";
import AddAccount from "../../pages/Cordinators/AddAccount";
import {toast} from "react-toastify";

const ZoneAccountDataTable = () => {
    const [data, setData] = useState([]);
    const [federal, setFederal] = useState(null);
    const [educare, setEducare] = useState(null);
    const [canSetEducare, setCanSetEducare] = useState(false);
    const [filter, setFilter] = useState('');
    const {authToken} = useAuth();
    useEffect(() => {
        fetchAccounts()
    }, []);

    // Ensure `data` is an array before calling `.filter()`
    const filteredData = Array.isArray(data) ? data.filter(zone =>
        (zone?.name || '').toLowerCase().includes(filter.toLowerCase()) ||
        (zone?.states || []).some(state =>
            (state?.name || '').toLowerCase().includes(filter.toLowerCase())
        )
    ) : [];

    async function fetchAccounts() {
        try {
            setAuthToken(authToken)
            const response = await api.post(`/admin/fetch-account-numbers`);
            setData(response.data.zones);
            setFederal(response.data.federal);
            setCanSetEducare(response.data.canSetEducare)
            setEducare(response.data.educare)
        } catch (errorResponse) {
            toast.error('Error account list: ' + errorResponse.response?.status);
        }
    }

    const accountCallBack = () => {
        fetchAccounts()
    };
    return (
        <div className="container">
            <h2 className="my-0">Bank Account Data</h2>
            <Table striped bordered hover className="school-table" responsive>
                <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>Name</th>
                    <th>Bank Name</th>
                    <th>Account Number</th>
                    <th>Account Name</th>
                    <th>Swp Tag</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>@</th>
                    <th>FEDERAL</th>
                    <td>{federal?.bank_name}</td>
                    <td>{federal?.account_number}</td>
                    <td>{federal?.account_name}</td>
                    <td>{federal?.swp_bank_account_id}</td>
                    <td><AddAccount target={'federal'} type={'federal'} callback={accountCallBack}/></td>
                </tr>
                {canSetEducare && <tr>
                    <th>@</th>
                    <th>EDUCARE</th>
                    <td>{educare?.bank_name}</td>
                    <td>{educare?.account_number}</td>
                    <td>{educare?.account_name}</td>
                    <td>{educare?.swp_bank_account_id}</td>
                    <td><AddAccount target={'educare'} type={'educare'} callback={accountCallBack}/></td>
                </tr>}
                </tbody>
            </Table>

            <Form.Group className="mb-3" controlId="filterInput">
                <Form.Control
                    type="text"
                    placeholder="Filter by name or state"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </Form.Group>
            <Accordion defaultActiveKey="zone-0">
                {filteredData.map((zone, zoneIndex) => (
                    <Card key={zoneIndex}>
                        <Accordion.Header eventKey={String('zone-' + zone.id)}>
                            <strong> {zone.name}&nbsp;  Zone: </strong>
                        </Accordion.Header>
                        <Accordion.Body eventKey={String('zone-' + zone.id)}>
                            <Accordion defaultActiveKey="zone-0">
                                <Table striped bordered hover responsive>
                                    <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>Name</th>
                                        <th>Bank Name</th>
                                        <th>Account Number</th>
                                        <th>Account Name</th>
                                        <th>Swp Tag</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{zone.id}</td>
                                        <td>{zone.name}</td>
                                        <td>{zone.account_data?.bank_name}</td>
                                        <td>{zone.account_data?.account_number}</td>
                                        <td>{zone.account_data?.account_name}</td>
                                        <td>{zone.account_data?.swp_bank_account_id}</td>
                                        <td><AddAccount target={zone} type={'zone'} callback={accountCallBack}/></td>
                                    </tr>
                                    </tbody>
                                </Table>
                                {zone.states.map((state, stateIndex) => (
                                    <Card key={stateIndex}>
                                        <Accordion.Header eventKey={String('state-' + state.id)}>
                                            <strong>State: </strong> &nbsp; {state.name}
                                        </Accordion.Header>
                                        <Accordion.Body eventKey={String('state-' + state.id)}>
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>Name</th>
                                                    <th>Bank Name</th>
                                                    <th>Account Number</th>
                                                    <th>Account Name</th>
                                                    <th>Swp Tag</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>{state.id}</td>
                                                    <td>{state.name}</td>
                                                    <td>{state.account_data?.bank_name}</td>
                                                    <td>{state.account_data?.account_number}</td>
                                                    <td>{state.account_data?.account_name}</td>
                                                    <td>{state.account_data?.swp_bank_account_id}</td>
                                                    <td><AddAccount target={state} type={'state'}
                                                                    callback={accountCallBack}/></td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                            {state.lgas.map((lga, lgaIndex) => (
                                                <Card key={lgaIndex}>
                                                    <Accordion.Header eventKey={String('lga-' + lga.id)}>
                                                        <strong>Local Govt: </strong> &nbsp; {lga.name}
                                                    </Accordion.Header>
                                                    <Accordion.Body eventKey={String('lga-' + lga.id)}>
                                                        <Table striped bordered hover responsive>
                                                            <thead>
                                                            <tr>
                                                                <th>
                                                                    #
                                                                </th>
                                                                <th>Name</th>
                                                                <th>Bank Name</th>
                                                                <th>Account Number</th>
                                                                <th>Account Name</th>
                                                                <th>Swp Tag</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td>{lga.id}</td>
                                                                <td>{lga.name}</td>
                                                                <td>{lga.account_data?.bank_name}</td>
                                                                <td>{lga.account_data?.account_number}</td>
                                                                <td>{lga.account_data?.account_name}</td>
                                                                <td>{lga.account_data?.swp_bank_account_id}</td>
                                                                <td><AddAccount target={lga} type={'lga'}
                                                                                callback={accountCallBack}/></td>
                                                            </tr>
                                                            </tbody>
                                                        </Table>
                                                        {/*Wards*/}
                                                        <Card>
                                                            <Accordion.Header eventKey={String('ward-' + lga.id)}>
                                                                <strong>Wards in </strong> &nbsp; {lga.name} LGA
                                                            </Accordion.Header>
                                                            <Accordion.Body eventKey={String('ward-' + lga.id)}>
                                                                <Table striped bordered hover responsive>
                                                                    <thead>
                                                                    <tr>
                                                                        <th>
                                                                            #
                                                                        </th>
                                                                        <th>Name</th>
                                                                        <th>Bank Name</th>
                                                                        <th>Account Number</th>
                                                                        <th>Account Name</th>
                                                                        <th>Swp Tag</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {lga.wards?.map((ward, wardIndex) => (
                                                                        <tr key={wardIndex}>
                                                                            <td>{ward.id}</td>
                                                                            <td>{ward.name}</td>
                                                                            <td>{ward.account_data?.bank_name}</td>
                                                                            <td>{ward.account_data?.account_number}</td>
                                                                            <td>{ward.account_data?.account_name}</td>
                                                                            <td>{ward.account_data?.swp_bank_account_id}</td>
                                                                            <td><AddAccount target={ward} type={'ward'}
                                                                                            callback={accountCallBack}/>
                                                                            </td>
                                                                        </tr>))}
                                                                    </tbody>
                                                                </Table>
                                                            </Accordion.Body>
                                                        </Card>


                                                    </Accordion.Body>
                                                </Card>
                                            ))}

                                        </Accordion.Body>
                                    </Card>
                                ))}
                            </Accordion>
                        </Accordion.Body>
                    </Card>
                ))}
            </Accordion>
        </div>
    );
};

export default ZoneAccountDataTable;