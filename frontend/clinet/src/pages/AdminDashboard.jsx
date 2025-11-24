import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Filter, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import { api } from '../config/api';
import QuestionForm from '../components/admin/QuestionForm';
import QuestionList from '../components/admin/QuestionList';

export default function AdminDashboard() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Calculate category statistics
  const categoryStats = useMemo(() => {
    const stats = {};
    questions.forEach(q => {
      stats[q.category] = (stats[q.category] || 0) + 1;
    });
    return stats;
  }, [questions]);

  // Filter and search questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = searchQuery === '' ||
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.options.some(opt => opt.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = filterCategory === 'all' || q.category === filterCategory;
      const matchesDifficulty = filterDifficulty === 'all' || q.difficulty === filterDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [questions, searchQuery, filterCategory, filterDifficulty]);

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCategory, filterDifficulty]);

  const categories = ['react', 'javascript', 'html', 'css', 'node', 'mongodb', 'sql', 'dsa'];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Question Management
          </h1>
          <p className="text-gray-500">Create and manage assessment questions</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 flex items-center transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
        >
          <Plus className="w-5 h-5 mr-2" />
          {showForm ? 'Cancel' : 'Add Question'}
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Questions</p>
              <p className="text-3xl font-bold">{questions.length}</p>
            </div>
            <BarChart3 className="w-12 h-12 opacity-80" />
          </div>
        </div>

        {categories.slice(0, 3).map(category => (
          <div key={category} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <p className="text-gray-500 text-sm font-medium mb-1 capitalize">{category}</p>
            <p className="text-3xl font-bold text-gray-800">{categoryStats[category] || 0}</p>
            <p className="text-xs text-gray-400 mt-1">questions</p>
          </div>
        ))}
      </div>

      {/* Category Statistics Grid */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          Questions by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map(category => (
            <div key={category} className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <p className="text-2xl font-bold text-gray-800">{categoryStats[category] || 0}</p>
              <p className="text-xs text-gray-600 capitalize mt-1">{category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by question text, ID, or option..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white appearance-none"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-800">{paginatedQuestions.length}</span> of{' '}
            <span className="font-semibold text-gray-800">{filteredQuestions.length}</span> questions
            {filteredQuestions.length !== questions.length && (
              <span className="text-gray-400"> (filtered from {questions.length} total)</span>
            )}
          </p>
        </div>
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
        questions={paginatedQuestions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
          <div className="text-sm text-gray-600">
            Page <span className="font-semibold text-gray-800">{currentPage}</span> of{' '}
            <span className="font-semibold text-gray-800">{totalPages}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center font-semibold"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-xl font-semibold transition-all ${currentPage === pageNum
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center font-semibold"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
