import { Product } from '../models/Product';
import { ERROR_MESSAGES } from '../constants/errorMessages';

function isDateEqual(date1: Date, date2: Date): boolean {
  return date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0];
}

function validateRequiredField(value?: string): string | null {
  return value?.toString().trim() ? null : ERROR_MESSAGES.REQUIRED_FIELD;
}

function validateLength(value: string, min: number, max: number, errorMessage: string): string | null {
  return value.length >= min && value.length <= max ? null : errorMessage;
}

export function validateNewProduct(
  id: string,
  name: string,
  description: string,
  logo: string,
  dateRelease: Date,
  dateRevision: Date,
  idExists: boolean
): Record<string, string> {
  const errors: Record<string, string> = {};

  errors.id = validateRequiredField(id) || validateLength(id, 3, 10, ERROR_MESSAGES.ID_LENGTH) || (idExists ? ERROR_MESSAGES.ID_INVALID : null) || '';

  errors.name = validateRequiredField(name) || validateLength(name, 5, 100, ERROR_MESSAGES.NAME_LENGTH) || '';
  errors.description = validateRequiredField(description) || validateLength(description, 10, 200, ERROR_MESSAGES.DESCRIPTION_LENGTH) || '';
  errors.logo = validateRequiredField(logo) || '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!dateRelease) {
    errors.dateRelease = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (dateRelease < today) {
    errors.dateRelease = ERROR_MESSAGES.RELEASE_DATE_INVALID;
  }

  if (!dateRevision) {
    errors.dateRevision = ERROR_MESSAGES.REQUIRED_FIELD;
  } else {
    const oneYearLater = new Date(dateRelease);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    if (!isDateEqual(dateRevision, oneYearLater)) {
      errors.dateRevision = ERROR_MESSAGES.REVISION_DATE_INVALID;
    }
  }

  Object.keys(errors).forEach((key) => {
    if (!errors[key]) {delete errors[key];}
  });

  return errors;
}

export function validateExistingProduct(product: Product): Record<string, string> {
  return validateNewProduct(
    product.id,
    product.name,
    product.description,
    product.logo,
    product.date_release,
    product.date_revision,
    false
  );
}
