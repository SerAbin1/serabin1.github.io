export interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Writing Testable Code",
    description: "An introduction to the Hexagonal Architecture (Ports and Adapters)",
    date: "2025-12-31",
    slug: "hexagonal-architecture",
    content: `There was a bug in our backend (or so I thought). A certain bus's morning trip was not ending, the system showed it active even at 5PM (it's trip ends at 10:50AM). The actual bug was not even a bug, it was a corrupted data. A single stop in the trip route had a wrong scheduled arrival time, causing the delay calculation logic to calculate a delay of 624 minutes. Then why am I talking about this bug?

Because of what it led me to: The Hexagonal Architecture. Also known as the Ports and Adapters pattern.

The human brain can keep only so much in its short term memory (6 plus or minus 2 is what the science tells us). In other words, the more stuff you have to keep track of, the harder it becomes to reason about or understand. So it follows that good code, code that is readable and easy to reason about, should require us to keep track of as little as possible at any given time. 

And I'm sure you can guess where I'm heading with this; yes, our backend code was the exact opposite. It required one to keep track of a whole bunch of stuff and wade through all kinds of concerns, concerns that didn't have anything to do with the *core domain* logic directly, to understand and reason about the logical and data flow. And a practical offshoot is that the code is untestable or at least it is untestable without mocking half the world.

## The Code
Our main scheduler logic, which dealt with the starting and ending of trips:
\`\`\`JS
// scheduler/worker.js (simplified)
worker.process(async (job) => {
    const { tripId, action } = job.data;
    if (action == "start") {
        const trip = await Trip.findByPk(tripId); // Infrastructure (Read)
        const redisData = await redisClient.get(key); // Infrastructure (Read)

        // Bussiness logic
        if (redisData.trip_id !== trip.id) {
            console.log("Conflict!");
            return; 
        }

        // 3. Infrastructure (Write)
        await redisClient.del(key);
    } else if (action == "end") {
        //...
    }
});
\`\`\`

## The New Code
The logic was split into three layers, with each layer doing one and one thing well.

- Domain -> Decisions (the core business logic lives here, easily testable!)
- Application -> Execution
- Worker -> Coordination

### The Domain: Pure Functions
We extracted all decision-making complexity into a single place. This file imports **nothing** related to DB or Redis. It takes plain objects and returns a **Decision**.

\`\`\`JS
// scheduler/domain/tripDecisions.js
export const evaluateTripAction = ({ trip, redisBusState, currentIstDate }) => {
    // Pure Logic: No side effects!
    if (redisBusState && redisBusState.trip_id !== trip.id) {
         return [{ 
             type: "END_SKIP_MISMATCH", 
             reason: "Bus active on different trip" 
         }];
    }

    // Logic: Check time guard
    if (isTooEarly(currentIstDate, trip.scheduled_end_time)) {
        return [{ type: "END_DEFER" }];
    }

    return [{ type: "END_COMPLETE", payload: { ... } }];
};
\`\`\`

We can now test _every single edge case_ with simple unit tests. No mocks required.

\`\`\`JS
// schduler/tests/tripDecisions.test.js
test('Should return END_SKIP_MISMATCH if Bus active on different Trip', () => {
    const decision = evaluateTripAction({
        trip: { id: 101 },
        redisBusState: { trip_id: 999 }, // Plain object!
        action: 'end'
    });

    expect(decision[0].type).toBe("END_SKIP_MISMATCH");
});
\`\`\`

### The Application: The Side-Effect Handler
We moved the actual "doing" part to application/tripExecutor.js. It doesn't "think"; it just executes instructions.

\`\`\`JS
// scheduler/application/tripExecutor.js
export const executeDecisions = async (decisions, { redisClient, logger }) => {
    for (const decision of decisions) {
        switch (decision.type) {
            case "END_SKIP_MISMATCH":
                logger.warn("Skipping end due to mismatch");
                break;
            case "END_COMPLETE":
                await redisClient.del(activeKey); // Only here do we touch Redis
                break;
        }
    }
};
\`\`\`

### The Worker: The Coordinator
The worker.js became a dumb coordinator.

\`\`\`JS
// worker.js
const trip = await Trip.findByPk(1);             // 1. Fetch State
const redisState = await redisClient.get(key);

const decisions = evaluateTripAction({           // 2. Decide (Pure)
    trip: trip.toJSON(), 
    redisBusState: JSON.parse(redisState) 
});

await executeDecisions(decisions, { redisClient }); // 3. Execute (Impure)
\`\`\`

### Conclusion`
  },
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
