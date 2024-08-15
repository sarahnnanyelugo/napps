import React, { useState, useLocation, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "./accounts-table.scss";
import SchDetails from "../SchDetails/SchDetails";
import { getGreen, getRed } from "../../utility/dots";
import { useAuth } from "../../AuthContext";
import api, { setAuthToken } from "../../utility/api";
import { toast, ToastContainer } from "react-toastify";
import AddAccount from "../../pages/Cordinators/AddAccount";

export const opener = () => {
  return <p className={"btn btn-sm btn-dark"}>+ Add Account</p>;
};

const AccountsTable = () => {
  const [bankAccounts, setBankAccounts] = useState(null);
  const [filteredBankAccounts, setFilteredBankAccounts] = useState(null);
  const { authToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  async function fetchAccounts() {
    setIsLoading(true);
    try {
      setAuthToken(authToken);
      const response = await api.post(`/admin/fetch-account-numbers`);
      setBankAccounts(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (errorResponse) {
      toast.error("Error account list: " + errorResponse.response?.status);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (bankAccounts) setFilteredBankAccounts(bankAccounts);
  }, [bankAccounts]);

  const accountCallBack = () => {
    fetchAccounts();
  };

  const data1 = [
    { id: 1, name: "Data 1A", value: "100" },
    { id: 2, name: "Data 1B", value: "200" },
  ];

  const data2 = [
    { id: 1, name: "Data 2A", value: "300" },
    { id: 2, name: "Data 2B", value: "400" },
  ];

  const data3 = [
    { id: 1, name: "Data 3A", value: "500" },
    { id: 2, name: "Data 3B", value: "600" },
  ];

  const [tableData, setTableData] = useState(data1); // Default dataset

  const handleRowClick = (newData) => {
    setTableData(newData);
  };

  return (
    <div>
      <div className="d-flex tabled-data">
        {" "}
        <h5 style={{ flexGrow: 1 }}>Offices and Account Details</h5>
      </div>

      {/* <Table striped bordered hover className="school-table" responsive>
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
                    <th colSpan={5}>ZONES</th>
                    <th><button className="btn btn-info btn-sm">Toggle</button></th>
                </tr>
                {filteredBankAccounts?.zones?.map((zone,index)=>(
                    <tr key={index}>
                        <td>{zone.id}</td>
                        <td>{zone.name}</td>
                        <td>{zone.account_data?.bank_name}</td>
                        <td>{zone.account_data?.account_number}</td>
                        <td>{zone.account_data?.account_name}</td>
                        <td>{zone.account_data?.swp_bank_account_id}</td>
                        <td><AddAccount target={zone} type={'zone'} callback={accountCallBack}/></td>
                    </tr>
                ))}
                </tbody>
            </Table> */}

      <Table striped bordered hover className="school-table" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr
              key={item.id}
              onClick={() => {
                // Replace table data based on the row clicked
                if (index === 0) {
                  handleRowClick(data1);
                } else if (index === 1) {
                  handleRowClick(data2);
                } else {
                  handleRowClick(data3);
                }
              }}
              style={{ cursor: "pointer" }} // Add cursor pointer to indicate clickable rows
            >
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AccountsTable;
