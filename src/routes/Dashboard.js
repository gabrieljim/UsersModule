import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3001/juan");
      const data = await response.json();
      console.log(data);
    })();
  }, []);
  return <h1>Test</h1>;
};

export default Dashboard;
