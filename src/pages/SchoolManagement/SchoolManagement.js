import React, {useContext, useEffect, useState} from "react";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import CountUp from "react-countup";
import Icon1 from "../../assets/images/user1.svg";
import "./school-management.scss";
import { schools } from "../../Data/schoolsData";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { ZonesMap } from "../../components/ZonesMap/ZonesMap";
import api, {setAuthToken} from "../../utility/api";
import {useAuth} from "../../AuthContext";
import {ApiContext} from "../../ApiContext";
import {toast} from "react-toastify";
import {getActive, getInactive} from "../../utility/dots";
import formatNumber, {getPercentage} from "../../utility/utils";
import {DataChart} from "../../components/Chart/DataChart";
import {SchoolFilter} from "../../components/SchoolFilter/SchoolFilter";
export const SchoolManagement = () => {
  const [category, setCategory] = useState("*");
  const [filteredSchools, setfilteredSchools] = useState(schools);
  const {authToken,userState} = useAuth();
  const { data, loading, error, fetchData, postData } = useContext(ApiContext);
  const [authError,setAuthError]=useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [students,setStudents]=useState({total:0,total_male:0,total_female:0})

  const[NC,setNC]=useState([])
  const[NE,setNE]=useState([])
  const[NW,setNW]=useState([])
  const[SE,setSE]=useState([])
  const[SS,setSS]=useState([])
  const[SW,setSW]=useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 2 seconds delay
    if(!authToken)return
    const fetchSubInfo = async () => {
      setAuthToken(authToken);
      try {
        await postData("/admin/zone-chart-data", {}); // the postData call
      } catch (errorResponse) {
        console.error('Error fetching role information:', errorResponse);
      }
    };

    fetchSubInfo();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(!data || loading || !data.zones)return;
    const zones=data?.zones;
    const studentDist=data?.student_distribution;
    if(studentDist)setStudents(studentDist)

    setNC([zones[0]?.schools_count,zones[0]?.active_schools_count,zones[0]?.inactive_schools_count]);
    setNE([zones[1]?.schools_count,zones[1]?.active_schools_count,zones[1]?.inactive_schools_count]);
    setNW([zones[2]?.schools_count,zones[2]?.active_schools_count,zones[2]?.inactive_schools_count]);
    setSE([zones[3]?.schools_count,zones[3]?.active_schools_count,zones[3]?.inactive_schools_count]);
    setSS([zones[4]?.schools_count,zones[4]?.active_schools_count,zones[4]?.inactive_schools_count]);
    setSW([zones[5]?.schools_count,zones[5]?.active_schools_count,zones[5]?.inactive_schools_count]);
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
      <DashboardTop title="School Management" />
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
      {!authError && <div className="Admin-dalshboard">
        <div className=" row row-cols-2 row-cols-lg-4 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary d-flex">
              <div style={{flexGrow: 1}}>
                {" "}
                <img src={Icon1} height="30px"/>
                <p>Total Registered Schools</p>
              </div>
              <h1 className="stats">
                {" "}
                <CountUp
                    start={0}
                    end={data?.distribution?.total}
                    duration={2}
                    decimal=""
                    prefix=" "
                    suffix=""
                    enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>
          {" "}
          <div className="col">
            <div className="summary d-flex">
              <div style={{flexGrow: 1}}>
                {" "}
                <img src={getActive()} height="30px"/>
                <p>Total Active Schools</p>
              </div>
              <h1 className="stats">
                {" "}
                <CountUp
                    start={0}
                    end={data?.distribution?.total_active}
                    duration={2}
                    decimal=""
                    prefix=" "
                    suffix=""
                    enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>
          {" "}
          <div className="col">
            <div className="summary d-flex">
              <div style={{flexGrow: 1}}>
                {" "}
                <img src={getInactive()} height="30px"/>
                <p>Total Inactive Schools</p>
              </div>
              <h1 className="stats">
                {" "}
                <CountUp
                    start={0}
                    end={data?.distribution?.total_inactive}
                    duration={2}
                    decimal=""
                    prefix=" "
                    suffix=""
                    enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>

          <div className="col">
            <div className="summary d-flex">
              <div>
                <h4 className="stats">
                  Students: <CountUp
                      start={0}
                      end={students.total}
                      duration={2}
                      decimal=""
                      prefix=" "
                      suffix=""
                      enableScrollSpy={true}
                  />
                </h4>
                <p className="d-flex">
                  <span>Male: <strong className={'text-primary'}>{formatNumber(parseInt(students.total_male),0)}</strong></span>&nbsp;
                  <span>Female: <strong className={'text-info'}>{formatNumber(parseInt(students.total_female),0)}</strong></span>
                </p>
              </div>

            </div>
          </div>
        </div>
        {" "}
        <div className="schools-filter-div col-md-12">
          <h5>At a glance</h5>
          <hr/>
          <div className="d-md-flex">
            {" "}
            <div className="col-md-7 map-div col-12">
              <div className="offset-md-2">
                <div className="col-md-8" style={{background: ""}}>
                  {" "}
                  <ZonesMap zones={{NC, NE, SS, SE, SW, NW}}/>
                </div>
              </div>
            </div>
            <div className="col-md-5 progress-div">
              <div>
                <div className="d-flex">
                  <div className="col-md-8 col-8">
                    <h6>South-East Region</h6>
                    <ProgressBar number={getPercentage(SE[0], data?.distribution?.total || 1, 200)} max={200}
                                 color="#0470C7"/>
                  </div>
                  <p>{SE[0]} School{SE[0] > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div className="col-md-8 col-8">
                    <h6>South-South Region</h6>
                    <ProgressBar number={getPercentage(SS[0], data?.distribution?.total || 1, 200)} max={200}
                                 color="#DC64D6"/>
                  </div>
                  <p>{SS[0]} School{SS[0] > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div className="col-md-8 col-8">
                    <h6>South-West Region</h6>
                    <ProgressBar number={getPercentage(SW[0], data?.distribution?.total || 1, 200)} max={200}
                                 color="#EF7A80"/>
                  </div>
                  <p>{SW[0]} School{SW[0] > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div className="col-md-8 col-8">
                    <h6>North-Central Region</h6>
                    <ProgressBar number={getPercentage(NC[0], data?.distribution?.total || 1, 200)} max={200}
                                 color="#67CB35"/>
                  </div>
                  <p>{NC[0]} School{NC[0] > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div className="col-md-8 col-8">
                    <h6>North-East Region</h6>
                    <ProgressBar number={getPercentage(NE[0], data?.distribution?.total || 1, 200)} max={200}
                                 color="#7F58D9"/>
                  </div>
                  <p>{NE[0]} School{NE[0] > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div className="col-md-8 col-8">
                    <h6>North-West Region</h6>
                    <ProgressBar number={getPercentage(NW[0], data?.distribution?.total || 1, 200)} max={200}
                                 color="#225A60"/>
                  </div>
                  <p>{NW[0]} School{NW[0] > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SchoolFilter/>
      </div>}
    </>
  );
};
