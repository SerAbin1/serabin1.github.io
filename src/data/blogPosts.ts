export interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Understanding Serialization",
    description:
      "Serialization is easy if, you know what it is, if not, you'll be wondering why do you need to serialize data to send it over the wire if its all bits anyways.",
    date: "2025-12-22",
    slug: "serialization",
    content: `### Serialization
Let's say you want to send these bytes over the wire:
\`\`\`
00000000 00000000 00000000 00000101
\`\`\`
How does the receiver interpret it? As integer, float, ascii string...?
This is what serialization solves. It encodes the bits and how to ***interpret*** those bits. It answers questions such as:
- In what order are fields written?
- How big is each field?
- How do we know where one field ends?
- How do we know where the message ends?
- How do we handle missing or extra fields?
- How do we handle different machines?

#### Text based serialization protocols
JSON, XML
#### Binary serialization protocols
Protocol Buffers (Protobuf), FlatBuffers, Cap'n Proto, MesssagePack, CBOR`,
  },
  {
    title: "Sockets or How Processes Communicate",
    description:
      "An introduction to socket programming, covering TCP/UDP protocols, client-server architecture, and inter-process communication fundamentals.",
    date: "2025-08-05",
    slug: "sockets-or-how-processes-communicate",
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

Understanding sockets gives you the foundation to build robust, scalable network applications and debug network-related issues effectively.`,
  },
];
