import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Order from "../Order/index";
import Transition from "../Admin/Dashboard/Order/DashboardTransition";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { DialogContentText } from "@material-ui/core";
import requestAPI from "../../apis";
import CustomNoRowsOverlay from "../Admin/Dashboard/Order/CustomNoRowsOverlay";
import { Box } from "@mui/system";

export default function Index() {
  const [displayImage, setDisplayImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const onOpen = () => {
    setOpen(true);
    setLoading(true);
    requestAPI("/pricelist", "GET").then((res) => {
      if (res) {
        setLoading(false);
        setDisplayImage(res.data[0]?.priceList);
      }
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="order">
      <div style={{ display: "block", padding: 30 }}>
        <Tabs defaultActiveKey="first">
          <Tab eventKey="first" title="Giao hàng tiêu chuẩn">
            <h1>Dịch vụ chuyển phát tiêu chuẩn</h1>
            <span className="mb-3">
              TKT Logistic là thương hiệu chuyển phát nhanh dựa trên sự phát
              triển của công nghệ và internet. TKT Logistic cam kết mang đến cho
              khách hàng những trải nghiệm tốt nhất khi lựa chọn sử dụng dịch vụ
              của chúng tôi.
            </span>
            <span>
              TKT Logistic là thương hiệu chuyển phát nhanh dựa trên sự phát
              triển của công nghệ và internet. TKT Logistic cam kết mang đến cho
              khách hàng những trải nghiệm tốt nhất khi lựa chọn sử dụng dịch vụ
              của chúng tôi.
            </span>
            <span>
              TKT Logistic là thương hiệu chuyển phát nhanh dựa trên sự phát
              triển của công nghệ và internet. TKT Logistic cam kết mang đến cho
              khách hàng những trải nghiệm tốt nhất khi lựa chọn sử dụng dịch vụ
              của chúng tôi.
            </span>
          </Tab>
          <Tab eventKey="second" title="Giao hàng nhanh">
            <h1>Dịch vụ Nhanh - TKT Fast</h1>
            <span>
              TKT Logistic là thương hiệu chuyển phát nhanh dựa trên sự phát
              triển của công nghệ và internet
            </span>
          </Tab>
        </Tabs>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="orange">{"Bảng giá vận chuyển"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Stack sx={{ width: "100%", maxWidth: 500 }} spacing={2}>
              {!loading ? (
                displayImage ? (
                  <div
                    className="dashboard-upload-image"
                    style={{ backgroundImage: `url(${displayImage})` }}
                  />
                ) : (
                  <CustomNoRowsOverlay />
                )
              ) : (
                <Box>
                  <CircularProgress />
                </Box>
              )}
            </Stack>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <div className="list-cost" onClick={() => onOpen()}>
        <span>BẢNG GIÁ</span>
      </div>
      <div className="order">
        <div className="form_order mt-5">
          <div className="ordernow section-area container">
            <Order />
          </div>
        </div>
      </div>
    </div>
  );
}
