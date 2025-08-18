import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Upload, FileText, Users, Target } from 'lucide-react';
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
  type TeamMemberData,
} from '../../lib/validations';
import { cn } from '../../lib/utils';

const challengeAreas = [
  'Digital Trade Infrastructure',
  'Cross-border Payments',
  'Supply Chain Transparency',
  'Digital Identity & Authentication',
  'Trade Finance Innovation',
  'Regulatory Technology (RegTech)',
  'Sustainable Trade Solutions',
  'SME Trade Enablement',
];

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

const roles = [
  'Team Leader',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile Developer',
  'UI/UX Designer',
  'Product Manager',
  'Business Analyst',
  'Data Scientist',
  'DevOps Engineer',
  'Other',
];

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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { isMobile } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  const initialValues: Partial<RegistrationFormData> = {
    teamName: '',
    teamSize: 1,
    teamLeader: {
      name: '',
      email: '',
      phone: '',
      role: 'Team Leader',
      linkedin: '',
      country: '',
      nationality: '',
      age: 18,
      gender: '',
    },
    teamMembers: [],
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
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleSubmit,
    setValue,
    getFieldProps,
  } = useFormValidation({
    schema: registrationFormSchema,
    initialValues,
    onSubmit: async data => {
      const formData = {
        ...data,
        challengeAreas: selectedChallengeAreas,
        declarations: selectedDeclarations,
        fileUpload: uploadedFile || undefined,
      };
      if (onSubmit) {
        await onSubmit(formData);
      }
    },
  });

  const addTeamMember = () => {
    const currentMembers = values.teamMembers || [];
    if (currentMembers.length < 4) {
      const newMember: TeamMemberData = {
        name: '',
        email: '',
        phone: '',
        role: '',
        linkedin: '',
        country: '',
        nationality: '',
        age: 18,
        gender: '',
      };
      setValue('teamMembers', [...currentMembers, newMember]);
      setValue('teamSize', currentMembers.length + 2); // +1 for new member, +1 for team leader
    }
  };

  const removeTeamMember = (index: number) => {
    const currentMembers = values.teamMembers || [];
    const updatedMembers = currentMembers.filter((_, i) => i !== index);
    setValue('teamMembers', updatedMembers);
    setValue('teamSize', updatedMembers.length + 1); // +1 for team leader
  };

  const updateTeamMember = (
    index: number,
    field: keyof TeamMemberData,
    value: string | number
  ) => {
    const currentMembers = values.teamMembers || [];
    const updatedMembers = [...currentMembers];
    const currentMember = updatedMembers[index] || {
      name: '',
      email: '',
      phone: '',
      role: '',
      linkedin: '',
      country: '',
      nationality: '',
      age: 18,
      gender: '',
    };
    updatedMembers[index] = { ...currentMember, [field]: value };
    setValue('teamMembers', updatedMembers);
  };

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Team Information Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 rounded-full p-2">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <h2
            className={cn(
              'font-semibold text-gray-900',
              isMobile ? 'text-lg' : 'text-xl'
            )}
          >
            Team Information
          </h2>
        </div>

        <div
          className={cn(
            'grid gap-6',
            isMobile ? 'grid-cols-1' : 'md:grid-cols-2'
          )}
        >
          <FormField
            label="Team Name"
            required
            error={touched.teamName ? errors.teamName : undefined}
            htmlFor="teamName"
          >
            <Input
              id="teamName"
              placeholder="Enter your team name"
              {...getFieldProps('teamName')}
            />
          </FormField>

          <FormField
            label="Team Size"
            required
            error={touched.teamSize ? errors.teamSize : undefined}
            htmlFor="teamSize"
          >
            <Input
              id="teamSize"
              type="number"
              min="1"
              max="5"
              value={values.teamSize || 1}
              onChange={e =>
                setValue('teamSize', parseInt(e.target.value) || 1)
              }
              onBlur={() => handleBlur('teamSize')}
            />
          </FormField>
        </div>
      </div>

      {/* Team Leader Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border">
        <h3
          className={cn(
            'font-semibold text-gray-900 mb-6',
            isMobile ? 'text-base' : 'text-lg'
          )}
        >
          Team Leader Information
        </h3>

        <div
          className={cn(
            'grid gap-6',
            isMobile ? 'grid-cols-1' : 'md:grid-cols-2'
          )}
        >
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
              placeholder="Enter full name"
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
              placeholder="Enter email address"
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

          <FormField
            label="Phone Number"
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
              placeholder="Enter phone number"
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
            label="Role"
            required
            error={
              touched['teamLeader.role'] ? errors['teamLeader.role'] : undefined
            }
            htmlFor="teamLeader.role"
          >
            <Select
              value={values.teamLeader?.role || 'Team Leader'}
              onValueChange={value =>
                setValue('teamLeader', { ...values.teamLeader, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
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

          <FormField
            label="Country"
            required
            error={
              touched['teamLeader.country']
                ? errors['teamLeader.country']
                : undefined
            }
            htmlFor="teamLeader.country"
          >
            <Select
              value={values.teamLeader?.country || ''}
              onValueChange={value =>
                setValue('teamLeader', { ...values.teamLeader, country: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
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
            label="Nationality"
            required
            error={
              touched['teamLeader.nationality']
                ? errors['teamLeader.nationality']
                : undefined
            }
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
            label="Age"
            required
            error={
              touched['teamLeader.age'] ? errors['teamLeader.age'] : undefined
            }
            htmlFor="teamLeader.age"
          >
            <Input
              id="teamLeader.age"
              type="number"
              min="16"
              max="100"
              value={values.teamLeader?.age || 18}
              onChange={e =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  age: parseInt(e.target.value) || 18,
                })
              }
              onBlur={() => handleBlur('teamLeader.age')}
            />
          </FormField>

          <FormField
            label="LinkedIn Profile (Optional)"
            error={
              touched['teamLeader.linkedin']
                ? errors['teamLeader.linkedin']
                : undefined
            }
            htmlFor="teamLeader.linkedin"
          >
            <Input
              id="teamLeader.linkedin"
              placeholder="https://linkedin.com/in/username"
              value={values.teamLeader?.linkedin || ''}
              onChange={e =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  linkedin: e.target.value,
                })
              }
              onBlur={() => handleBlur('teamLeader.linkedin')}
            />
          </FormField>
        </div>
      </div>

      {/* Team Members Section */}
      {(values.teamMembers?.length || 0) > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Team Members
            </h3>
            <Button
              type="button"
              variant="outline"
              size={isMobile ? 'default' : 'sm'}
              onClick={addTeamMember}
              disabled={(values.teamMembers?.length || 0) >= 4}
              className={cn(
                'touch-manipulation',
                isTouchDevice ? 'min-h-[44px]' : ''
              )}
            >
              <Plus className="w-4 h-4" />
              Add Member
            </Button>
          </div>

          <div className="space-y-6">
            {values.teamMembers?.map((member, index) => (
              <div key={index} className="border rounded-lg p-4 relative">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Team Member {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="outline"
                    size={isMobile ? 'default' : 'sm'}
                    onClick={() => removeTeamMember(index)}
                    className={cn(
                      'touch-manipulation',
                      isTouchDevice ? 'min-h-[44px]' : ''
                    )}
                  >
                    <Minus className="w-4 h-4" />
                    Remove
                  </Button>
                </div>

                <div
                  className={cn(
                    'grid gap-4',
                    isMobile ? 'grid-cols-1' : 'md:grid-cols-2'
                  )}
                >
                  <FormField
                    label="Full Name"
                    required
                    htmlFor={`teamMember.${index}.name`}
                  >
                    <Input
                      id={`teamMember.${index}.name`}
                      placeholder="Enter full name"
                      value={member.name}
                      onChange={e =>
                        updateTeamMember(index, 'name', e.target.value)
                      }
                    />
                  </FormField>

                  <FormField
                    label="Email Address"
                    required
                    htmlFor={`teamMember.${index}.email`}
                  >
                    <Input
                      id={`teamMember.${index}.email`}
                      type="email"
                      placeholder="Enter email address"
                      value={member.email}
                      onChange={e =>
                        updateTeamMember(index, 'email', e.target.value)
                      }
                    />
                  </FormField>

                  <FormField
                    label="Phone Number"
                    required
                    htmlFor={`teamMember.${index}.phone`}
                  >
                    <Input
                      id={`teamMember.${index}.phone`}
                      placeholder="Enter phone number"
                      value={member.phone}
                      onChange={e =>
                        updateTeamMember(index, 'phone', e.target.value)
                      }
                    />
                  </FormField>

                  <FormField
                    label="Role"
                    required
                    htmlFor={`teamMember.${index}.role`}
                  >
                    <Select
                      value={member.role}
                      onValueChange={value =>
                        updateTeamMember(index, 'role', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
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

                  <FormField
                    label="Country"
                    required
                    htmlFor={`teamMember.${index}.country`}
                  >
                    <Select
                      value={member.country}
                      onValueChange={value =>
                        updateTeamMember(index, 'country', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
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
                    label="Age"
                    required
                    htmlFor={`teamMember.${index}.age`}
                  >
                    <Input
                      id={`teamMember.${index}.age`}
                      type="number"
                      min="16"
                      max="100"
                      value={member.age}
                      onChange={e =>
                        updateTeamMember(
                          index,
                          'age',
                          parseInt(e.target.value) || 18
                        )
                      }
                    />
                  </FormField>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Team Member Button */}
      {(values.teamMembers?.length || 0) === 0 && (
        <div className="text-center">
          <Button
            type="button"
            variant="outline"
            onClick={addTeamMember}
            disabled={(values.teamMembers?.length || 0) >= 4}
          >
            <Plus className="w-4 h-4" />
            Add Team Member
          </Button>
        </div>
      )}

      {/* Project Information Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 rounded-full p-2">
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Project Information
          </h2>
        </div>

        <div className="space-y-6">
          <FormField
            label="Project Title"
            required
            error={touched.projectTitle ? errors.projectTitle : undefined}
            htmlFor="projectTitle"
          >
            <Input
              id="projectTitle"
              placeholder="Enter your project title"
              {...getFieldProps('projectTitle')}
            />
          </FormField>

          <FormField
            label="Idea Summary"
            required
            error={touched.ideaSummary ? errors.ideaSummary : undefined}
            htmlFor="ideaSummary"
          >
            <Textarea
              id="ideaSummary"
              placeholder="Provide a brief summary of your project idea (minimum 50 characters)"
              rows={4}
              {...getFieldProps('ideaSummary')}
            />
          </FormField>

          <FormField
            label="Problem Solving"
            required
            error={touched.problemSolving ? errors.problemSolving : undefined}
            htmlFor="problemSolving"
          >
            <Textarea
              id="problemSolving"
              placeholder="Describe the problem your project solves (minimum 50 characters)"
              rows={4}
              {...getFieldProps('problemSolving')}
            />
          </FormField>

          <FormField
            label="Technology Stack"
            required
            error={touched.technology ? errors.technology : undefined}
            htmlFor="technology"
          >
            <Textarea
              id="technology"
              placeholder="Describe the technologies you plan to use (minimum 20 characters)"
              rows={3}
              {...getFieldProps('technology')}
            />
          </FormField>

          <FormField
            label="ACM Alignment"
            required
            error={touched.alignment ? errors.alignment : undefined}
            htmlFor="alignment"
          >
            <Textarea
              id="alignment"
              placeholder="Explain how your project aligns with ACM Hackathon objectives (minimum 30 characters)"
              rows={3}
              {...getFieldProps('alignment')}
            />
          </FormField>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Do you have a prototype?" htmlFor="hasPrototype">
              <Select
                value={values.hasPrototype ? 'yes' : 'no'}
                onValueChange={value =>
                  setValue('hasPrototype', value === 'yes')
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

            {values.hasPrototype && (
              <FormField
                label="Prototype URL"
                error={touched.prototypeURL ? errors.prototypeURL : undefined}
                htmlFor="prototypeURL"
              >
                <Input
                  id="prototypeURL"
                  placeholder="https://your-prototype-url.com"
                  {...getFieldProps('prototypeURL')}
                />
              </FormField>
            )}
          </div>

          <FormField
            label="Project Repository (Optional)"
            error={touched.projectRepo ? errors.projectRepo : undefined}
            htmlFor="projectRepo"
          >
            <Input
              id="projectRepo"
              placeholder="https://github.com/username/repository"
              {...getFieldProps('projectRepo')}
            />
          </FormField>
        </div>
      </div>

      {/* Challenge Areas Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Challenge Areas
        </h3>
        <p className="text-gray-600 mb-6">
          Select the challenge areas your project addresses (select at least
          one):
        </p>

        <div
          className={cn(
            'grid gap-3',
            isMobile ? 'grid-cols-1' : 'md:grid-cols-2'
          )}
        >
          {challengeAreas.map(area => (
            <label
              key={area}
              className={cn(
                'flex items-center space-x-3 cursor-pointer touch-manipulation',
                isTouchDevice ? 'min-h-[44px] py-2' : ''
              )}
            >
              <input
                type="checkbox"
                checked={selectedChallengeAreas.includes(area)}
                onChange={() => handleChallengeAreaToggle(area)}
                className={cn(
                  'rounded border-gray-300 text-blue-600 focus:ring-blue-500',
                  isTouchDevice ? 'w-5 h-5' : 'w-4 h-4'
                )}
              />
              <span
                className={cn(
                  'text-gray-700',
                  isMobile ? 'text-sm' : 'text-sm'
                )}
              >
                {area}
              </span>
            </label>
          ))}
        </div>

        {errors.challengeAreas && (
          <p className="text-red-600 text-sm mt-2">{errors.challengeAreas}</p>
        )}
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-100 rounded-full p-2">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Supporting Documents
          </h3>
        </div>

        <p className="text-gray-600 mb-4">
          Upload any supporting documents (optional):
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            className="hidden"
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">
              {uploadedFile
                ? uploadedFile.name
                : 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PDF, DOC, DOCX, PPT, PPTX (max 10MB)
            </p>
          </label>
        </div>
      </div>

      {/* Declarations Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Declarations
        </h3>

        <div className="space-y-4">
          {[
            'I confirm that all information provided is accurate and complete',
            'I agree to the terms and conditions of the hackathon',
            'I consent to the processing of my personal data for hackathon purposes',
            'I understand that participation is subject to final approval',
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
          {isSubmitting || isLoading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </motion.form>
  );
};

export default RegistrationForm;
