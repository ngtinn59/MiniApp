import { useEffect, useState } from 'react';
import EditTask from './EditTask';
import { useDrag } from 'react-dnd';

const ToDo = ({ task, index, taskList, setTaskList }) => {
  const [time, setTime] = useState(task.duration);
  const [running, setRunning] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'todo',
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime(prevTime => prevTime + 10), 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStop = () => {
    setRunning(false);
    let updatedTaskList = taskList.map((t) => 
      t.timestamp === task.timestamp ? { ...t, duration: time } : t
    );
    setTaskList(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    window.location.reload();
  };

  const handleDelete = () => {
    const updatedTaskList = taskList.filter((t) => t.timestamp !== task.timestamp);
    setTaskList(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
  };

  return (
    <>
      <div
        className="flex flex-col items-start justify-start bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg rounded-lg shadow-md"
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="w-full flex flex-row justify-between">
          <p className="font-semibold text-xl">{task.projectName}</p>
          <EditTask task={task} index={index} taskList={taskList} setTaskList={setTaskList} />
        </div>
        <p className="text-lg py-2">{task.taskDescription}</p>
        <div className="w-full flex flex-col sm:flex-row items-center sm:justify-center">
          <div className="sm:w-1/4 text-xl font-semibold py-4">
            <span className="text-gray-800 text-1xl">{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
            <span className="text-gray-800 text-1xl">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span className="text-gray-800 text-1xl">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span className="text-gray-800 text-xs">:{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
          </div>
          <div className="w-1/3 max-w-sm flex flex-row justify-evenly">
            {running ? (
              <button className="border rounded-lg py-1 px-3" onClick={handleStop}>Stop</button>
            ) : (
              <button className="border rounded-lg py-1 px-3" onClick={() => setRunning(true)}>Start</button>
            )}
            <button className="border rounded-lg py-1 px-3" onClick={() => setTime(0)}>Reset</button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button className="bg-red-500 text-white px-6 py-2 rounded-md mt-6 mb-1" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ToDo;
