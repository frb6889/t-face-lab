// src/constant.ts

// 定义 TabsKindsArr
export const TabsKindsArr = [
    { value: "TJ", name: "推荐" },
    { value: "SZ", name: "最新" },
    // 添加其他标签
  ];
  
  // 定义 IUserData 接口
  export interface IUserData {
    imgSrc: string;
    content: string;
    userSrc: string;
    name: string;
    num: number;
  }
  