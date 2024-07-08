import { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import ToDo from './components/ToDo';
import { useDrop } from 'react-dnd';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('taskList');
    if (savedTasks) {
      setTaskList(JSON.parse(savedTasks));
    }
    const savedCompleted = localStorage.getItem('completedTasks');
    if (savedCompleted) {
      setCompleted(JSON.parse(savedCompleted));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'todo',
    drop: (task) => addToComplete(task),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToComplete = (task) => {
    setCompleted((prevCompleted) => {
      const updatedCompleted = [...prevCompleted, task];
      localStorage.setItem('completedTasks', JSON.stringify(updatedCompleted));
      return updatedCompleted;
    });
    const updatedTaskList = taskList.filter((t) => t.timestamp !== task.timestamp);
    setTaskList(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
  };

  return (
    <>
      <div className='bg-emerald-400'>
        <h1 className='text-2xl font-bold py-4 pl-6'>Trình ghi chú</h1>
        <p className='text-xl pl-6'>Xin chào!!</p>
        <div className='flex flex-row items-center'>
          <p className='text-xl pl-6'>Ấn </p>
          <AddTask taskList={taskList} setTaskList={setTaskList} />
          <p className='text-xl my-2'>Thêm một ghi chú mới</p>
        </div>
        <div className='flex flex-row'>
          <div className='w-full'>
            <h2 className='ml-6 text-xl font-semibold w-3/4 max-w-lg my-4 py-2 px-4 bg-gray-200 rounded-xl'>Đang làm:</h2>
            {taskList.slice(0).reverse().map((task, i) => (
              <ToDo key={task.timestamp} task={task} index={i} taskList={taskList} setTaskList={setTaskList} />
            ))}
          </div>
          <div className='w-full flex flex-col' ref={drop}>
            <h2 className='ml-6 text-xl font-semibold w-3/4 max-w-lg my-4 py-2 px-4 bg-gray-200 rounded-xl'>Đã hoàn thành:</h2>
            {completed.slice(0).reverse().map((task, i) => (
              <ToDo key={task.timestamp} task={task} index={i} taskList={completed} setTaskList={setCompleted} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
