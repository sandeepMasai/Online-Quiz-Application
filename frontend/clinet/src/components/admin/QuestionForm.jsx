import React from 'react';

export default function QuestionForm({ formData, setFormData, onSubmit, onCancel, editingId }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100 animate-slide-up">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {editingId ? 'Edit' : 'Create New'} Question
      </h2>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Question Text</label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
            rows="4"
            placeholder="Enter your question here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.options.map((opt, i) => (
            <div key={i} className={`p-4 rounded-xl border-2 transition-all ${
              i === formData.correctOptionIndex 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Option {i + 1} {i === formData.correctOptionIndex && <span className="text-green-600">✓ Correct</span>}
              </label>
              <input
                type="text"
                value={opt}
                onChange={(e) => {
                  const newOptions = [...formData.options];
                  newOptions[i] = e.target.value;
                  setFormData({ ...formData, options: newOptions });
                }}
                placeholder={`Option ${i + 1}...`}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Correct Option</label>
            <select
              value={formData.correctOptionIndex}
              onChange={(e) => setFormData({ ...formData, correctOptionIndex: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
            >
              <option value="0">Option 1</option>
              <option value="1">Option 2</option>
              <option value="2">Option 3</option>
              <option value="3">Option 4</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
            >
              <option value="react">React</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="node">Node.js</option>
              <option value="mongodb">MongoDB</option>
              <option value="sql">SQL</option>
              <option value="dsa">DSA</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            placeholder="hooks, useState, components"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            onClick={onSubmit}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
          >
            {editingId ? 'Update' : 'Create'} Question
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

