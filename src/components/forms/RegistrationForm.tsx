import React, { useState } from 'react';
import { useNotification } from '../../hooks';
import { motion } from 'framer-motion';
import { Users, Target, MapPin, CheckCircle, Plus, Trash2 } from 'lucide-react';
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

// Updated roles based on the new form
const roles = [
  'Developer',
  'Designer',
  'Creative Lead',
  'Business Lead',
  'Legal/Policy',
  'Data Scientist',
  'Other',
];

// Countries list (keeping existing African countries)
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

interface RegistrationFormProps {
  onSubmit?: (data: RegistrationFormData) => Promise<void>;
  isLoading?: boolean;
  _initialChallenges?: string[];
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const { showError } = useNotification();
  const [selectedDeclarations, setSelectedDeclarations] = useState<string[]>(
    []
  );
  const { isMobile } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  const initialValues: Partial<RegistrationFormData> = {
    teamName: '',
    teamSize: 3,
    countryOfResidence: '',
    hackathonExperience: 'no',
    hackathonExperienceDetails: '',
    teamLeader: {
      name: '',
      email: '',
      phone: '',
      role: 'Developer',
      linkedin: '',
    },
    teamMembers: [],
    creativeIndustryChallenge: '',
    distributionChallenge: '',
    solutionVision: '',
    teamPositioning: '',
    allMembersAvailable: true,
    availabilityExplanation: '',
    hasDietaryRestrictions: false,
    dietaryNeeds: '',
    declarations: [],
    teamLeadSignature: '',
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleBlur,
    handleSubmit,
    setValue,
  } = useFormValidation({
    schema: registrationFormSchema,
    initialValues,
    onSubmit: async data => {
      const formData = {
        ...data,
        declarations: selectedDeclarations,
      };
      if (onSubmit) {
        await onSubmit(formData);
      }
    },
    onValidationError: errs => {
      showError('Please fix the highlighted errors before submitting.');
      // Scroll to the first field that has an error
      const firstKey = Object.keys(errs)[0];
      if (firstKey) {
        // IDs are the same strings used in validation paths (e.g. "teamName")
        const el = document.getElementById(firstKey);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (el as HTMLElement | null)?.focus?.(); // optional: set keyboard focus
        const errorNode = el?.parentElement?.querySelector('.form-error'); // <FormError/>
        if (errorNode) {
          errorNode.classList.add(
            'ring-2',
            'ring-red-500',
            'animate-pulse',
            'highlight-error'
          );
          setTimeout(() => {
            errorNode.classList.remove(
              'ring-2',
              'ring-red-500',
              'animate-pulse',
              'highlight-error'
            );
          }, 1800);
        }
      }
    },
  });

  const handleDeclarationToggle = (declaration: string) => {
    const updated = selectedDeclarations.includes(declaration)
      ? selectedDeclarations.filter(d => d !== declaration)
      : [...selectedDeclarations, declaration];
    setSelectedDeclarations(updated);
    setValue('declarations', updated);
  };

  const addTeamMember = () => {
    if (
      values.teamMembers &&
      values.teamMembers.length < (values.teamSize || 3) - 1
    ) {
      const newMember = {
        name: '',
        email: '',
        phone: '',
        role: 'Developer',
        linkedin: '',
      };
      setValue('teamMembers', [...(values.teamMembers || []), newMember]);
    }
  };

