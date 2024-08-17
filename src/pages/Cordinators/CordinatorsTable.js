import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../../components/SchoolsTable/schools-table.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import api, {setAuthToken} from "../../utility/api";
import {toast} from "react-toastify";
import {useAuth} from "../../AuthContext";

const CordinatorsTable = (props) => {
  const { data }=props
  const [coordinators,setCoordinators]=useState(null)
  const [toDetach,setToDetach]=useState(null)
  const {authToken}=useAuth();

useEffect(()=>{
  if(data)
    setCoordinators(data)
    console.log(data)
},[data])

  async function detach() {
    try {
      setAuthToken(authToken)
      // Send the FormData payload
      const response = await api.post('/admin/detach-coordinator',{user_id:toDetach}, {
        headers: {
          'content-type': 'application/json' // Ensure correct Content-Type header
        }
      })
      if (response.data) {
        setToDetach(null)
        toast.success(response.data);
        setTimeout(()=>{
          window.location.reload();
        },1000)
      }
    } catch (errorResponse) {
      setToDetach(null)
      toast.error(errorResponse.response?.data || "Error detaching profile");
    }
  }

  const handleDetachCoordinator=()=>{
  const coordinator=coordinators.find((coord)=>coord.id===toDetach)
  if(!window.confirm('Do you wish to detach '+coordinator.name+' from current post?')){
    return setToDetach(null);
  }
  detach()
}
useEffect(()=>{
  if(toDetach)
    handleDetachCoordinator();
},[toDetach])
  return (
    <div>
      {coordinators && <>
        <div>
          <Table striped bordered hover className="school-table cord" responsive>
            <thead>
            <tr>
              <th>
                <input type="checkbox"/>
              </th>
              <th className="">Name</th>

              <th>Email</th>
              <th>Cadre</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            </thead>
            <TransitionGroup component="tbody">
              {coordinators?.map((item) => (
                  <CSSTransition
                      key={item.id}
                      timeout={500}
                      classNames="row-slide-up"
                  >
                    <tr key={item.id}>
                      <td>
                        <input type="checkbox"/>
                      </td>

                      <td className="">
                        <div className="d-flex align-items-center">
                          <div
                              className="alphabet"
                              style={{backgroundImage: `url(${item.dp})`,
                              backgroundPosition:'center',
                              backgroundRepeat:'no-repeat',
                              backgroundSize:'contain'}}
                          >

                          </div>
                          {item.name}
                        </div>
                      </td>

                      <td>{item.email}</td>
                      <td>{item.coordinator_type}</td>
                      <td>{item.description}</td>
                      <td><button onClick={()=> {
                        setToDetach(item.id)
                      }} className="btn btn-sm btn-default text-danger">&#x2715;</button></td>
                    </tr>
                  </CSSTransition>
              ))}
            </TransitionGroup>
          </Table>
        </div>
        <div className="d-flex">
          <p style={{flexGrow: 1}}>Page 1 of 10</p>
          <div className="d-flex">
            <button className="more-btn" style={{marginRight: "10px"}}>
              Previous
            </button>
            <button className="more-btn">Next</button>
          </div>
        </div></>}

    </div>
  );
};

export default CordinatorsTable;
