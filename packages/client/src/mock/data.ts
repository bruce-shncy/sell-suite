export interface Product {
  id: string
  name: string
  category: 'phone' | 'accessory'
  stock: number
  price: number
  status: 'active' | 'inactive'
  sku: string
}

export interface Order {
  id: string
  orderNo: string
  customer: string
  type: 'cash' | 'installment'
  status: 'completed' | 'pending' | 'processing'
  total: number
  date: string
}

export interface CustomerDue {
  id: string
  customer: string
  amount: number
  dueDate: string
  phone: string
  overdue: boolean
}

export interface DashboardStats {
  todaysSales: number
  collectionsToday: number
  outstandingBalance: number
  overdueAccounts: number
}

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'phone',
    stock: 12,
    price: 1199,
    status: 'active',
    sku: 'IPH-15PM-256',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'phone',
    stock: 8,
    price: 1099,
    status: 'active',
    sku: 'SAM-S24U-256',
  },
  {
    id: '3',
    name: 'Google Pixel 8 Pro',
    category: 'phone',
    stock: 3,
    price: 899,
    status: 'active',
    sku: 'GOO-P8P-128',
  },
  {
    id: '4',
    name: 'OnePlus 12',
    category: 'phone',
    stock: 15,
    price: 799,
    status: 'active',
    sku: 'OP-12-256',
  },
  {
    id: '5',
    name: 'iPhone 14',
    category: 'phone',
    stock: 0,
    price: 699,
    status: 'inactive',
    sku: 'IPH-14-128',
  },
  {
    id: '6',
    name: 'AirPods Pro 2nd Gen',
    category: 'accessory',
    stock: 25,
    price: 249,
    status: 'active',
    sku: 'APP-2-WHT',
  },
  {
    id: '7',
    name: 'Samsung Galaxy Buds 3 Pro',
    category: 'accessory',
    stock: 18,
    price: 229,
    status: 'active',
    sku: 'SAM-GB3P-BLK',
  },
  {
    id: '8',
    name: 'MagSafe Charger',
    category: 'accessory',
    stock: 2,
    price: 39,
    status: 'active',
    sku: 'APP-MSG-CHG',
  },
  {
    id: '9',
    name: 'Spigen Ultra Hybrid Case',
    category: 'accessory',
    stock: 45,
    price: 29,
    status: 'active',
    sku: 'SPG-UH-15PM',
  },
  {
    id: '10',
    name: 'Anker 65W USB-C Charger',
    category: 'accessory',
    stock: 1,
    price: 45,
    status: 'active',
    sku: 'ANK-65W-3P',
  },
]

export const recentOrders: Order[] = [
  {
    id: '1',
    orderNo: 'ORD-2024-001',
    customer: 'Maria Santos',
    type: 'installment',
    status: 'completed',
    total: 1199,
    date: '2024-01-15',
  },
  {
    id: '2',
    orderNo: 'ORD-2024-002',
    customer: 'Juan Dela Cruz',
    type: 'cash',
    status: 'completed',
    total: 278,
    date: '2024-01-15',
  },
  {
    id: '3',
    orderNo: 'ORD-2024-003',
    customer: 'Ana Reyes',
    type: 'installment',
    status: 'processing',
    total: 899,
    date: '2024-01-15',
  },
  {
    id: '4',
    orderNo: 'ORD-2024-004',
    customer: 'Pedro Garcia',
    type: 'cash',
    status: 'pending',
    total: 45,
    date: '2024-01-14',
  },
  {
    id: '5',
    orderNo: 'ORD-2024-005',
    customer: 'Rosa Mendoza',
    type: 'installment',
    status: 'completed',
    total: 1099,
    date: '2024-01-14',
  },
  {
    id: '6',
    orderNo: 'ORD-2024-006',
    customer: 'Carlos Tan',
    type: 'cash',
    status: 'completed',
    total: 249,
    date: '2024-01-14',
  },
]

export const dueTodayItems: CustomerDue[] = [
  {
    id: '1',
    customer: 'Maria Santos',
    amount: 199.83,
    dueDate: '2024-01-15',
    phone: '+63 917 123 4567',
    overdue: false,
  },
  {
    id: '2',
    customer: 'Ana Reyes',
    amount: 149.83,
    dueDate: '2024-01-15',
    phone: '+63 918 234 5678',
    overdue: false,
  },
  {
    id: '3',
    customer: 'Rosa Mendoza',
    amount: 183.17,
    dueDate: '2024-01-15',
    phone: '+63 919 345 6789',
    overdue: false,
  },
  {
    id: '4',
    customer: 'Diego Lim',
    amount: 299.83,
    dueDate: '2024-01-10',
    phone: '+63 920 456 7890',
    overdue: true,
  },
  {
    id: '5',
    customer: 'Elena Cruz',
    amount: 166.5,
    dueDate: '2024-01-08',
    phone: '+63 921 567 8901',
    overdue: true,
  },
  {
    id: '6',
    customer: 'Marco Aquino',
    amount: 133.17,
    dueDate: '2024-01-15',
    phone: '+63 922 678 9012',
    overdue: false,
  },
]

export const dashboardStats: DashboardStats = {
  todaysSales: 3769,
  collectionsToday: 1532.66,
  outstandingBalance: 24850,
  overdueAccounts: 2,
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}
