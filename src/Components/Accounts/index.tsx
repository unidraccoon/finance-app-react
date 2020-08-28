import React, { useEffect, useState } from "react";
import { ModalForm } from "./ModalForm";
import { AccountList } from "./List";

export const Accounts = () => {
  const [rates, setRates] = useState("");

  useEffect(() => {
    if (!rates) {
      getRates();
    }
  });

  const getRates = async () => {
    const response = await fetch("https://api.ratesapi.io/api/latest?base=USD");
    const data = await response.json();
    setRates([data.rates.EUR, data.rates.JPY]);
  };

  return (
    <div className="container-full-page flat">
      <div className="container-header">
        <ModalForm />
      </div>
      <div className="accounts-list-wrapper">
        <AccountList rates={rates} />
      </div>
    </div>
  );
};
