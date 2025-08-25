import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Target,
  MapPin,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { FormField } from '../ui/form-field';
import { useFormValidation } from '../../hooks/useFormValidation';
import {
  registrationFormSchema,
  type RegistrationFormData,
} from '../../lib/validations';
import { cn } from '../../lib/utils';

// Updated challenge areas based on the new form
const challengeAreas = [
  'Multi-layered Distribution Ecosystem',
  'Mobile-first & Low-bandwidth Optimized',
  'Secure Content Protection + Smart Contracts',
  'Built-in Monetization Tools',
  'AI-Powered Discovery Engine',
  'Integrated Community & Market Insights',
];

// Updated countries list (keeping existing African countries)
const countries = [
  'Algeria',
  'Angola',
  'Benin',
  'Botswana',
  'Burkina Faso',
  'Burundi',
  'Cameroon',
  'Cape Verde',
  'Central African Republic',
  'Chad',
  'Comoros',
  'Congo',
  'Democratic Republic of Congo',
  'Djibouti',
  'Egypt',
  'Equatorial Guinea',
  'Eritrea',
  'Eswatini',
  'Ethiopia',
  'Gabon',
  'Gambia',
  'Ghana',
  'Guinea',
  'Guinea-Bissau',
  'Ivory Coast',
  'Kenya',
  'Lesotho',
  'Liberia',
  'Libya',
  'Madagascar',
  'Malawi',
  'Mali',
  'Mauritania',
  'Mauritius',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Niger',
  'Nigeria',
  'Rwanda',
  'Sao Tome and Principe',
  'Senegal',
  'Seychelles',
  'Sierra Leone',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Sudan',
  'Tanzania',
  'Togo',
  'Tunisia',
  'Uganda',
  'Zambia',
  'Zimbabwe',
];

// Updated roles based on the new form
const roles = [
  'Software Developer',
  'UI/UX Designer',
  'Creative Strategist',
  'Business/Legal Analyst',
  'Data Scientist',
  'Other',
];

// Education levels
const educationLevels = [
  'High School',
  'Diploma',
  'Undergraduate',
  'Graduate',
  'Postgraduate',
  'Other',
];

// Occupations
const occupations = [
  'Student',
  'Developer',
  'Designer',
  'Entrepreneur',
  'Creative Professional',
  'Researcher',
  'Other',
];

// Technical skills
const technicalSkills = [
  'Frontend',
  'Backend',
  'Blockchain',
  'AI/ML',
  'Cloud',
  'Database',
  'Cybersecurity',
  'Mobile Dev',
  'Other',
];

// Creative/Industry skills
const creativeSkills = [
  'Film Production',
  'Music Production',
  'Digital Marketing',
  'Distribution',
  'Content Strategy',
  'Other',
];

// Dietary preferences
const dietaryPreferences = ['None', 'Vegetarian', 'Vegan', 'Halal', 'Other'];

