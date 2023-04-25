import { useState } from "react";

import API, { authAPI, endpoints } from "../configs/API";
import { useEffect } from "react";
import PieChart from "../components/Charts/PieChart";
import { BarChart } from "../components/Charts/BarChart";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";
// Chart.register(CategoryScale);
const ChartJs = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {sellerId} = useParams();
  const Data = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823
      },
      {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345
      },
      {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555
      },
      {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 4555
      },
      {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 234
      }
  ]
//   Chart.register(CategoryScale);
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        var res = await authAPI().get(endpoints["report-products"](sellerId));
      } catch (error) {
        setIsLoading(false);
      }
      setIsLoading(false);
      setProducts(res.data);
    };

    loadProducts();
  }, [sellerId]);
  const [dataChart , setDataChart] = useState({
    labels: products.map((p) => p.id__count), 
    datasets: [
      {
        label: "total product of category",
        data: products.map((p) => p.id__count),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
    console.log(Data)
    console.log(products)
    return (
    <>
      <PieChart chartData={dataChart} />
      <BarChart chartData={dataChart}/>
    </>
  );
};
export default ChartJs;
