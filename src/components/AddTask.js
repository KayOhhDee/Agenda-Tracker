import { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';

export const AddTask = ({ showAddTaskMain = true, showShouldMain = false, showQuickAddTask, setShowQuickAddTask }) => {

  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(showAddTaskMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          date: collatedDate || taskDate,
          projectId,
          task,
          userId: 'jlIFXIwyAL3tzHMtzRbw',
        })
        .then(() => {
          setTask('');
          setProject('');
          setShowMain('');
          setShowProjectOverlay(false);
        })
    );

  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}
      {
        (showMain || showQuickAddTask) && (
          <div
            className="add-task__main"
            data-testid="add-task-main"
          >
            {showQuickAddTask && (
              <>
                <div data-testid="quick-add-task">
                  <h2 className="header">Quick Add Task</h2>
                  <span
                    className="add-task__cancel-x"
                    data-testid="add-task-quick-cancel"
                    onClick={() => {
                      setShowQuickAddTask(false)
                      setShowMain(false)
                      setShowProjectOverlay(false)
                    }}
                  >X</span>
                </div>
              </>
            )}
            <ProjectOverlay
              showProjectOverlay={showProjectOverlay}
              setShowProjectOverlay={setShowProjectOverlay}
              setProject={setProject}
            />
            <TaskDate
              showTaskDate={showTaskDate}
              setShowTaskDate={setShowTaskDate}
              setTaskDate={setTaskDate}
            />
            <input
              className="add-task__content"
              data-testid="add-task-content"
              type="text"
              placeholder="Add Task..."
              value={task}
              onChange={e => setTask(e.target.value)}
            />
            <button
              className="add-task__submit"
              data-testid="add-task"
              type="button"
              onClick={() => {
                showQuickAddTask
                  ? addTask() && setShowQuickAddTask(false)
                  : addTask()
              }}
            >Add Task</button>
            {
              !showQuickAddTask && (
                <span
                  className="add-task__cancel"
                  data-testid="add-task-main-cancel"
                  onClick={() => {
                    setShowMain(false)
                    setShowProjectOverlay(false)
                  }}
                >
                  Cancel
                </span>
              )
            }
            <span
              className="add-task__project"
              data-testid="show-project-overlay"
              onClick={() => setShowProjectOverlay(!showTaskDate)}
            >
              <FaRegListAlt />
            </span>
            <span
              className="add-task__date"
              data-testid="show-task-date-overlay"
              onClick={() => setShowTaskDate(!showTaskDate)}
            >
              <FaRegCalendarAlt />
            </span>
          </div>
        )
      }
    </div>
  )
};
