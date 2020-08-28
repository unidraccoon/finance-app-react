import React, { useState } from "react";
import { Form, Checkbox, Input, Modal, Button } from "semantic-ui-react";
import { Header } from "semantic-ui-react";

import { addAccount, updateAccount } from "./Store";
import { removeAccount } from "./Store";

export enum GroupsFromAccount {
  Cash = "Cash",
  Bank = "Bank Account",
  Deposit = "Deposit",
  Credit = "Credit",
  Asset = "Asset",
}

const groupsOptions = [
  {
    key: GroupsFromAccount.Cash,
    text: GroupsFromAccount.Cash,
    value: GroupsFromAccount.Cash,
  },
  {
    key: GroupsFromAccount.Bank,
    text: GroupsFromAccount.Bank,
    value: GroupsFromAccount.Bank,
  },
  {
    key: GroupsFromAccount.Deposit,
    text: GroupsFromAccount.Deposit,
    value: GroupsFromAccount.Deposit,
  },
  {
    key: GroupsFromAccount.Credit,
    text: GroupsFromAccount.Credit,
    value: GroupsFromAccount.Credit,
  },
  {
    key: GroupsFromAccount.Asset,
    text: GroupsFromAccount.Asset,
    value: GroupsFromAccount.Asset,
  },
];

export const ModalFormChange = ({ account }) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(account.name);
  const [group, setGroup] = useState(account.group);
  const [usd, setUsd] = useState(
    account.usd
      ? { val: account.usd, use: true }
      : { val: undefined, use: false }
  );
  const [eur, setEur] = useState(
    account.eur
      ? { val: account.eur, use: true }
      : { val: undefined, use: false }
  );
  const [jpy, setJpy] = useState(
    account.jpy
      ? { val: account.jpy, use: true }
      : { val: undefined, use: false }
  );
  const [dashboard, setDashboard] = useState(account.dashboard);

  return (
    <>
      <div className="account-widget-account__edit">
        <Modal
          closeIcon
          size="small"
          className="account-form"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button basic circular icon="pencil" />}
        >
          <Header icon="file text outline" content={"Edit Account"} />
          <Modal.Content>
            <Form
              className="account-form"
              onSubmit={() => {
                let newAccount = {
                  id: account.id,
                  name: name,
                  group: group,
                  dashboard: dashboard,
                  usd: usd.use ? usd.val : undefined,
                  eur: eur.use ? eur.val : undefined,
                  jpy: jpy.use ? jpy.val : undefined,
                };
                updateAccount(newAccount);
                setOpen(false);
              }}
            >
              <Form.Group>
                <Form.Input
                  required
                  label="Name"
                  name="name"
                  width={9}
                  placeholder="Account name"
                  value={name}
                  onChange={(e, { value }) => setName(value)}
                />
                <Form.Select
                  label="Group"
                  name="group"
                  width={7}
                  value={group}
                  options={groupsOptions}
                  onChange={(e, { value }) => setGroup(value)}
                />
              </Form.Group>

              <Form.Group
                unstackable
                style={{ marginBottom: "1em", marginTop: "1em" }}
              >
                <Form.Field width={9} className="checkbox">
                  <Checkbox
                    label="US Dollar"
                    checked={usd.use}
                    onChange={() =>
                      setUsd((prev) => {
                        return { ...prev, use: !prev.use };
                      })
                    }
                  />
                </Form.Field>
                <Form.Field className="input-right" width={7}>
                  <Input
                    fluid
                    type="number"
                    placeholder="Balance"
                    labelPosition="right"
                    label="USD"
                    name="usd"
                    step={0.1}
                    value={usd.val}
                    onChange={(e, { value }) =>
                      setUsd({ val: Number(value), use: true })
                    }
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group
                unstackable
                style={{ marginBottom: "1em", marginTop: "1em" }}
              >
                <Form.Field width={9} className="checkbox">
                  <Checkbox
                    label="EUR"
                    checked={eur.use}
                    onChange={() =>
                      setEur((prev) => {
                        return { ...prev, use: !prev.use };
                      })
                    }
                  />
                </Form.Field>
                <Form.Field className="input-right" width={7}>
                  <Input
                    fluid
                    type="number"
                    placeholder="Balance"
                    labelPosition="right"
                    label="EUR"
                    name="eur"
                    step={0.1}
                    value={eur.val}
                    onChange={(e, { value }) =>
                      setEur({ val: Number(value), use: true })
                    }
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group
                unstackable
                style={{ marginBottom: "1em", marginTop: "1em" }}
              >
                <Form.Field width={9} className="checkbox">
                  <Checkbox
                    label="JPY"
                    checked={jpy.use}
                    onChange={() =>
                      setJpy((prev) => {
                        return { ...prev, use: !prev.use };
                      })
                    }
                  />
                </Form.Field>
                <Form.Field className="input-right" width={7}>
                  <Input
                    fluid
                    type="number"
                    placeholder="Balance"
                    labelPosition="right"
                    label="JPY"
                    name="Japanse yen"
                    step={0.1}
                    value={jpy.val}
                    onChange={(e, { value }) =>
                      setJpy({ val: Number(value), use: true })
                    }
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group unstackable>
                <Form.Field width={9} style={{ paddingTop: "0.5em" }}>
                  <Checkbox
                    label="Show on Dashboard"
                    onChange={() => setDashboard((prev) => !prev)}
                  />
                </Form.Field>
                <Form.Button width={7} primary fluid content="Save Account" />
              </Form.Group>
            </Form>
          </Modal.Content>
          <div className="actions">
            <Button
              negative
              labelPosition="right"
              onClick={() => removeAccount(account)}
              content="Delete"
              icon="trash"
            />
          </div>
        </Modal>
      </div>
    </>
  );
};
