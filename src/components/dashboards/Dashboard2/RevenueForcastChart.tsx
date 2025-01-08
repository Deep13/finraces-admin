import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { getRaceDataByMonths } from "src/utils/api";
import { Spinner,Dropdown } from "flowbite-react";

const RevenueForcastChart = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [months,setMonths]=useState(12);

  useEffect(() => {
    getRaceDataByMonths(
      (data: any) => {
        const categories = Object.keys(data);
        const values = Object.values(data);

        // Ensure chartData is populated correctly
        setChartData({
          series: [
            {
              name: "2024",
              data: values,
            },
          ],
          categories,
        });
      },
      (error: any) => {
        console.log(error);
      },
      months
    );
  }, [months]);

  // Make sure chartData is available before rendering
  // if (!chartData) {
  //   return (
      
  //       <div>Loading chart data...</div>
  //   );
  // }

  const ChartData: any = {
    series: chartData?.series || [], // Ensuring fallback if series is empty
    chart: {
      toolbar: {
        show: false,
      },
      type: "bar",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      height: 300,
      stacked: false,
      offsetX: -15,
    },
    colors: ["var(--color-primary)", "var(--color-error)"],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "30%",
        borderRadius: 0,
        borderRadiusApplication: "none",
        borderRadiusWhenStacked: "none",
      },
    },
    dataLabels: {
      enabled: false,
      
    },
    legend: {
      show: false,
    },
    grid: {
      show: true,
      padding: {
        top: 0,
        bottom: 0,
        right: 0,
      },
      borderColor: "rgba(0,0,0,0.05)",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
        // min: -5,
        // max: 5,
        // tickAmount: 4,
      },
      
    },
    yaxis: {
      // min: -5,
      // max: 5,
      // tickAmount: 4,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: chartData?.categories || [], // Categories from chartData
      labels: {
        style: { fontSize: "13px", colors: "#adb0bb", fontWeight: "400" },
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <CardBox>
      <div className="md:flex justify-between items-center">
        <div>
          <h5 className="card-title">Race's Conducted</h5>
          <p className="card-subtitle">in the last {months} months</p>
        </div>
        <Dropdown
        label={`Last ${months} Months`}
        size="sm"
        placement="bottom-end"
        color="inline"
                            
        // onSelect={(newStatus: string) => handleStatusChange(ticket.id, newStatus)}
        >
          <Dropdown.Item onClick={()=>{setMonths(3)}}>
            Last 3 Months
          </Dropdown.Item>
          <Dropdown.Item onClick={()=>{setMonths(6)}} >
            Last 6 Months
          </Dropdown.Item >
          <Dropdown.Item onClick={()=>{setMonths(12)}} >
            Last 12 Months
          </Dropdown.Item>
          <Dropdown.Item onClick={()=>{setMonths(18)}}>
            Last 18 Months
          </Dropdown.Item>
           
        </Dropdown>
      </div>
      
      <div>
        <Chart
          options={ChartData}
          series={ChartData.series}
          type="bar"
          height="480px"
          width="100%"
        />
      </div>
      {/* <div className="flex md:flex-row flex-col gap-3">
        <div className="md:basis-1/3 basis-full">
          <div className="flex gap-3 items-center">
            <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-muted dark:bg-dark rounded-tw">
              <Icon
                icon="solar:pie-chart-2-linear"
                className="text-ld"
                height={24}
              />
            </span>
            <div>
              <p>Total</p>
              <h5 className="font-medium text-lg">$96,640</h5>
            </div>
          </div>
        </div>
        <div className="md:basis-1/3 basis-full">
          <div className="flex gap-3 items-center">
            <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-lightprimary rounded-tw">
              <Icon
                icon="solar:dollar-minimalistic-linear"
                className="text-primary"
                height={24}
              />
            </span>
            <div>
              <p>Profit</p>
              <h5 className="font-medium text-lg">$48,820</h5>
            </div>
          </div>
        </div>
        <div className="md:basis-1/3 basis-full">
          <div className="flex gap-3 items-center">
            <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-lighterror rounded-tw">
              <Icon
                icon="solar:database-linear"
                className="text-error"
                height={24}
              />
            </span>
            <div>
              <p>Earnings</p>
              <h5 className="font-medium text-lg">$48,820</h5>
            </div>
          </div>
        </div>
      </div> */}
    </CardBox>
  );
};

export default RevenueForcastChart;
