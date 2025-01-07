import CalendarApp from "src/components/apps/calendar";
import CustomerChart from "src/components/dashboards/Dashboard1/CustomerChart";
import RevenueByProduct from "src/components/dashboards/Dashboard1/RevenueByProduct";
import SalesOverview from "src/components/dashboards/Dashboard1/SalesOverview";
import TotalSettelment from "src/components/dashboards/Dashboard1/TotalSettelment";
import YourPerformance from "src/components/dashboards/Dashboard1/YourPerformance";
import AnnualProfit from "src/components/dashboards/Dashboard2/AnnualProfit";
import RevenueForcastChart from "src/components/dashboards/Dashboard2/RevenueForcastChart";
import ColorBoxes from "src/components/dashboards/dashboard3/ColorBoxes";


 const Dashboard3 = () => {
  
    return (
        <>
        <div className="grid grid-cols-12 gap-30">
          <div className="col-span-12">
            <ColorBoxes />
          </div>
          <div className="lg:col-span-8 col-span-12">
            <RevenueForcastChart />
          </div>
          <div className="lg:col-span-4 col-span-12">
            <AnnualProfit />
          </div>
          {/* <div className="lg:col-span-5 col-span-12">
            <YourPerformance />
          </div>
          <div className="lg:col-span-7 col-span-12">
            <div className="grid grid-cols-12 gap-30">
              <div className="md:col-span-6 col-span-12">
                <CustomerChart />
              </div>
              <div className="md:col-span-6 col-span-12">
                <SalesOverview />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <RevenueByProduct />
          </div>
          <div className="lg:col-span-4 col-span-12">
            <TotalSettelment />
          </div>
          <div className="col-span-12">
            <CalendarApp />
          </div> */}
        </div>
      </>
    )
}

export default Dashboard3;