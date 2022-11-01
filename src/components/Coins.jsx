import React, { useEffect } from "react";
import axios from "axios";
import { server } from "..";
import { useState } from "react";
import Loader from "./Loader";
import "../styles/coins.css";
import { Link } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";

import { BsFillArrowUpSquareFill } from "react-icons/bs";
const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(0);

  const btns = new Array(132).fill(1);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent />;

  return (
    <>
      <div className="coinsMain">
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

            <div className="coins">
              {coins.map((i) => (
                <Link to={`/coin/${i.id}`} key={i.id}>
                  <div className="card" key={i.id}>
                    <div className="info">
                      <span className="name">{i.name}</span>
                      <span className="symbol">{i.symbol}</span>
                      <span className="symbol">
                        {i.current_price
                          ? `${currencySymbol}${i.current_price}`
                          : "NA"}
                      </span>
                      <div className="high">
                        <BsFillArrowUpSquareFill className="iconHigh" />
                        <span className="symbol">
                          {`${currencySymbol}`}
                          {i.ath ? `${i.ath}` : "NA"}
                        </span>
                      </div>

                      <div className="low">
                        <BsFillArrowUpSquareFill className="iconLow" />
                        <span className="symbol">
                          {`${currencySymbol}`}
                          {i.atl ? `${i.atl}` : "NA"}
                        </span>
                      </div>
                    </div>
                    <div className="images">
                      <img className="cardImg" src={i.image} alt="" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pagination">
              {btns.map((item, index) => (
                <button key={index} onClick={() => changePage(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Coins;
