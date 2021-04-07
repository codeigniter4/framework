import React, { useState, useEffect } from "react";
import { get } from '../../services/';

const useFetch = table => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const makeRequest = async () => {
      const response = await get(table);
      console.log(response);
      setData(response);
      setLoading(false);
    }
    makeRequest();
  }, []);

  return { data, loading };
};

const Dashboard = () => {
  const { data, loading } = useFetch("loads");

  return (
    <div>
      Hello
    </div>
  );
};

export default Dashboard
