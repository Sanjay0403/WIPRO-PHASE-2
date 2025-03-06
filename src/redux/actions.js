export const addTask = (task) => ({
    type: "ADD_TASK",
    payload: task,
  });
  
  export const deleteTask = (taskId) => ({
    type: "DELETE_TASK",
    payload: taskId,
  });
  
  export const login = () => ({
    type: "LOGIN",
  });
  
  export const logout = () => ({
    type: "LOGOUT",
  });
  