import { h } from "vue";
import { SpaCandle } from "@icon-park/vue-next";
import { dayjs } from 'element-plus'

// 时钟
export const getCurrentTime = () => {
  let time = new Date();
  let year = time.getFullYear();
  let month =
    time.getMonth() + 1 < 10
      ? "0" + (time.getMonth() + 1)
      : time.getMonth() + 1;
  let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  let hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  let minute =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  let second =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  let weekday = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let currentTime = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekday: weekday[time.getDay()],
  };
  return currentTime;
};

// 时光胶囊
// export const getTimeCapsule = () => {
//     // 日进度
//     let todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
//     let todayPassHours = (new Date() - todayStartDate) / 1000 / 60 / 60;
//     let todayPassHoursPercent = (todayPassHours / 24) * 100;
//     // 周进度
//     let weeks = [7, 1, 2, 3, 4, 5, 6];
//     let weekDay = weeks[new Date().getDay()];
//     let weekDayPassPercent = (weekDay / 7) * 100;
//     // 月进度
//     let year = new Date().getFullYear();
//     let date = new Date().getDate();
//     let month = new Date().getMonth() + 1;
//     let monthAll = new Date(year, month, 0).getDate();
//     let monthPassPercent = (date / monthAll) * 100;
//     // 年进度
//     let yearPass = (month / 12) * 100;
//     return {
//         day: {
//             start: parseInt(todayPassHours),
//             pass: parseInt(todayPassHoursPercent),
//         },
//         week: {
//             start: weekDay,
//             pass: parseInt(weekDayPassPercent),
//         },
//         month: {
//             start: date,
//             pass: parseInt(monthPassPercent),
//         },
//         year: {
//             start: month == 0 ? month : month - 1,
//             pass: parseInt(yearPass),
//         }
//     }
// }
export const getTimeCapsule = () => {
  // 日进度
  const todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
  const todayPassHours = (new Date() - todayStartDate) / 1000 / 60 / 60;
  const todayPassHoursPercent = (todayPassHours / 24) * 100;

  // 周进度
  const weeks = [7, 1, 2, 3, 4, 5, 6];
  const weekDay = weeks[new Date().getDay()];
  const weekDayPassPercent = (weekDay / 7) * 100;

  // 月进度
  const year = new Date().getFullYear();
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const monthAll = new Date(year, month, 0).getDate();
  const monthPassPercent = (date / monthAll) * 100;

  // 年进度
  const yearStartDate = new Date(year, 0, 1).getTime();
  const yearEndDate = new Date(year + 1, 0, 1).getTime();
  const yearPassHours = (new Date() - yearStartDate) / 1000 / 60 / 60;
  const yearTotalHours = (yearEndDate - yearStartDate) / 1000 / 60 / 60;
  const yearPassPercent = (yearPassHours / yearTotalHours) * 100;

  return {
    day: {
      elapsed: Math.floor(todayPassHours),
      pass: todayPassHoursPercent,
    },
    week: {
      elapsed: weekDay,
      pass: weekDayPassPercent,
    },
    month: {
      elapsed: date,
      pass: monthPassPercent,
    },
    year: {
      elapsed: month - 1,
      pass: yearPassPercent,
    },
  };
};

// 欢迎提示
export const helloInit = () => {
  let hour = new Date().getHours();
  let hello = null;
  if (hour < 6) {
    hello = "凌晨好";
  } else if (hour < 9) {
    hello = "早上好";
  } else if (hour < 12) {
    hello = "上午好";
  } else if (hour < 14) {
    hello = "中午好";
  } else if (hour < 17) {
    hello = "下午好";
  } else if (hour < 19) {
    hello = "傍晚好";
  } else if (hour < 22) {
    hello = "晚上好";
  } else {
    hello = "夜深了";
  }
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `<strong>${hello}</strong> 欢迎来到我的主页`,
  });
};

// 默哀模式
export const checkDays = () => {
  let myDate = new Date();
  let mon = myDate.getMonth() + 1;
  let date = myDate.getDate();
  let days = ["4.4", "5.12", "7.7", "9.9", "9.18", "12.13"];
  for (let day of days) {
    let d = day.split(".");
    if (mon == d[0] && date == d[1]) {
      console.log("今天是纪念日");
      let gray = document.createElement("style");
      document.body.appendChild(gray);
      gray.innerHTML =
        "html{-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none}";
      ElMessage({
        message: "今天是中国国家纪念日",
        duration: 14000,
        icon: h(SpaCandle, {
          theme: "filled",
          fill: "#efefef",
        }),
      });
    }
  }
};

// 建站日期统计
export const siteDateStatistics = (startDate) => {
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const differenceInMonths = differenceInDays / 30;
  const differenceInYears = differenceInMonths / 12;
  let str = "本站已经苟活了 ";
  if (differenceInYears >= 1) {
    str += Math.floor(differenceInYears) + " 年";
  }
  if (differenceInMonths % 12 >= 1) {
    str += " " + Math.floor(differenceInMonths % 12) + " 个月";
  }
  if (differenceInDays % 30 >= 1) {
    str += "又 " + Math.floor(differenceInDays % 30) + " 天";
  }
  return str;
};