  const removeTeamMember = (index: number) => {
    if (values.teamMembers) {
      const updated = values.teamMembers.filter((_, i) => i !== index);
      setValue('teamMembers', updated);
    }
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    if (values.teamMembers) {
      const updated = [...values.teamMembers];
      updated[index] = { ...updated[index], [field]: value } as {
        name: string;
        email: string;
        phone: string;
        role: string;
        linkedin: string;
      };
      setValue('teamMembers', updated);
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
      {/* Section 1: Team Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 rounded-full p-2">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Section 1: Team Information
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Team Name"
            required
            error={touched.teamName ? errors.teamName : undefined}
            htmlFor="teamName"
          >
            <Input
              id="teamName"
              placeholder="Enter your team name"
              value={values.teamName || ''}
              onChange={e => setValue('teamName', e.target.value)}
              onBlur={() => handleBlur('teamName')}
            />
          </FormField>

          <FormField label="Team Size" required htmlFor="teamSize">
            <Select
              value={values.teamSize?.toString() || '3'}
              onValueChange={value => setValue('teamSize', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 members</SelectItem>
                <SelectItem value="4">4 members</SelectItem>
                <SelectItem value="5">5 members</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="Country of Residence"
            required
            htmlFor="countryOfResidence"
          >
            <Select
              value={values.countryOfResidence || ''}
              onValueChange={value => setValue('countryOfResidence', value)}
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
            label="Have any team members participated in a hackathon before?"
            required
            htmlFor="hackathonExperience"
          >
            <Select
              value={values.hackathonExperience || 'no'}
              onValueChange={value => setValue('hackathonExperience', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {values.hackathonExperience === 'yes' && (
          <FormField
            label="If yes, describe one project your team (or team members) previously worked on:"
            htmlFor="hackathonExperienceDetails"
            className="mt-6"
          >
            <Textarea
              id="hackathonExperienceDetails"
              placeholder="Describe the project briefly..."
              rows={3}
              value={values.hackathonExperienceDetails || ''}
              onChange={e =>
                setValue('hackathonExperienceDetails', e.target.value)
              }
            />
          </FormField>
        )}
      </div>

      {/* Section 2: Team Lead Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 rounded-full p-2">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Section 2: Team Lead Information
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Full Name (First, Middle, Last)"
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

          <FormField
            label="Phone Number (include country code)"
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

          <FormField label="LinkedIn Profile" htmlFor="teamLeader.linkedin">
            <Input
              id="teamLeader.linkedin"
              placeholder="https://linkedin.com/in/username (Optional)"
              value={values.teamLeader?.linkedin || ''}
              onChange={e =>
                setValue('teamLeader', {
                  ...values.teamLeader,
                  linkedin: e.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Role in Team" required htmlFor="teamLeader.role">
            <Select
              value={values.teamLeader?.role || 'Developer'}
              onValueChange={value =>
                setValue('teamLeader', { ...values.teamLeader, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
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
        </div>
      </div>

      {/* Section 3: Team Members Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 rounded-full p-2">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Section 3: Team Members Information
          </h2>
        </div>

        <p className="text-gray-600 mb-4">
          Add team members (repeat this section for each member)
        </p>

        {values.teamMembers &&
          values.teamMembers.map((member, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 mb-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">
                  Team Member {index + 1}
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeTeamMember(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Full Name"
                  required
                  htmlFor={`member-${index}-name`}
                >
                  <Input
                    id={`member-${index}-name`}
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
                  htmlFor={`member-${index}-email`}
                >
                  <Input
                    id={`member-${index}-email`}
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
                  htmlFor={`member-${index}-phone`}
                >
                  <Input
                    id={`member-${index}-phone`}
                    placeholder="Enter phone number"
                    value={member.phone}
                    onChange={e =>
                      updateTeamMember(index, 'phone', e.target.value)
                    }
                  />
                </FormField>

                <FormField
                  label="Role in Team"
                  required
                  htmlFor={`member-${index}-role`}
                >
                  <Select
                    value={member.role}
                    onValueChange={value =>
                      updateTeamMember(index, 'role', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                  label="LinkedIn Profile or Portfolio (Optional)"
                  htmlFor={`member-${index}-linkedin`}
                  className="md:col-span-2"
                >
                  <Input
                    id={`member-${index}-linkedin`}
                    placeholder="https://linkedin.com/in/username or portfolio URL"
                    value={member.linkedin}
                    onChange={e =>
                      updateTeamMember(index, 'linkedin', e.target.value)
                    }
                  />
                </FormField>
              </div>
            </div>
          ))}

        {(!values.teamMembers ||
          values.teamMembers.length < (values.teamSize || 3) - 1) && (
          <Button
            type="button"
            variant="outline"
            onClick={addTeamMember}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        )}
      </div>

      {/* Section 4: Idea Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-yellow-100 rounded-full p-2">
            <Target className="w-5 h-5 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Section 4: Idea Summary
          </h2>
        </div>

        <div className="space-y-6">
          <FormField
            label="What creative industry challenge are you most passionate about solving?"
            required
            htmlFor="creativeIndustryChallenge"
          >
            <Input
              id="creativeIndustryChallenge"
              placeholder="Briefly describe the challenge..."
              value={values.creativeIndustryChallenge || ''}
              onChange={e =>
                setValue('creativeIndustryChallenge', e.target.value)
              }
            />
          </FormField>

          <FormField
            label="Describe the distribution challenge you aim to tackle during the hackathon"
            required
            htmlFor="distributionChallenge"
          >
            <Textarea
              id="distributionChallenge"
              placeholder="Describe the challenge in detail... (Max 250 words)"
              rows={4}
              maxLength={250}
              value={values.distributionChallenge || ''}
              onChange={e => setValue('distributionChallenge', e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              {values.distributionChallenge?.length || 0}/250 words
            </p>
          </FormField>

          <FormField
            label="What solution do you envision your team building (even if it's an early idea)?"
            required
            htmlFor="solutionVision"
          >
            <Textarea
              id="solutionVision"
              placeholder="Describe your envisioned solution... (Max 250 words)"
              rows={4}
              maxLength={250}
              value={values.solutionVision || ''}
              onChange={e => setValue('solutionVision', e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              {values.solutionVision?.length || 0}/250 words
            </p>
          </FormField>

          <FormField
            label="What makes your team uniquely positioned to solve this?"
            required
            htmlFor="teamPositioning"
          >
            <Textarea
              id="teamPositioning"
              placeholder="Explain your team's unique position... (Max 150 words)"
              rows={3}
              maxLength={150}
              value={values.teamPositioning || ''}
              onChange={e => setValue('teamPositioning', e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              {values.teamPositioning?.length || 0}/150 words
            </p>
          </FormField>
        </div>
      </div>

      {/* Section 5: Logistics */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 rounded-full p-2">
            <MapPin className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Section 5: Logistics
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Will all team members be available to participate in-person in Lagos from Sept 16–19?"
            required
            htmlFor="allMembersAvailable"
          >
            <Select
              value={values.allMembersAvailable ? 'yes' : 'no'}
              onValueChange={value =>
                setValue('allMembersAvailable', value === 'yes')
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {!values.allMembersAvailable && (
            <FormField
              label="If No, explain:"
              required
              htmlFor="availabilityExplanation"
            >
              <Input
                id="availabilityExplanation"
                placeholder="Explain why some members cannot attend..."
                value={values.availabilityExplanation || ''}
                onChange={e =>
                  setValue('availabilityExplanation', e.target.value)
                }
              />
            </FormField>
          )}

          <FormField
            label="Do any of your team members have dietary restrictions?"
            required
            htmlFor="hasDietaryRestrictions"
          >
            <Select
              value={values.hasDietaryRestrictions ? 'yes' : 'no'}
              onValueChange={value =>
                setValue('hasDietaryRestrictions', value === 'yes')
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

          {values.hasDietaryRestrictions && (
            <FormField
              label="If Yes, list dietary needs:"
              required
              htmlFor="dietaryNeeds"
            >
              <Input
                id="dietaryNeeds"
                placeholder="List dietary restrictions..."
                value={values.dietaryNeeds || ''}
                onChange={e => setValue('dietaryNeeds', e.target.value)}
              />
            </FormField>
          )}
        </div>
      </div>

      {/* Section 6: Declaration & Consent */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 rounded-full p-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Section 6: Declaration & Consent
          </h2>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700 mb-4">
            By submitting this application, I confirm that:
          </p>

          {[
            'All information provided is accurate',
            'All team members are aged 18+',
            'Our team will abide by the rules of the ACM Hackathon 2025',
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
          label="Signature of Team Lead (Typed Full Name)"
          required
          htmlFor="teamLeadSignature"
          className="mt-6"
        >
          <Input
            id="teamLeadSignature"
            placeholder="Type your full name to confirm"
            value={values.teamLeadSignature || ''}
            onChange={e => setValue('teamLeadSignature', e.target.value)}
          />
        </FormField>

        {errors.declarations && (
          <p className="text-red-600 text-sm mt-2">{errors.declarations}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center items-start gap-4 pt-6">
        <Button
          type="submit"
          variant="outline"
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
        {/* inline “toast” – appears beside the button */}
        {!isValid && Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="bg-red-100 text-red-700 text-sm rounded px-3 py-2 shadow-sm"
          >
            <ul className="space-y-0.5">
              {Object.entries(errors).map(([field, msg]) => {
                // Convert camelCase / dot.path to Title Case for readability
                const label = field
                  .split('.')
                  .map(
                    part =>
                      part
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, c => c.toUpperCase()) // capitalise first
                  )
                  .join(' › ');
                return (
                  <li key={field}>
                    • <span className="font-medium">{label}</span>: {msg}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </motion.form>
  );
};

export default RegistrationForm;
