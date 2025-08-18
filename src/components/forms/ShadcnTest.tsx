import React, { useState } from 'react';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  FormField,
  FormMessage,
} from '@/components/ui';

export const ShadcnTest: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">shadcn/ui Components Test</h2>
        <p className="text-muted-foreground">
          Testing basic component functionality
        </p>
      </div>

      <div className="space-y-4">
        <FormField label="Input Field" htmlFor="test-input">
          <Input
            id="test-input"
            placeholder="Enter some text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </FormField>

        <FormField label="Select Field" htmlFor="test-select">
          <Select value={selectValue} onValueChange={setSelectValue}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Textarea Field" htmlFor="test-textarea">
          <Textarea
            id="test-textarea"
            placeholder="Enter a longer message"
            value={textareaValue}
            onChange={e => setTextareaValue(e.target.value)}
            rows={3}
          />
        </FormField>

        <div className="flex gap-2">
          <Button variant="default">Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
        </div>

        <FormMessage
          type="success"
          message="All shadcn/ui components are working correctly!"
        />
      </div>

      <div className="text-xs text-muted-foreground">
        <p>Current Values:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Input: {inputValue || 'empty'}</li>
          <li>Select: {selectValue || 'none selected'}</li>
          <li>Textarea: {textareaValue || 'empty'}</li>
        </ul>
      </div>
    </div>
  );
};
