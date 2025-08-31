import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import { cn } from '../../lib/utils';
import type { HackathonForm, TeamMember } from '@/nServices/apiType';

// Team roles options
const TEAM_ROLES = [
  'Team Lead',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile Developer',
  'UI/UX Designer',
  'Product Designer',
  'Data Scientist',
  'Business Analyst',
  'Marketing Specialist',
  'Content Creator',
  'Project Manager',
];

// Challenge areas for the hackathon
const CHALLENGE_AREAS = [
  'Digital Trade Infrastructure',
  'Cross-Border Payment Solutions',
  'Supply Chain Transparency',
  'Digital Identity & Authentication',
  'E-commerce Platform Innovation',
  'Logistics & Delivery Optimization',
  'Financial Inclusion Technologies',
  'Marketplace Security & Trust',
  'Data Analytics & Insights',
  'Mobile-First Solutions',
];

interface NewApplicationFormProps {
  onSubmit?: (data: HackathonForm) => Promise<void>;
  isLoading?: boolean;
  _initialChallenges?: string[];
  successMessage?: string;
  isSuccess?: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const NewApplicationForm: React.FC<NewApplicationFormProps> = ({
  onSubmit,
  isLoading = false,
  _initialChallenges = [],
  successMessage,
  isSuccess = false,
}) => {
  const { isTouchDevice } = useTouchDevice();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Form state
  const [formData, setFormData] = useState<HackathonForm>({
    teamName: '',
    teamSize: '',
    countryOfResidence: '',
    hackathonExperience: '',
    hackathonExperienceDesc: '',
    teamLeaderFullName: '',
    teamLeaderPhone: '',
    teamLeaderEmail: '',
    teamLeaderLinkedIn: '',
    teamLeaderRole: '',
    teamMembers: [],
    challengeSolving:
      _initialChallenges.length > 0 ? _initialChallenges[0] : '',
    challengeAims: '',
    solutionEnvision: '',
    uniquelyPositioned: '',
    teamAvailability: '',
    teamAvailabilityDesc: '',
    dietaryRestrictions: '',
    dietaryRestrictionsDesc: '',
    declarations: [],
    teamLeadSignature: '',
  });

  const updateFormData = (field: keyof HackathonForm, value: unknown) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };

      // Auto-sync teamLeadSignature with teamLeaderFullName
      if (field === 'teamLeaderFullName') {
        newData.teamLeadSignature = value as string;
      }

