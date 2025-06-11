
import { useEffect, useState } from "react";
import CardBox from "../../shared/CardBox";
import Chart from 'react-apexcharts';
import { getUserJoined } from "src/utils/api";
// const ChartData: any = {
//   chart: {
//     id: "annual-profit",
//     type: "area",
//     height: 80,
//     sparkline: {
//       enabled: true,
//     },
//     group: "sparklines",
//     fontFamily: "inherit",
//     foreColor: "#adb0bb",
//   },
//   series: [
//     {
//       name: "Users",
//       color: "var(--color-primary)",
//       data: [25, 66, 20, 40, 12, 58, 20],
//     },
//   ],
//   stroke: {
//     curve: "smooth",
//     width: 2,
//   },
//   fill: {
//     type: "gradient",
//     color: "var(--color-primary)",

//     gradient: {
//       shadeIntensity: 0,
//       inverseColors: false,
//       opacityFrom: 0.1,
//       opacityTo: 0.8,
//       stops: [100],
//     },
//   },

//   markers: {
//     size: 0,
//   },
//   tooltip: {
//     theme: "dark",
//     fixed: {
//       enabled: true,
//       position: "right",
//     },
//     x: {
//       show: false,
//     },
//   },
// };


const ChartData: any = {
  series: [
    {
      name: "Users",
      color: "var(--color-primary)",
      data: [25, 78, 15, 50, 8, 78, 20],
    },
  ],

  chart: {
    type: "area",
    height: 70,
    sparkline: {
      enabled: true,
    },
    group: "sparklines",
    fontFamily: "inherit",
    foreColor: "#adb0bb",
  },
  color: "var(--color-secondary)",
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    color: "var(--color-secondary)",
    gradient: {
      shadeIntensity: 0,
      inverseColors: false,
      opacityFrom: 0.2,
      opacityTo: 0.8,
      stops: [100],
    },
  },
  markers: {
    size: 0,
  },
  tooltip: {
    theme: "dark",
    fixed: {
      enabled: true,
      position: "right",
    },
    x: {
      show: false,
    },
  },
};


const AnnualProfit = () => {
  const [userData,setUserData]=useState<any>([]);
  useEffect(
    ()=>{
      getUserJoined(
        (data:any)=>{
          console.log(data);
          setUserData(data);
        },
      ()=>{}
    )
    },
    [])
    console.log("data",userData)
  return (
    <>
      <CardBox>
        <div className="custom-scrollbar max-h-[700px] min-h-[425px] pr-10 pl-10">
          <h5 className="card-title">User's Joined</h5>
          {/* <div className="bg-lightprimary mt-4 overflow-hidden rounded-md mb-1">
            <div className="py-30 px-6 flex justify-between items-center ">
              <p className="text-ld">Conversion Rate</p>
              <h4 className="text-28">18.4%</h4>
            </div>
            <Chart
              options={ChartData}
              series={ChartData.series}
              type="area"
              height="80px"
              width="100%"
              className="mt-4"
            />
          </div> */}
          <div className="flex items-center justify-between py-4  border-b  border-ld">
          
            <div>
              <span className="font-medium text-ld opacity-80">
                Today
              </span>
              {/* <p className="text-13">}</p> */}
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">{userData.today}</h6>
              {/* <span className="text-13 text-success font-medium">+13.2%</span> */}
            </div>
            
          </div>
          <div className="flex items-center justify-between py-4  border-b  border-ld">
          
            <div>
              <span className="font-medium text-ld opacity-80">
                Yesterday
              </span>
              {/* <p className="text-13">}</p> */}
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">{userData.yesterday}</h6>
              {/* <span className="text-13 text-success font-medium">+13.2%</span> */}
            </div>
            
          </div>

          <div className="flex items-center justify-between py-4  border-b  border-ld">
          
            <div>
              <span className="font-medium text-ld opacity-80">
                This Week
              </span>
              {/* <p className="text-13">}</p> */}
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">{userData.thisWeek}</h6>
              {/* <span className="text-13 text-success font-medium">+13.2%</span> */}
            </div>
            
          </div>
          <div className="flex items-center justify-between py-4  border-b  border-ld">
          
            <div>
              <span className="font-medium text-ld opacity-80">
                This Month
              </span>
              {/* <p className="text-13">}</p> */}
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">{userData.thisMonth}</h6>
              {/* <span className="text-13 text-success font-medium">+13.2%</span> */}
            </div>
            
          </div>
          <div className="flex items-center justify-between py-4  border-b  border-ld">
          
            <div>
              <span className="font-medium text-ld opacity-80">
                Last Month
              </span>
              {/* <p className="text-13">}</p> */}
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">{userData.lastMonth}</h6>
              {/* <span className="text-13 text-success font-medium">+13.2%</span> */}
            </div>
            
          </div>
          <div className="flex items-center justify-between py-4  border-b  border-ld">
          
            <div>
              <span className="font-medium text-ld opacity-80">
                Last 7 Days
              </span>
              {/* <p className="text-13">}</p> */}
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">{userData.last7Days}</h6>
              {/* <span className="text-13 text-success font-medium">+13.2%</span> */}
            </div>
            
          </div>

          <div className="flex items-center justify-between py-4  border-b  border-ld">
          
            <div>
              <span className="font-medium text-ld opacity-80">
                Last 30 Days
              </span>
              {/* <p className="text-13">}</p> */}
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">{userData.last30Days}</h6>
              {/* <span className="text-13 text-success font-medium">+13.2%</span> */}
            </div>
            
          </div>
          <div className="flex items-center justify-between py-4  border-b  border-ld">
          
            <div>
              <span className="font-medium text-ld opacity-80">
                Last 90 Days
              </span>
              {/* <p className="text-13">}</p> */}
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">{userData.last90Days}</h6>
              {/* <span className="text-13 text-success font-medium">+13.2%</span> */}
            </div>
            
          </div>
          <div className="flex items-center justify-between py-4  border-b  border-ld">
          
            <div>
              <span className="font-medium text-ld opacity-80">
                Last 6 Months
              </span>
              {/* <p className="text-13">}</p> */}
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">{userData.last6Months}</h6>
              {/* <span className="text-13 text-success font-medium">+13.2%</span> */}
            </div>
            
          </div>

          <div className="flex items-center justify-between py-4  border-b  border-ld">
          
            <div>
              <span className="font-medium text-ld opacity-80">
                This Year
              </span>
              {/* <p className="text-13">}</p> */}
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">{userData.thisYear}</h6>
              {/* <span className="text-13 text-success font-medium">+13.2%</span> */}
            </div>
            
          </div>
          {/* <div className="flex items-center justify-between py-4  border-b  border-ld">
            <div>
              <span className="font-medium text-ld opacity-80">
                Reached to Checkout
              </span>
              <p className="text-13">12 clicks</p>
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">$16,100.00</h6>
              <span className="text-13 text-error font-medium">-7.4%</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <span className="font-medium text-ld opacity-80">
                Added to Cart
              </span>
              <p className="text-13">24 views</p>
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">$6,400.50</h6>
              <span className="text-13 text-success font-medium">+9.3%</span>
            </div>
          </div> */}
        </div>
      </CardBox>
    </>
  );
};

export default AnnualProfit;
