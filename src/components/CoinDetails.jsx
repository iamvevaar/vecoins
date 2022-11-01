import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import "../styles/coinsDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "..";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import Chart from "../components/Chart";
import ErrorComponent from "./ErrorComponent";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const toggleClicks = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "MAX"];
  const switchChartStats = (value) => {
    switch (value) {
      case "24h":
        setDays("24h");
        break;

      case "7d":
        setDays("7d");
        break;

      case "14d":
        setDays("14d");
        break;

      case "30d":
        setDays("30d");
        break;

      case "60d":
        setDays("60d");
        break;

      case "200d":
        setDays("200d");
        break;

      case "1y":
        setDays("1y");
        break;

      case "MAX":
        setDays("max");
        break;

      default:
        break;
    }
  };

  const params = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    if (error) return <ErrorComponent />;

  return (
    <>
      <div className="coinDetails">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="choices">
              <div className="choice">
                <input
                  type="radio"
                  defaultChecked
                  name="data"
                  value={"inr"}
                  onChange={(e) => setCurrency(e.target.value)}
                />
                <div className="choiceText">INR ₹</div>
              </div>
              <div className="choice">
                <input
                  type="radio"
                  name="data"
                  value={"usd"}
                  onChange={(e) => setCurrency(e.target.value)}
                />
                <div className="choiceText">USD $ </div>
              </div>
              <div className="choice">
                <input
                  type="radio"
                  name="data"
                  value={"eur"}
                  onChange={(e) => setCurrency(e.target.value)}
                />
                <div className="choiceText">EUR €</div>
              </div>
            </div>

            <div className="mainData">
              <div className="first">
                <span>
                  Last Updated On :
                  {Date(coin.market_data.last_updated).split("G")[0]}
                </span>
              </div>

              <div className="second">
                <div className="coinImage">
                  <img
                    className="coinImage"
                    src={coin.image.large}
                    alt="error"
                  />
                </div>

                <div className="coinInfo">
                  <div>
                    <span>Rank : </span>
                    <span>{coin.market_cap_rank}</span>
                  </div>

                  <div>
                    <span>Name : </span>
                    <span>{coin.name}</span>
                  </div>

                  <div>
                    <span>Curent Price : </span>
                    <span>{currencySymbol}</span>
                    <span>{coin.market_data.current_price[currency]}</span>
                  </div>

                  <div>
                    <span>Last 24 Hrs. : </span>
                    <AiFillCaretDown
                      className={
                        coin.market_data.price_change_percentage_24h > 0
                          ? "green"
                          : "red"
                      }
                    />
                    <span>{coin.market_data.price_change_percentage_24h}%</span>
                  </div>

                  <div>
                    <span>All Time High Last 24 Hrs. : </span>
                    <BsFillArrowUpSquareFill className="iconHigh" />
                    <span>{currencySymbol}</span>
                    {coin.market_data.high_24h[currency]}
                  </div>

                  <div>
                    <span>All Time Low Last 24 Hrs. : </span>
                    <BsFillArrowUpSquareFill className="iconLow" />
                    <span>{currencySymbol}</span>
                    {coin.market_data.low_24h[currency]}
                  </div>
                </div>
              </div>

              <div className="third">
                <div>
                  <span>MAX SUPPLY : </span>
                  <span>{coin.market_data.max_supply ? `${coin.market_data.max_supply}` : "N/A"}</span>
                </div>

                <div>
                  <span>CIRCULATING SUPPLY : </span>
                  <span>{coin.market_data.circulating_supply}</span>
                </div>

                <div>
                  <span>MARKET CAP : </span>
                  <span>{`${currencySymbol}${coin.market_data.market_cap[currency]}`}</span>
                </div>

                <div>
                  <span>ALL TIME HIGH : </span>
                  <span>{`${currencySymbol}${coin.market_data.ath[currency]}`}</span>
                </div>

                <div>
                  <span>ALL TIME LOW : </span>
                  <span>{`${currencySymbol}${coin.market_data.atl[currency]}`}</span>
                </div>
              </div>
            </div>

            <div className="chartArea">
              <Chart arr={chartArray} currency={currencySymbol} days={days} />
            </div>

            <div className="toggleDays">
              {toggleClicks.map((i) => (
                <button key={i} onClick={() => switchChartStats(i)}>
                  {i}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CoinDetails;
