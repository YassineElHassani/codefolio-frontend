import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';
import { useProfile } from '../../hooks/useApi';
import { useToast } from '../../providers/ToastProvider';

const ProfileEditor = ({ onSuccess }) => {
  const { profile, loading, error, updating, updateProfile } = useProfile();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    avatarUrl: '',
    social: [],
  });
  const [socialInput, setSocialInput] = useState({ platform: '', icon: '', url: '' });
  const [formError, setFormError] = useState(null);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        title: profile.title || '',
        bio: profile.bio || '',
        avatarUrl: profile.avatarUrl || '',
        social: profile.social || [],
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialInput((prev) => ({ ...prev, [name]: value }));
  };

  const addSocialLink = () => {
    if (!socialInput.platform.trim() || !socialInput.url.trim()) {
      addToast('Platform and URL are required', 'error');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      social: [...prev.social, { ...socialInput }],
    }));
    setSocialInput({ platform: '', icon: '', url: '' });
  };

  const removeSocialLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      social: prev.social.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('Name is required');
      return false;
    }
    if (!formData.title.trim()) {
      setFormError('Title is required');
      return false;
    }
    if (!formData.bio.trim()) {
      setFormError('Bio is required');
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
      // Ensure all required fields are strings
      const payload = {
        name: String(formData.name || '').trim(),
        title: String(formData.title || '').trim(),
        bio: String(formData.bio || '').trim(),
      };

      // Add optional fields only if they have values
      if (formData.avatarUrl && formData.avatarUrl.trim()) {
        payload.avatarUrl = String(formData.avatarUrl).trim();
      }

      // Add social array if populated
      if (Array.isArray(formData.social) && formData.social.length > 0) {
        payload.social = formData.social.map(s => ({
          platform: String(s.platform || '').trim(),
          icon: String(s.icon || '').trim(),
          url: String(s.url || '').trim(),
        }));
      }

      console.log('Profile Update Payload:', JSON.stringify(payload, null, 2));
      
      await updateProfile(payload);
      addToast('Profile updated successfully!', 'success');
      onSuccess?.();
    } catch (err) {
      console.error('Profile update error:', err);
      const errorMsg = err.message || 'Failed to update profile';
      setLocalError(errorMsg);
      addToast(errorMsg, 'error');
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
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Card className="p-8 backdrop-blur-md bg-night/50 border border-mist/10">
        <h2 className="text-2xl font-bold text-sand mb-6">Edit Profile</h2>

        {/* Errors */}
        {(error || localError || formError) && (
          <Alert
            type="error"
            message={error || localError || formError}
            onClose={() => {
              setLocalError(null);
              setFormError(null);
            }}
            title="Error"
            className="mb-6"
          />
        )}

        {/* Basic Information */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-sand flex items-center gap-2">
            <span>👤</span> Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
            <Input
              label="Professional Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Full Stack Developer"
              required
            />
          </div>

          <Textarea
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell about yourself..."
            rows={4}
            required
          />

          <Input
            label="Avatar URL"
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        {/* Social Links */}
        <div className="space-y-4 mb-8 pb-8 border-b border-mist/10">
          <h3 className="text-lg font-semibold text-sand flex items-center gap-2">
            <span>🔗</span> Social Links
          </h3>

          {/* Add Social Link Form */}
          <div className="space-y-3 p-4 rounded-lg bg-night/30 border border-mist/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                label="Platform"
                name="platform"
                value={socialInput.platform}
                onChange={handleSocialChange}
                placeholder="e.g., GitHub"
              />
              <Input
                label="Icon"
                name="icon"
                value={socialInput.icon}
                onChange={handleSocialChange}
                placeholder="e.g., github"
              />
              <Input
                label="URL"
                name="url"
                value={socialInput.url}
                onChange={handleSocialChange}
                placeholder="https://..."
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={addSocialLink}
              className="w-full"
            >
              + Add Social Link
            </Button>
          </div>

          {/* Social Links List */}
          {formData.social.length > 0 && (
            <div className="space-y-2">
              {formData.social.map((social, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-night/30 border border-mist/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{social.icon || '🔗'}</span>
                    <div>
                      <p className="text-sm font-medium text-sand">{social.platform}</p>
                      <p className="text-xs text-mist/60 truncate">{social.url}</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => removeSocialLink(idx)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button variant="secondary" type="button">
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={updating}
          className="flex items-center gap-2"
        >
          {updating ? (
            <>
              <Spinner size="sm" variant="primary" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span>✓</span>
              <span>Save Changes</span>
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
};

export default ProfileEditor;
