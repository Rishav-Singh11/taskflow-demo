/**
 * TaskFlow — Core task management logic.
 * Works as a Node.js module (for Jest tests) and as a browser global.
 */
(function (exports) {
  'use strict';

  var _idCounter = 0;

  function _nextId() {
    return ++_idCounter;
  }

  function createTask(text, priority, dueDate) {
    return {
      id: _nextId(),
      text: text,
      completed: false,
      priority: priority || 'medium',
      dueDate: dueDate || null,
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Returns a new array with the given task appended.
   * Throws if text is empty or whitespace-only.
   */
  function addTask(tasks, text, priority, dueDate) {
    var trimmed = (text || '').trim();
    if (!trimmed) {
      throw new Error('Task text cannot be empty');
    }
    return tasks.concat([createTask(trimmed, priority, dueDate)]);
  }

  /**
   * Returns a new array with the matching task's completed flag toggled.
   */
  function toggleTask(tasks, id) {
    return tasks.map(function (task) {
      if (task.id === id) {
        return Object.assign({}, task, { completed: !task.completed });
      }
      return task;
    });
  }

  /**
   * Returns a new array with the matching task removed.
   */
  function deleteTask(tasks, id) {
    return tasks.filter(function (task) {
      return task.id !== id;
    });
  }

  /**
   * Returns a new array with all completed tasks removed.
   */
  function clearCompleted(tasks) {
    return tasks.filter(function (task) {
      return !task.completed;
    });
  }

  /**
   * Returns the number of active (incomplete) tasks.
   * BUG: returns total task count instead of incomplete task count.
   */
  function getActiveCount(tasks) {
    return tasks.length;
  }

  /**
   * Returns tasks filtered by the given filter string.
   * filter: 'all' | 'active' | 'completed'
   */
  function filterTasks(tasks, filter) {
    if (filter === 'active') {
      return tasks.filter(function (task) { return !task.completed; });
    }
    if (filter === 'completed') {
      return tasks.filter(function (task) { return task.completed; });
    }
    return tasks;
  }

  /**
   * Returns today's local date as a YYYY-MM-DD string.
   */
  function _todayISO() {
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    return now.getFullYear() + '-' + month + '-' + day;
  }

  /**
   * Returns true if the task has a due date before today and is not completed.
   * today: optional YYYY-MM-DD string, defaults to the current local date.
   */
  function isOverdue(task, today) {
    if (!task.dueDate || task.completed) return false;
    return task.dueDate < (today || _todayISO());
  }

  exports.createTask = createTask;
  exports.addTask = addTask;
  exports.toggleTask = toggleTask;
  exports.deleteTask = deleteTask;
  exports.clearCompleted = clearCompleted;
  exports.getActiveCount = getActiveCount;
  exports.filterTasks = filterTasks;
  exports.isOverdue = isOverdue;

})(typeof module !== 'undefined' ? module.exports : (window.TaskManager = {}));
