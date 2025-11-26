import React, { useState, useEffect } from 'react';
import { CVData } from '../types';
import { Plus, Trash2, Save, RotateCcw } from 'lucide-react';

interface CVDataEditorProps {
  initialData: CVData;
  onSave: (data: CVData) => void;
  onCancel?: () => void;
}

export const CVDataEditor: React.FC<CVDataEditorProps> = ({ initialData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState<CVData>(initialData);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setEditedData(initialData);
    setHasChanges(false);
  }, [initialData]);

  const handleChange = (section: keyof CVData, field: string, value: any) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleArrayItemChange = (section: 'workExperience' | 'education', index: number, field: string, value: string) => {
    setEditedData(prev => {
      const items = [...(prev[section] || [])];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, [section]: items };
    });
    setHasChanges(true);
  };

  const handleSkillsChange = (type: 'technical' | 'soft', value: string) => {
    const skills = value.split(',').map(s => s.trim()).filter(s => s);
    setEditedData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: skills
      }
    }));
    setHasChanges(true);
  };

  const addWorkExperience = () => {
    setEditedData(prev => ({
      ...prev,
      workExperience: [
        ...(prev.workExperience || []),
        { company: '', title: '', startDate: '', endDate: '', description: '' }
      ]
    }));
    setHasChanges(true);
  };

  const removeWorkExperience = (index: number) => {
    setEditedData(prev => ({
      ...prev,
      workExperience: prev.workExperience?.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  };

  const addEducation = () => {
    setEditedData(prev => ({
      ...prev,
      education: [
        ...(prev.education || []),
        { institution: '', degree: '', year: '' }
      ]
    }));
    setHasChanges(true);
  };

  const removeEducation = (index: number) => {
    setEditedData(prev => ({
      ...prev,
      education: prev.education?.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(editedData);
    setHasChanges(false);
  };

  const handleReset = () => {
    setEditedData(initialData);
    setHasChanges(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-4 space-y-6 max-h-[500px] overflow-y-auto">

        {/* Personal Info */}
        <section>
          <h4 className="text-sm font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2">Personal Information</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                value={editedData.personalInfo?.fullName || ''}
                onChange={(e) => handleChange('personalInfo', 'fullName', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
              <input
                type="email"
                value={editedData.personalInfo?.email || ''}
                onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Phone</label>
              <input
                type="tel"
                value={editedData.personalInfo?.phone || ''}
                onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">LinkedIn</label>
              <input
                type="url"
                value={editedData.personalInfo?.linkedin || ''}
                onChange={(e) => handleChange('personalInfo', 'linkedin', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Portfolio</label>
              <input
                type="url"
                value={editedData.personalInfo?.portfolio || ''}
                onChange={(e) => handleChange('personalInfo', 'portfolio', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2 flex-1">Work Experience</h4>
            <button
              onClick={addWorkExperience}
              className="ml-2 p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Add work experience"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {editedData.workExperience?.map((exp, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative">
                <button
                  onClick={() => removeWorkExperience(index)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="grid grid-cols-2 gap-2 pr-8">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleArrayItemChange('workExperience', index, 'company', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => handleArrayItemChange('workExperience', index, 'title', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleArrayItemChange('workExperience', index, 'startDate', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Jan 2020"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => handleArrayItemChange('workExperience', index, 'endDate', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Present"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleArrayItemChange('workExperience', index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2 flex-1">Education</h4>
            <button
              onClick={addEducation}
              className="ml-2 p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Add education"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {editedData.education?.map((edu, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative">
                <button
                  onClick={() => removeEducation(index)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="grid grid-cols-2 gap-2 pr-8">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleArrayItemChange('education', index, 'institution', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Year</label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => handleArrayItemChange('education', index, 'year', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., 2020"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h4 className="text-sm font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2">Skills</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Technical Skills</label>
              <input
                type="text"
                value={editedData.skills?.technical?.join(', ') || ''}
                onChange={(e) => handleSkillsChange('technical', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Separate with commas: Python, React, TypeScript"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Soft Skills</label>
              <input
                type="text"
                value={editedData.skills?.soft?.join(', ') || ''}
                onChange={(e) => handleSkillsChange('soft', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Separate with commas: Leadership, Communication"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-slate-200 p-4 bg-slate-50 rounded-b-xl flex gap-2">
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
            hasChanges
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
        <button
          onClick={handleReset}
          disabled={!hasChanges}
          className={`px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
            hasChanges
              ? 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};
