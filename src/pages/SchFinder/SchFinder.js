import React, {useContext, useEffect, useState} from "react";
import NavBar from "../../components/Navbar/Navbar";
import { statesAndLGAs } from "../../Data/States";
import Search from "../../assets/images/search-icon.svg";
import { topRated, featuredSchs } from "../../Data/FindSchs";
import "./sch-finder.scss";
import FIndSchools from "./FIndSchools";
import RatedSchools from "./RatedSchools";
import { Footer } from "../../components/Footer/Footer";
import api, {setAuthToken} from "../../utility/api";
import {ApiContext} from "../../ApiContext";
import {toast} from "react-toastify";
import {removeLocalStorage} from "../../utility/localStorage";
import index from "react-phone-number-input";
export const SchFinder = () => {
  const [zones,setZones]=useState({})
  const [selectedZone, setSelectedZone] = useState({});
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  const [lgas, setLgas] = useState([]);
  const [selectedLga, setSelectedLga] = useState({});
  const [schools,setSchools]=useState([])
  const [searchName,setSearchName]=useState("")
  const [visibleItems, setVisibleItems] = useState(9); // State to track the number of visible items
  const { data, loading, error, fetchData,postData }=useContext(ApiContext);
  const [isLoading,setIsLoading]=useState(false)

  async function fetchZones(){
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
    fetchZones();
    postData('/fetch-schools')
  }, []);
  useEffect(()=>{
    if(!data)return;
    setSchools(data);
  },[data])

  const searchSchool=()=>{
    let payload={};
    if(searchName)
      payload.name=searchName;
    if(selectedZone)
      payload.zone_id=selectedZone.id
    if(selectedState)
      payload.state_id=selectedState.id
    if(selectedLga)
      payload.lga_id=selectedLga.id
    postData('/fetch-schools',payload)
  }

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 9); // Increase visible items by 9 on each click
  };
  useEffect(()=>{
    setStates(selectedZone?.states);
    console.log(selectedZone)
  },[selectedZone])

  const handleZoneChange = (e) => {
    const zone = e.target.value;
    setSelectedZone(zones.zones[zone]);
  };
  useEffect(()=>{
    setLgas(selectedState.lgas);
  },[selectedState])
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(states[state]);
  };
  const handleLgaChange = (e) => {
    const lga = e.target.value;
    setSelectedLga(lgas[lga]);
  };
  const firstSchool = topRated[0];
  const secondSchool = topRated[1];
  const thirdSchool = topRated[2];
  const [state, setState] = useState({
    query: "",

    list: featuredSchs,
  });
  return (
    <>
      <NavBar />
      <div className="sch-finder-landing">
        <div className="col-md-5 offset-md-1">
          <p>Connect with schools and Top educators around you</p>
        </div>
      </div>
      <div className="col-md-10 offset-md-1 find-sch col-10 offset-1">
        <h2>Find schools around you</h2>
        {isLoading?<center>Loading...</center>
        :<>
          <div className="d-md-flex">
            <div className="col-md-10 ">
              <div className="row row-cols-1 row-cols-lg-4 g-2 g-lg-2 ">
                <div className="col">
                  <h6>School Name</h6>
                  <input onChange={(e)=>{setSearchName(e.target.value)}} name={'name'} placeholder="Enter school name or NAPPS ID" />
                </div>
                <div className="col">
                  {" "}
                  <h6>Zone</h6>
                  <select onChange={handleZoneChange}>
                    <option disabled selected>
                      Select Your Zone
                    </option>
                    {zones?.zones?.map((zone,index) => (
                        <option key={zone.id} value={index}>
                          {zone.name}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  {" "}
                  <h6>State</h6>
                  <select onChange={handleStateChange}>
                    <option value="" disabled>
                      Select your state
                    </option>
                    {states?.map((state,index) => (
                        <option key={state.id} value={index}>
                          {state.name}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <h6 style={{ textAlign: "left" }}>LGA</h6>
                  <select disabled={!selectedState} onChange={handleLgaChange}>
                    <option disabled selected>
                      LGA
                    </option>
                    {lgas?.map((lga,index) => (
                        <option key={lga} value={index}>
                          {lga.name}
                        </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <button onClick={searchSchool}>
                {" "}
                <img
                    className=""
                    src={Search}
                    alt="Scholar"
                    width="24px"
                    height="24px"
                />
                Search
              </button>
            </div>
          </div>
          <div className="next-select col-md-8 row row-cols-1 row-cols-lg-3 g-2 g-lg-2">
            <div className="col">
              {" "}
              <select>
                <option>Gender</option>
                <option>Male</option>
                <option>female</option>
              </select>
            </div>
            <div className="col">
              {" "}
              <select>
                <option>Levels of Education</option>
                <option>EYFS</option>
                <option>Primary</option>
                <option>Secondary</option>
              </select>
            </div>
            <div className="col">
              {" "}
              <select>
                <option>Boarding Facility (Hostel)</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
        </>}
      </div>
      {/*<div className="col-md-10 offset-md-1" style={{ marginTop: "80px" }}>*/}
      {/*  <h3>Top Rated Schools</h3>*/}
      {/*  <div className="d-md-flex">*/}
      {/*    <div className="col-md-5" style={{ paddingRight: "10px" }}>*/}
      {/*      {" "}*/}
      {/*      <FIndSchools data={firstSchool} />*/}
      {/*    </div>*/}
      {/*    <div className="col-md-7" style={{ paddingLeft: "10px" }}>*/}
      {/*      {" "}*/}
      {/*      <RatedSchools data={secondSchool} />*/}
      {/*      <RatedSchools data={thirdSchool} />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="col-md-10 offset-md-1 mobile-padding">
        <h3 style={{ marginTop: "80px" }}>Featured Schools</h3>
        {loading?<center>Loading...</center>:
            <div className=" row row-cols-1 row-cols-lg-3 g-2 g-lg-4 mt">
          {schools.data?.slice(0, visibleItems).map((data, index) => (
              <FIndSchools key={data.id} data={data} />
          ))}
        </div>}
        <center>
          {visibleItems < schools.length && (
            <button onClick={loadMore} className="load-more-btn">
              See More
            </button> // Only show the button if there are more items to display
          )}
        </center>
      </div>
      <Footer />
    </>
  );
};
