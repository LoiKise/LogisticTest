import React, { useState } from "react";
import JobItem from "./RecruitmentJobItem";
import RecruitmentPagination from "./RecruitmentPagination";

export default function Jobs({ jobs, quantity, filters }) {
  const [images] = useState([
    { IMGMoney: "/assets/img/imgs/money.png" },
    { IMGDate: "/assets/img/imgs/date.png" },
    { IMGLocation: "/assets/img/icon/location.png" },
    { IMGDegree: "/assets/img/imgs/degree.png" },
  ]);
  return (
    <div className="job-list">
      {jobs && <JobItem jobs={jobs} images={images} />}
      <RecruitmentPagination filters={filters} pagination={quantity} />
    </div>
  );
}
