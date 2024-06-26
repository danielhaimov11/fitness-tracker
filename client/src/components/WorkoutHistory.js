// client/src/components/WorkoutHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/workouts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error('שגיאה בטעינת האימונים:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredWorkouts = workouts.filter(workout =>
    workout.exercise.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="workout-history">
      <h2>היסטוריית אימונים</h2>
      <input 
        type="text" 
        value={filter} 
        onChange={handleFilterChange} 
        placeholder="סנן לפי סוג תרגיל"
      />
      <ul>
        {filteredWorkouts.map((workout) => (
          <li key={workout._id}>
            <strong>{workout.date}</strong> - {workout.exercise} - 
            {workout.weight}ק"ג x {workout.reps} x {workout.sets}
            {workout.notes && <p>הערות: {workout.notes}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutHistory;