import React, { useEffect, useState } from "react"
//@ts-ignore
import style from "./index.module.less"
import { Tabs, List } from "react-vant"
import { TabsKindsArr, IUserData } from "../../constant"
import { LikeO } from "@react-vant/icons"
import Macy from "macy"
import axios from "axios"
/* import MyLoading from "@/components/Loading" */

import OrbitProgress from "react-loading-indicators/OrbitProgress"

export const Find: React.FC = () => {
  const [active, SetActive] = useState("TJ")
  const [visible, setVisible] = useState(false)
  const [mylist, setmylist] = useState<IUserData[]>([])
  const [macy, SetMacy] = useState<any>(null)

  useEffect(() => {
    InitMacy()
  }, [mylist])

  const debounce = (fn: any, time: number) => {
    let timeout: any = null
    return () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn()
      }, time)
    }
  }

  const getList = () => {
    if (visible) return
    setVisible(true)
    axios
      .get(
        "https://www.fastmock.site/mock/e691a0e4c13d795a0ad56c0ad6f279d7/api/api/list"
      )
      .then(res => {
        setmylist((list: IUserData[]) => {
          return [...list, ...res.data.data]
        })
        setVisible(false)
      })
  }
  useEffect(() => {
    getList()
  }, [])

  const handleTabsChange = (key: any) => {
    SetActive(key)
    getList()
    macy.reInit()
  }

  const InitMacy = () => {
    if (!macy) {
      SetMacy(
        new Macy({
          container: "#macy-container",
          trueOrder: false,
          mobileFirst: true,
          waitForImages: false,
          margin: { x: 10, y: 10 },
          columns: 2 // 设置列数
        })
      )
    } else {
      macy.runOnImageLoad(function () {
        macy.reInit()
      }, true)
      // runOnImageLoad 这个方法 第二个参数为true 表示图片每一张加载都会执行 这样就不会有排版的的闪烁问题
    }
  }

  return (
    <>
      <Tabs
        active={active}
        className={style.TabsForScroll}
        onChange={handleTabsChange}
      >
        {TabsKindsArr.map((item, index) => (
          <Tabs.TabPane
            name={item.value}
            key={index}
            title={`${item.name}`}
          ></Tabs.TabPane>
        ))}
      </Tabs>
      <div className={style.mainList}>
        <List
          onLoad={debounce(() => {
            getList()
          }, 500)}
          finished={false}
          finishedText={"没有更多了～"}
          offset={200}
        >
          <div id="macy-container">
            {mylist.map((it, index) => {
              return (
                <div key={index} className={style.item}>
                  <img src={it.imgSrc} alt="" />
                  <div className={style.footer}>
                    <div>
                      <span className={style.spanclass}>{it.content}</span>
                    </div>
                    <div className={style.footerMainBom}>
                      <div className={style.footerLeft}>
                        <img src={it.userSrc} alt="" />
                        <span style={{ marginLeft: "5px" }}>{it.name}</span>
                      </div>
                      <div className={style.footerRight}>
                        <LikeO className={style.heart} />
                        <span>{it.num}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </List>
      </div>
      <OrbitProgress color="#000000" size="medium" text="" textColor="" />
    </>
  )
}
