import React, { useState } from "react";
import List from "../../components/list/"


const Dashboard = () => {
  const [count, setCount] = useState(0);

  const doSomething = (count) => {
    console.log(count);
    return setCount(count+1);
  }

  return (
      <React.Fragment>
        Dashboard {count}
        <p onClick={() => doSomething(count)}>click</p>
        <List/>
      </React.Fragment>
  );
}

export default Dashboard;
