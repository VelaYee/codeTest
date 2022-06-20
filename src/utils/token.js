export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};

export const getToken = () => {
  // console.log("我来从localsession中获取token啦");
  return localStorage.getItem("TOKEN");
};

export const removeToken = () => {
  localStorage.removeItem("TOKEN");
};
