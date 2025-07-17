// Pre-populate localStorage with demo users
const demoUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@test.com',
    mobile: '9876543210',
    role: 'admin',
    password: '123456'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'user@test.com',
    mobile: '9876543211',
    role: 'user',
    password: '123456'
  }
];

export const initializeDemoUsers = () => {
  const existingUsers = localStorage.getItem('users');
  if (!existingUsers) {
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
};