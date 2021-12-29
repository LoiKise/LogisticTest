import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import JobList from "./RecruitmentJobList";
import { getRecruitments } from "../../features/recruitment/recruitmentSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import useQuery from "../../helpers/useQuery";
import { useHistory } from "react-router";
import { stringify } from "query-string";

export default function Index() {
  const [jobs, setJob] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [quantity, setQuantity] = useState(0);
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const _filter = {
      ...query,
      page: Number(query.page) || 1,
      page_size: Number(query.page_size) || 3,
      name: query.name,
    };

    setFilters(_filter);
    const params = {
      page: Number(_filter.page),
      page_size: Number(_filter.page_size),
      name: _filter.name,
    };
    console.log(params);
    const _getRecruitments = async () => {
      const data = await dispatch(getRecruitments(stringify(params)));
      console.log(data);
      const res = await unwrapResult(data);
      console.log(res);
      setJob(res.data.data);
      setQuantity(res.data.total);
    };
    _getRecruitments();

    const { name = "" } = query;
    setSearchValue(name);
  }, [query, dispatch]);

  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    history.push(`/Recruitment?name=${searchValue}`);
  };

  return (
    <>
      <div className="recruitment">
        <div className="container">
          <div className="recruitment-content">
            <h1 className="recruitment-title">Tuyển dụng</h1>
            <p className="recruitment-span">
              Công ty chúng tôi khao khát có được nguồn nhân nhân lực chất lượng
              cao , nên luôn có chính sách ưu đãi tốt cho những người tài giỏi.
              Nếu bạn cảm thấy mình phù hợp xin hãy ứng tuyển ngay , chúng tôi
              sẽ có đãi ngộ tốt nhất giành cho bạn
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <form className="job-search" onSubmit={search}>
          <input
            type="text"
            placeholder="Tìm kiếm công việc"
            value={searchValue}
            onChange={onChangeSearch}
          />
          <button type="submit">
            <svg
              height={19}
              viewBox="0 0 19 19"
              width={19}
              className="shopee-svg-icon "
            >
              <g fillRule="evenodd" stroke="none" strokeWidth={1}>
                <g transform="translate(-1016 -32)">
                  <g>
                    <g transform="translate(405 21)">
                      <g transform="translate(611 11)">
                        <path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z" />
                        <path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </form>
        <div className="job">
          <h2 className="job-title">{quantity} công việc đang được tuyển</h2>
          <JobList jobs={jobs} quantity={quantity} filters={filters} />
        </div>
      </div>
    </>
  );
}
