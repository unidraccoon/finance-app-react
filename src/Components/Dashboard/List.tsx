import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Link } from "react-router-dom";
import { accounts } from "../Accounts/Store";
import { abc } from "./index";

const groups: string[] = ["Cash", "Asset", "Bank Account", "Deposit", "Credit"];

const groupExists = (group: string) => {
  const accountsList = useStore(accounts);
  for (let index = 0; index < accountsList.length; index++) {
    if (accountsList[index].group == group) {
      return true;
    }
  }
};

export const AccountList = ({ rates }) => {
  return (
    <>
      {groups.map((group, idx) =>
        groupExists(group) ? (
          <AccountsGroup key={idx} group={group} rates={rates} />
        ) : null
      )}
    </>
  );
};

const AccountsGroup = (props: any) => {
  const accountsList = useStore(accounts);
  const [collapsed, setCollapsed] = useState(true);

  let accountsFromGroup: any[] = [];

  for (let index = 0; index < accountsList.length; index++) {
    if (accountsList[index].group == props.group) {
      accountsFromGroup.push(accountsList[index]);
    }
  }

  const allCashGroup = () => {
    let cash = 0;
    for (let index = 0; index < accountsFromGroup.length; index++) {
      if (accountsFromGroup[index].usd) cash += accountsFromGroup[index].usd;
      if (accountsFromGroup[index].eur)
        cash += accountsFromGroup[index].eur * props.rates[0];
      if (accountsFromGroup[index].jpy)
        cash += accountsFromGroup[index].jpy * props.rates[1];
    }
    return cash > 0 ? (
      <span className={"mono positive"}>
        {abc(cash.toFixed(0)).slice(0, -1) +
          "," +
          cash.toFixed(2).slice(-2) +
          " USD"}
      </span>
    ) : (
      <span className={"mono negative"}>
        {abc(cash.toFixed(0)).slice(0, -1) +
          "," +
          cash.toFixed(2).slice(-2) +
          " USD"}
      </span>
    );
  };
  return (
    <div className="account-widget-group">
      <div
        onClick={() => setCollapsed((prev) => !prev)}
        className="account-widget-group__header"
      >
        <span className="account-widget-group__name">{props.group}</span>
        <span className="account-widget-group__total">{allCashGroup()}</span>
      </div>
      {collapsed &&
        accountsFromGroup.map(
          (account: any) =>
            account.dashboard && (
              <AccountInterface key={account.id} account={account} />
            )
        )}
    </div>
  );
};

const AccountInterface = ({ account }) => {
  const cashStyle = (cash) => {
    if (cash && cash >= 0) {
      return "mono positive";
    }
    return "mono negative";
  };

  return (
    <div className="account-widget-account">
      <div className="account-widget-account__name">
        <Link to="/">{account.name}</Link>
      </div>
      <div className="account-widget-account__balance">
        <span className={cashStyle(account.usd)}>
          {account.usd
            ? abc(account.usd.toFixed(0)).slice(0, -1) +
              "," +
              account.usd.toFixed(2).slice(-2) +
              " USD"
            : null}
        </span>
        <span className={cashStyle(account.eur)}>
          {account.eur
            ? abc(account.eur.toFixed(0)).slice(0, -1) +
              "," +
              account.eur.toFixed(2).slice(-2) +
              " EUR"
            : null}
        </span>
        <span className={cashStyle(account.jpy)}>
          {account.jpy
            ? abc(account.jpy.toFixed(0)).slice(0, -1) +
              "," +
              account.jpy.toFixed(2).slice(-2) +
              " JPY"
            : null}
        </span>
      </div>
    </div>
  );
};
