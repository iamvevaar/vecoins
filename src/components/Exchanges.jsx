import React, { useEffect } from "react";
import axios from "axios";
import { server } from "..";
import { useState } from "react";
import Loader from "./Loader";
import "../styles/exchanges.css";
import ErrorComponent from "./ErrorComponent";
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if(error) return <ErrorComponent/>

  return (
    <div className="exchangesMain">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="exchanges">
            {exchanges.map((i) => (
              <a href={i.url} key={i.id} target="_blank" rel="noreferrer">
                <div className="card" >
                  <div className="info">
                    <span className="cardText">Name:{i.name}</span>
                    <span className="cardText">Rank:{i.trust_score_rank}</span>
                  </div>
                  <div className="img">
                    <img className="cardImg" src={i.image} alt="" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Exchanges;
