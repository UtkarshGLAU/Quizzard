import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuizPreview, createAIQuiz } from "../api/AIQuizzesApi";
import "./AIQuizGenerator.css";

const AIQuizGenerator = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("form"); // form, preview, success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form inputs
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState("intermediate");

  // Preview/Editable fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Preview data
  const [preview, setPreview] = useState(null);
  const [createdQuiz, setCreatedQuiz] = useState(null);

  const handleGeneratePreview = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!topic.trim()) {
        setError("Please enter a topic");
        setLoading(false);
        return;
      }

      const previewData = await generateQuizPreview(topic, questionCount, difficulty);
      setPreview(previewData);
      // Set initial values for editing from the preview
      setTitle(previewData.title);
      setDescription(previewData.description);
      setImage("");
      setStep("preview");
    } catch (err) {
      setError(err.message || "Failed to generate preview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuiz = async () => {
    setError("");
    setLoading(true);

    try {
      const quizToCreate = await createAIQuiz(
        topic,
        questionCount,
        difficulty,
        title,
        description,
        image
      );
      setCreatedQuiz(quizToCreate);
      setStep("success");
    } catch (err) {
      setError(err.message || "Failed to create quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep("form");
    setTopic("");
    setQuestionCount(5);
    setDifficulty("intermediate");
    setTitle("");
    setDescription("");
    setImage("");
    setPreview(null);
    setCreatedQuiz(null);
    setError("");
  };

  return (
    <div className="ai-quiz-generator">
      <div className="ai-quiz-container">
        <div className="ai-quiz-header">
          <h1>✨ AI Quiz Generator</h1>
          <button 
            className="btn-dashboard" 
            onClick={() => navigate("/dashboard")}
            title="Go to Dashboard"
          >
            📊 Dashboard
          </button>
        </div>
        <p className="subtitle">Create quizzes instantly powered by Gemini AI</p>

        {/* Step 1: Form */}
        {step === "form" && (
          <form onSubmit={handleGeneratePreview} className="quiz-form">
            <div className="form-group">
              <label htmlFor="topic">Quiz Topic *</label>
              <input
                id="topic"
                type="text"
                placeholder="e.g., JavaScript, Biology, World History"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="questionCount">Number of Questions *</label>
                <input
                  id="questionCount"
                  type="number"
                  min="1"
                  max="20"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Difficulty Level *</label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  disabled={loading}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="title">Quiz Title (Optional)</label>
              <input
                id="title"
                type="text"
                placeholder="Leave empty to use AI-generated title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Quiz Description (Optional)</label>
              <textarea
                id="description"
                placeholder="Leave empty to use AI-generated description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Quiz Image URL (Optional)</label>
              <input
                id="image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Generating..." : "Generate Preview"}
            </button>
          </form>
        )}

        {/* Step 2: Preview with Editable Fields */}
        {step === "preview" && preview && (
          <div className="preview-container">
            <div className="preview-header">
              <h2>Review & Customize Your Quiz</h2>
              <p className="preview-topic">Topic: {topic}</p>
            </div>

            <div className="quiz-preview">
              {/* Editable Fields */}
              <div className="editable-fields">
                <div className="form-group">
                  <label htmlFor="edit-title">Quiz Title</label>
                  <input
                    id="edit-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-description">Description</label>
                  <textarea
                    id="edit-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-image">Quiz Image URL</label>
                  <input
                    id="edit-image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Preview Info */}
              <div className="preview-info">
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="quiz-stats">
                  <span>📋 {preview.questions.length} Questions</span>
                  <span>📊 {difficulty}</span>
                </div>
              </div>

              {/* Questions Preview */}
              <div className="questions-preview">
                <h4>Questions Preview:</h4>
                {preview.questions.map((q, idx) => (
                  <div key={idx} className="question-item">
                    <p className="q-text">
                      <strong>{idx + 1}.</strong> {q.question}
                    </p>
                    <ul className="options-list">
                      {q.options.map((option, optIdx) => (
                        <li
                          key={optIdx}
                          className={
                            option === q.correctAnswer ? "correct" : ""
                          }
                        >
                          {option}
                          {option === q.correctAnswer && (
                            <span className="correct-badge">✓</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="preview-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setStep("form")}
                disabled={loading}
              >
                Back to Edit
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreateQuiz}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Quiz"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === "success" && createdQuiz && (
          <div className="success-container">
            <div className="success-icon">✅</div>
            <h2>Quiz Created Successfully!</h2>
            <div className="success-info">
              <p className="success-title">{createdQuiz.title}</p>
              <p className="success-description">{createdQuiz.description}</p>
              <div className="quiz-details">
                <p>
                  <strong>Questions:</strong> {createdQuiz.questions.length}
                </p>
                <p>
                  <strong>Difficulty:</strong> {difficulty}
                </p>
                <p>
                  <strong>Topic:</strong> {topic}
                </p>
              </div>
            </div>

            <div className="success-actions">
              <button className="btn btn-primary" onClick={handleReset}>
                Create Another Quiz
              </button>
              <a href={`/quiz/${createdQuiz._id}`} className="btn btn-secondary">
                View Quiz
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIQuizGenerator;