interface RegistrationFormProps {
  onSubmit?: (data: RegistrationFormData) => Promise<void>;
  isLoading?: boolean;
  initialChallenges?: string[];
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  isLoading = false,
  initialChallenges = [],
}) => {
  const [selectedChallengeAreas, setSelectedChallengeAreas] =
    useState<string[]>(initialChallenges);
  const [selectedDeclarations, setSelectedDeclarations] = useState<string[]>(
    []
  );
  const [selectedTechnicalSkills, setSelectedTechnicalSkills] = useState<
    string[]
  >([]);
  const [selectedCreativeSkills, setSelectedCreativeSkills] = useState<
    string[]
  >([]);
  const { isMobile } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  const initialValues: Partial<RegistrationFormData> = {
    teamName: '',
    teamSize: 3,
    teamLeader: {
      name: '',
      email: '',
      phone: '',
      role: 'Software Developer',
      linkedin: '',
      country: '',
      nationality: '',
      age: 18,
      gender: '',
      dateOfBirth: '',
      stateCity: '',
      educationLevel: '',
      fieldOfStudy: '',
      occupation: '',
      organization: '',
      portfolio: '',
    },
    teamMembers: [],
    applicationType: 'Individual',
    teamRoles: [],
    teamIntroduction: '',
    projectTitle: '',
    ideaSummary: '',
    problemSolving: '',
    technology: '',
    alignment: '',
    hasPrototype: false,
    prototypeURL: '',
    projectRepo: '',
    challengeAreas: [],
    declarations: [],
    travelSupport: false,
    accommodationSupport: false,
    dietaryPreferences: '',
    accessibilityNeeds: '',
    hackathonExperience: 'no',
    hackathonExperienceDetails: '',
    motivation: '',
    digitalSignature: '',
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleSubmit,
    setValue,
  } = useFormValidation({
    schema: registrationFormSchema,
    initialValues,
    onSubmit: async data => {
      const formData = {
        ...data,
        challengeAreas: selectedChallengeAreas,
        declarations: selectedDeclarations,
        technicalSkills: selectedTechnicalSkills,
        creativeSkills: selectedCreativeSkills,
      };
      if (onSubmit) {
        await onSubmit(formData);
      }
    },
  });

  const handleChallengeAreaToggle = (area: string) => {
    const updated = selectedChallengeAreas.includes(area)
      ? selectedChallengeAreas.filter(a => a !== area)
      : [...selectedChallengeAreas, area];
    setSelectedChallengeAreas(updated);
    setValue('challengeAreas', updated);
  };

  const handleDeclarationToggle = (declaration: string) => {
    const updated = selectedDeclarations.includes(declaration)
      ? selectedDeclarations.filter(d => d !== declaration)
      : [...selectedDeclarations, declaration];
    setSelectedDeclarations(updated);
    setValue('declarations', updated);
  };

  const handleTechnicalSkillToggle = (skill: string) => {
    const updated = selectedTechnicalSkills.includes(skill)
      ? selectedTechnicalSkills.filter(s => s !== skill)
      : [...selectedTechnicalSkills, skill];
    setSelectedTechnicalSkills(updated);
  };

  const handleCreativeSkillToggle = (skill: string) => {
    const updated = selectedCreativeSkills.includes(skill)
      ? selectedCreativeSkills.filter(s => s !== skill)
      : [...selectedCreativeSkills, skill];
    setSelectedCreativeSkills(updated);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Section 1: Personal Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 rounded-full p-2">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Personal Information
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            required
            error={
              touched['teamLeader.name'] ? errors['teamLeader.name'] : undefined
            }
            htmlFor="teamLeader.name"
          >
            <Input
              id="teamLeader.name"
              placeholder="Enter your full name"
              value={values.teamLeader?.name || ''}
              onChange={e =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  name: e.target.value,
                })
              }
              onBlur={() => handleBlur('teamLeader.name')}
            />
          </FormField>

          <FormField label="Gender" required htmlFor="teamLeader.gender">
            <Select
              value={values.teamLeader?.gender || ''}
              onValueChange={value =>
                setValue('teamLeader', { ...values.teamLeader, gender: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Non-Binary">Non-Binary</SelectItem>
                <SelectItem value="Prefer not to say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="Date of Birth"
            required
            htmlFor="teamLeader.dateOfBirth"
          >
            <Input
              id="teamLeader.dateOfBirth"
              type="date"
              value={values.teamLeader?.dateOfBirth || ''}
              onChange={e =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  dateOfBirth: e.target.value,
                })
              }
            />
          </FormField>

          <FormField
            label="Nationality"
            required
            htmlFor="teamLeader.nationality"
          >
            <Select
              value={values.teamLeader?.nationality || ''}
              onValueChange={value =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  nationality: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="State/City of Residence"
            required
            htmlFor="teamLeader.stateCity"
          >
            <Input
              id="teamLeader.stateCity"
              placeholder="Enter your state or city"
              value={values.teamLeader?.stateCity || ''}
              onChange={e =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  stateCity: e.target.value,
                })
              }
            />
          </FormField>

          <FormField
            label="Phone Number (with country code)"
            required
            error={
              touched['teamLeader.phone']
                ? errors['teamLeader.phone']
                : undefined
            }
            htmlFor="teamLeader.phone"
          >
            <Input
              id="teamLeader.phone"
              placeholder="+234 123 456 7890"
              value={values.teamLeader?.phone || ''}
              onChange={e =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  phone: e.target.value,
                })
              }
              onBlur={() => handleBlur('teamLeader.phone')}
            />
          </FormField>

          <FormField
            label="Email Address"
            required
            error={
              touched['teamLeader.email']
                ? errors['teamLeader.email']
                : undefined
            }
            htmlFor="teamLeader.email"
          >
            <Input
              id="teamLeader.email"
              type="email"
              placeholder="Enter your email address"
              value={values.teamLeader?.email || ''}
              onChange={e =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  email: e.target.value,
                })
              }
              onBlur={() => handleBlur('teamLeader.email')}
            />
          </FormField>
        </div>
      </div>

      {/* Section 2: Academic & Professional Background */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 rounded-full p-2">
            <GraduationCap className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Academic & Professional Background
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Highest Education Level"
            required
            htmlFor="teamLeader.educationLevel"
          >
            <Select
              value={values.teamLeader?.educationLevel || ''}
              onValueChange={value =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  educationLevel: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                {educationLevels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="Field of Study / Specialization"
            required
            htmlFor="teamLeader.fieldOfStudy"
          >
            <Input
              id="teamLeader.fieldOfStudy"
              placeholder="e.g., Computer Science, Business, Arts"
              value={values.teamLeader?.fieldOfStudy || ''}
              onChange={e =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  fieldOfStudy: e.target.value,
                })
              }
            />
          </FormField>

          <FormField
            label="Current Occupation"
            required
            htmlFor="teamLeader.occupation"
          >
            <Select
              value={values.teamLeader?.occupation || ''}
              onValueChange={value =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  occupation: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select occupation" />
              </SelectTrigger>
              <SelectContent>
                {occupations.map(occupation => (
                  <SelectItem key={occupation} value={occupation}>
                    {occupation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="Organization/Institution (Optional)"
            htmlFor="teamLeader.organization"
          >
            <Input
              id="teamLeader.organization"
              placeholder="Enter organization or institution"
              value={values.teamLeader?.organization || ''}
              onChange={e =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  organization: e.target.value,
                })
              }
            />
          </FormField>

          <FormField
            label="Portfolio/LinkedIn/GitHub URL (Optional)"
            htmlFor="teamLeader.portfolio"
          >
            <Input
              id="teamLeader.portfolio"
              placeholder="https://linkedin.com/in/username"
              value={values.teamLeader?.portfolio || ''}
              onChange={e =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  portfolio: e.target.value,
                })
              }
            />
          </FormField>
        </div>
      </div>

      {/* Section 3: Team Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 rounded-full p-2">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Team Details</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Are you applying as"
            required
            htmlFor="applicationType"
          >
            <Select
              value={values.applicationType || 'Individual'}
              onValueChange={value => setValue('applicationType', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Individual">Individual</SelectItem>
                <SelectItem value="Team Representative">
                  Team Representative
                </SelectItem>
                <SelectItem value="Team Member">Team Member</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Team Name (if applicable)" htmlFor="teamName">
            <Input
              id="teamName"
              placeholder="Enter team name"
              value={values.teamName || ''}
              onChange={e => setValue('teamName', e.target.value)}
            />
          </FormField>

          <FormField label="Number of Team Members" required htmlFor="teamSize">
            <Input
              id="teamSize"
              type="number"
              min="3"
              max="5"
              value={values.teamSize || 3}
              onChange={e =>
                setValue('teamSize', parseInt(e.target.value) || 3)
              }
            />
          </FormField>

          <FormField label="Team Roles" required htmlFor="teamRoles">
            <div className="space-y-2">
              {roles.map(role => (
                <label key={role} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={values.teamRoles?.includes(role) || false}
                    onChange={e => {
                      const currentRoles = values.teamRoles || [];
                      if (e.target.checked) {
                        setValue('teamRoles', [...currentRoles, role]);
                      } else {
                        setValue(
                          'teamRoles',
                          currentRoles.filter(r => r !== role)
                        );
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{role}</span>
                </label>
              ))}
            </div>
          </FormField>
        </div>

        <FormField
          label="Brief Team Introduction (150 words max)"
          required
          htmlFor="teamIntroduction"
        >
          <Textarea
            id="teamIntroduction"
            placeholder="Describe your team's background, skills, and why you're participating..."
            rows={4}
            maxLength={150}
            value={values.teamIntroduction || ''}
            onChange={e => setValue('teamIntroduction', e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            {values.teamIntroduction?.length || 0}/150 words
          </p>
        </FormField>
      </div>

      {/* Section 4: Skills & Interest Areas */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-yellow-100 rounded-full p-2">
            <Target className="w-5 h-5 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Skills & Interest Areas
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField label="Primary Role" required htmlFor="teamLeader.role">
            <Select
              value={values.teamLeader?.role || ''}
              onValueChange={value =>
                setValue('teamLeader', { ...values.teamLeader, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select primary role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <div className="space-y-4">
            <FormField label="Technical Skills">
              <div className="grid grid-cols-2 gap-2">
                {technicalSkills.map(skill => (
                  <label key={skill} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedTechnicalSkills.includes(skill)}
                      onChange={() => handleTechnicalSkillToggle(skill)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </FormField>
          </div>

          <div className="space-y-4">
            <FormField label="Creative/Industry Skills">
              <div className="grid grid-cols-2 gap-2">
                {creativeSkills.map(skill => (
                  <label key={skill} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCreativeSkills.includes(skill)}
                      onChange={() => handleCreativeSkillToggle(skill)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </FormField>
          </div>
        </div>

        <div className="space-y-6 mt-6">
          <FormField
            label="Hackathon Problem Area of Interest"
            required
            htmlFor="challengeAreas"
          >
            <div className="grid md:grid-cols-2 gap-3">
              {challengeAreas.map(area => (
                <label
                  key={area}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedChallengeAreas.includes(area)}
                    onChange={() => handleChallengeAreaToggle(area)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{area}</span>
                </label>
              ))}
            </div>
          </FormField>

          <FormField
            label="Have you participated in a hackathon before?"
            required
            htmlFor="hackathonExperience"
          >
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="hackathonExperience"
                  value="yes"
                  checked={values.hackathonExperience === 'yes'}
                  onChange={e =>
                    setValue('hackathonExperience', e.target.value)
                  }
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="hackathonExperience"
                  value="no"
                  checked={values.hackathonExperience === 'no'}
                  onChange={e =>
                    setValue('hackathonExperience', e.target.value)
                  }
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
            {values.hackathonExperience === 'yes' && (
              <Textarea
                placeholder="Describe your hackathon experience briefly..."
                rows={3}
                className="mt-3"
                value={values.hackathonExperienceDetails || ''}
                onChange={e =>
                  setValue('hackathonExperienceDetails', e.target.value)
                }
              />
            )}
          </FormField>

          <FormField
            label="Why do you want to join ACM Hackathon 2025? (300 words max)"
            required
            htmlFor="motivation"
          >
            <Textarea
              id="motivation"
              placeholder="Explain your motivation for participating..."
              rows={4}
              maxLength={300}
              value={values.motivation || ''}
              onChange={e => setValue('motivation', e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              {values.motivation?.length || 0}/300 words
            </p>
          </FormField>
        </div>
      </div>

      {/* Section 5: Logistics & Support Needs */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 rounded-full p-2">
            <MapPin className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Logistics & Support Needs
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Do you require travel support?"
            required
            htmlFor="travelSupport"
          >
            <Select
              value={values.travelSupport ? 'yes' : 'no'}
              onValueChange={value =>
                setValue('travelSupport', value === 'yes')
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="Do you require accommodation support?"
            required
            htmlFor="accommodationSupport"
          >
            <Select
              value={values.accommodationSupport ? 'yes' : 'no'}
              onValueChange={value =>
                setValue('accommodationSupport', value === 'yes')
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Dietary Preferences" htmlFor="dietaryPreferences">
            <Select
              value={values.dietaryPreferences || ''}
              onValueChange={value => setValue('dietaryPreferences', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                {dietaryPreferences.map(pref => (
                  <SelectItem key={pref} value={pref}>
                    {pref}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="Accessibility Needs (Optional)"
            htmlFor="accessibilityNeeds"
          >
            <Textarea
              id="accessibilityNeeds"
              placeholder="Describe any accessibility requirements..."
              rows={3}
              value={values.accessibilityNeeds || ''}
              onChange={e => setValue('accessibilityNeeds', e.target.value)}
            />
          </FormField>
        </div>
      </div>

      {/* Section 6: Agreement & Consent */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 rounded-full p-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Agreement & Consent
          </h2>
        </div>

        <div className="space-y-4">
          {[
            'I confirm that the information provided is accurate.',
            'I agree to abide by the ACM Hackathon 2025 Code of Conduct.',
            'I consent to the use of my photos, videos, and project materials for ACM communications.',
          ].map(declaration => (
            <label
              key={declaration}
              className="flex items-start space-x-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedDeclarations.includes(declaration)}
                onChange={() => handleDeclarationToggle(declaration)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{declaration}</span>
            </label>
          ))}
        </div>

        <FormField
          label="Digital Signature (Full Name)"
          required
          htmlFor="digitalSignature"
          className="mt-6"
        >
          <Input
            id="digitalSignature"
            placeholder="Type your full name to confirm"
            value={values.digitalSignature || ''}
            onChange={e => setValue('digitalSignature', e.target.value)}
          />
        </FormField>

        {errors.declarations && (
          <p className="text-red-600 text-sm mt-2">{errors.declarations}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || isLoading}
          className={cn(
            'px-8 touch-manipulation',
            isTouchDevice ? 'min-h-[44px]' : '',
            isMobile ? 'w-full' : ''
          )}
        >
          {isSubmitting || isLoading
            ? 'Submitting...'
            : 'Complete Registration'}
        </Button>
      </div>
    </motion.form>
  );
};

export default RegistrationForm;
