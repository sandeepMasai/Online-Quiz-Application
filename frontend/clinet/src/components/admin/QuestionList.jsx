import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function QuestionList({ questions, onEdit, onDelete }) {
  return (
    <div className="grid gap-4">
      {questions.map((q) => (
        <div key={q._id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{q.text}</h3>
              <div className="flex space-x-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{q.category}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{q.difficulty}</span>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <div key={i} className={`p-2 rounded ${i === q.correctOptionIndex ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    {i + 1}. {opt} {i === q.correctOptionIndex && '✓'}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEdit(q)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(q._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
