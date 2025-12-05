export const validateForm = jest.fn((values: Record<string, string>) => {
  const errors: Record<string, string> = {};
  if (!values.email) errors.email = 'emailRequired';
  if (!values.password) errors.password = 'passwordRequired';
  if (!values.name) errors.name = 'nameRequired';
  return errors;
});

export const validateField = jest.fn();

export interface ValidationRules {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  custom?: (value: string) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRules;
}

