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

import './Status.css';

function Status({ tasks, sortBy }) {
  // Separate tickets by status
  const ticketsByStatus = {
    Backlog: [],
    Todo: [],
    "In progress": [],
    Done: [],
    Canceled: [],
  };

  // Populate ticketsByStatus
  tasks.forEach((task) => {
    ticketsByStatus[task.status]?.push(task);
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
      {/* Ticket Columns */}
      <div class="grid-container">
        {Object.keys(ticketsByStatus).map((status) => {
          // Set the Icon based on status
          let Icon;
          switch (status) {
            case "Todo":
              Icon = <img src={Todo} alt="Todo" class="img" />;
              break;
            case "In progress":
              Icon = <img src={inProgress} alt="In Progress" class="img" />;
              break;
            case "Canceled":
              Icon = <img src={Cancelled} alt="Canceled" class="img" />;
              break;
            case "Done":
              Icon = <img src={Done} alt="Done" class="img" />;
              break;
            case "Backlog":
              Icon = <img src={Backlog} alt="Backlog" class="img" />;
              break;
            default:
              Icon = null;
          }

          return (
            <div key={status} class="padding">
              <div class="flex-container">
                <div class="flex-container1">
                {Icon}
                <div class="status">{status}</div>
                <span class='text-color'>{ticketsByStatus[status].length}</span>
                </div>
                <div class="options">
                  <img src={addicon} alt="Add" class="img5" />
                  <img src={dashicon} alt="Dash" class="img5" />
                </div>
              </div>
              {sortTickets(ticketsByStatus[status], sortBy).map((ticket) => (
                <div
                  key={ticket.id}
                  class="ticket"
                >
                  <div class="text-color font">{ticket.id}</div>
                  <div class="title">{ticket.title}</div>
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
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Status;
