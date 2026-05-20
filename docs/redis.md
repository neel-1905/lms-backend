# Redis Setup Guide

This project uses Redis for:

- Rate limiting
- Caching
- Temporary storage

---

# Requirements

- Docker Desktop installed and running

Download:

https://www.docker.com/products/docker-desktop/

---

# Verify Docker Installation

Run:

```bash
docker --version
```

and:

```bash
docker ps
```

---

# Start Redis Container

Run:

```bash
docker run -d --name redis-server -p 6379:6379 redis
```

This will:

- download Redis image (first time only)
- create container named `redis-server`
- expose Redis on port `6379`

---

# Verify Redis Is Running

Run:

```bash
docker ps
```

You should see:

```txt
redis-server
```

---

# Test Redis Connection

Open Redis CLI:

```bash
docker exec -it redis-server redis-cli
```

Then run:

```bash
PING
```

Expected output:

```txt
PONG
```

---

# Stop Redis

```bash
docker stop redis-server
```

---

# Start Existing Redis Container Again

```bash
docker start redis-server
```

---

# Remove Redis Container

```bash
docker rm -f redis-server
```

---

# Redis Connection URL

Default local Redis URL:

```txt
redis://localhost:6379
```

---

# Environment Variable Example

Add to `.env`:

```env
REDIS_URL=redis://localhost:6379
```

---

# Example Redis Client

```ts
import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", (err) => {
  console.error("Redis Error", err);
});

await redis.connect();

export default redis;
```

---

# Common Issues

## Docker Not Running

Error:

```txt
Cannot connect to Docker daemon
```

Solution:

- Open Docker Desktop
- Wait until Docker fully starts

---

## Port Already In Use

Error:

```txt
Bind for 0.0.0.0:6379 failed
```

Solution:

- Another Redis instance is already using port `6379`
- Stop existing service or change port mapping

Example:

```bash
docker run -d --name redis-server -p 6380:6379 redis
```

Then update connection URL:

```env
REDIS_URL=redis://localhost:6380
```

---

# Useful Redis Commands

Open Redis CLI:

```bash
docker exec -it redis-server redis-cli
```

List keys:

```bash
KEYS *
```

Get value:

```bash
GET key-name
```

Delete key:

```bash
DEL key-name
```

Clear all keys:

```bash
FLUSHALL
```
