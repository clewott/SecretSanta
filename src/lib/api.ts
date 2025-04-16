export async function loginUser(username: string, password: string): Promise<{ token: string }> {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'user' && password === 'password') {
        resolve({ token: 'fake-jwt-token-123' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}