import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../AdminStyles/HealthCreate.css";
import { useEffect } from "react";

function HealthCreate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  console.log(id);

  const [formData, setFormData] = useState({
    overview: "",
    fruits: [""],
    vegetables: [""],
    guidelines: [""],
    exercises: [
      {
        day: 1,
        title: "",
        workouts: [
          {
            name: "",
            sets: "",
            reps: "",
            duration: "",
          },
        ],
      },
    ],
  });

  // Overview input
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Add fruits, vegetables and guidelines
  function addItem(field) {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  }

  // Update fruits, vegetables and guidelines
  function handleItemChange(field, index, value) {
    const updatedItems = [...formData[field]];

    updatedItems[index] = value;

    setFormData({
      ...formData,
      [field]: updatedItems,
    });
  }

  // Remove items
  function removeItem(field, index) {
    const updatedItems = formData[field].filter((_, i) => i !== index);

    setFormData({
      ...formData,
      [field]: updatedItems,
    });
  }

  // Add new exercise day
  function addExerciseDay() {
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises,
        {
          day: formData.exercises.length + 1,
          title: "",
          workouts: [
            {
              name: "",
              sets: "",
              reps: "",
              duration: "",
            },
          ],
        },
      ],
    });
  }

  // Update exercise day title
  function handleDayTitle(index, value) {
    const updatedExercises = [...formData.exercises];

    updatedExercises[index].title = value;

    setFormData({
      ...formData,
      exercises: updatedExercises,
    });
  }

  // Add workout
  function addWorkout(dayIndex) {
    const updatedExercises = [...formData.exercises];

    updatedExercises[dayIndex].workouts.push({
      name: "",
      sets: "",
      reps: "",
      duration: "",
    });

    setFormData({
      ...formData,
      exercises: updatedExercises,
    });
  }

  // Update workout
  function handleWorkoutChange(dayIndex, workoutIndex, field, value) {
    const updatedExercises = [...formData.exercises];

    updatedExercises[dayIndex].workouts[workoutIndex][field] = value;

    setFormData({
      ...formData,
      exercises: updatedExercises,
    });
  }

  // Remove workout
  function removeWorkout(dayIndex, workoutIndex) {
    const updatedExercises = [...formData.exercises];

    updatedExercises[dayIndex].workouts = updatedExercises[
      dayIndex
    ].workouts.filter((_, i) => i !== workoutIndex);

    setFormData({
      ...formData,
      exercises: updatedExercises,
    });
  }

  // Remove exercise day
  function removeExerciseDay(dayIndex) {
    const updatedExercises = formData.exercises
      .filter((_, i) => i !== dayIndex)
      .map((exercise, i) => ({
        ...exercise,
        day: i + 1,
      }));

    setFormData({
      ...formData,
      exercises: updatedExercises,
    });
  }

  // Submit diet plan
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = {
        ...formData,

        fruits: formData.fruits.filter((item) => item.trim()),
        vegetables: formData.vegetables.filter((item) => item.trim()),
        guidelines: formData.guidelines.filter((item) => item.trim()),

        exercises: formData.exercises.map((exercise) => ({
          ...exercise,
          workouts: exercise.workouts
            .filter((workout) => workout.name.trim())
            .map((workout) => ({
              ...workout,
              sets: Number(workout.sets) || 0,
              reps: Number(workout.reps) || 0,
            })),
        })),
      };

      console.log(data);

      const response = await fetch(
        `http://localhost:3000/healthPlan/HealthPost/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Diet plan creation failed");
        return;
      }

      alert("Diet Plan Assigned Successfully!");
      navigate("/healthCard");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-diet-page">
      <div className="diet-header">
        <div>
          <span>CLIENT MANAGEMENT</span>
          <h2>Create Diet Plan</h2>
          <p>
            Create a personalized nutrition and fitness plan for your client.
          </p>
        </div>

        <button
          type="button"
          className="diet-back-btn"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left"></i> Back
        </button>
      </div>

      <form>
        {/* PLAN OVERVIEW */}
        <div className="diet-form-card">
          <h4>01. Plan Overview</h4>
          <p>Enter the basic information about this plan.</p>

          <label>Plan Overview</label>
          <textarea
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            placeholder="Describe the client's nutrition and fitness plan..."
            required
          />
        </div>

        {/* FRUITS */}
        <div className="diet-form-card">
          <div className="diet-section-heading">
            <div>
              <h4>02. Fruits Included</h4>
              <p>Add recommended fruits for your client.</p>
            </div>

            <button type="button" onClick={() => addItem("fruits")}>
              + Add Fruit
            </button>
          </div>

          {formData.fruits.map((fruit, index) => (
            <div className="diet-input-row" key={index}>
              <input
                value={fruit}
                onChange={(e) =>
                  handleItemChange("fruits", index, e.target.value)
                }
                placeholder="Enter fruit name"
              />

              <button type="button" onClick={() => removeItem("fruits", index)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>

        {/* VEGETABLES */}
        <div className="diet-form-card">
          <div className="diet-section-heading">
            <div>
              <h4>03. Vegetables Included</h4>
              <p>Add recommended vegetables.</p>
            </div>

            <button type="button" onClick={() => addItem("vegetables")}>
              + Add Vegetable
            </button>
          </div>

          {formData.vegetables.map((vegetable, index) => (
            <div className="diet-input-row" key={index}>
              <input
                value={vegetable}
                onChange={(e) =>
                  handleItemChange("vegetables", index, e.target.value)
                }
                placeholder="Enter vegetable name"
              />

              <button
                type="button"
                onClick={() => removeItem("vegetables", index)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>

        {/* GUIDELINES */}
        <div className="diet-form-card">
          <div className="diet-section-heading">
            <div>
              <h4>04. Important Guidelines</h4>
              <p>Add instructions that the client should follow.</p>
            </div>

            <button type="button" onClick={() => addItem("guidelines")}>
              + Add Guideline
            </button>
          </div>

          {formData.guidelines.map((guideline, index) => (
            <div className="diet-input-row" key={index}>
              <input
                value={guideline}
                onChange={(e) =>
                  handleItemChange("guidelines", index, e.target.value)
                }
                placeholder="Enter guideline"
              />

              <button
                type="button"
                onClick={() => removeItem("guidelines", index)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>

        {/* EXERCISE ROUTINE */}
        <div className="diet-form-card">
          <div className="diet-section-heading">
            <div>
              <h4>05. Exercise Routine</h4>
              <p>Create day-wise workout routines.</p>
            </div>

            <button type="button" onClick={addExerciseDay}>
              + Add Day
            </button>
          </div>

          {formData.exercises.map((exercise, dayIndex) => (
            <div className="exercise-day-card" key={dayIndex}>
              <div className="exercise-day-heading">
                <h5>Day {exercise.day}</h5>

                <button
                  type="button"
                  onClick={() => removeExerciseDay(dayIndex)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>

              <label>Workout Focus</label>

              <input
                value={exercise.title}
                onChange={(e) => handleDayTitle(dayIndex, e.target.value)}
                placeholder="Eg: Lower Body + Cardio"
              />

              <div className="workout-list">
                {exercise.workouts.map((workout, workoutIndex) => (
                  <div className="workout-item" key={workoutIndex}>
                    <label>Workout Name</label>

                    <input
                      value={workout.name}
                      onChange={(e) =>
                        handleWorkoutChange(
                          dayIndex,
                          workoutIndex,
                          "name",
                          e.target.value,
                        )
                      }
                      placeholder="Eg: Squats"
                    />

                    <div className="workout-fields">
                      <div>
                        <label>Sets</label>
                        <input
                          type="number"
                          min="0"
                          value={workout.sets}
                          onChange={(e) =>
                            handleWorkoutChange(
                              dayIndex,
                              workoutIndex,
                              "sets",
                              e.target.value,
                            )
                          }
                          placeholder="3"
                        />
                      </div>

                      <div>
                        <label>Reps</label>
                        <input
                          type="number"
                          min="0"
                          value={workout.reps}
                          onChange={(e) =>
                            handleWorkoutChange(
                              dayIndex,
                              workoutIndex,
                              "reps",
                              e.target.value,
                            )
                          }
                          placeholder="12"
                        />
                      </div>

                      <div>
                        <label>Duration</label>
                        <input
                          value={workout.duration}
                          onChange={(e) =>
                            handleWorkoutChange(
                              dayIndex,
                              workoutIndex,
                              "duration",
                              e.target.value,
                            )
                          }
                          placeholder="15 minutes"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="remove-workout"
                      onClick={() => removeWorkout(dayIndex, workoutIndex)}
                    >
                      Remove Workout
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="add-workout-btn"
                onClick={() => addWorkout(dayIndex)}
              >
                + Add Workout
              </button>
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <div className="diet-submit-area">
          <button
            type="submit"
            disabled={loading}
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? "Assigning Plan..." : "Assign Diet Plan"}
            {!loading && <i className="bi bi-arrow-right"></i>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HealthCreate;
