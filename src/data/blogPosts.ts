export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Sockets or How Processes Communicate",
    description: "An introduction to socket programming, covering TCP/UDP protocols, client-server architecture, and inter-process communication fundamentals.",
    date: "2025-08-05",
    readTime: "8 min read",
    category: "Network Programming",
    slug: "sockets-or-how-processes-communicate",
    tags: ["Sockets", "TCP", "UDP", "System Programming"],
    content: `# Sockets or How Processes Communicate

Socket programming is a fundamental concept in network programming that enables processes to communicate with each other across networks. Whether you're building web applications, distributed systems, or real-time communication tools, understanding sockets is crucial for any backend developer.

## What are Sockets?

A socket is an endpoint for communication between two machines. Think of it as a telephone connection - one process "calls" another process, and once the connection is established, they can exchange data bidirectionally.

## Types of Sockets

### TCP Sockets (Stream Sockets)
- **Reliable**: Guarantees data delivery and order
- **Connection-oriented**: Establishes a connection before data transfer
- **Use cases**: Web browsers, email, file transfers

### UDP Sockets (Datagram Sockets)  
- **Fast**: Lower overhead, no connection establishment
- **Unreliable**: No guarantee of delivery or order
- **Use cases**: Gaming, live streaming, DNS lookups

## Socket Programming Fundamentals

### Server-Side Implementation

\`\`\`python
import socket

# Create socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind to address and port
server_socket.bind(('localhost', 8080))

# Listen for connections
server_socket.listen(5)

while True:
    client_socket, address = server_socket.accept()
    data = client_socket.recv(1024)
    client_socket.send(b"Hello from server!")
    client_socket.close()
\`\`\`

### Client-Side Implementation

\`\`\`python
import socket

# Create socket
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect to server
client_socket.connect(('localhost', 8080))

# Send data
client_socket.send(b"Hello from client!")

# Receive response
response = client_socket.recv(1024)
print(response.decode())

client_socket.close()
\`\`\`

## Best Practices

1. **Error Handling**: Always implement proper error handling for network operations
2. **Resource Management**: Close sockets properly to avoid resource leaks
3. **Security**: Validate input data and implement authentication when needed
4. **Performance**: Use connection pooling for high-traffic applications

## Real-World Applications

Socket programming powers many technologies we use daily:
- **Web Servers**: HTTP communication between browsers and servers
- **Chat Applications**: Real-time messaging systems
- **Database Connections**: Client-server database communication
- **API Services**: RESTful and GraphQL API endpoints

Understanding sockets gives you the foundation to build robust, scalable network applications and debug network-related issues effectively.`
  },
  {
    title: "Building Secure REST APIs",
    description: "Best practices for implementing authentication, authorization, and security measures in modern web APIs.",
    date: "2025-07-20",
    readTime: "12 min read",
    category: "Backend Development",
    slug: "building-secure-rest-apis",
    tags: ["REST API", "Security", "JWT", "RBAC"],
    content: `# Building Secure REST APIs

Security should never be an afterthought when building REST APIs. In today's threat landscape, implementing robust security measures from the ground up is essential for protecting user data and maintaining system integrity.

## Authentication vs Authorization

**Authentication** answers "Who are you?"
**Authorization** answers "What can you do?"

Both are crucial but serve different purposes in your security architecture.

## JWT (JSON Web Tokens)

JWTs provide a stateless authentication mechanism:

\`\`\`javascript
const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
\`\`\`

## Role-Based Access Control (RBAC)

Implement granular permissions:

\`\`\`javascript
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Usage
app.get('/admin/users', verifyToken, authorize(['admin']), getUsersController);
app.post('/posts', verifyToken, authorize(['user', 'admin']), createPostController);
\`\`\`

## Security Checklist

- ✅ Use HTTPS everywhere
- ✅ Implement proper authentication
- ✅ Use strong password policies
- ✅ Validate and sanitize all input
- ✅ Implement rate limiting
- ✅ Use security headers
- ✅ Keep dependencies updated
- ✅ Log security events
- ✅ Regular security audits

Building secure APIs requires a layered approach. Each security measure adds a barrier against potential attacks, making your system more resilient overall.`
  },
  {
    title: "Database Security Fundamentals",
    description: "Essential security practices for database management, including access control, encryption, and vulnerability prevention.",
    date: "2025-07-10",
    readTime: "15 min read",
    category: "Cybersecurity",
    slug: "database-security-fundamentals",
    tags: ["Database", "Security", "SQL Injection", "Encryption"],
    content: `# Database Security Fundamentals

Databases are the crown jewels of most applications, containing sensitive user data, business logic, and valuable intellectual property. Securing them requires a comprehensive approach that goes beyond just setting a strong password.

## The Database Security Triad

### Confidentiality
Ensuring only authorized users can access data

### Integrity  
Maintaining data accuracy and preventing unauthorized modifications

### Availability
Keeping the database accessible when needed

## Access Control and Authentication

### Principle of Least Privilege
Grant users only the minimum permissions necessary:

\`\`\`sql
-- Create role-specific users
CREATE USER 'app_read'@'localhost' IDENTIFIED BY 'strong_password';
CREATE USER 'app_write'@'localhost' IDENTIFIED BY 'strong_password';
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'strong_password';

-- Grant specific permissions
GRANT SELECT ON myapp.* TO 'app_read'@'localhost';
GRANT SELECT, INSERT, UPDATE ON myapp.orders TO 'app_write'@'localhost';
GRANT ALL PRIVILEGES ON myapp.* TO 'admin'@'localhost';
\`\`\`

## Security Checklist

- ✅ Strong authentication mechanisms
- ✅ Encrypted data at rest and in transit  
- ✅ Parameterized queries everywhere
- ✅ Regular security updates
- ✅ Comprehensive monitoring
- ✅ Secure backup procedures
- ✅ Access control implementation
- ✅ Regular security audits

Database security is not a one-time setup but an ongoing process. Regular reviews, updates, and monitoring are essential for maintaining a strong security posture.`
  }
];