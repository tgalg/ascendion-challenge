import React, { useEffect, useState } from "react";

const transactions = [
  { customerID: "cust1", month: "June", amount: 120 },
  { customerID: "cust1", month: "June", amount: 150 },
  { customerID: "cust1", month: "July", amount: 130 },
  { customerID: "cust1", month: "July", amount: 90 },
  { customerID: "cust1", month: "August", amount: 200 },
  { customerID: "cust2", month: "June", amount: 80 },
  { customerID: "cust2", month: "June", amount: 100 },
  { customerID: "cust2", month: "July", amount: 150 },
  { customerID: "cust2", month: "July", amount: 60 },
  { customerID: "cust2", month: "August", amount: 220 },
  { customerID: "cust3", month: "June", amount: 300 },
  { customerID: "cust3", month: "July", amount: 110 },
  { customerID: "cust3", month: "July", amount: 120 },
  { customerID: "cust3", month: "August", amount: 200 },
  { customerID: "cust3", month: "August", amount: 250 },
];

const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += 2 * (amount - 100); // 2 points for every dollar spent over $100
    points += 50; // 1 point for every dollar spent from 50 to 100
  } else if (amount > 50) {
    points += amount - 50; // 1 point for every dollar spent from 50 to the amount
  }
  return points;
};

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000);
  });
};

const App = () => {
  const [rewards, setRewards] = useState({});

  useEffect(() => {
    fetchData().then((data) => {
      const rewards = data.reduce((acc, transaction) => {
        const points = calculatePoints(transaction.amount);
        const customerRewards = acc[transaction.customerID] || {};
        const monthRewards = customerRewards[transaction.month] || 0;
        customerRewards[transaction.month] = monthRewards + points;
        acc[transaction.customerID] = customerRewards;
        return acc;
      }, {});
      setRewards(rewards);
    });
  }, []);

  return (
    <div>
      {Object.keys(rewards).map((customerID) => (
        <div key={customerID}>
          <h2>{customerID}</h2>
          {Object.keys(rewards[customerID]).map((month) => (
            <p key={month}>
              {month}: {rewards[customerID][month]} points
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
