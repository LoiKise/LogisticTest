import React from "react";
import { Link } from "react-router-dom";

import { formatMoney } from "../../helpers/money";

export default function RecruitmentJob({ jobs, images }) {
  return (
    <>
      {jobs.map((job) => (
        <div key={job.id} className="job-item">
          <h2 className="job-item-title">{job.nameJob}</h2>
          <div className="job-item-list">
            <div className="job-item-list-item">
              <img src={images[0].IMGMoney} alt="" />
              <span>
                Mức lương : {formatMoney(job.salaryBefore)} -{" "}
                {formatMoney(job.salaryAfter)}đ
              </span>
            </div>
            <div className="job-item-list-item">
              <img src={images[1].IMGDate} alt="" />
              <span>
                Ngày đăng : {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="job-item-list-item">
              <img src={images[2].IMGLocation} alt="" />
              <span>Địa điểm : {job.address}</span>
            </div>
            <Link
              to={`/DetailJob/${job?.id}`}
              className="job-item-btn"
              onChange={() => {}}
            >
              Xem chi tiết
            </Link>
            <div className="job-item-list-item">
              <img src={images[3].IMGDegree} alt="" />
              <span>Bằng Cấp : {job.degree}</span>
            </div>
            <div className="job-item-list-item">
              <img src={images[1].IMGDate} alt="" />
              <span>
                Hạn cuối nộp hồ sơ :
                {new Date(job.expirationDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
