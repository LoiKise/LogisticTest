export const rules = {
  fullname: {
    required: {
      value: true,
      message: "Họ và Tên là bắt buộc nhập",
    },
    maxLength: {
      value: 160,
      message: "Tên có độ dài tối đa là 160 ký tự",
    },
    validate: {
      kytu: (value) =>
        !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
        "Vui lòng không nhập ký tự đặc biệt",
    },
  },
  batbuoc: {
    required: {
      value: true,
      message: "Trường này là bắt buộc nhập",
    },
  },
  title: {
    required: {
      value: true,
      message: "Tiêu đề là bắt buộc nhập",
    },
    maxLength: {
      value: 160,
      message: "Tiêu đề có độ dài tối đa là 160 ký tự",
    },
  },
  text: {
    required: {
      value: true,
      message: "Nội dung là bắt buộc nhập",
    },
    maxLength: {
      value: 160,
      message: "Nội dung có độ dài tối đa là 160 ký tự",
    },
  },
  email: {
    required: {
      value: true,
      message: "Email là bắt buộc nhập",
    },
    minLength: {
      value: 6,
      message: "Email có độ dài từ 6 - 160 ký tự",
    },
    maxLength: {
      value: 160,
      message: "Email có độ dài tối đa 160 ký tự",
    },
    validate: {
      email: (value) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "Email không đúng định dạng",
    },
  },
  phone: {
    required: {
      value: true,
      message: "Số điện thoại là bắt buộc nhập",
    },
    minLength: {
      value: 9,
      message: "Số điện thoại có độ dài trên 9 ký tự trở lên",
    },
    maxLength: {
      value: 11,
      message: "Số điện thoại có độ dài tối đa là 11 ký tự",
    },
    validate: {
      number: (value) =>
        /((03|05|07|08|09)+([0-9]{8})\b)/g.test(value) ||
        "Số điện thoại không đúng định dạng",
    },
  },
  weight: {
    required: {
      value: true,
      message: "Trọng lượng là bắt buộc nhập",
    },
    validate: {
      number: (value) =>
        /^[0-9]*$/.test(value) || "Vui lòng nhập đúng định dạng là số",
    },
  },
  password: {
    required: {
      value: true,
      message: "Mật khẩu là bắt buộc nhập",
    },
    minLength: {
      value: 6,
      message: "Mật khẩu có độ dài từ 6 - 160 ký tự",
    },
    maxLength: {
      value: 160,
      message: "Mật khẩu có độ dài tối đa là 160 ký tự",
    },
    validate: {
      kytu: (value) =>
        !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
        "Vui lòng không nhập ký tự đặc biệt",
    },
  },
};
