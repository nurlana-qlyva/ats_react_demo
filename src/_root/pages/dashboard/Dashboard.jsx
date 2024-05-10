import LineChartComp from "./compoenents/LineChartComp"
import BarChartComp from "./compoenents/BarChartComp"
import PieChartComp from "./compoenents/PieChartComp"


const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="content">
        Dashboard
      </div>

      <div className="grid gap-1">
        <div className="col-span-4">
          <div className="content bg-dark">
            <LineChartComp />
          </div>
        </div>
        <div className="col-span-4">
          <div className="content bg-dark">
            <BarChartComp />
          </div>
        </div>
        <div className="col-span-4">
          <div className="content bg-dark">
            <PieChartComp />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Dashboard
