import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LeaderBoard.css";

const Leaderboard = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/quiz-attempt/leaderboard/${quizId}`
        );
        console.log("Leaderboard response:", res.data); // debug
        if (Array.isArray(res.data)) {
          setScores(res.data);
        } else {
          console.error("Leaderboard data is not an array:", res.data);
          setScores([]);
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setScores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [quizId]);

  if (loading)
    return <div className="loading-container">Loading leaderboard</div>;

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">
        <span className="trophy">🏆</span> Leaderboard
      </h2>

      {scores.length > 0 ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry, index) => (
              <tr key={index}>
                <td
                  className={`rank-cell ${
                    index < 3 ? `rank-${index + 1}` : ""
                  }`}
                >
                  {index + 1}
                </td>
                <td className="user-cell">
                  <div className="user-avatar">
                    {(entry.username || entry.user?.username || "?")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  {entry.username || entry.user?.username || "Unknown"}
                </td>
                <td className="score-cell">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-leaderboard">
          No scores available for this quiz yet.
        </div>
      )}
      <button onClick={() => {navigate("/dashboard")}}>Return To Dashboard</button>
    </div>
  );
};

export default Leaderboard;
