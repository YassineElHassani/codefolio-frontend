import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../common/Card';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';
import { useSkills } from '../../hooks/useApi';
import { useToast } from '../../providers/ToastProvider';

const SkillsManager = ({ onSuccess }) => {
  const { skills, loading, error, creating, updating, deleting, createSkill, updateSkill, deleteSkill } =
    useSkills();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 'expert',
    icon: '⚡',
  });
  const [formError, setFormError] = useState(null);
  const [localError, setLocalError] = useState(null);

  const levels = ['beginner', 'intermediate', 'advanced', 'expert'];

  const resetForm = () => {
    setFormData({
      name: '',
      level: 'expert',
      icon: '⚡',
    });
    setEditingId(null);
    setFormError(null);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value,
    }));
    setFormError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('Skill name is required');
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
      if (editingId) {
        await updateSkill(editingId, formData);
        addToast('Skill updated successfully!', 'success');
      } else {
        await createSkill(formData);
        addToast('Skill created successfully!', 'success');
      }

      onSuccess?.();
      resetForm();
      setShowForm(false);
    } catch (err) {
      const errorMsg = err.message || 'Failed to save skill';
      addToast(errorMsg, 'error');
      setLocalError(err.message || 'Failed to save skill');
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name,
      level: skill.level || 'expert',
      icon: skill.icon || '⚡',
    });
    setEditingId(skill.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id);
        addToast('Skill deleted successfully!', 'success');
        onSuccess?.();
      } catch (err) {
        const errorMsg = err.message || 'Failed to delete skill';
        addToast(errorMsg, 'error');
        setLocalError(errorMsg);
      }
    }
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
        <h2 className="text-2xl font-bold text-sand">Skills</h2>
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
          {showForm ? '✕ Close' : '+ New Skill'}
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
                {editingId ? 'Edit Skill' : 'New Skill'}
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
                    label="Skill Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., React.js"
                    required
                  />
                  <Input
                    label="Icon (emoji)"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="⚡"
                    maxLength={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sand mb-2">Level</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-night/50 border border-mist/20 text-sand focus:outline-none focus:ring-2 focus:ring-ocean/50 transition-all"
                  >
                    {levels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="secondary" type="button" onClick={() => resetForm()}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={creating || updating}>
                  {creating || updating ? <Spinner size="sm" variant="primary" /> : '✓'}{' '}
                  {editingId ? 'Update Skill' : 'Create Skill'}
                </Button>
              </div>
            </Card>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Skills List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills && skills.length > 0 ? (
          skills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-4 backdrop-blur-md bg-night/50 border border-mist/10 hover:border-ocean/30 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{skill.icon}</span>
                    <div>
                      <h3 className="font-semibold text-sand">{skill.name}</h3>
                      <p className="text-xs text-mist/60">{skill.category}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      skill.level === 'expert'
                        ? 'success'
                        : skill.level === 'advanced'
                          ? 'primary'
                          : skill.level === 'intermediate'
                            ? 'secondary'
                            : 'warning'
                    }
                    size="sm"
                  >
                    {skill.level}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleEdit(skill)}>
                    ✏️ Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(skill.id)}
                    disabled={deleting === skill.id}
                  >
                    {deleting === skill.id ? <Spinner size="sm" /> : '🗑️'} Delete
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card className="col-span-full p-8 backdrop-blur-md bg-night/50 border border-mist/10 text-center">
            <p className="text-mist/60">No skills yet. Add one to showcase your expertise!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SkillsManager;
