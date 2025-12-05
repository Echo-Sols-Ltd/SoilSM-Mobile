import {TFunction} from 'react-i18next';

export interface ValidationRules {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  custom?: (value: string) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRules;
}

export const validateField = (
  value: string,
  rules: ValidationRules,
  t: TFunction,
  fieldName?: string
): string | null => {
  if (rules.required && !value.trim()) {
    return fieldName ? t(`${fieldName}Required`) : t('fieldRequired');
  }
  if (rules.email && value && !/\S+@\S+\.\S+/.test(value)) {
    return t('invalidEmail');
  }
  if (rules.minLength && value.length < rules.minLength) {
    return t('passwordMinLength');
  }
  if (rules.custom) {
    return rules.custom(value);
  }
  return null;
};

export const validateForm = (
  values: Record<string, string>,
  schema: ValidationSchema,
  t: TFunction
): Record<string, string> => {
  const errors: Record<string, string> = {};
  Object.keys(schema).forEach(key => {
    const error = validateField(values[key] || '', schema[key], t, key);
    if (error) {
      errors[key] = error;
    }
  });
  return errors;
};

