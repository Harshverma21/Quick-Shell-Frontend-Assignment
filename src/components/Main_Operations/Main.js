import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Status from '../Dashboard/status/Status';
import User from '../Dashboard/user/User';
import Priority from '../Dashboard/priority_order/Priority_order';
import './Main.css';

const Main = ({ grouping, ordering }) => {
  const [taskList, setTaskList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setTaskList(data.tickets);
        setUserList(data.users);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    loadData();
  }, []);

  // Conditionally render component based on "grouping" choice
  const displayGroupedComponent = () => {
    switch (grouping) {
      case 'status':
        return <Status tasks={taskList} sortBy={ordering} />;
      case 'user':
        return <User tasks={taskList} users={userList} sortBy={ordering} />;
      case 'priority':
        return <Priority tasks={taskList} sortBy={ordering} />;
      default:
        return <p>Select a grouping option to display data.</p>;
    }
  };

  return <div className="main-container">{displayGroupedComponent()}</div>;
};

export default Main;
