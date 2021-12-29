import requestAPI from "./index";

const recuitmentApi = {
  getRecruitments(params) {
    return requestAPI(`/jobs?${params}`, "GET");
  },
};
export default recuitmentApi;
