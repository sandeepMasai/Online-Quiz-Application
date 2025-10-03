import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { api } from '../config/api';
import QuestionForm from '../components/admin/QuestionForm';
import QuestionList from '../components/admin/QuestionList';

export default function AdminDashboard() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    options: ['', '', '', ''],
    correctOptionIndex: 0,
    category: 'react',
    difficulty: 'medium',
    tags: '',
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await api.request('/questions');
      setQuestions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (editingId) {
        await api.request(`/questions/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await api.request('/questions', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({
        text: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
        category: 'react',
        difficulty: 'medium',
        tags: '',
      });
      loadQuestions();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (question) => {
    setFormData({
      text: question.text,
      options: question.options,
      correctOptionIndex: question.correctOptionIndex,
      category: question.category,
      difficulty: question.difficulty,
      tags: question.tags.join(', '),
    });
    setEditingId(question._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this question?')) return;
    try {
      await api.request(`/questions/${id}`, { method: 'DELETE' });
      loadQuestions();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      text: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0,
      category: 'react',
      difficulty: 'medium',
      tags: '',
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Question Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Question
        </button>
      </div>

      {showForm && (
        <QuestionForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          editingId={editingId}
        />
      )}

      <QuestionList
        questions={questions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
