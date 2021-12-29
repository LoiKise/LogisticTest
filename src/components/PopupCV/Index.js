import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    Stack,
    CircularProgress,
} from "@mui/material";
import { CLOUDINARY_FOLDER, CLOUDINARY_URL } from "../../utils/constant";
import { useDispatch, useSelector } from 'react-redux';
import { handlePopupCV } from "../../features/home/homeSlice";
import CVInput from "./CVInput";
import requestAPI from "../../apis";
import axios from "axios";
import { Chip } from "@material-ui/core";
import { Box } from "@mui/system";
import { useSnackbar } from 'notistack';
import Transition from '../Admin/Dashboard/Order/DashboardTransition';
const PopupCV = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const isPopup = useSelector(state => state.home.statusPopup)
    const [loadFile, setLoadFile] = useState(false);
    const [fileName, setFileName] = useState("");
    const [profile, setProfile] = useState({
        name: "",
        phone: "",
        email: "",
        position: "",
        cvUrl: "",
    });
    const handleClose = () => {
        dispatch(handlePopupCV(false));
    };
    const handleChangeImage = async (e) => {
        setLoadFile(true);
        const files = e.target.files[0];
        const data = new FormData();
        data.append("file", files);
        data.append("upload_preset", CLOUDINARY_FOLDER);
        setFileName(files?.name);
        axios.post(CLOUDINARY_URL, data)
            .then((res) => {
                if (res) {
                    setLoadFile(false);
                    setProfile({ ...profile, cvUrl: res?.data?.url });
                }
            })
            .catch((err) => {
                enqueueSnackbar(
                    "Tải đơn xin việc thất bại, vui lòng kiểm tra lại đường truyền mạng",
                    {
                        persist: false,
                        variant: "error",
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    }
                );
            });
    };
    const sendCV = (e) => {
        const ver_phone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        const ver_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!profile.name) {
            enqueueSnackbar("Họ và tên không được để trống", {
                persist: false,
                variant: "warning",
                preventDuplicate: true,
                autoHideDuration: 3000,
            });
        } else if (!ver_email.test(profile.email)) {
            enqueueSnackbar(
                "Địa chỉ email chưa đúng định dạng, vui lòng kiểm tra lại",
                {
                    persist: false,
                    variant: "warning",
                    preventDuplicate: true,
                    autoHideDuration: 3000,
                }
            );
        } else if (!ver_phone.test(profile.phone)) {
            enqueueSnackbar(
                "Số điện thoại chưa đúng hoặc không tồn tại, vui lòng kiểm tra lại",
                {
                    persist: false,
                    variant: "warning",
                    preventDuplicate: true,
                    autoHideDuration: 3000,
                }
            );
        } else if (!profile.position) {
            enqueueSnackbar("Vị trí ứng tuyển không được bỏ trống", {
                persist: false,
                variant: "warning",
                preventDuplicate: true,
                autoHideDuration: 3000,
            });
        } else if (!profile.cvUrl) {
            enqueueSnackbar("Vui lòng không bỏ trống đơn xin việc", {
                persist: false,
                variant: "warning",
                preventDuplicate: true,
                autoHideDuration: 3000,
            });
        } else {
            requestAPI("/cv/send", "POST", profile)
                .then((res) => {
                    if (res) {
                        handleClose();
                        enqueueSnackbar(
                            "Cảm ơn bạn đã gửi đơn ứng tuyển, chúng tôi sẽ liên lạc với bạn sớm nhất có thể",
                            {
                                persist: false,
                                variant: "success",
                                preventDuplicate: true,
                                autoHideDuration: 3000,
                            }
                        );
                    }
                })
                .catch((err) => {
                    if (err) {
                        enqueueSnackbar(
                            "Gửi đơn thất bại, vui lòng kiểm tra lại đường truyền mạng",
                            {
                                persist: false,
                                variant: "error",
                                preventDuplicate: true,
                                autoHideDuration: 3000,
                            }
                        );
                    }
                });
        }
    };
    return (
        <Dialog
            open={isPopup}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleClose()}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle className="orange">{"Đơn Xin Việc"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <Stack sx={{ width: "100%", maxWidth: 800 }} spacing={2}>
                        <CVInput
                            label={"Họ và tên đầy đủ"}
                            setProfile={setProfile}
                            profile={profile}
                            objectKey="name"
                            type="text"
                        />
                        <CVInput
                            label={"Email liên lạc"}
                            setProfile={setProfile}
                            profile={profile}
                            objectKey="email"
                            type="email"
                        />
                        <CVInput
                            label={"Số điện thoại liên lạc"}
                            setProfile={setProfile}
                            profile={profile}
                            objectKey="phone"
                            type="text"
                        />
                        <CVInput
                            label={"Vị trí ứng tuyển"}
                            setProfile={setProfile}
                            profile={profile}
                            objectKey="position"
                            type="text"
                        />

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyItems: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <label
                                htmlFor="icon-button-file"
                                style={{ margin: "0 20px 0 0 " }}
                            >
                                <Input
                                    accept="image/*"
                                    id="icon-button-file"
                                    type="file"
                                    onChange={handleChangeImage}
                                    style={{ display: "none" }}
                                />
                                <Button variant="contained" component="span">
                                    Chọn file
                                </Button>
                            </label>
                            {loadFile ? (
                                <Box>
                                    <CircularProgress size={30} thickness={4} />
                                </Box>
                            ) : (
                                fileName && (
                                    <Chip
                                        label={fileName}
                                        color="primary"
                                        variant="outlined"
                                    />
                                )
                            )}
                        </div>
                        <div class="modal-footer">
                            <label htmlFor="icon-button-file">
                                <input
                                    id="icon-button-file"
                                    type="file"
                                    accept="application/pdf"
                                    style={{ display: "none" }}
                                />
                                <button
                                    className="btn btn-outline-success btn-lg"
                                    onClick={() => sendCV()}
                                >
                                    Gửi đơn xin việc
                                </button>
                            </label>
                        </div>
                    </Stack>
                </DialogContentText>
            </DialogContent>
        </Dialog>

    )
}
export default PopupCV;