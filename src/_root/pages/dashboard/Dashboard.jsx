import LineChartComp from './charts/LineChartComp'
import BarChartComp from './charts/BarChartComp'
import PieChartComp from './charts/PieChartComp'

const Dashboard = () => {

  return (
    <div className="dashboard">
      <div className="content">
        Dashboard
      </div>

      <div className="grid gap-2">
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