      return newData;
    });

    // Mark field as touched
    setTouched(prev => ({ ...prev, [field]: true }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < 4) {
      const newMember: TeamMember = {
        teamMemberFullName: '',
        teamMemberEmail: '',
        teamMemberPhone: '',
        teamMemberRole: '',
        teamMemberLinkedIn: '',
      };
      updateFormData('teamMembers', [...formData.teamMembers, newMember]);
    }
  };

  const removeTeamMember = (index: number) => {
    const newMembers = formData.teamMembers.filter((_, i) => i !== index);
    updateFormData('teamMembers', newMembers);

    // Clear related errors
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach(key => {
      if (key.startsWith(`teamMember_${index}_`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  const updateTeamMember = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    const newMembers = [...formData.teamMembers];
    const currentMember = newMembers[index];
    if (!currentMember) return;

    const updatedMember = {
      ...currentMember,
      [field]: value,
    };
    newMembers[index] = updatedMember;
    updateFormData('teamMembers', newMembers);

    // Mark team member field as touched
    const touchedKey = `teamMember_${index}_${field}`;
    setTouched(prev => ({ ...prev, [touchedKey]: true }));

    // Clear team member field error
    const errorKey = `teamMember_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const handleDeclarationChange = (declaration: string, checked: boolean) => {
    const currentDeclarations = formData.declarations || [];
    let newDeclarations;

    if (checked) {
      newDeclarations = [...currentDeclarations, declaration];
    } else {
      newDeclarations = currentDeclarations.filter(d => d !== declaration);
    }

    updateFormData('declarations', newDeclarations);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Accept phone numbers with or without + prefix
    // Allow numbers starting with 0 as well (for local numbers)
    const phoneRegex = /^[\+]?[0-9][\d]{6,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateLinkedIn = (url: string): boolean => {
    const linkedinRegex =
      /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?$/;
    return linkedinRegex.test(url);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }

    if (!formData.teamSize) {
      newErrors.teamSize = 'Team size is required';
    }

    if (!formData.countryOfResidence.trim()) {
      newErrors.countryOfResidence = 'Country of residence is required';
    }

    if (!formData.hackathonExperience) {
      newErrors.hackathonExperience = 'Hackathon experience is required';
    }

    if (!formData.teamLeaderFullName.trim()) {
      newErrors.teamLeaderFullName = 'Team leader full name is required';
    }

    if (!formData.teamLeaderPhone.trim()) {
      newErrors.teamLeaderPhone = 'Team leader phone is required';
    } else if (!validatePhone(formData.teamLeaderPhone)) {
      newErrors.teamLeaderPhone = 'Please enter a valid phone number';
    }

    if (!formData.teamLeaderEmail.trim()) {
      newErrors.teamLeaderEmail = 'Team leader email is required';
    } else if (!validateEmail(formData.teamLeaderEmail)) {
      newErrors.teamLeaderEmail = 'Please enter a valid email address';
    }

    if (!formData.teamLeaderLinkedIn.trim()) {
      newErrors.teamLeaderLinkedIn = 'Team leader LinkedIn profile is required';
    } else if (!validateLinkedIn(formData.teamLeaderLinkedIn)) {
      newErrors.teamLeaderLinkedIn =
        'Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourprofile)';
    }

    if (!formData.teamLeaderRole) {
      newErrors.teamLeaderRole = 'Team leader role is required';
    }

    // Team members validation (based on team size)
    const expectedMembers = parseInt(formData.teamSize) - 1; // Excluding team leader
    if (expectedMembers > 0) {
      for (let i = 0; i < expectedMembers; i++) {
        const member = formData.teamMembers[i];
        if (!member) {
          newErrors[`teamMember_${i}_teamMemberFullName`] =
            'Team member name is required';
          newErrors[`teamMember_${i}_teamMemberEmail`] =
            'Team member email is required';
          newErrors[`teamMember_${i}_teamMemberPhone`] =
            'Team member phone is required';
          newErrors[`teamMember_${i}_teamMemberRole`] =
            'Team member role is required';
        } else {
          if (!member.teamMemberFullName.trim()) {
            newErrors[`teamMember_${i}_teamMemberFullName`] =
              'Team member name is required';
          }
          if (!member.teamMemberEmail.trim()) {
            newErrors[`teamMember_${i}_teamMemberEmail`] =
              'Team member email is required';
          } else if (!validateEmail(member.teamMemberEmail)) {
            newErrors[`teamMember_${i}_teamMemberEmail`] =
              'Please enter a valid email address';
          }
          if (!member.teamMemberPhone.trim()) {
            newErrors[`teamMember_${i}_teamMemberPhone`] =
              'Team member phone is required';
          } else if (!validatePhone(member.teamMemberPhone)) {
            newErrors[`teamMember_${i}_teamMemberPhone`] =
              'Please enter a valid phone number';
          }
          if (!member.teamMemberRole) {
            newErrors[`teamMember_${i}_teamMemberRole`] =
              'Team member role is required';
          }
          if (
            member.teamMemberLinkedIn &&
            !validateLinkedIn(member.teamMemberLinkedIn)
          ) {
            newErrors[`teamMember_${i}_teamMemberLinkedIn`] =
              'Please enter a valid LinkedIn profile URL';
          }
        }
      }
    }

    if (!formData.challengeSolving) {
      newErrors.challengeSolving = 'Challenge selection is required';
    }

    if (!formData.challengeAims.trim()) {
      newErrors.challengeAims = 'Challenge description is required';
    } else if (formData.challengeAims.length > 250) {
      newErrors.challengeAims =
        'Challenge description must be less than 250 characters';
    }

    if (!formData.solutionEnvision.trim()) {
      newErrors.solutionEnvision = 'Solution vision is required';
    } else if (formData.solutionEnvision.length > 250) {
      newErrors.solutionEnvision =
        'Solution vision must be less than 250 characters';
    }

    if (!formData.uniquelyPositioned.trim()) {
      newErrors.uniquelyPositioned = 'Team positioning is required';
    } else if (formData.uniquelyPositioned.length > 150) {
      newErrors.uniquelyPositioned =
        'Team positioning must be less than 150 characters';
    }

    if (!formData.teamAvailability) {
      newErrors.teamAvailability = 'Team availability is required';
    }

    if (!formData.dietaryRestrictions) {
      newErrors.dietaryRestrictions =
        'Dietary restrictions information is required';
    }

    if (!formData.declarations || formData.declarations.length === 0) {
      newErrors.declarations = 'All required declarations must be accepted';
    } else if (formData.declarations.length < 3) {
      newErrors.declarations = 'All required declarations must be accepted';
    }

    if (!formData.teamLeadSignature.trim()) {
      newErrors.teamLeadSignature = 'Digital signature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allFields = [
      'teamName',
      'teamSize',
      'countryOfResidence',
      'hackathonExperience',
      'teamLeaderFullName',
      'teamLeaderPhone',
      'teamLeaderEmail',
      'teamLeaderLinkedIn',
      'teamLeaderRole',
      'challengeSolving',
      'challengeAims',
      'solutionEnvision',
      'uniquelyPositioned',
      'teamAvailability',
      'dietaryRestrictions',
      'declarations',
      'teamLeadSignature',
    ];

    const touchedState: Record<string, boolean> = {};
    allFields.forEach(field => {
      touchedState[field] = true;
    });

    // Add team member fields to touched state
    const expectedMembers = parseInt(formData.teamSize || '0') - 1;
    for (let i = 0; i < expectedMembers; i++) {
      touchedState[`teamMember_${i}_teamMemberFullName`] = true;
      touchedState[`teamMember_${i}_teamMemberEmail`] = true;
      touchedState[`teamMember_${i}_teamMemberPhone`] = true;
      touchedState[`teamMember_${i}_teamMemberRole`] = true;
      touchedState[`teamMember_${i}_teamMemberLinkedIn`] = true;
    }

    setTouched(touchedState);

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.border-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      return;
    }

    if (!onSubmit) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const requiredDeclarations = [
    'I confirm that all information provided is accurate and complete.',
    'I agree to the terms and conditions of the ACM Hackathon 2025.',
    'I understand that participation is subject to acceptance and availability.',
  ];

  // Ensure we have the right number of team members based on team size
  const expectedMembers = parseInt(formData.teamSize || '0') - 1;
  const currentMembers = formData.teamMembers.length;

  // Auto-adjust team members when team size changes
  React.useEffect(() => {
    if (expectedMembers > currentMembers) {
      const membersToAdd = expectedMembers - currentMembers;
      const newMembers = [...formData.teamMembers];
      for (let i = 0; i < membersToAdd; i++) {
        newMembers.push({
          teamMemberFullName: '',
          teamMemberEmail: '',
          teamMemberPhone: '',
          teamMemberRole: '',
          teamMemberLinkedIn: '',
        });
      }
      setFormData(prev => ({ ...prev, teamMembers: newMembers }));
    } else if (expectedMembers < currentMembers) {
      const newMembers = formData.teamMembers.slice(0, expectedMembers);
      setFormData(prev => ({ ...prev, teamMembers: newMembers }));
    }
  }, [formData.teamSize]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-8" role="form">
        {/* Section 1: Team Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Team Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="teamName"
                className="text-sm font-medium text-gray-700"
              >
                Team Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teamName"
                value={formData.teamName}
                onChange={e => updateFormData('teamName', e.target.value)}
                className={cn('mt-1', errors.teamName && 'border-red-500')}
                placeholder="Enter your team name"
              />
              {errors.teamName && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.teamName}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="teamSize"
                className="text-sm font-medium text-gray-700"
              >
                Team Size <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.teamSize}
                onValueChange={value => updateFormData('teamSize', value)}
              >
                <SelectTrigger
                  className={cn('mt-1', errors.teamSize && 'border-red-500')}
                >
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 members</SelectItem>
                  <SelectItem value="4">4 members</SelectItem>
                  <SelectItem value="5">5 members</SelectItem>
                </SelectContent>
              </Select>
              {errors.teamSize && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.teamSize}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="countryOfResidence"
                className="text-sm font-medium text-gray-700"
              >
                Country of Residence <span className="text-red-500">*</span>
              </Label>
              <Input
                id="countryOfResidence"
                value={formData.countryOfResidence}
                onChange={e =>
                  updateFormData('countryOfResidence', e.target.value)
                }
                className={cn(
                  'mt-1',
                  errors.countryOfResidence && 'border-red-500'
                )}
                placeholder="Enter your country"
              />
              {errors.countryOfResidence && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.countryOfResidence}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="hackathonExperience"
                className="text-sm font-medium text-gray-700"
              >
                Previous Hackathon Experience{' '}
                <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.hackathonExperience}
                onValueChange={value =>
                  updateFormData('hackathonExperience', value)
                }
              >
                <SelectTrigger
                  className={cn(
                    'mt-1',
                    errors.hackathonExperience && 'border-red-500'
                  )}
                >
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">
                    Yes, I have participated before
                  </SelectItem>
                  <SelectItem value="No">
                    No, this is my first hackathon
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.hackathonExperience && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.hackathonExperience}
                </p>
              )}
            </div>

            {formData.hackathonExperience === 'Yes' && (
              <div className="md:col-span-2">
                <Label
                  htmlFor="hackathonExperienceDesc"
                  className="text-sm font-medium text-gray-700"
                >
                  Describe Your Previous Experience
                </Label>
                <Textarea
                  id="hackathonExperienceDesc"
                  value={formData.hackathonExperienceDesc}
                  onChange={e =>
                    updateFormData('hackathonExperienceDesc', e.target.value)
                  }
                  className="mt-1"
                  placeholder="Tell us about your previous hackathon experiences..."
                  rows={3}
                />
              </div>
            )}
          </div>
        </motion.section>

        {/* Section 2: Team Leader Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Team Leader Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="teamLeaderFullName"
                className="text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teamLeaderFullName"
                value={formData.teamLeaderFullName}
                onChange={e =>
                  updateFormData('teamLeaderFullName', e.target.value)
                }
                className={cn(
                  'mt-1',
                  errors.teamLeaderFullName && 'border-red-500'
                )}
                placeholder="Enter full name"
              />
              {errors.teamLeaderFullName && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.teamLeaderFullName}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="teamLeaderEmail"
                className="text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teamLeaderEmail"
                type="email"
                value={formData.teamLeaderEmail}
                onChange={e =>
                  updateFormData('teamLeaderEmail', e.target.value)
                }
                className={cn(
                  'mt-1',
                  errors.teamLeaderEmail && 'border-red-500'
                )}
                placeholder="Enter email address"
              />
              {errors.teamLeaderEmail && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.teamLeaderEmail}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="teamLeaderPhone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teamLeaderPhone"
                type="tel"
                value={formData.teamLeaderPhone}
                onChange={e =>
                  updateFormData('teamLeaderPhone', e.target.value)
                }
                className={cn(
                  'mt-1',
                  errors.teamLeaderPhone && 'border-red-500'
                )}
                placeholder="Enter phone number"
              />
              {errors.teamLeaderPhone && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.teamLeaderPhone}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="teamLeaderRole"
                className="text-sm font-medium text-gray-700"
              >
                Role <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.teamLeaderRole}
                onValueChange={value => updateFormData('teamLeaderRole', value)}
              >
                <SelectTrigger
                  className={cn(
                    'mt-1',
                    errors.teamLeaderRole && 'border-red-500'
                  )}
                >
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_ROLES.map(role => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.teamLeaderRole && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.teamLeaderRole}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label
                htmlFor="teamLeaderLinkedIn"
                className="text-sm font-medium text-gray-700"
              >
                LinkedIn Profile <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teamLeaderLinkedIn"
                type="url"
                value={formData.teamLeaderLinkedIn}
                onChange={e =>
                  updateFormData('teamLeaderLinkedIn', e.target.value)
                }
                className={cn(
                  'mt-1',
                  errors.teamLeaderLinkedIn && 'border-red-500'
                )}
                placeholder="https://linkedin.com/in/yourprofile"
              />
              {errors.teamLeaderLinkedIn && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.teamLeaderLinkedIn}
                </p>
              )}
            </div>
          </div>
        </motion.section>

        {/* Section 3: Team Members */}
        {expectedMembers > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Team Members ({expectedMembers} required)
                </h2>
              </div>
            </div>

            <AnimatePresence>
              {Array.from({ length: expectedMembers }, (_, index) => {
                const member = formData.teamMembers[index] || {
                  teamMemberFullName: '',
                  teamMemberEmail: '',
                  teamMemberPhone: '',
                  teamMemberRole: '',
                  teamMemberLinkedIn: '',
                };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 rounded-lg p-4 mb-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Team Member {index + 1}
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={member.teamMemberFullName}
                          onChange={e =>
                            updateTeamMember(
                              index,
                              'teamMemberFullName',
                              e.target.value
                            )
                          }
                          className={cn(
                            'mt-1',
                            errors[`teamMember_${index}_teamMemberFullName`] &&
                              'border-red-500'
                          )}
                          placeholder="Enter full name"
                        />
                        {errors[`teamMember_${index}_teamMemberFullName`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors[`teamMember_${index}_teamMemberFullName`]}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="email"
                          value={member.teamMemberEmail}
                          onChange={e =>
                            updateTeamMember(
                              index,
                              'teamMemberEmail',
                              e.target.value
                            )
                          }
                          className={cn(
                            'mt-1',
                            errors[`teamMember_${index}_teamMemberEmail`] &&
                              'border-red-500'
                          )}
                          placeholder="Enter email address"
                        />
                        {errors[`teamMember_${index}_teamMemberEmail`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors[`teamMember_${index}_teamMemberEmail`]}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="tel"
                          value={member.teamMemberPhone}
                          onChange={e =>
                            updateTeamMember(
                              index,
                              'teamMemberPhone',
                              e.target.value
                            )
                          }
                          className={cn(
                            'mt-1',
                            errors[`teamMember_${index}_teamMemberPhone`] &&
                              'border-red-500'
                          )}
                          placeholder="Enter phone number"
                        />
                        {errors[`teamMember_${index}_teamMemberPhone`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors[`teamMember_${index}_teamMemberPhone`]}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Role <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={member.teamMemberRole}
                          onValueChange={value =>
                            updateTeamMember(index, 'teamMemberRole', value)
                          }
                        >
                          <SelectTrigger
                            className={cn(
                              'mt-1',
                              errors[`teamMember_${index}_teamMemberRole`] &&
                                'border-red-500'
                            )}
                          >
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {TEAM_ROLES.map(role => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors[`teamMember_${index}_teamMemberRole`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors[`teamMember_${index}_teamMemberRole`]}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-gray-700">
                          LinkedIn Profile (Optional)
                        </Label>
                        <Input
                          type="url"
                          value={member.teamMemberLinkedIn}
                          onChange={e =>
                            updateTeamMember(
                              index,
                              'teamMemberLinkedIn',
                              e.target.value
                            )
                          }
                          className={cn(
                            'mt-1',
                            errors[`teamMember_${index}_teamMemberLinkedIn`] &&
                              'border-red-500'
                          )}
                          placeholder="https://linkedin.com/in/profile"
                        />
                        {errors[`teamMember_${index}_teamMemberLinkedIn`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors[`teamMember_${index}_teamMemberLinkedIn`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.section>
        )}

        {/* Section 4: Challenge and Solution Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Challenge & Solution
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <Label
                htmlFor="challengeSolving"
                className="text-sm font-medium text-gray-700"
              >
                What challenge are you solving?{' '}
                <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.challengeSolving}
                onValueChange={value =>
                  updateFormData('challengeSolving', value)
                }
              >
                <SelectTrigger
                  className={cn(
                    'mt-1',
                    errors.challengeSolving && 'border-red-500'
                  )}
                >
                  <SelectValue placeholder="Select a challenge area" />
                </SelectTrigger>
                <SelectContent>
                  {CHALLENGE_AREAS.map(challenge => (
                    <SelectItem key={challenge} value={challenge}>
                      {challenge}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.challengeSolving && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.challengeSolving}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="challengeAims"
                className="text-sm font-medium text-gray-700"
              >
                Describe the specific challenge and what you aim to achieve{' '}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="challengeAims"
                value={formData.challengeAims}
                onChange={e => updateFormData('challengeAims', e.target.value)}
                className={cn('mt-1', errors.challengeAims && 'border-red-500')}
                placeholder="Describe the challenge you're addressing and your goals..."
                rows={4}
              />
              {errors.challengeAims && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.challengeAims}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {formData.challengeAims.length}/250 characters
              </p>
            </div>

            <div>
              <Label
                htmlFor="solutionEnvision"
                className="text-sm font-medium text-gray-700"
              >
                What solution do you envision?{' '}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="solutionEnvision"
                value={formData.solutionEnvision}
                onChange={e =>
                  updateFormData('solutionEnvision', e.target.value)
                }
                className={cn(
                  'mt-1',
                  errors.solutionEnvision && 'border-red-500'
                )}
                placeholder="Describe your proposed solution approach..."
                rows={4}
              />
              {errors.solutionEnvision && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.solutionEnvision}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {formData.solutionEnvision.length}/250 characters
              </p>
            </div>

            <div>
              <Label
                htmlFor="uniquelyPositioned"
                className="text-sm font-medium text-gray-700"
              >
                Why is your team uniquely positioned to solve this?{' '}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="uniquelyPositioned"
                value={formData.uniquelyPositioned}
                onChange={e =>
                  updateFormData('uniquelyPositioned', e.target.value)
                }
                className={cn(
                  'mt-1',
                  errors.uniquelyPositioned && 'border-red-500'
                )}
                placeholder="Explain your team's unique strengths and capabilities..."
                rows={3}
              />
              {errors.uniquelyPositioned && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.uniquelyPositioned}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {formData.uniquelyPositioned.length}/150 characters
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Availability and Logistics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Availability & Logistics
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Are all team members available for the full hackathon duration
                (September 16-19, 2025)? <span className="text-red-500">*</span>
              </Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="availability-yes"
                    name="teamAvailability"
                    value="Yes"
                    checked={formData.teamAvailability === 'Yes'}
                    onChange={e =>
                      updateFormData('teamAvailability', e.target.value)
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="availability-yes" className="text-sm">
                    Yes, all members are available
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="availability-no"
                    name="teamAvailability"
                    value="No"
                    checked={formData.teamAvailability === 'No'}
                    onChange={e =>
                      updateFormData('teamAvailability', e.target.value)
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="availability-no" className="text-sm">
                    No, some members have conflicts
                  </Label>
                </div>
              </div>
              {errors.teamAvailability && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.teamAvailability}
                </p>
              )}
            </div>

            {formData.teamAvailability === 'No' && (
              <div>
                <Label
                  htmlFor="teamAvailabilityDesc"
                  className="text-sm font-medium text-gray-700"
                >
                  Please explain the availability conflicts
                </Label>
                <Textarea
                  id="teamAvailabilityDesc"
                  value={formData.teamAvailabilityDesc}
                  onChange={e =>
                    updateFormData('teamAvailabilityDesc', e.target.value)
                  }
                  className="mt-1"
                  placeholder="Describe any scheduling conflicts..."
                  rows={3}
                />
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Do any team members have dietary restrictions or special
                requirements? <span className="text-red-500">*</span>
              </Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="dietary-no"
                    name="dietaryRestrictions"
                    value="No"
                    checked={formData.dietaryRestrictions === 'No'}
                    onChange={e =>
                      updateFormData('dietaryRestrictions', e.target.value)
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="dietary-no" className="text-sm">
                    No dietary restrictions
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="dietary-yes"
                    name="dietaryRestrictions"
                    value="Yes"
                    checked={formData.dietaryRestrictions === 'Yes'}
                    onChange={e =>
                      updateFormData('dietaryRestrictions', e.target.value)
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="dietary-yes" className="text-sm">
                    Yes, we have dietary restrictions
                  </Label>
                </div>
              </div>
              {errors.dietaryRestrictions && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.dietaryRestrictions}
                </p>
              )}
            </div>

            {formData.dietaryRestrictions === 'Yes' && (
              <div>
                <Label
                  htmlFor="dietaryRestrictionsDesc"
                  className="text-sm font-medium text-gray-700"
                >
                  Please describe the dietary restrictions
                </Label>
                <Textarea
                  id="dietaryRestrictionsDesc"
                  value={formData.dietaryRestrictionsDesc}
                  onChange={e =>
                    updateFormData('dietaryRestrictionsDesc', e.target.value)
                  }
                  className="mt-1"
                  placeholder="Describe any dietary restrictions or special requirements..."
                  rows={3}
                />
              </div>
            )}
          </div>
        </motion.section>

        {/* Section 6: Declarations and Signature */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Declarations & Signature
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-4 block">
                Required Declarations <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-3">
                {requiredDeclarations.map((declaration, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Checkbox
                      id={`declaration-${index}`}
                      checked={formData.declarations.includes(declaration)}
                      onCheckedChange={checked =>
                        handleDeclarationChange(declaration, checked as boolean)
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor={`declaration-${index}`}
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      {declaration}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.declarations && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.declarations}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="teamLeadSignature"
                className="text-sm font-medium text-gray-700"
              >
                Digital Signature (Team Leader Full Name){' '}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teamLeadSignature"
                value={formData.teamLeadSignature}
                readOnly
                disabled
                className={cn(
                  'mt-1 bg-gray-50 cursor-not-allowed',
                  errors.teamLeadSignature && 'border-red-500'
                )}
                placeholder="Will auto-fill when you enter team leader name above"
              />
              {errors.teamLeadSignature && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.teamLeadSignature}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                This field automatically matches your team leader name. By submitting this form, you agree to electronically sign this application.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Success Message */}
        {isSuccess && successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Registration Successful! 🎉
                </h3>
                <p className="text-green-800 leading-relaxed">
                  {successMessage}
                </p>
                <div className="mt-4 p-3 bg-green-100 rounded-md border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>What's next?</strong> We'll review your application
                    and notify you of the selection results. Keep an eye on your
                    email for updates and further instructions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-center pt-6"
        >
          <Button
            type="submit"
            disabled={isSubmitting || isLoading || isSuccess}
            className={cn(
              'px-12 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all transform',
              isSuccess
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-xl hover:scale-105',
              isTouchDevice ? 'min-h-[44px]' : '',
              (isSubmitting || isLoading) && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isSubmitting || isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting Application...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Application Submitted Successfully
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit Application
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default NewApplicationForm;
