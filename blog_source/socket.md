# Sockets or How Processes Communicate

The methods and techniques by which processes communicate with each other are called **_Inter-Process Communication (IPC)._** These include message passing (e.g. sockets, pipes, message queues) and shared memory–based approaches (e.g. memory-mapped files, semaphores). The choice depends on performance needs, locality (same machine or networked), and synchronization requirements. The scope of this post is limited to **Sockets**, which are a key part of the _message-passing_ category of IPC mechanisms.

### Sockets

A socket is an endpoint for a two-way communication. It abstracts away the details of how the Internet is implemented, letting you establish a communication channel with a just few lines of code. So you can start exchanging data between processes (e.g. client process <-> server process, web browsers <-> web servers, etc), whether they are on the same machine or different.

Though there are other faster forms of IPC on any given platform, for cross-platform Sockets are standard.

There are two domains of sockets:

- **Unix Sockets**: For inter-process communication on the same machine.
- **Network Sockets**: For inter-process communication between processes on the same machine as well as on different machines (e.g. client to server).

Now let's see some code. All the code examples in this blog will be in the C programming language or Python, or both.

### Creating a Socket

```C
#include <sys/socket.h>

int socket(int domain, int type, int protocol);
```

The _domain_ argument specifies the protocol family to be used in the communication. They are defined in `<sys/socket.h>`

- **AF\_UNIX** or **AF\_LOCAL** for inter-process communication on the same machine
- **AF_INET** for IPv4 Internet protocols
- **AF_INET6** for IPv6 Internet protocols

The _type_ argument specifies the, well, type of communication, or semantics if you will.

- **SOCK_STREAM** for reliable, connection-oriented communication (typically over TCP)
- **SOCK_DGRAM** for unreliable, connectionless communication (typically over UDP)

The _protocol_ argument specifies the specific protocol to be used. Some families may have only one protocol, or the combination of the _domain_ and _type_ may be enough and the _protocol_ will be 0.

The `socket()` returns a file descriptor, an identifier by which we can refer to this socket in the future. You pass it as an argument to subsequent operations on this socket.

### Unix Socket

If you're not an experienced C programmer, some things in the below code will be confusing so here's an explanation for most of it:

- **`sockaddr_un`**: A structure used to hold the address information for a Unix domain socket. From `<sys/un.h>`
- **`perror`**: A function that prints a descriptive error message to `stderr` based on the last system error that occurred. From `<stdio.h>`
- **`memset`**: A standard C library function that fills a block of memory with a particular value (in this case, zeros). From `<string.h>`
- **`addr.sun_family`**: A field in the `sockaddr_un` struct that identifies the address family, which we set to `AF_UNIX` to create a Unix domain socket.
- **`addr.sun_path`**: The field in the `sockaddr_un` struct that contains the actual filesystem path for the socket file.

Client.c

```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <unistd.h>

const char *SOCKET_PATH = "./my_unix_socket";

int main() {
  int client_socket;
  struct sockaddr_un addr;
  const char *message = "Hello there, server!";

  client_socket = socket(AF_UNIX, SOCK_STREAM, 0);
  if (client_socket == -1) {
    perror("socket error");
    exit(1);
  }

  memset(&addr, 0, sizeof(addr));
  addr.sun_family = AF_UNIX;
  strncpy(addr.sun_path, SOCKET_PATH, sizeof(addr.sun_path) - 1);

  if (connect(client_socket, (struct sockaddr *)&addr, sizeof(addr)) == -1) {
    perror("connection error");
    exit(1);
  }

  printf("Connected to server. Sending message...\n");

  write(client_socket, message, strlen(message));

  close(client_socket);

  return 0;
}
```

Server.c

```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <unistd.h>

const char *SOCKET_PATH = "./my_unix_socket";

int main() {
    int server_socket, client_socket;
    struct sockaddr_un addr;
    char buffer[256];

    server_socket = socket(AF_UNIX, SOCK_STREAM, 0);
    if (server_socket == -1) {
        perror("socket error");
        exit(1);
    }

    memset(&addr, 0, sizeof(addr));
    addr.sun_family = AF_UNIX;
    strncpy(addr.sun_path, SOCKET_PATH, sizeof(addr.sun_path) - 1);

    unlink(SOCKET_PATH);

    if (bind(server_socket, (struct sockaddr *)&addr, sizeof(addr)) == -1) {
        perror("bind error");
        exit(1);
    }

    if (listen(server_socket, 5) == -1) {
        perror("listen error");
        exit(1);
    }

    printf("Server is listening on %s\n", SOCKET_PATH);

    client_socket = accept(server_socket, NULL, NULL);
    if (client_socket == -1) {
        perror("accept error");
        exit(1);
    }

    memset(buffer, 0, sizeof(buffer));
    read(client_socket, buffer, sizeof(buffer) - 1);
    printf("Message from client: %s\n", buffer);

    close(client_socket);
    close(server_socket);
    unlink(SOCKET_PATH);

    return 0;
}
```

### Network Sockets

---

---

### Resources

- [Core Dumbed's video on IPC](https://youtu.be/Y2mDwW2pMv4?si=CuwqqU_5D-b6ERwC) -> An excellent, beginner friendly intro
- [Beej’s Guide to Unix IPC](https://beej.us/guide/bgipc/html/split/) -> Also beginner friendly, with much more detail
- [Linux IPC Mechanisms – The Linux Documentation Project](https://tldp.org/LDP/tlk/ipc/ipc.html)
