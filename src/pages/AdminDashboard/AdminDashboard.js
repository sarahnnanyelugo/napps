import React, {useContext, useEffect, useState} from "react";
import { DataChart } from "../../components/Chart/DataChart";
import { RecentActivity } from "../../components/RecentActivity/RecentActivity";
import SchoolsTable from "../../components/SchoolsTable/SchoolsTable";
import { SubChart } from "../../components/SubChart/SubChart";
import  ZoneChart  from "../../components/ZoneChart/ZoneChart";
import CountUp from "react-countup";
import Icon1 from "../../assets/images/up.svg";
import Icon2 from "../../assets/images/down.svg";
import Icon3 from "../../assets/images/reset.svg";
import Icon4 from "../../assets/images/active.png";
import { ToastContainer, toast } from "react-toastify";

import "./admin-dashboard.scss";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import {useAuth} from "../../AuthContext";
import {ApiContext} from "../../ApiContext";
import {setAuthToken} from "../../utility/api";
import formatNumber from "../../utility/utils";
export const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {authToken,userState} = useAuth();
  const { data, loading, error, fetchData, postData } = useContext(ApiContext);
  const [authError,setAuthError]=useState(false)


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 2 seconds delay
    if(!authToken)return
    const fetchSubInfo = async () => {
      setAuthToken(authToken);
      try {
        await postData("/admin/index", {}); // the postData call
      } catch (errorResponse) {
        console.error('Error fetching role information:', errorResponse);
      }
    };

    fetchSubInfo();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(!data)return;
  }, [data]);

  useEffect(() => {
    setAuthError(false)
    if (!error) return;

    // Display the error message
    toast.error(error.response?.data?.message || 'You may not have access to this page!');

    // Check if the message contains "Unauthorized" and navigate back
    if (error.response?.data?.message?.includes('Unauthorized')) {
      setAuthError(true)
    }
  }, [error]);

  return (
    <>
      <ToastContainer />
      <DashboardTop title={`Welcome, ${userState?.name||""}`} />
      {authError &&
      <div className="Admin-dashboard">
        <div className=" row row-cols-1 row-cols-lg-1 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary">
              <p className={"text-danger"}>Unauthorized Access</p>
              <div className="d-md-flex">
                <div className="col-md-6">
                  <h3 className="stats">
                    You do not have access to this page
                  </h3>
                </div>
                {" "}
                <div className="col-md-6">
                  <DataChart backGroundColor={"#ff0000"} borderColor={"#fff000"} labelSet={[".", ".",""]} dataSet={[0, 14, 3,0]}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {!authError&&<div className="Admin-dashboard">
        <div className=" row row-cols-3 row-cols-lg-3 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary">
              <p>This Year's Registered Schools</p>
              <div className="d-md-flex">
                <div className="col-md-6">
                  <h1 className="stats">
                    {" "}
                    <CountUp
                        start={0}
                        end={data?.schoolsThisYear}
                        duration={2}
                        decimal=""
                        prefix=" "
                        suffix=""
                        enableScrollSpy={true}
                    />
                  </h1>
                  <small>
                    <img src={data?.yearlyPercentageChange>0?Icon1:Icon2} height="11px"/>
                    {!loading && <><span className={data?.yearlyPercentageChange>0?"up":"down"}>{Math.abs(data?.yearlyPercentageChange||0)}%</span>vs last year</>}
                  </small>
                </div>
                {" "}
                <div className="col-md-6">
                  {!loading && data && (data?.yearlyPercentageChange>0?<DataChart/>:<SubChart/>)}
                </div>
              </div>
            </div>
          </div>
          {" "}
          <div className="col">
            <div className="summary">
              <p>This month's Registered Schools</p>
              <div className="d-md-flex">
                <div className="col-md-6">
                  <h1 className="stats">
                    {" "}
                    <CountUp
                        start={0}
                        end={data?.schoolsThisMonth}
                        duration={2}
                        decimal=""
                        prefix=" "
                        suffix=""
                        enableScrollSpy={true}
                    />
                  </h1>
                  <small>
                    <img src={data?.monthlyPercentageChange>0?Icon1:Icon2} height="11px"/>
                    <span className={data?.monthlyPercentageChange>0?"up":"down"}>{Math.abs(data?.monthlyPercentageChange||0)}%</span>vs last month
                  </small>
                </div>
                {" "}
                <div className="col-md-6">
                  {!loading && data && (data?.monthlyPercentageChange>0?<DataChart/>:<SubChart/>)}
                </div>
              </div>
            </div>
          </div>
          {" "}
          <div className="col">
            <div className="summary">
              <p>Total Registered Schools</p>
              <div className="d-md-flex">
                <div className="col-md-6">
                  <h1 className="stats">
                    {" "}
                    <CountUp
                        start={0}
                        end={data?.totalSchools}
                        duration={2}
                        decimal={false}
                        prefix=" "
                        suffix=""
                        enableScrollSpy={true}
                    />
                  </h1>
                  <small>
                    <img src={Icon4} width="11px"/>
                    <span className="up"> {formatNumber(data?.activeSchools,0)}</span> Active Schools
                  </small>
                </div>
                {" "}
                <div className="col-md-6">
                  <DataChart/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-md-flex">
          <div className="col-md-8 zone-div2 col-12">
            <div className="d-flex">
            </div>
            <ZoneChart start_level={"zones"}/>
          </div>
          <div className="col-md-4 acts-div">
            {" "}
            <div className=" recent-acts2">
              <div className="act-head">
                {" "}
                <h6>Recent Activities</h6>
                <br/>
                <hr/>
              </div>

              <div className="act-body">
                {" "}
                {data?.audits?.data?.map((data, index) => (
                    <RecentActivity key={index} data={data}/>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="registered-sch">
          <SchoolsTable data={data?.newSchools} initialDisplayCount={5}/>
        </div>
      </div>}
    </>
  );
};
