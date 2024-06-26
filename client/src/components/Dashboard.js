// client/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    date: '',
    exercise: '',
    warmupReps: 0,
    weight: 0,
    reps: 0,
    sets: 0,
    notes: ''
  });

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

  const handleInputChange = (e) => {
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/workouts', newWorkout, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchWorkouts();
      setNewWorkout({
        date: '',
        exercise: '',
        warmupReps: 0,
        weight: 0,
        reps: 0,
        sets: 0,
        notes: ''
      });
    } catch (error) {
      console.error('שגיאה בהוספת אימון:', error);
    }
  };

  return (
    <div>
      <h2>לוח בקרה</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={newWorkout.date} onChange={handleInputChange} required />
        <input type="text" name="exercise" value={newWorkout.exercise} onChange={handleInputChange} placeholder="סוג התרגיל" required />
        <input type="number" name="warmupReps" value={newWorkout.warmupReps} onChange={handleInputChange} placeholder="חזרות חימום" required />
        <input type="number" name="weight" value={newWorkout.weight} onChange={handleInputChange} placeholder="משקל" required />
        <input type="number" name="reps" value={newWorkout.reps} onChange={handleInputChange} placeholder="חזרות" required />
        <input type="number" name="sets" value={newWorkout.sets} onChange={handleInputChange} placeholder="סטים" required />
        <textarea name="notes" value={newWorkout.notes} onChange={handleInputChange} placeholder="הערות"></textarea>
        <button type="submit">הוסף אימון</button>
      </form>
      <h3>האימונים שלך</h3>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            {workout.date} - {workout.exercise} - {workout.weight}ק"ג x {workout.reps} x {workout.sets}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;