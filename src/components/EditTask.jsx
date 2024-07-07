import React, { useState, useEffect } from 'react';

const EditTask = ({ task, index, taskList, setTaskList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, [task]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'projectName') setProjectName(value);
    if (name === 'taskDescription') setTaskDescription(value);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedTasks = [...taskList];
    updatedTasks[index] = {
      ...task,
      projectName,
      taskDescription,
    };
    setTaskList(updatedTasks);
    localStorage.setItem('taskList', JSON.stringify(updatedTasks));
    setEditModal(false);
  };

  return (
    <>
      <button
        className='bg-gray-400 text-white text-sm uppercase font-semibold py-1.5 px-3 rounded-lg'
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>
      {editModal && (
        <div className='flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50'>
          <div className='relative w-auto my-6 mx-auto max-w-3xl'>
            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
              <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                <h3 className='text-3xl font-semibold'>Edit Task</h3>
                <button
                  className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                  onClick={() => setEditModal(false)}
                >
                  <span className='bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                    ×
                  </span>
                </button>
              </div>
              <form className='relative p-6 flex-auto' onSubmit={handleEdit}>
                <div className='my-4 text-slate-500 text-lg leading-relaxed'>
                  <label
                    className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2'
                    htmlFor='project-name'
                  >
                    Project Name
                  </label>
                  <input
                    className='w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white'
                    id='project-name'
                    name='projectName'
                    type='text'
                    placeholder='Project name'
                    value={projectName}
                    onChange={handleInput}
                    required
                  />
                  <label
                    className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2'
                    htmlFor='task-description'
                  >
                    Task Description
                  </label>
                  <textarea
                    className='w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white'
                    id='task-description'
                    name='taskDescription'
                    value={taskDescription}
                    onChange={handleInput}
                    rows='5'
                    placeholder='Task description'
                    required
                  />
                </div>
                <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                  <button
                    className='bg-blue-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70'
                    type='submit'
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTask;
