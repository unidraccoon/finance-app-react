import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Grid, Icon } from "semantic-ui-react";
import { accounts, IAccount } from "../Accounts/Store";
import { AccountList } from "./List";

export function abc(n: string) {
  n += "";
  n = new Array(4 - (n.length % 3)).join("U") + n;
  return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
}

export const Dashboard = () => {
  const accountsList = useStore<IAccount[]>(accounts);
  const [rates, setRates] = useState<number[] | undefined>(undefined);
  const [collapsed, setCollapsed] = useState(true);

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

  const allCash = () => {
    let cash = 0;
    for (let index = 0; index < accountsList.length; index++) {
      if (accountsList[index].usd && accountsList[index]) cash += Number(accountsList[index].usd);
      if (accountsList[index].eur && rates) cash += Number(accountsList[index].eur) * rates[0];
      if (accountsList[index].jpy && rates) cash += Number(accountsList[index].jpy) * rates[1];
    }
    return cash > 0 ? (
      <span className={"mono positive"}>
        {abc(cash.toFixed(0)).slice(0, -1) +
          "," +
          cash.toFixed(2).slice(-2) +
          " USD"}
      </span>
    ) : (
      <span className={"mono negative"}>{cash.toFixed(2) + " USD"}</span>
    );
  };

  return (
    <div className="container-full-page">
      <Grid>
        <Grid.Row>
          <Grid.Column computer={6}>
            <div className="section">
              <div
                className="section__header active"
                onClick={() => setCollapsed((prev) => !prev)}
              >
                <Icon name="dropdown" />
                <h3>Net Worth</h3>
                <span className="net-worth__total">{allCash()}</span>
              </div>
              {collapsed && (
                <div className="section__body">
                  <div className="account-widget">
                    {rates && <AccountList rates={rates} />}
                  </div>
                </div>
              )}
            </div>
          </Grid.Column>
          <Grid.Column computer={10}>
            <div className="section">
              <div className="section__header active">
                <Icon name="dropdown" />
                <h3>New Transaction</h3>
              </div>
              {collapsed && (
                <div className="section__body">
                  {/* <div className="container-full-page flat search-page"></div> */}
                </div>
              )}
            </div>

            <div className="section">
              <div className="section__header active">
                <Icon name="dropdown" />
                <h3>Recent Transactions</h3>
              </div>
              {collapsed && <div className="section__body"></div>}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
