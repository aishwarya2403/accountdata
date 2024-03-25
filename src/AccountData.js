import { useEffect, useState } from "react";
import { URL } from "./Link";
import axios from "axios";

const AccountData = () => {
  const [accdata, setAccData] = useState([]);
  const [newAccountType, setNewAccountType] = useState("");
  const [newBalance, setNewBalance] = useState(0);

  useEffect(() => {
    (async () => await accountFetch())();
  }, [setAccData]);

  const accountFetch = async () => {
    try {
      const response = await axios.get(URL);
      setAccData(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      await accountFetch();
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const handleSort = (order) => {
    const sorted = [...accdata].sort((a, b) => {
      if (order === "asc") {
        return a.balance - b.balance;
      }
    });
    setAccData(sorted);
  };

  const addAccount = async () => {
    if (newAccountType && newBalance) {
      const newAccount = {
        id: Math.floor(Math.random() * 1000000000).toString(),
        type: newAccountType,
        balance: parseFloat(newBalance),
      };
      try {
        await axios.post(`${URL}`, newAccount);
        await accountFetch();
      } catch (error) {
        console.error("Error adding data", error);
      }
      setNewAccountType("");
      setNewBalance(0);
    } else {
      alert("Please enter account type and balance.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Account Type</th>
              <th scope="col">
                Balance
                <button
                  className="btn-sm mx-4"
                  onClick={() => handleSort("asc")}
                >
                  Sort by Asc
                </button>
                <button
                  className=" btn-sm mx-4"
                  onClick={async () => await accountFetch()}
                >
                  Refresh
                </button>
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {accdata &&
              accdata.map((acc) => (
                <tr key={acc.id}>
                  <td>{acc.id}</td>
                  <td>{acc.type}</td>
                  <td>{acc.balance}</td>
                  <td>
                    <button onClick={() => handleDelete(acc.id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <label>
        Account Type:
        <input
          type="text"
          value={newAccountType}
          onChange={(e) => setNewAccountType(e.target.value)}
        />
      </label>
      <label>
        Balance:
        <input
          type="number"
          value={newBalance}
          onChange={(e) => setNewBalance(e.target.value)}
        />
      </label>
      <button onClick={addAccount}>Add Account</button>
      <p>Total: {accdata.reduce((acc, item) => acc + item.balance, 0)}</p>
    </div>
  );
};
export default AccountData;
