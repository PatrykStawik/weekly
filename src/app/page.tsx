'use client';
import { useLocalStorage } from '@/hooks';
import { IWeek } from '@/types/week';
import { getWeekRange } from '@/utils';

import { useState } from 'react';

export default function Home() {
  const { storedValue, setValue } = useLocalStorage<IWeek[]>("weeks", []);
  const [tasks, setTasks] = useState<string[]>([""]);

  const currentWeekRange = getWeekRange();
  const lastStoredWeek = storedValue[storedValue.length - 1]?.weekDateString;

  const onChangeHandle = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTasks = [...tasks];
    newTasks[index] = e.target.value;
    setTasks(newTasks);
  };

  const onKeyPressHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTasks([...tasks, ""]);
    }
  };

  const onConfirmHandle = () => {
    const newWeek = {
      weekDateString: currentWeekRange,
      tasks: tasks.map((text) => ({ text, id: `${Math.random().toString(36).substring(7)}-${new Date()}`, done: false })),
    };
    setValue([...storedValue, newWeek]);
    setTasks([""]);
  };

  const onCheckboxChange = (weekIndex: number, taskId: string) => () => {
    const updatedWeeks = storedValue.map((week, wIndex) => {
      if (wIndex === weekIndex) {
        return {
          ...week,
          tasks: week.tasks.map(task => 
            task.id === taskId ? { ...task, done: true } : task
          ),
        };
      }
      return week;
    });
    setValue(updatedWeeks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Task Planner</h1>
      <div className="grid grid-cols-1 gap-4">
        {currentWeekRange !== lastStoredWeek && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              {`Week of ${currentWeekRange}`}
            </h2>
            <ul>
              {tasks.map((task, index) => (
                <li key={index} className="mb-2">
                  <input
                    type="text"
                    placeholder="Add a task"
                    className="w-full p-2 border rounded text-gray-900"
                    onChange={onChangeHandle(index)}
                    onKeyPress={onKeyPressHandle}
                    value={task}
                  />
                </li>
              ))}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onConfirmHandle}>
                Confirm
              </button>
            </ul>
          </div>
        )}
        {storedValue.map((week, weekIndex) => (
          <div key={week.weekDateString} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">{week.weekDateString}</h2>
            <ul>
              {week.tasks.map(({ text, id, done }) => (
                <li key={id} className="mb-2 text-gray-900 flex items-center">
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={onCheckboxChange(weekIndex, id)}
                    disabled={done}
                    className="mr-2"
                  />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
