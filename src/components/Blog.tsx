import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BlogPost from "./BlogPost";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const blogPosts = [
    {
      slug: "sockets-how-processes-communicate",
      title: "Sockets or How Processes Communicate",
      description: "An introduction to socket programming, covering TCP/UDP protocols, client-server architecture, and inter-process communication fundamentals.",
      date: "2025-08-05",
      readTime: "8 min read",
      category: "Network Programming",
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
      slug: "building-secure-rest-apis",
      title: "Building Secure REST APIs",
      description: "Best practices for implementing authentication, authorization, and security measures in modern web APIs.",
      date: "2025-07-20",
      readTime: "12 min read", 
      category: "Backend Development",
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

## Input Validation

Never trust user input:

\`\`\`javascript
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  body('name').trim().isLength({ min: 2, max: 50 }).escape(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
\`\`\`

## Rate Limiting

Prevent abuse with rate limiting:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', apiLimiter);
\`\`\`

## Security Headers

Essential security headers:

\`\`\`javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
\`\`\`

## Database Security

Prevent SQL injection:

\`\`\`javascript
// Using parameterized queries with PostgreSQL
const query = 'SELECT * FROM users WHERE email = $1 AND status = $2';
const values = [userEmail, 'active'];
const result = await client.query(query, values);
\`\`\`

## Error Handling

Don't leak sensitive information:

\`\`\`javascript
const errorHandler = (err, req, res, next) => {
  // Log detailed error for debugging
  console.error(err.stack);
  
  // Send generic error to client
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
};
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
      slug: "database-security-fundamentals",
      title: "Database Security Fundamentals",
      description: "Essential security practices for database management, including access control, encryption, and vulnerability prevention.",
      date: "2025-07-10",
      readTime: "15 min read",
      category: "Cybersecurity",
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

### Multi-Factor Authentication
Enable MFA for database administrators:

\`\`\`sql
-- PostgreSQL example
ALTER USER admin_user SET password_encryption = 'scram-sha-256';
-- Additional configuration in pg_hba.conf for certificate-based auth
\`\`\`

## Encryption

### Data at Rest
Encrypt database files and backups:

\`\`\`bash
# MySQL transparent data encryption
ALTER TABLE users ENCRYPTION='Y';

# PostgreSQL with encrypted tablespace
CREATE TABLESPACE encrypted_space 
LOCATION '/encrypted_data' 
WITH (encryption_key_id = 1);
\`\`\`

### Data in Transit
Always use encrypted connections:

\`\`\`javascript
// Node.js with SSL
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'app_user',
  password: 'password',
  database: 'myapp',
  ssl: {
    ca: fs.readFileSync('./certs/ca-cert.pem'),
    cert: fs.readFileSync('./certs/client-cert.pem'),
    key: fs.readFileSync('./certs/client-key.pem')
  }
});
\`\`\`

### Column-Level Encryption
Encrypt sensitive fields:

\`\`\`sql
-- PostgreSQL pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Encrypt sensitive data
INSERT INTO users (email, encrypted_ssn) 
VALUES ('user@example.com', crypt('123-45-6789', gen_salt('bf')));

-- Query encrypted data
SELECT email FROM users 
WHERE encrypted_ssn = crypt('123-45-6789', encrypted_ssn);
\`\`\`

## SQL Injection Prevention

### Parameterized Queries
Always use prepared statements:

\`\`\`javascript
// ❌ Vulnerable to SQL injection
const query = \`SELECT * FROM users WHERE email = '\${userEmail}'\`;

// ✅ Safe parameterized query
const query = 'SELECT * FROM users WHERE email = ?';
const results = await db.execute(query, [userEmail]);
\`\`\`

### Input Validation
Validate and sanitize all inputs:

\`\`\`javascript
const validator = require('validator');

const validateUserInput = (input) => {
  // Whitelist validation
  if (!validator.isEmail(input.email)) {
    throw new Error('Invalid email format');
  }
  
  // Length validation
  if (input.name.length > 100) {
    throw new Error('Name too long');
  }
  
  // Escape special characters
  return {
    email: validator.normalizeEmail(input.email),
    name: validator.escape(input.name)
  };
};
\`\`\`

## Database Hardening

### Remove Default Accounts
\`\`\`sql
-- Remove or secure default accounts
DROP USER IF EXISTS ''@'localhost';
DROP USER IF EXISTS ''@'%';
DROP DATABASE IF EXISTS test;
\`\`\`

### Network Security
\`\`\`bash
# Firewall rules - only allow necessary connections
iptables -A INPUT -p tcp --dport 3306 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 3306 -j DROP
\`\`\`

### Regular Updates
\`\`\`bash
# Keep database software updated
sudo apt update && sudo apt upgrade mysql-server
\`\`\`

## Monitoring and Auditing

### Query Logging
Enable comprehensive logging:

\`\`\`sql
-- MySQL general query log
SET GLOBAL general_log = 'ON';
SET GLOBAL general_log_file = '/var/log/mysql/queries.log';

-- PostgreSQL logging
ALTER SYSTEM SET log_statement = 'all';
ALTER SYSTEM SET log_connections = 'on';
SELECT pg_reload_conf();
\`\`\`

### Failed Login Monitoring
\`\`\`bash
# Monitor MySQL error log for failed connections
tail -f /var/log/mysql/error.log | grep "Access denied"
\`\`\`

### Database Activity Monitoring
\`\`\`javascript
// Application-level monitoring
const auditMiddleware = (req, res, next) => {
  const auditLog = {
    timestamp: new Date(),
    user: req.user?.id,
    action: req.method,
    resource: req.path,
    ip: req.ip
  };
  
  // Log to secure audit trail
  secureLogger.info(auditLog);
  next();
};
\`\`\`

## Backup Security

### Encrypted Backups
\`\`\`bash
# MySQL encrypted backup
mysqldump --single-transaction --routines --triggers myapp | 
gpg --cipher-algo AES256 --compress-algo 1 --symmetric > backup.sql.gpg
\`\`\`

### Backup Validation
\`\`\`bash
# Test backup integrity
mysqldump myapp > test_backup.sql
mysql test_db < test_backup.sql
# Verify data integrity
\`\`\`

## Compliance Considerations

### GDPR/Privacy
- Implement data anonymization
- Enable secure data deletion
- Maintain audit trails

### SOC 2/PCI DSS
- Regular access reviews
- Encryption key management
- Change management procedures

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  if (selectedPost !== null) {
    const post = blogPosts[selectedPost];
    return (
      <BlogPost
        {...post}
        onBack={() => setSelectedPost(null)}
      />
    );
  }

  return (
    <section id="blogs" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="code-comment text-lg mb-4">
            <span className="terminal-text">~$</span> find ./blog -name "*.md"
          </div>
          <h2 className="text-3xl md:text-4xl font-bold terminal-glow mb-4">
            Technical Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge about backend development, cybersecurity, and system design
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-card transition-all duration-300 group">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded font-mono">
                          {post.category}
                        </span>
                      </div>
                      <CardTitle className="terminal-text text-xl mb-2 group-hover:terminal-glow transition-all">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {post.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link to={`/blogs/${post.slug}`}>
                      <Button className="flex items-center gap-2">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Blog CTA */}
          <div className="text-center mt-12 p-8 bg-card/30 backdrop-blur-sm rounded-lg border border-border">
            <h3 className="text-xl font-bold terminal-text mb-4">
              Want to read more?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out my complete blog for more technical articles and tutorials
            </p>
            <Link to="/blogs">
              <Button className="font-mono">
                visit_blog()
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;