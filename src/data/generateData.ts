import { faker } from '@faker-js/faker';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  state: string;
  email: string;
  phone: string;
  department: string;
  salary: number;
}

const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Legal', 'Product', 'Support'];

export const generatePerson = (id: number): Person => ({
  id,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int({ min: 20, max: 65 }),
  city: faker.location.city(),
  state: faker.location.state({ abbreviated: true }),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  department: faker.helpers.arrayElement(departments),
  salary: faker.number.int({ min: 30000, max: 150000 }),
});

// Cache for storing generated data
const dataCache = new Map<number, Person>();

export const generateData = (count: number, startIndex: number = 0): Person[] => {
  const result: Person[] = [];
  console.log('generateData', count, startIndex);
  for (let i = 0; i < count; i++) {
    const id = startIndex + i;
    if (!dataCache.has(id)) {
      dataCache.set(id, generatePerson(id));
    }
    result.push(dataCache.get(id)!);
  }
  
  return result;
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type FetchDataOptions =
  | {
      enablePaginatedDataFetch: true;
      pageSize: number;
      pageIndex: number;
      sorting?: { id: string; desc: boolean }[];
      filters?: { id: string; value: string }[];
    }
  | {
      enablePaginatedDataFetch: false;
      rowCount: number;
      pageSize: number;
      sorting?: { id: string; desc: boolean }[];
      filters?: { id: string; value: string }[];
    };

export interface FetchDataResult {
  data: Person[];
  totalRows: number;
  pageCount: number;
}

export const TOTAL_ROWS = 10000;

export const fetchData = async (options: FetchDataOptions): Promise<FetchDataResult> => {
    const { sorting, filters, enablePaginatedDataFetch } = options;
    let data: Person[] = [];
  if(enablePaginatedDataFetch) {
    const { pageSize, pageIndex } = options;
    data = generateData(pageSize, pageIndex * pageSize);
  } else {
    const { rowCount } = options;
    data = generateData(rowCount);
  }

  
  // Simulate server delay
  await delay(Math.random() * 500 + 200); // Random delay between 200-700ms
    
  // Apply filters if any
  if (filters?.length) {
    data = data.filter(row => {
      return filters.every(filter => {
        const value = String(row[filter.id as keyof Person]).toLowerCase();
        return value.includes(String(filter.value).toLowerCase());
      });
    });
  }
  
  // Apply sorting if any
  if (sorting?.length) {
    data = [...data].sort((a, b) => {
      for (const sort of sorting) {
        const aValue = a[sort.id as keyof Person];
        const bValue = b[sort.id as keyof Person];
        
        if (aValue < bValue) return sort.desc ? 1 : -1;
        if (aValue > bValue) return sort.desc ? -1 : 1;
      }
      return 0;
    });
  }
  
  return {
    data,
    totalRows: enablePaginatedDataFetch ? TOTAL_ROWS : options.rowCount,
    pageCount: enablePaginatedDataFetch ? Math.ceil(TOTAL_ROWS / options.pageSize) : Math.ceil(options.rowCount / options.pageSize),
  };
}; 