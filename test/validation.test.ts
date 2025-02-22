import { employeeSchema } from '../src/api/v1/validations/employeeValidation';
import { branchSchema } from '../src/api/v1/validations/branchValidation';

describe('Validation Tests', () => {
  test('Should fail when employee name is too short', () => {
    const result = employeeSchema.validate({ name: 'Jo', position: 'Manager', email: 'jo@test.com', branchId: 1 });
    expect(result.error).not.toBeUndefined();
  });

  test('Should pass when employee data is valid', () => {
    const result = employeeSchema.validate({ name: 'John Doe', position: 'Manager', email: 'john@example.com', branchId: 1 });
    expect(result.error).toBeUndefined();
  });

  test('Should fail when branch name is missing', () => {
    const result = branchSchema.validate({ address: '123 Main St', phone: '+1234567890' });
    expect(result.error).not.toBeUndefined();
  });

  test('Should pass when branch data is valid', () => {
    const result = branchSchema.validate({ name: 'Main Branch', address: '123 Main St', phone: '+1234567890' });
    expect(result.error).toBeUndefined();
  });
});
