import { v4 as uuidv4 } from "uuid";

export const getUUID = () => {
  // 先从本地存储获取uuid（看一下本地存储里面是否有）
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  return uuid_token;
};

// 使用它的目的：
// 点击加入购物车的时候，通过请求头给服务器带临时身份给服务器，方便存储某一个用户购物车数据
