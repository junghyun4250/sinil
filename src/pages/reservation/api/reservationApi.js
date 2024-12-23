import instance from "../../libs/script/axiosConfig";

// 아이디 중복 체크
const isIDinDB = (param) => {
  return instance.post("/api/isIDinDB", param);
};

export // getUserList
 {};
