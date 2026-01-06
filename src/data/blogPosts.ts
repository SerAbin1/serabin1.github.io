export interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "LRU & LFU Cache",
    description: "Visual explanation of LRU and LFU Cache implementation",
    date: "2026-01-04",
    slug: "lru-lfu-cache",
    content: `

## LRU Cache

We have a limited capacity.

So what do we do when we need to keep track of many things at once?

We need some way to decide what we will take out of our cache when it becomes full. In other words, we need an eviction policy. An eviction policy defines which item should be removed to make space for a new one.

LRU stands for _Least Recently Used_. The idea is simple: when the cache is full, we evict the item that has been used the least recently.

Before going any further, it is worth looking at the problem statement itself:

[LeetCode 146: LRU Cache](https://leetcode.com/problems/lru-cache/)

Now, let us restate the problem in simpler terms.

We are required to implement three things:

- **Initialize the LRU cache** with a fixed capacity
- **\`get(key)\`**: Given a key, return its value if it exists; otherwise return \`-1\`
- **\`put(key, value)\`**: Given a key and a value, update the value if the key exists; otherwise insert the key-value pair

There is one critical constraint: both \`get\` and \`put\` must run in **O(1)** time, that is, constant time complexity.

So the real question is how we design a data structure that satisfies this requirement.

---

### Data Structure

The choice of an appropriate data structure has a major impact on the algorithm and the final solution. But how do we know what is appropriate?

The answer depends entirely on the requirements of the problem.

Here, we have two operations—\`GET\` and \`PUT\`—and both must be constant time.

Let us start with the most common data structure: an array.

<lru-visualizer mode="array"></lru-visualizer>

As we can see, when we retrieve an element from an array, we must reorder the array to maintain LRU order. This requires shifting elements, which takes linear time, O(n).

That violates the problem constraints, so an array is not a valid choice.

So what is the real requirement here?

Whenever an element is accessed, we must remove it from its current position and insert it at the most recently used position.

This leads us to a linked list.

A linked list is not stored sequentially in memory. Instead, it uses pointers. This allows us to remove a node from anywhere and insert it elsewhere using pointer manipulation.

<lru-visualizer mode="linked-list"></lru-visualizer>

This solves part of the problem. However, a linked list has another issue.

It does not support random access. If the user gives us a key, we cannot jump directly to the node without traversal, which would again be O(n).

So what do we need?

We need a mapping from a key to its corresponding node.

This is exactly what a hash map provides.

The final design uses **two data structures**:

- A **hash map** mapping keys to nodes
- A **doubly linked list** maintaining LRU order

The hash map gives us O(1) access to nodes, and the doubly linked list allows O(1) removal and insertion.

We specifically use a _doubly_ linked list because removal requires access to both previous and next nodes. A singly linked list cannot do this efficiently without traversal.

---

### GET and PUT Operations

Now let us look at what actually happens in \`GET\` and \`PUT\`.

Both operations share a core behavior: **updating recency**. Any accessed or updated item becomes the most recently used.

#### Pseudocode: GET

\`\`\`python
def GET(key):
    # Check if key exists
    if key not in hashmap:
        return -1
    
    # Key exists: move to MRU position
    node = hashmap[key]
    remove(node)           # Detach from current position
    insert(node)           # Re-attach at MRU (tail)
    
    return node.value
\`\`\`

#### Pseudocode: PUT

\`\`\`python
def PUT(key, value):
    # Case 1: Key already exists - update value
    if key in hashmap:
        node = hashmap[key]
        node.value = value
        remove(node)           # Detach from current position
        insert(node)           # Re-attach at MRU (tail)
    
    # Case 2: New key
    else:
        # Evict LRU if at capacity
        if len(hashmap) >= capacity:
            lru = left.next    # Left sentinel's next is LRU
            remove(lru)
            del hashmap[lru.key]
        
        # Insert new node
        node = Node(key, value)
        insert(node)
        hashmap[key] = node
\`\`\`

Both operations remove a node and reinsert it at the MRU position. Since this logic is shared, we abstract it into helper functions.

---

### Updating LRU Status

We define two helper functions:

- \`remove(node)\`
- \`insert(node)\`

To make this reliable, we use **two sentinel nodes**:

- \`left\`: before the LRU
    
- \`right\`: after the MRU
    
- \`left.next\` → LRU
    
- \`right.prev\` → MRU
    

This eliminates edge cases and allows constant-time operations.

Conceptually:

\`\`\`
left <-> LRU <-> ... <-> MRU <-> right
\`\`\`

---

### Code

Below is the implementation placeholder. The actual code is intentionally omitted.

\`\`\`Python
class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {} # Maps key -> Node
        
        # Initialize dummy head and dummy tail to simplify edge cases
        # Usage Order: Head (MRU) <-> ... <-> Tail (LRU)
        # (Note: You can flip this direction, as long as you are consistent)
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    # Helper: Remove a node from the linked list
    def _remove(self, node):
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    # Helper: Add a node right after head (Mark as MRU)
    def _add(self, node):
        next_node = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = next_node
        next_node.prev = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            # Refresh usage: remove from current spot, add to head
            self._remove(node)
            self._add(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update value and refresh usage
            node = self.cache[key]
            self._remove(node)
            node.val = value # update value
            self._add(node)
        else:
            if len(self.cache) >= self.capacity:
                # Evict LRU (node before tail)
                lru_node = self.tail.prev
                self._remove(lru_node)
                del self.cache[lru_node.key]
            
            # Add new node
            new_node = Node(key, value)
            self._add(new_node)
            self.cache[key] = new_node
\`\`\`

---

### LRU Visualization (Final)

<lru-visualizer mode="lru"></lru-visualizer>

---

## LFU Cache

LRU uses time as its eviction signal. LFU, on the other hand, uses **frequency**.

LFU stands for _Least Frequently Used_. Instead of tracking which item was used most recently, we track how often each item is used.

When the cache is full, we evict the item with the lowest frequency.

If multiple items have the same frequency, we break the tie using LRU semantics within that frequency.

Conceptually, LFU can be built on top of the same ideas as LRU:

- A hash map for O(1) access
- Multiple linked lists, one per frequency bucket
- A way to track the minimum frequency

The structure is more complex, but the philosophy is the same: use pointer manipulation and indexing to avoid scanning.

<lfu-visualizer></lfu-visualizer>

---

### Closing Note

Solving problems require understanding **constraints**, choosing the right **data structures**, and composing simple ideas until the complexity disappears.

But the most important part is struggle; to truly understand something, we must struggle with it a while. So here ya go:
- [LeetCode 460: LFU Cache](https://leetcode.com/problems/lfu-cache/description/)
- [LeetCode 432: All O(1) Data Structure](https://leetcode.com/problems/all-oone-data-structure/description/)
`,
  },
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
We extracted all decision-making complexity into a single place. This file imports **nothing** related to DB or Redis. It takes plain objects and returns a **Decision**.

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

We can now test _every single edge case_ with simple unit tests. No mocks required.

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
We moved the actual "doing" part to application/tripExecutor.js. It doesn't "think"; it just executes instructions.

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
The worker.js became a dumb coordinator.

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
`
  },
];
