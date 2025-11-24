import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function QuestionList({ questions, onEdit, onDelete }) {
  return (
    <div className="grid gap-6">
      {questions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No questions found.</p>
          <p className="text-gray-400">Create your first question to get started!</p>
        </div>
      ) : (
        questions.map((q) => (
          <div key={q._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    ID: {q._id.substring(0, 8)}...
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">{q.text}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold capitalize">
                    {q.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                    q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, i) => (
                    <div key={i} className={`p-3 rounded-xl border-2 transition-all ${
                      i === q.correctOptionIndex 
                        ? 'bg-green-50 border-green-300 text-green-800 font-semibold' 
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}>
                      <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt} {i === q.correctOptionIndex && <span className="text-green-600 ml-2">✓</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit(q)}
                  className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all transform hover:scale-110"
                  title="Edit question"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(q._id)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all transform hover:scale-110"
                  title="Delete question"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
