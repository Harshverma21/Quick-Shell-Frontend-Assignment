import React from 'react';
import Tag from '../../Tag/Tag';
import todoIcon from '../../../assets/icons/To-do.svg';
import addIcon from '../../../assets/icons/add.svg';
import dashIcon from '../../../assets/icons/No-priority.svg';
import './Priority_order.css';

function Priority({ tasks, sortBy }) {
  // Organize tickets by priority levels in a specified order
  const ticketsGroupedByPriority = {
    0: [], // No Priority
    4: [], // Urgent
    3: [], // High
    2: [], // Medium
    1: [], // Low
  };

  // Populate ticketsGroupedByPriority based on each task's priority
  tasks.forEach((task) => {
    ticketsGroupedByPriority[task.priority]?.push(task);
  });

  // Function to sort tickets by priority or title
  const sortTasks = (tickets, sortBy) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });
  };

  // Function to get the priority name for each level
  const getPriorityName = (priority) => {
    switch (Number(priority)) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      case 0:
      default:
        return 'No Priority';
    }
  };

  return (
    <div className="padding">
      {/* Columns for tickets by priority */}
      <div className="grid-container">
        {/* Map through priority levels in specified order */}
        {[0, 4, 3, 2, 1].map((priority) => {
          const priorityName = getPriorityName(priority);

          return (
            <div key={priority} className="padding">
              <div className="flex-container">
                <div className="flex-container1">
                  <Tag priority={priority} />
                  <div className="font">{priorityName}</div>
                  <span className="text-color">
                    {ticketsGroupedByPriority[priority].length}
                  </span>
                </div>
                <div className="options">
                  <img src={addIcon} alt="Add Task" className="img5" />
                  <img src={dashIcon} alt="No Priority" className="img5" />
                </div>
              </div>
              {sortTasks(ticketsGroupedByPriority[priority], sortBy).map((ticket) => (
                <div
                  key={ticket.id}
                  className="ticket"
                >
                  <div className="text-color fontw">{ticket.id}</div>
                  <div className="title">{ticket.title}</div>
                  <div className="card">
                    <div className="card-child">
                      <Tag priority={ticket.priority} />
                    </div>
                    <div className="card2">
                      <img src={todoIcon} alt="To-Do" className="img" />
                      <div className="text-color">{ticket.tag[0]}</div>
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

export default Priority;
