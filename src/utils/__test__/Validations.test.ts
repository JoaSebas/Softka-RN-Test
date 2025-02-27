import { validateNewProduct, validateExistingProduct } from '../Validations';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import { Product } from '../../models/Product';

describe('Validations', () => {
  it('should return an error if ID is empty', () => {
    const errors = validateNewProduct('', 'Product', 'Valid description', 'logo.png', new Date(), new Date(), false);
    expect(errors.id).toBe(ERROR_MESSAGES.REQUIRED_FIELD);
  });

  it('should return an error if ID is too short', () => {
    const errors = validateNewProduct('12', 'Product', 'Valid description', 'logo.png', new Date(), new Date(), false);
    expect(errors.id).toBe(ERROR_MESSAGES.ID_LENGTH);
  });

  it('should return an error if ID already exists', () => {
    const errors = validateNewProduct('1234', 'Product', 'Valid description', 'logo.png', new Date(), new Date(), true);
    expect(errors.id).toBe(ERROR_MESSAGES.ID_INVALID);
  });

  it('should return an error if name is too short', () => {
    const errors = validateNewProduct('123', 'A', 'Valid description', 'logo.png', new Date(), new Date(), false);
    expect(errors.name).toBe(ERROR_MESSAGES.NAME_LENGTH);
  });

  it('should return an error if description is too short', () => {
    const errors = validateNewProduct('123', 'Product', 'Short', 'logo.png', new Date(), new Date(), false);
    expect(errors.description).toBe(ERROR_MESSAGES.DESCRIPTION_LENGTH);
  });

  it('should return an error if logo is empty', () => {
    const errors = validateNewProduct('123', 'Product', 'Valid description', '', new Date(), new Date(), false);
    expect(errors.logo).toBe(ERROR_MESSAGES.REQUIRED_FIELD);
  });

  it('should return an error if release date is in the past', () => {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);

    const errors = validateNewProduct('123', 'Product', 'Valid description', 'logo.png', pastDate, new Date(), false);
    expect(errors.dateRelease).toBe(ERROR_MESSAGES.RELEASE_DATE_INVALID);
  });

  it('should return an error if revision date is not exactly one year after release date', () => {
    const releaseDate = new Date();
    const revisionDate = new Date(releaseDate);
    revisionDate.setFullYear(revisionDate.getFullYear() + 2);

    const errors = validateNewProduct('123', 'Product', 'Valid description', 'logo.png', releaseDate, revisionDate, false);
    expect(errors.dateRevision).toBe(ERROR_MESSAGES.REVISION_DATE_INVALID);
  });

  it('should return an error if revision date is empty', () => {
    const releaseDate = new Date();
    const errors = validateNewProduct('123', 'Product', 'Valid description', 'logo.png', releaseDate, null as any, false);
    expect(errors.dateRevision).toBe(ERROR_MESSAGES.REQUIRED_FIELD);
  });

  it('should validate an existing product correctly without errors', () => {
    const releaseDate = new Date();
    const revisionDate = new Date(releaseDate);
    revisionDate.setFullYear(releaseDate.getFullYear() + 1);

    const validProduct: Product = {
      id: '123',
      name: 'Valid Product',
      description: 'Valid description',
      logo: 'logo.png',
      date_release: releaseDate,
      date_revision: revisionDate,
    };

    const errors = validateExistingProduct(validProduct);
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
