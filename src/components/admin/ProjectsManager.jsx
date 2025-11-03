import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../common/Card';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';
import { useProjects } from '../../hooks/useApi';
import { useToast } from '../../providers/ToastProvider';

const ProjectsManager = ({ onSuccess }) => {
  const { projects, loading, error, creating, updating, deleting, createProject, updateProject, deleteProject } =
    useProjects();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    url: '',
    image: '',
  });
  const [formError, setFormError] = useState(null);
  const [localError, setLocalError] = useState(null);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      skills: '',
      url: '',
      image: '',
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
    if (!formData.title.trim()) {
      setFormError('Project title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setFormError('Project description is required');
      return false;
    }
    if (!formData.image.trim()) {
      setFormError('Project image URL is required');
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
        title: formData.title,
        description: formData.description,
        skills: formData.skills.split(',').map((t) => t.trim()),
        url: formData.url,
        image: formData.image,
      };

      if (editingId) {
        await updateProject(editingId, payload);
        addToast('Project updated successfully!', 'success');
      } else {
        await createProject(payload);
        addToast('Project created successfully!', 'success');
      }

      onSuccess?.();
      resetForm();
      setShowForm(false);
    } catch (err) {
      const errorMsg = err.message || 'Failed to save project';
      setLocalError(errorMsg);
      addToast(errorMsg, 'error');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      skills: Array.isArray(project.skills) ? project.skills.join(', ') : '',
      url: project.url || '',
      image: project.image,
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        addToast('Project deleted successfully!', 'success');
        onSuccess?.();
      } catch (err) {
        addToast(err.message || 'Failed to delete project', 'error');
        setLocalError(err.message || 'Failed to delete project');
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
        <h2 className="text-2xl font-bold text-sand">Projects</h2>
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
          {showForm ? '✕ Close' : '+ New Project'}
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
                {editingId ? 'Edit Project' : 'New Project'}
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
                <Input
                  label="Project Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., E-commerce Platform"
                  required
                />

                <Textarea
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed project description..."
                  rows={4}
                  required
                />

                <Input
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/project.jpg"
                  required
                />

                <Input
                  label="Project URL"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://project.com"
                />

                <Input
                  label="Skills (comma-separated)"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB, Tailwind CSS"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="secondary" type="button" onClick={() => resetForm()}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={creating || updating}>
                  {creating || updating ? <Spinner size="sm" variant="primary" /> : '✓'}{' '}
                  {editingId ? 'Update Project' : 'Create Project'}
                </Button>
              </div>
            </Card>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Projects List */}
      <div className="grid gap-4">
        {projects && projects.length > 0 ? (
          projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-4 backdrop-blur-md bg-night/50 border border-mist/10 hover:border-ocean/30 transition-all">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-32 md:h-24 shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-sand">{project.title}</h3>
                        <p className="text-sm text-mist/60 line-clamp-1">{project.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {Array.isArray(project.skills) &&
                        project.skills.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="secondary" size="sm">
                            {skill}
                          </Badge>
                        ))}
                      {Array.isArray(project.skills) && project.skills.length > 3 && (
                        <Badge variant="secondary" size="sm">
                          +{project.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleEdit(project)}>
                        ✏️ Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(project.id)}
                        disabled={deleting === project.id}
                      >
                        {deleting === project.id ? <Spinner size="sm" /> : '🗑️'} Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card className="p-8 backdrop-blur-md bg-night/50 border border-mist/10 text-center">
            <p className="text-mist/60">No projects yet. Create one to get started!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectsManager;
