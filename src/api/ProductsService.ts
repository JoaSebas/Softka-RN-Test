import { Product } from '../models/Product';

export interface IProductsService {
  getAll(): Promise<Product[]>;
  getOne(id: string): Promise<Product | null>;
  verifyId(id: string): Promise<boolean>;
  create(product: Product): Promise<Product>;
  update(id: string, product: Omit<Product, 'id'>): Promise<void>;
  remove(id: string): Promise<void>;
}

export class ProductsService implements IProductsService {
  private BASE_URL = 'http://192.168.1.116:3002';

  async getAll(): Promise<Product[]> {
    const resp = await fetch(`${this.BASE_URL}/bp/products`);
    const json = await resp.json();
    const items = (json.data || []) as any[];
    return items.map((item) => this.parseProduct(item));
  }

  async getOne(id: string): Promise<Product | null> {
    const products = await this.getAll();
    return products.find((p) => p.id === id) || null;
  }

  async verifyId(id: string): Promise<boolean> {
    const resp = await fetch(`${this.BASE_URL}/bp/products/verification/${id}`);
    const exists = await resp.json();
    return Boolean(exists);
  }

  async create(product: Product): Promise<Product> {
    const body = {
      ...product,
      date_release: product.date_release.toISOString().split('T')[0],
      date_revision: product.date_revision.toISOString().split('T')[0],
    };
    const resp = await fetch(`${this.BASE_URL}/bp/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await resp.json();
    return this.parseProduct(json.data);
  }

  async update(id: string, product: Omit<Product, 'id'>): Promise<void> {
    const body = {
      ...product,
      date_release: product.date_release.toISOString().split('T')[0],
      date_revision: product.date_revision.toISOString().split('T')[0],
    };
    await fetch(`${this.BASE_URL}/bp/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  async remove(id: string): Promise<void> {
    await fetch(`${this.BASE_URL}/bp/products/${id}`, {
      method: 'DELETE',
    });
  }

  private parseProduct(raw: any): Product {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      logo: raw.logo,
      date_release: new Date(raw.date_release),
      date_revision: new Date(raw.date_revision),
    };
  }
}

export const productsService = new ProductsService();
