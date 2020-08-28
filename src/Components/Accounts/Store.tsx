import { createStore, createEvent } from "effector";
import connectLocalStorage from "effector-localstorage";
// import { useStore } from "effector-react";

export const addAccount = createEvent("add account");
export const removeAccount = createEvent("remove account");
export const updateAccount = createEvent("update account");

export const accountsLocalStorage = connectLocalStorage(
  "accounts"
).onError((err) => console.log(err));

export interface IAccount {
  id: any;
  name: string;
  group: string;
  usd?: number;
  eur?: number;
  jpy?: number;
  dashboard: boolean;
}

const initAccounts: IAccount[] = [
  {
    id: 1,
    name: "Alice's wallet",
    group: "Cash",
    dashboard: true,
    usd: 428.82,
    eur: 0.0,
    jpy: 0,
  },
  {
    id: 2,
    name: "Bob's wallet",
    group: "Cash",
    dashboard: true,
    usd: 372.15,
    eur: 300.0,
    jpy: 11300,
  },
  { id: 3, name: "Car", group: "Asset", dashboard: false, usd: 23800 },
  { id: 4, name: "Car logan", group: "Credit", dashboard: true, usd: -15220 },
  {
    id: 5,
    name: "MasterCard *6803",
    group: "Credit",
    dashboard: true,
    jpy: 140.65,
  },
  { id: 6, name: "Visa *2474", group: "Credit", dashboard: true, usd: 34 },
  {
    id: 7,
    name: "Checking",
    group: "Bank Account",
    dashboard: true,
    usd: 8501.75,
    eur: 1100.0,
  },
  {
    id: 8,
    name: "Savings",
    group: "Bank Account",
    dashboard: true,
    usd: 16000.75,
  },
];

export const accounts = createStore(
  accountsLocalStorage.init([...initAccounts])
)
  .on(addAccount, (state, a) => [...state, a])
  .on(removeAccount, (state, a) => {
    let copy = [...state];
    copy.splice(copy.indexOf(a), 1);
    return copy;
  })
  .on(updateAccount, (state, a: any) => {
    let copy = [...state];
    for (let index = 0; index < copy.length; index++) {
      if (copy[index].id == a.id) copy[index] = a;
    }
    return copy;
  });

accounts.watch(accountsLocalStorage);

export const groupsLocalStorage = connectLocalStorage("groups").onError((err) =>
  console.log(err)
);
