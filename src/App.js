import React, { useEffect } from "react";
import "./App.css";

const App = () => {
  useEffect(() => {
    const select = document.querySelectorAll(".currency");
    const btn = document.getElementById("btn");
    const num = document.getElementById("num");
    const ans = document.getElementById("ans");

    fetch("https://api.frankfurter.app/currencies")
      .then((data) => data.json())
      .then((data) => {
        display(data);
      });

    function display(data) {
      const entries = Object.entries(data);
      for (let i = 0; i < entries.length; i++) {
        select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
      }
    }

    btn.addEventListener("click", () => {
      let currency1 = select[0].value;
      let currency2 = select[1].value;
      let amount = num.value;

      if (currency1 != currency2) {
        convert(currency1, currency2, amount);
      } else {
        alert("Please select different currencies");
      }
    });

    function convert(currency1, currency2, amount) {
      fetch(
        `https://api.frankfurter.app/latest?from=${currency1}&to=${currency2}`
      )
        .then((data) => data.json())
        .then((data) => {
          console.log(Object.values(data.rates)[0]);
          ans.value = Object.values(data.rates)[0];
        });
    }
  }, []);

  return (
    <>
      <div className="container">
        <h1>Currency Convertor</h1>

        <div className="box">
          <div className="box_left">
            <select name="currency" className="currency"></select>
            <input type="number" id="num" />
          </div>

          <div className="box_right">
            <select name="currency" className="currency"></select>
            <input type="number" id="ans" disabled />
          </div>
        </div>

        <div className="button">
          <button type="button" className="btn" id="btn">
            Convert
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
