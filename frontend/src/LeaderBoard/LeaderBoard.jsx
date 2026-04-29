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

  // Group scores by score value and assign proper ranks
  const getGroupedScores = () => {
    if (scores.length === 0) return [];
    
    const grouped = {};
    scores.forEach((entry) => {
      const scoreValue = entry.score;
      if (!grouped[scoreValue]) {
        grouped[scoreValue] = [];
      }
      grouped[scoreValue].push(entry);
    });

    const sortedGroups = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => b - a);

    const result = [];
    let currentRank = 1;

    sortedGroups.forEach((scoreValue) => {
      const group = grouped[scoreValue];
      
      // Sort users alphabetically within the group
      const sortedUsers = group.sort((a, b) => {
        const nameA = (a.username || a.user?.username || "Unknown").toUpperCase();
        const nameB = (b.username || b.user?.username || "Unknown").toUpperCase();
        return nameA.localeCompare(nameB);
      });

      result.push({
        rank: currentRank,
        score: scoreValue,
        users: sortedUsers,
      });
      
      // Increment by 1 for dense ranking (not by group length)
      currentRank += 1;
    });

    return result;
  };

  const groupedScores = getGroupedScores();

  if (loading)
    return <div className="loading-container">Loading leaderboard</div>;

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">
        <span className="trophy">🏆</span> Leaderboard
      </h2>

      {groupedScores.length > 0 ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Users</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {groupedScores.map((group, index) => (
              <tr key={index}>
                <td
                  className={`rank-cell ${
                    group.rank < 4 ? `rank-${group.rank}` : ""
                  }`}
                >
                  {group.rank}
                </td>
                <td className="users-cell">
                  <div className="users-list">
                    {group.users.map((entry, userIndex) => (
                      <div key={userIndex} className="user-item">
                        <div className="user-avatar">
                          {(entry.username || entry.user?.username || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <span className="user-name">
                          {entry.username || entry.user?.username || "Unknown"}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="score-cell">{group.score}</td>
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
