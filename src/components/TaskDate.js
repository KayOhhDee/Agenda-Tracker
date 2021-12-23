import moment from "moment";
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from "react-icons/fa";

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => (
  showTaskDate &&
  <div className="task-date">
    <ul className="task-date__list">
      <li
        onClick={() => {
          setTaskDate(moment().format("DD/MM/YYYY"));
          setShowTaskDate(false);
        }}
        data-testid="task-date-overlay"
      >
        <span>
          <FaSpaceShuttle />
        </span>
        <span>Today</span>
      </li>
      <li
        onClick={() => {
          setTaskDate(moment().add(1, 'day').format("DD/MM/YYYY"));
          setShowTaskDate(false);
        }}
        data-testid="task-date-tomorrow"
      >
        <span>
          <FaSun />
        </span>
        <span>Tomorrow</span>
      </li>
      <li
        onClick={() => {
          setTaskDate(moment().add(7, 'day').format("DD/MM/YYYY"));
          setShowTaskDate(false);
        }}
        data-testid="task-date-next-week"
      >
        <span>
          <FaRegPaperPlane />
        </span>
        <span>Next Week</span>
      </li>
    </ul>
  </div>
)
