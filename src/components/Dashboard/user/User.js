import React from 'react';
import Tag from '../../Tag/Tag';
import todo from '../../../assets/icons/To-do.svg';
import Todo from '../../../assets/icons/todo.svg';
import inProgress from '../../../assets/icons/in-progress.svg';
import Done from '../../../assets/icons/Done.svg';
import Cancelled from '../../../assets/icons/Cancelled.svg';
import Backlog from '../../../assets/icons/Backlog.svg';
import addicon from '../../../assets/icons/add.svg';
import dashicon from '../../../assets/icons/No-priority.svg';
import './User.css';


function User({ tasks, users, sortBy }) {
  // Create a dictionary to map users by their ID for easy lookup
  const usersById = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  // Group tickets by userId
  const ticketsByUser = {};
  tasks.forEach((task) => {
    if (!ticketsByUser[task.userId]) {
      ticketsByUser[task.userId] = [];
    }
    ticketsByUser[task.userId].push(task);
  });

  // Sorting function
  const sortTickets = (tickets, sortBy) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });
  };

  return (
    <div class="padding">
      {/* User Columns */}
      <div class="grid-container">
        {Object.keys(ticketsByUser).map((userId) => {
          const user = usersById[userId];
          const userTickets = ticketsByUser[userId];
          return (
            <div key={userId} class="padding">
              <div class="flex-container">
                <div class="flex-container1">
                  <div class="font-container">{user.name}</div>
                  <span class="text-color">{userTickets.length}</span>
                </div>
                <div class="options">
                  <img src={addicon} alt="Add" class="img5" />
                  <img src={dashicon} alt="Dash" class="img5" />
                </div>
              </div>
              {sortTickets(userTickets, sortBy).map((ticket) => {

                let Icon;
                switch (ticket.status) {
                case "Todo":
                    Icon = <img src={Todo} alt="Todo" class="img3" />;
                    break;
                case "In progress":
                    Icon = <img src={inProgress} alt="In Progress" class="img3" />;
                    break;
                case "Canceled":
                    Icon = <img src={Cancelled} alt="Canceled" class="img3" />;
                    break;
                case "Done":
                    Icon = <img src={Done} alt="Done" class="img3" />;
                    break;
                case "Backlog":
                    Icon = <img src={Backlog} alt="Backlog" class="img3" />;
                    break;
                default:
                    Icon = null;
                }
                return (

                <div
                  key={ticket.id}
                  class="div-container"
                >
                  <div class="text-color child-container">{ticket.id}</div>
                  <div class="container">
                    <div class="icon">
                        {Icon}
                    </div>
                    <div class="title">
                        {ticket.title}
                    </div>
                    </div>
                  <div class="card">
                    <div class="card-child">
                      <Tag priority={ticket.priority} />
                    </div>
                    <div class="card2">
                      <img src={todo} alt="To-Do" class="img" />
                      <div class="text-color">{ticket.tag[0]}</div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default User;
