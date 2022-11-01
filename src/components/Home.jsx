import React from "react";
import "../styles/home.css";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div className="home">
      <motion.div
        animate={{ translateY: "40px" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img
          src="https://cdn.pixabay.com/photo/2018/03/15/11/29/bitcoin-3227945_960_720.png"
          alt=""
        />
      </motion.div>
      <div className="homeInfo">
        <div className="heading">VECOINS</div>
        <p>
          VECOINS a web app build with ReactJS gives us the information about various crypto exchanges and crypto coins.
          <br/>
          React-icons , Axios , Framer Motion and Chart.js are the dependency bieng used in the developemnt of the product.
          <br/>
          Exchanges Section on the of navbar consist of list of TOP 100 crypto exchanges sorted according to theri rank.
          <br/>
          Coins section will give the overall information about the market situation like  all time high , all time low,market supply , circulating supply and more many which you can visit on the top.
        </p>
      </div>
    </div>
  );
};

export default Home;
