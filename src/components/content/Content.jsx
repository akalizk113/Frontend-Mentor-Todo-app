import { useState, useRef } from 'react';
const Content = () => {
   const [job, setJob] = useState(``);
   const [jobs, setJobs] = useState([]);
   const [fill, setFill] = useState('all');
   const inputRef = useRef();

   const dragItem = useRef();
   const dragEnterTarget = useRef();
   const jobsRef = useRef();

   const handleAddJob = (e) => {
      if (
         e.code === 'Enter' &&
         !jobs.find((value) => value.name === job) &&
         job !== ''
      ) {
         setJobs((prev) => [
            ...prev,
            {
               id: prev.length === 0 ? 0 : prev[prev.length - 1].id + 1,
               name: job,
               isCompleted: false,
            },
         ]);
         setJob(``);
         inputRef.current.focus();
      }
   };

   const handleDeleteJob = (id) => {
      setJobs((prev) => {
         const deleteJobIndex = jobs.findIndex((job) => job.id === id);
         const newJobs = [...prev];
         newJobs.splice(deleteJobIndex, 1);
         return newJobs;
      });
   };

   const handleClearCompleted = () => {
      setJobs((prev) => prev.filter((job) => !job.isCompleted));
   };

   const dragStart = (e) => {
      dragItem.current = e.target;
   };

   const dragOver = (e) => {
      e.preventDefault();
   };

   const dragEnter = (e) => {
      if (e.target !== dragItem.current) {
         if (
            e.target !== dragItem.current.nextElementSibling &&
            e.target !== dragItem.current.previousElementSibling
         ) {
            e.target.classList.add('ondragenter');
         }
         dragEnterTarget.current = e.target;
      } else {
         dragEnterTarget.current = undefined;
      }
   };

   const dragLeave = (e) => {
      e.target.classList.remove('ondragenter');
   };

   const dragDrop = (e) => {
      e.preventDefault();
      if (dragEnterTarget.current) {
         if (dragEnterTarget.current === dragItem.current.nextElementSibling) {
            jobsRef.current.insertBefore(
               dragItem.current,
               dragEnterTarget.current.nextElementSibling
            );
         } else {
            jobsRef.current.insertBefore(
               dragItem.current,
               dragEnterTarget.current
            );
         }
         document
            .querySelectorAll('.ondragenter')
            .forEach((item) => item.classList.remove('ondragenter'));
      }
   };
   return (
      <div className="content">
         <div className="content__input-outer">
            <input
               ref={inputRef}
               value={job}
               type="text"
               className="content__input"
               placeholder="Create a new todo..."
               onChange={(e) => setJob(e.target.value)}
               onKeyPress={handleAddJob}
            />
         </div>

         <ul ref={jobsRef} className="jobs">
            {jobs
               .filter((job) => {
                  switch (fill) {
                     case 'all':
                        return true;
                     case 'actived':
                        return !job.isCompleted;
                     case 'completed':
                        return job.isCompleted;
                     default:
                        throw new Error('something went wrong');
                  }
               })
               .map((job) => (
                  <li
                     id={'job-' + job.id}
                     draggable={true}
                     onDragStart={dragStart}
                     onDragEnter={dragEnter}
                     onDragLeave={dragLeave}
                     onDrop={dragDrop}
                     onDragOver={dragOver}
                     key={job.id}
                     className="job"
                  >
                     <label
                        htmlFor={'input' + job.id}
                        className={job.isCompleted ? 'actived label' : 'label'}
                     ></label>
                     <input
                        type="checkbox"
                        onChange={() => {
                           job.isCompleted = !job.isCompleted;
                           setJobs((prev) => [...prev]);
                        }}
                        checked={job.isCompleted}
                        id={'input' + job.id}
                     />
                     <label
                        className={
                           job.isCompleted ? 'actived job__name' : 'job__name'
                        }
                        htmlFor={'input' + job.id}
                     >
                        {job.name}
                     </label>
                     <button onClick={() => handleDeleteJob(job.id)}></button>
                  </li>
               ))}
         </ul>

         <div className="controls">
            <span className="job-count">
               {jobs.filter((job) => !job.isCompleted).length}{' '}
               {jobs.filter((job) => !job.isCompleted).length > 1
                  ? 'items'
                  : 'item'}{' '}
               left
            </span>

            <div className="control__container">
               <button
                  className={
                     fill === 'all' ? 'control__item actived' : 'control__item'
                  }
                  onClick={() => setFill('all')}
               >
                  All
               </button>
               <button
                  className={
                     fill === 'actived'
                        ? 'control__item actived'
                        : 'control__item'
                  }
                  onClick={() => setFill('actived')}
               >
                  Active
               </button>
               <button
                  className={
                     fill === 'completed'
                        ? 'control__item actived'
                        : 'control__item'
                  }
                  onClick={() => setFill('completed')}
               >
                  Completed
               </button>
            </div>
            <button className="control__item" onClick={handleClearCompleted}>
               Clear Completed
            </button>
         </div>

         <span className="content__hint">Drag and drop to reorder list</span>
      </div>
   );
};

export default Content;
