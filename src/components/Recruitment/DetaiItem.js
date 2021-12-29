import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import RoomIcon from "@material-ui/icons/Room";
import DateRangeIcon from "@material-ui/icons/DateRange";

import { useLocation } from "react-router";
import requestAPI from "../../apis";
import moment from "moment";

export default function DetaiItem() {
  const [data, setData] = useState();

  const path = useLocation();
  const { pathname } = path;
  const idJob = pathname?.slice(11, pathname.length);
  useEffect(() => {
    getItemJOb(idJob);
  }, [idJob]);
  const getItemJOb = (id) => {
    requestAPI(`/job/${id}`, "GET")
      .then((res) => {
        if (res) {
          console.log({ api: res.data });
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="detail_job">
      <div className="container">
        <div style={{ display: "block", padding: 30 }}>
          <Tabs defaultActiveKey="first">
            <Tab eventKey="first" title="THÔNG TIN">
              <div className="row">
                <div className="col-xl-8  col-md-12 tab-main-content">
                  <h1>CÁC PHÚC LỢI DÀNH CHO BẠN</h1>
                  <div className="benefits">
                    <div className="benefit ">
                      <div className="benefit-name">
                        <MonetizationOnIcon />
                        <span>
                          {" "}
                          {data?.salaryBefore
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          đ
                        </span>{" "}
                        -{" "}
                        <span>
                          {" "}
                          {data?.salaryAfter
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </span>
                      </div>
                      <div className="benefit-name">
                        <LocalHospitalIcon />
                        <span> Gói bảo hiểm cao cấp</span>
                      </div>
                    </div>
                  </div>
                  <div className="job-description">
                    <h1>MÔ TẢ CÔNG VIỆC</h1>
                    <div className="description">{data?.require}</div>
                    <div className="job-requirements">
                      <h1>YÊU CẦU CÔNG VIỆC</h1>
                      <div className="requirements">{data?.thumbnails}</div>
                    </div>
                    <div className="job-locations">
                      <h1>ĐỊA ĐIỂM CÔNG VIỆC</h1>
                      <div className="location-name">
                        <RoomIcon />
                        <span> {data?.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-12 tab-sidebar">
                  <div className="box-summary">
                    <div className="summary-item d-flex">
                      <div className="icon icon-date-posted">
                        <span>
                          <DateRangeIcon />
                        </span>
                      </div>
                      <div className="summary-content d-flex flex-column">
                        <span className="content-label">NGÀY ĐĂNG TUYỂN</span>
                        <span className="content">
                          {moment(data?.createdAt).format("DD-MM-YYYY")}
                        </span>
                      </div>
                    </div>
                    <div className="summary-item d-flex">
                      <div className="icon icon-date-posted">
                        <span>
                          <DateRangeIcon />
                        </span>
                      </div>
                      <div className="summary-content d-flex flex-column">
                        <span className="content-label">CẤP BẬC</span>
                        <span className="content">{data?.degree}</span>
                      </div>
                    </div>
                    <div className="summary-item d-flex">
                      <div className="icon icon-date-posted">
                        <span>
                          <DateRangeIcon />
                        </span>
                      </div>
                      <div className="summary-content d-flex flex-column">
                        <span className="content-label">NGÀNH NGHỀ</span>
                        <span className="content">{data?.nameJob}</span>
                      </div>
                    </div>
                    <div className="summary-item d-flex">
                      <div className="icon icon-date-posted">
                        <span>
                          <DateRangeIcon />
                        </span>
                      </div>
                      <div className="summary-content d-flex flex-column">
                        <span className="content-label">KĨ NĂNG</span>
                        <span className="content">{data?.require}</span>
                      </div>
                    </div>
                    <div className="summary-item d-flex">
                      <div className="icon icon-date-posted">
                        <span>
                          <DateRangeIcon />
                        </span>
                      </div>
                      <div className="summary-content d-flex flex-column">
                        <span className="content-label">
                          NGÔN NGỮ TRÌNH BÀY HỒ SƠ
                        </span>
                        <span className="content">BẤT KỲ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="second" title="CÔNG TY">
              <div className="row">
                <div className="col-md-8 col-md-12">
                  <h1>CÔNG TY GPT GROUPT NET</h1>
                </div>
                <div className="col-xl-4 col-md-12">
                  <div className="box-summary">
                    <div className="summary-item d-flex">
                      <div className="icon icon-date-posted">
                        <span>
                          <DateRangeIcon />
                        </span>
                      </div>
                      <div className="summary-content d-flex flex-column">
                        <span className="content-label">NGÀY ĐĂNG TUYỂN</span>
                        <span className="content">22/11/2021</span>
                      </div>
                    </div>
                    <div className="summary-item d-flex">
                      <div className="icon icon-date-posted">
                        <span>
                          <DateRangeIcon />
                        </span>
                      </div>
                      <div className="summary-content d-flex flex-column">
                        <span className="content-label">CẤP BẬC</span>
                        <span className="content">NHÂN VIÊN</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
