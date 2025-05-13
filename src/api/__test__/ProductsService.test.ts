import { ProductsService } from '../ProductsService';
import { Product } from '../../models/Product';

global.fetch = jest.fn();

const mockProduct: Product = {
  id: '123',
  name: 'Test Product',
  description: 'This is a test product',
  logo: 'test-logo.png',
  date_release: new Date('2024-01-01'),
  date_revision: new Date('2025-01-01'),
};

const service = new ProductsService();

describe('ProductsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return all products', async () => {
    const mockResponse = { data: [mockProduct] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const products = await service.getAll();
    expect(products).toEqual([mockProduct]);
    expect(fetch).toHaveBeenCalledWith('http://192.168.7.5:3002/bp/products');
  });

  it('should fetch and return a product by ID', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValueOnce([mockProduct]);

    const product = await service.getOne('123');
    expect(product).toEqual(mockProduct);
  });

  it('should return null if product ID is not found', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValueOnce([]);

    const product = await service.getOne('999');
    expect(product).toBeNull();
  });

  it('should verify if a product ID exists', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(true),
    });

    const exists = await service.verifyId('123');
    expect(exists).toBe(true);
    expect(fetch).toHaveBeenCalledWith('http://192.168.7.5:3002/bp/products/verification/123');
  });

  it('should create a product', async () => {
    const mockResponse = { data: mockProduct };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const createdProduct = await service.create(mockProduct);
    expect(createdProduct).toEqual(mockProduct);
    expect(fetch).toHaveBeenCalledWith('http://192.168.7.5:3002/bp/products', expect.any(Object));
  });

  it('should update a product', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({});

    await service.update('123', mockProduct);
    expect(fetch).toHaveBeenCalledWith('http://192.168.7.5:3002/bp/products/123', expect.any(Object));
  });

  it('should delete a product', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({});

    await service.remove('123');
    expect(fetch).toHaveBeenCalledWith('http://192.168.7.5:3002/bp/products/123', { method: 'DELETE' });
  });
});
