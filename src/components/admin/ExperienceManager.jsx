import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../common/Card';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';
import { useExperiences } from '../../hooks/useApi';
import { useToast } from '../../providers/ToastProvider';

const ExperienceManager = ({ onSuccess }) => {
  const { experiences, loading, error, creating, updating, deleting, createExperience, updateExperience, deleteExperience } =
    useExperiences();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    details: '',
    startDate: '',
    endDate: '',
  });
  const [formError, setFormError] = useState(null);
  const [localError, setLocalError] = useState(null);

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      details: '',
      startDate: '',
      endDate: '',
    });
    setEditingId(null);
    setFormError(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFormError(null);
  };

  const validateForm = () => {
    if (!formData.company.trim()) {
      setFormError('Company name is required');
      return false;
    }
    if (!formData.role.trim()) {
      setFormError('Role/Title is required');
      return false;
    }
    if (!formData.startDate) {
      setFormError('Start date is required');
      return false;
    }
    if (!formData.endDate) {
      setFormError('End date is required');
      return false;
    }
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      setFormError('End date must be after start date');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!validateForm()) {
      addToast(formError, 'error');
      return;
    }

    try {
      const payload = {
        company: formData.company,
        role: formData.role,
        details: formData.details,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      if (editingId) {
        await updateExperience(editingId, payload);
        addToast('Experience updated successfully!', 'success');
      } else {
        await createExperience(payload);
        addToast('Experience created successfully!', 'success');
      }

      onSuccess?.();
      resetForm();
      setShowForm(false);
    } catch (err) {
      const errorMsg = err.message || 'Failed to save experience';
      addToast(errorMsg, 'error');
      setLocalError(errorMsg);
    }
  };

  const handleEdit = (experience) => {
    setFormData({
      company: experience.company,
      role: experience.role,
      details: experience.details || '',
      startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
      endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
    });
    setEditingId(experience.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteExperience(id);
        addToast('Experience deleted successfully!', 'success');
        onSuccess?.();
      } catch (err) {
        const errorMsg = err.message || 'Failed to delete experience';
        addToast(errorMsg, 'error');
        setLocalError(errorMsg);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  if (loading) {
    return (
      <Card className="p-8 backdrop-blur-md bg-night/50 border border-mist/10 flex items-center justify-center">
        <Spinner size="lg" variant="primary" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-sand">Experience</h2>
        <Button
          variant={showForm ? 'secondary' : 'primary'}
          onClick={() => {
            if (showForm) {
              resetForm();
              setShowForm(false);
            } else {
              setShowForm(true);
            }
          }}
        >
          {showForm ? '✕ Close' : '+ New Experience'}
        </Button>
      </div>

      {/* Error Alert */}
      {(error || localError) && (
        <Alert
          type="error"
          message={error || localError}
          onClose={() => setLocalError(null)}
          title="Error"
        />
      )}

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="overflow-hidden"
          >
            <Card className="p-6 backdrop-blur-md bg-night/50 border border-mist/10">
              <h3 className="text-xl font-semibold text-sand mb-4">
                {editingId ? 'Edit Experience' : 'New Experience'}
              </h3>

              {formError && (
                <Alert
                  type="error"
                  message={formError}
                  onClose={() => setFormError(null)}
                  className="mb-4"
                />
              )}

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g., Acme Corporation"
                    required
                  />
                  <Input
                    label="Role/Title"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g., Senior Developer"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Textarea
                  label="Details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="secondary" type="button" onClick={() => resetForm()}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={creating || updating}>
                  {creating || updating ? <Spinner size="sm" variant="primary" /> : '✓'}{' '}
                  {editingId ? 'Update Experience' : 'Create Experience'}
                </Button>
              </div>
            </Card>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Experience Timeline */}
      <div className="space-y-4">
        {experiences && experiences.length > 0 ? (
          [...experiences]
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-5 backdrop-blur-md bg-night/50 border border-mist/10 hover:border-ocean/30 transition-all">
                  {/* Timeline marker */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-ocean mt-2 shadow-lg shadow-ocean/50" />
                      {idx < experiences.length - 1 && (
                        <div className="w-0.5 h-20 bg-linear-to-b from-ocean to-mist/20 my-2" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-sand">{exp.role}</h3>
                          <p className="text-sm text-mist/70">{exp.company}</p>
                        </div>
                      </div>

                      <p className="text-xs text-mist/60 mb-2">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </p>

                      {exp.details && (
                        <p className="text-sm text-mist/70 mb-3 line-clamp-2">
                          {exp.details}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => handleEdit(exp)}>
                          ✏️ Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(exp.id)}
                          disabled={deleting === exp.id}
                        >
                          {deleting === exp.id ? <Spinner size="sm" /> : '🗑️'} Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
        ) : (
          <Card className="p-8 backdrop-blur-md bg-night/50 border border-mist/10 text-center">
            <p className="text-mist/60">No experience added yet. Create one to showcase your career!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExperienceManager;
