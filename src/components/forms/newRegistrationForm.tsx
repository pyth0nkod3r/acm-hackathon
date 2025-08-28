import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Trash2,
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

interface NewRegistrationFormProps {
  onSubmit?: (data: HackathonForm) => Promise<void>;
  isLoading?: boolean;
  _initialChallenges?: string[];
}

const NewRegistrationForm: React.FC<NewRegistrationFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const { isTouchDevice } = useTouchDevice();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState<HackathonForm>({
    teamName: '',
    teamSize: '3',
    countryOfResidence: '',
    hackathonExperience: 'No',
    hackathonExperienceDesc: '',
    teamLeaderFullName: '',
    teamLeaderPhone: '',
    teamLeaderEmail: '',
    teamLeaderLinkedIn: '',
    teamLeaderRole: '',
    teamMembers: [],
    challengeSolving: '',
    challengeAims: '',
    solutionEnvision: '',
    uniquelyPositioned: '',
    teamAvailability: 'Yes',
    teamAvailabilityDesc: '',
    dietaryRestrictions: 'No',
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

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < 4) {
      // Max 5 total (1 leader + 4 members)
      const newMember = {
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
      teamMemberFullName: currentMember.teamMemberFullName,
      teamMemberEmail: currentMember.teamMemberEmail,
      teamMemberPhone: currentMember.teamMemberPhone,
      teamMemberRole: currentMember.teamMemberRole,
      teamMemberLinkedIn: currentMember.teamMemberLinkedIn,
      [field]: value,
    };
    newMembers[index] = updatedMember;
    updateFormData('teamMembers', newMembers);
  };

  const handleDeclarationChange = (declaration: string, checked: boolean) => {
    const currentDeclarations = formData.declarations || [];
    if (checked) {
      updateFormData('declarations', [...currentDeclarations, declaration]);
    } else {
      updateFormData(
        'declarations',
        currentDeclarations.filter(d => d !== declaration)
      );
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required field validations
    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
    if (!formData.countryOfResidence.trim())
      newErrors.countryOfResidence = 'Country is required';
    if (!formData.teamLeaderFullName.trim())
      newErrors.teamLeaderFullName = 'Team leader name is required';
    if (!formData.teamLeaderEmail.trim())
      newErrors.teamLeaderEmail = 'Team leader email is required';
    if (!formData.teamLeaderPhone.trim())
      newErrors.teamLeaderPhone = 'Team leader phone is required';
    if (!formData.teamLeaderRole.trim())
      newErrors.teamLeaderRole = 'Team leader role is required';
    if (!formData.challengeSolving.trim())
      newErrors.challengeSolving = 'Challenge selection is required';
    if (!formData.challengeAims.trim())
      newErrors.challengeAims = 'Challenge description is required';
    if (!formData.solutionEnvision.trim())
      newErrors.solutionEnvision = 'Solution vision is required';
    if (!formData.uniquelyPositioned.trim())
      newErrors.uniquelyPositioned = 'Team positioning is required';
    if (!formData.teamLeadSignature.trim())
      newErrors.teamLeadSignature = 'Digital signature is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      formData.teamLeaderEmail &&
      !emailRegex.test(formData.teamLeaderEmail)
    ) {
      newErrors.teamLeaderEmail = 'Please enter a valid email address';
    }

    // Declarations validation
    if (formData.declarations.length < 3) {
      newErrors.declarations = 'All required declarations must be accepted';
    }

    // Character limits
    if (formData.challengeAims.length > 250) {
      newErrors.challengeAims =
        'Challenge description must be less than 250 characters';
    }
    if (formData.solutionEnvision.length > 250) {
      newErrors.solutionEnvision =
        'Solution vision must be less than 250 characters';
    }
    if (formData.uniquelyPositioned.length > 150) {
      newErrors.uniquelyPositioned =
        'Team positioning must be less than 150 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
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
                Team Name *
              </Label>
              <Input
                id="teamName"
                value={formData.teamName}
                onChange={e => updateFormData('teamName', e.target.value)}
                className={cn('mt-1', errors.teamName && 'border-red-500')}
                placeholder="Enter your team name"
              />
              {errors.teamName && (
                <p className="mt-1 text-sm text-red-600">{errors.teamName}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="teamSize"
                className="text-sm font-medium text-gray-700"
              >
                Team Size *
              </Label>
              <Select
                value={formData.teamSize}
                onValueChange={value => updateFormData('teamSize', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 members</SelectItem>
                  <SelectItem value="4">4 members</SelectItem>
                  <SelectItem value="5">5 members</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="countryOfResidence"
                className="text-sm font-medium text-gray-700"
              >
                Country of Residence *
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.countryOfResidence}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="hackathonExperience"
                className="text-sm font-medium text-gray-700"
              >
                Previous Hackathon Experience *
              </Label>
              <Select
                value={formData.hackathonExperience}
                onValueChange={value =>
                  updateFormData('hackathonExperience', value)
                }
              >
                <SelectTrigger className="mt-1">
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
                Full Name *
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.teamLeaderFullName}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="teamLeaderEmail"
                className="text-sm font-medium text-gray-700"
              >
                Email Address *
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.teamLeaderEmail}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="teamLeaderPhone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number *
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.teamLeaderPhone}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="teamLeaderRole"
                className="text-sm font-medium text-gray-700"
              >
                Role *
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.teamLeaderRole}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label
                htmlFor="teamLeaderLinkedIn"
                className="text-sm font-medium text-gray-700"
              >
                LinkedIn Profile (Optional)
              </Label>
              <Input
                id="teamLeaderLinkedIn"
                type="url"
                value={formData.teamLeaderLinkedIn}
                onChange={e =>
                  updateFormData('teamLeaderLinkedIn', e.target.value)
                }
                className="mt-1"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>
        </motion.section>
        {/* Section 3: Team Members */}
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
                Team Members
              </h2>
            </div>
            {formData.teamMembers.length < 4 && (
              <Button
                type="button"
                onClick={addTeamMember}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </Button>
            )}
          </div>

          <AnimatePresence>
            {formData.teamMembers.map((member, index) => (
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
                  <Button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Full Name *
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
                      className="mt-1"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Email Address *
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
                      className="mt-1"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Phone Number *
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
                      className="mt-1"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Role *
                    </Label>
                    <Select
                      value={member.teamMemberRole}
                      onValueChange={value =>
                        updateTeamMember(index, 'teamMemberRole', value)
                      }
                    >
                      <SelectTrigger className="mt-1">
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
                      className="mt-1"
                      placeholder="https://linkedin.com/in/profile"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {formData.teamMembers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>
                No team members added yet. Click "Add Member" to get started.
              </p>
            </div>
          )}
        </motion.section>{' '}
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
                What challenge are you solving? *
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.challengeSolving}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="challengeAims"
                className="text-sm font-medium text-gray-700"
              >
                Describe the specific challenge and what you aim to achieve *
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
                <p className="mt-1 text-sm text-red-600">
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
                What solution do you envision? *
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
                <p className="mt-1 text-sm text-red-600">
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
                Why is your team uniquely positioned to solve this? *
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
                <p className="mt-1 text-sm text-red-600">
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
                (September 16-19, 2025)? *
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
                  <Label
                    htmlFor="availability-yes"
                    className="text-sm text-gray-700"
                  >
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
                  <Label
                    htmlFor="availability-no"
                    className="text-sm text-gray-700"
                  >
                    No, some members have conflicts
                  </Label>
                </div>
              </div>
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
                  placeholder="Describe any scheduling conflicts or limitations..."
                  rows={3}
                />
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Do any team members have dietary restrictions? *
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
                  <Label htmlFor="dietary-no" className="text-sm text-gray-700">
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
                  <Label
                    htmlFor="dietary-yes"
                    className="text-sm text-gray-700"
                  >
                    Yes, we have dietary restrictions
                  </Label>
                </div>
              </div>
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
                  placeholder="Describe any dietary restrictions, allergies, or preferences..."
                  rows={3}
                />
              </div>
            )}
          </div>
        </motion.section>
        {/* Section 6: Declarations and Consent */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Declarations & Consent
            </h2>
          </div>

          <div className="space-y-4">
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

            {errors.declarations && (
              <p className="text-sm text-red-600">{errors.declarations}</p>
            )}
          </div>

          <div className="mt-6">
            <Label
              htmlFor="teamLeadSignature"
              className="text-sm font-medium text-gray-700"
            >
              Team Lead Digital Signature *
            </Label>
            <Input
              id="teamLeadSignature"
              value={formData.teamLeadSignature}
              onChange={e =>
                updateFormData('teamLeadSignature', e.target.value)
              }
              className={cn(
                'mt-1',
                errors.teamLeadSignature && 'border-red-500'
              )}
              placeholder="Type your full name as digital signature"
              readOnly
            />
            {errors.teamLeadSignature && (
              <p className="mt-1 text-sm text-red-600">
                {errors.teamLeadSignature}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              By typing your name, you confirm that you are authorized to submit
              this application on behalf of your team.
            </p>
          </div>
        </motion.section>
        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-center pt-6"
        >
          <Button
            type="submit"
            disabled={isLoading || isSubmitting}
            className={cn(
              'px-8 py-3 text-lg font-semibold',
              isTouchDevice && 'min-h-[48px] min-w-[120px]'
            )}
          >
            {isLoading || isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default NewRegistrationForm;
