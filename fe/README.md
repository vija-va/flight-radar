## created and tested on node 24.14.0
### Install & Start

```bash
cd fe
npm install
npm run dev
```

#### Configuration

Create `fe/.env` by copying the `fe/.env.example` file:

```env
VITE_WS_URL=ws://localhost:4000
```

#### Environment variable description

- `VITE_WS_URL`: WebSocket server url
