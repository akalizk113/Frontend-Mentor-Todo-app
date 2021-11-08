import { useState } from 'react';

const Job = ({ job, key }) => {
   const [completed, setCompleted] = useState(false);
   return (
      <li
         className="job"
         style={completed ? { textDecoration: 'line-through' } : {}}
      >
         <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
         />
         {job}
         <button onClick={(e) => e.target.remove()} className="delete-btn">
            delete
         </button>
      </li>
   );
};

export default Job;
