import React, { useState, useEffect } from "react";
import "./search-bar.scss";
// import { BsSearch } from "react-icons/bs";
// import Icon from "../../assets/images/search-icon1.png";
// import Arrow from "../../assets/images/filter-arrow.png";
function SearchBar({ callback, posts }) {
  const [sortType, setSortType] = useState("ascending");

  // Sortby field i.e. title or description
  const [sortByField, setSortByField] = useState("date");

  // Store filter/latest posts
  const [result, setResult] = useState();

  const [state, setstate] = useState({
    query: "",
    list: posts,
  });
  // Filter posts on typing in search input
  const handleChange = (e) => {
    const results = posts?.filter((post) => {
      if (e.target.value === "") return post;
      return (
        post?.name?.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });

    setResult(results);

    setstate({
      query: e.target.value,
      list: sortFunc(results, sortType, sortByField),
    });
  };

  // Sort posts depending on sort type and available results
  function sortFunc(results, sortType, sortByField) {
    if (sortType === "ascending") {
      results.sort((a, b) => (a[sortByField] < b[sortByField] ? -1 : 1));
    } else if (sortType === "descending") {
      results.sort((a, b) => (b[sortByField] > a[sortByField] ? 1 : -1));
    }
    return results;
  }

  useEffect(() => {
    callback(state);
  }, [state]);

  return (
    <>
      <form action="" className="flexy col-md-12">
        <div className="search-div col-md-12">
          <div className="search-bar  ">
            {" "}
            <input
              type="search"
              name="search"
              pattern=".*\S.*"
              required
              onChange={handleChange}
              value={state.query}
            />
            <button class="search-btn" type="submit"></button>
          </div>
        </div>
      </form>
      <ul>{state.list?.length === 0 && <></>}</ul>
    </>
  );
}

export default SearchBar;
