import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container mt-5">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar className="ml-5" style={{marginLeft:"40%"}}
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};