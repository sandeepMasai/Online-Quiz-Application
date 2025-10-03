import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart3, Trophy, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const Results = () => {
  const { user, token } = useAuth();
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/results', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        toast.error('Failed to fetch results');
      }
    } catch (error) {
      toast.error('Failed to fetch results');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (start, end) => {
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ---------- DETAILS VIEW ----------
  if (selectedResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => setSelectedResult(null)}
          className="text-blue-600 hover:text-blue-700 mb-4"
        >
          ← Back to Results
        </button>

        <h1 className="text-2xl font-bold mb-2">{selectedResult.assessment.title}</h1>

        {/* Score Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white shadow p-4 rounded-lg text-center">
            {selectedResult.passed ? (
              <Trophy className="mx-auto text-green-600 w-8 h-8" />
            ) : (
              <XCircle className="mx-auto text-red-600 w-8 h-8" />
            )}
            <p className="text-xl font-bold">{selectedResult.score}%</p>
            <p className="text-gray-600 text-sm">Final Score</p>
          </div>

          <div className="bg-white shadow p-4 rounded-lg text-center">
            <CheckCircle className="mx-auto text-blue-600 w-8 h-8" />
            <p className="text-xl font-bold">
              {selectedResult.answers.filter(a => a.correct).length}
            </p>
            <p className="text-gray-600 text-sm">Correct</p>
          </div>

          <div className="bg-white shadow p-4 rounded-lg text-center">
            <BarChart3 className="mx-auto text-gray-600 w-8 h-8" />
            <p className="text-xl font-bold">{selectedResult.answers.length}</p>
            <p className="text-gray-600 text-sm">Questions</p>
          </div>

          <div className="bg-white shadow p-4 rounded-lg text-center">
            <Clock className="mx-auto text-purple-600 w-8 h-8" />
            <p className="text-xl font-bold">
              {formatDuration(selectedResult.startedAt, selectedResult.endedAt)}
            </p>
            <p className="text-gray-600 text-sm">Time Taken</p>
          </div>
        </div>

        {/* Question Details */}
        <div className="space-y-4">
          {selectedResult.answers.map((answer, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{i + 1}. {answer.question.text}</h3>
                <span className={`px-2 py-1 text-sm rounded-full ${
                  answer.correct ? "bg-green-100 text-green-700"
                  : answer.skipped ? "bg-gray-100 text-gray-700"
                  : "bg-red-100 text-red-700"
                }`}>
                  {answer.correct ? "Correct" : answer.skipped ? "Skipped" : "Incorrect"}
                </span>
              </div>

              <div className="space-y-1">
                {answer.question.options.map((opt, idx) => {
                  const isCorrect = idx === answer.question.correctOptionIndex;
                  const isSelected = idx === answer.selectedIndex;
                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded border flex items-center justify-between ${
                        isCorrect ? "bg-green-50 border-green-200"
                        : isSelected && !isCorrect ? "bg-red-50 border-red-200"
                        : isSelected ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span>{opt}</span>
                      {isCorrect && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600" />}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------- LIST VIEW ----------
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Assessment Results</h1>
      <p className="text-gray-600 mb-6">
        {user?.role === 'student' ? 'Your past assessments' : 'All assessment results'}
      </p>

      {results.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          No results yet
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((res) => (
            <div
              key={res._id}
              className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{res.assessment.title}</h3>
                  {user?.role !== 'student' && (
                    <p className="text-sm text-gray-500">By: {res.user.username}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {new Date(res.endedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {formatDuration(res.startedAt, res.endedAt)}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-bold text-xl ${res.passed ? "text-green-600" : "text-red-600"}`}>
                    {res.score}%
                  </div>
                  <div className="text-sm">
                    {res.passed ? "PASSED" : "FAILED"}
                  </div>
                  <button
                    onClick={() => setSelectedResult(res)}
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              </div>

              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${res.passed ? "bg-green-500" : "bg-red-500"}`}
                  style={{ width: `${res.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
