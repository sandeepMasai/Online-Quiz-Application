// import React, { useState, useEffect } from 'react';
// import { Play, Clock, CheckCircle, AlertCircle } from 'lucide-react';
// import { api } from '../config/api';

// export default function StudentDashboard() {
//   const [view, setView] = useState('start');
//   const [assessment, setAssessment] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [result, setResult] = useState(null);

//   const startAssessment = async (category, numQuestions, duration) => {
//     try {
//       const data = await api.request('/assessments/start', {
//         method: 'POST',
//         body: JSON.stringify({ category, numQuestions, duration }),
//       });
//       setAssessment(data);
//       setTimeLeft(duration * 60);
//       setView('taking');
//       setCurrentQuestion(0);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     if (view === 'taking' && timeLeft > 0) {
//       const timer = setInterval(() => {
//         setTimeLeft(t => {
//           if (t <= 1) {
//             submitAssessment();
//             return 0;
//           }
//           return t - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [view, timeLeft]);

//   const submitAssessment = async () => {
//     try {
//       const result = await api.request('/results/submit', {
//         method: 'POST',
//         body: JSON.stringify({
//           assessmentId: assessment.assessmentId,
//           answers,
//         }),
//       });
//       setResult(result);
//       setView('result');
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (view === 'start') {
//     return (
//       <div className="p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Start Assessment</h1>
//         <div className="grid md:grid-cols-2 gap-6">
//           {['react', 'javascript', 'html', 'css', 'node', 'mongodb', 'sql', 'dsa'].map(category => (
//             <div key={category} className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-xl font-bold mb-4 capitalize">{category}</h3>
//               <button
//                 onClick={() => startAssessment(category, 10, 15)}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
//               >
//                 <Play className="w-5 h-5 mr-2" />
//                 Start Test (10 questions, 15 min)
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (view === 'taking' && assessment) {
//     const question = assessment.questions[currentQuestion];
//     const minutes = Math.floor(timeLeft / 60);
//     const seconds = timeLeft % 60;

//     return (
//       <div className="p-6 max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md p-6 mb-4">
//           <div className="flex justify-between items-center mb-6">
//             <span className="text-lg font-semibold">
//               Question {currentQuestion + 1} / {assessment.questions.length}
//             </span>
//             <div className="flex items-center text-red-600 font-semibold">
//               <Clock className="w-5 h-5 mr-2" />
//               {minutes}:{seconds.toString().padStart(2, '0')}
//             </div>
//           </div>

//           <h2 className="text-xl font-bold mb-6">{question.text}</h2>

//           <div className="space-y-3">
//             {question.options.map((opt, i) => (
//               <button
//                 key={i}
//                 onClick={() => setAnswers({ ...answers, [question._id]: i })}
//                 className={`w-full p-4 text-left rounded-lg border-2 transition ${
//                   answers[question._id] === i
//                     ? 'border-blue-600 bg-blue-50'
//                     : 'border-gray-200 hover:border-blue-300'
//                 }`}
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>

//           <div className="flex justify-between mt-6">
//             <button
//               onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
//               disabled={currentQuestion === 0}
//               className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {currentQuestion < assessment.questions.length - 1 ? (
//               <button
//                 onClick={() => setCurrentQuestion(currentQuestion + 1)}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 onClick={submitAssessment}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (view === 'result' && result) {
//     return (
//       <div className="p-6 max-w-2xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           {result.passed ? (
//             <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//           ) : (
//             <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           )}
//           <h1 className="text-3xl font-bold mb-4">
//             {result.passed ? 'Congratulations!' : 'Keep Practicing!'}
//           </h1>
//           <div className="space-y-2 text-lg">
//             <p>Score: <span className="font-bold">{result.scorePercent}%</span></p>
//             <p>Correct: <span className="font-bold">{result.correct}</span></p>
//             <p>Attempted: <span className="font-bold">{result.attempted}</span></p>
//           </div>
//           <button
//             onClick={() => {
//               setView('start');
//               setAssessment(null);
//               setAnswers({});
//               setResult(null);
//             }}
//             className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Take Another Test
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return null;
// }

import React, { useState, useEffect } from 'react';
import { Play, Clock, CheckCircle, AlertCircle, History, Award, Target, TrendingUp } from 'lucide-react';
import { api } from '../config/api';

export default function StudentDashboard() {
  const [view, setView] = useState('start');
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (view === 'history') {
      loadResults();
    }
  }, [view]);

  const loadResults = async () => {
    try {
      const data = await api.request('/results/user/history');
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  const startAssessment = async (category, numQuestions, duration) => {
    try {
      const data = await api.request('/assessments/start', {
        method: 'POST',
        body: JSON.stringify({ category, numQuestions, duration }),
      });
      setAssessment(data);
      setTimeLeft(duration * 60);
      setView('taking');
      setCurrentQuestion(0);
      setAnswers({});
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (view === 'taking' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            submitAssessment();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [view, timeLeft]);

  const submitAssessment = async () => {
    try {
      const result = await api.request('/results/submit', {
        method: 'POST',
        body: JSON.stringify({
          assessmentId: assessment.assessmentId,
          answers,
        }),
      });
      setResult(result);
      setView('result');
    } catch (err) {
      alert(err.message);
    }
  };

  // START VIEW - Dashboard with categories
  if (view === 'start') {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Start Assessment</h1>
          <button
            onClick={() => setView('history')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center transition"
          >
            <History className="w-5 h-5 mr-2" />
            View Results
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['react', 'javascript', 'html', 'css', 'node', 'mongodb', 'sql', 'dsa'].map(category => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4 capitalize text-gray-800">{category}</h3>
              <div className="text-sm text-gray-600 mb-4">
                <p>• 10 Questions</p>
                <p>• 15 Minutes</p>
                <p>• Pass: 75%</p>
              </div>
              <button
                onClick={() => startAssessment(category, 10, 15)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center transition"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Test
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // TAKING VIEW - Assessment in progress
  if (view === 'taking' && assessment) {
    const question = assessment.questions[currentQuestion];
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          {/* Header with progress and timer */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-lg font-semibold">
                Question {currentQuestion + 1} / {assessment.questions.length}
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / assessment.questions.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center text-red-600 font-semibold ml-6">
              <Clock className="w-6 h-6 mr-2" />
              <span className="text-2xl">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold mb-6">{question.text}</h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAnswers({ ...answers, [question._id]: i })}
                className={`w-full p-4 text-left rounded-lg border-2 transition ${
                  answers[question._id] === i
                    ? 'border-blue-600 bg-blue-50 font-semibold'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-semibold mr-3">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            {currentQuestion < assessment.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitAssessment}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition"
              >
                Submit Assessment
              </button>
            )}
          </div>

          {/* Question palette */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-600 mb-3">Question Palette:</p>
            <div className="flex flex-wrap gap-2">
              {assessment.questions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={`w-10 h-10 rounded-lg font-semibold transition ${
                    i === currentQuestion
                      ? 'bg-blue-600 text-white'
                      : answers[q._id] !== undefined
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-3 text-xs text-gray-600">
              <span className="flex items-center">
                <span className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded mr-1"></span>
                Answered
              </span>
              <span className="flex items-center">
                <span className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded mr-1"></span>
                Not Answered
              </span>
              <span className="flex items-center">
                <span className="w-4 h-4 bg-blue-600 rounded mr-1"></span>
                Current
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESULT VIEW - After submission
  if (view === 'result' && result) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            {result.passed ? (
              <div>
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4 animate-bounce" />
                <h1 className="text-5xl font-bold mb-2 text-green-600">Congratulations! 🎉</h1>
                <p className="text-gray-600 text-xl">You passed the assessment!</p>
              </div>
            ) : (
              <div>
                <AlertCircle className="w-24 h-24 text-red-500 mx-auto mb-4" />
                <h1 className="text-5xl font-bold mb-2 text-red-600">Keep Practicing! 💪</h1>
                <p className="text-gray-600 text-xl">Don't give up, try again!</p>
              </div>
            )}
          </div>

          {/* Score Display */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <svg className="w-48 h-48" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={result.passed ? "#10b981" : "#ef4444"}
                    strokeWidth="10"
                    strokeDasharray={`${(result.scorePercent / 100) * 283} 283`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-6xl font-bold text-gray-800">
                    {result.scorePercent}%
                  </div>
                  <p className="text-gray-600 text-sm">Your Score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center hover:shadow-lg transition">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-600 mb-1">
                {result.correct}
              </div>
              <p className="text-sm text-gray-600">Correct</p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center hover:shadow-lg transition">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-600 mb-1">
                {result.incorrect}
              </div>
              <p className="text-sm text-gray-600">Incorrect</p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center hover:shadow-lg transition">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {result.skipped}
              </div>
              <p className="text-sm text-gray-600">Skipped</p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 text-center hover:shadow-lg transition">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {result.attempted}
              </div>
              <p className="text-sm text-gray-600">Attempted</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center hover:shadow-lg transition">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {result.totalQuestions}
              </div>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-4 mb-8">
            {/* Completion Rate */}
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-semibold">Completion Rate</span>
                <span className="font-bold text-gray-800">
                  {Math.round((result.attempted / result.totalQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(result.attempted / result.totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Accuracy */}
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-semibold">Accuracy Rate</span>
                <span className="font-bold text-gray-800">
                  {result.attempted > 0 
                    ? Math.round((result.correct / result.attempted) * 100)
                    : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-green-600 h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${result.attempted > 0 
                      ? (result.correct / result.attempted) * 100 
                      : 0}%` 
                  }}
                />
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Performance Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Questions Answered:</span>
                <span className="font-semibold">{result.attempted}/{result.totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Questions Skipped:</span>
                <span className="font-semibold">{result.skipped}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Correct Answers:</span>
                <span className="font-semibold text-green-600">{result.correct}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wrong Answers:</span>
                <span className="font-semibold text-red-600">{result.incorrect}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pass Threshold:</span>
                <span className="font-semibold">75%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-semibold ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {result.passed ? 'PASSED ✓' : 'FAILED ✗'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setView('start');
                setAssessment(null);
                setAnswers({});
                setResult(null);
                setCurrentQuestion(0);
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition shadow-lg hover:shadow-xl"
            >
              Take Another Test
            </button>
            <button
              onClick={() => setView('history')}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center justify-center transition shadow-lg hover:shadow-xl"
            >
              <History className="w-5 h-5 mr-2" />
              View All Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  // HISTORY VIEW - Past results
  if (view === 'history') {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Assessment History</h1>
          <button
            onClick={() => setView('start')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-xl mb-2">No assessment results yet.</p>
            <p className="text-gray-500 mb-6">Start your first test to see your results here!</p>
            <button
              onClick={() => setView('start')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
            >
              Take Your First Assessment
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {results.map((res, index) => (
              <div key={res._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    {res.passed ? (
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    ) : (
                      <AlertCircle className="w-10 h-10 text-red-500" />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold">
                        {res.passed ? 'Passed ✓' : 'Failed ✗'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(res.createdAt).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-blue-600">
                      {res.scorePercent}%
                    </div>
                    <p className="text-sm text-gray-600">Score</p>
                  </div>
                </div>
                
                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Correct</p>
                    <p className="text-2xl font-bold text-green-600">{res.correct}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Incorrect</p>
                    <p className="text-2xl font-bold text-red-600">{res.incorrect || 0}</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Skipped</p>
                    <p className="text-2xl font-bold text-yellow-600">{res.skipped || 0}</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Attempted</p>
                    <p className="text-2xl font-bold text-purple-600">{res.attempted}</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Total</p>
                    <p className="text-2xl font-bold text-blue-600">{res.totalQuestions}</p>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-semibold">
                        {Math.round((res.attempted / res.totalQuestions) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(res.attempted / res.totalQuestions) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Accuracy</span>
                      <span className="font-semibold">
                        {res.attempted > 0 
                          ? Math.round((res.correct / res.attempted) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ 
                          width: `${res.attempted > 0 
                            ? (res.correct / res.attempted) * 100 
                            : 0}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}