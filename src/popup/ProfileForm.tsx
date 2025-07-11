import * as React from 'react';
import { getProfile, setProfile } from '../utils/storage';

export default function ProfileForm() {
  const [profile, setProfileState] = React.useState({ name: '', email: '', skills: '', bio: '' });
  const [loading, setLoading] = React.useState(true);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    getProfile().then((p) => {
      setProfileState({ ...profile, ...p });
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setProfileState({ ...profile, [e.target.name]: e.target.value });
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setProfile(profile).then(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    });
  }

  if (loading) return <div>Loading...</div>;

  return (
    <form className="space-y-2" onSubmit={handleSave}>
      <div>
        <label className="block text-xs font-medium">Name</label>
        <input name="name" value={profile.name} onChange={handleChange} className="w-full rounded px-2 py-1 bg-gray-100 dark:bg-gray-800" />
      </div>
      <div>
        <label className="block text-xs font-medium">Email</label>
        <input name="email" value={profile.email} onChange={handleChange} className="w-full rounded px-2 py-1 bg-gray-100 dark:bg-gray-800" />
      </div>
      <div>
        <label className="block text-xs font-medium">Skills</label>
        <input name="skills" value={profile.skills} onChange={handleChange} className="w-full rounded px-2 py-1 bg-gray-100 dark:bg-gray-800" />
      </div>
      <div>
        <label className="block text-xs font-medium">Bio</label>
        <textarea name="bio" value={profile.bio} onChange={handleChange} className="w-full rounded px-2 py-1 bg-gray-100 dark:bg-gray-800" rows={2} />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white rounded py-1 mt-2">Save</button>
      {saved && <div className="text-green-500 text-xs mt-1">Saved!</div>}
    </form>
  );
} 