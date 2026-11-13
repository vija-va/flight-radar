import { backoff } from './utils.ts';
import { HEARTBEAT_RATE, NOT_FOUND_ERROR_CODE } from './constants.ts';
import type { SocketStatus, SubscribeMessage } from '../types.ts';

interface SocketOptions {
    url: string;
    onMessage: (msg: unknown) => void;
    onStatus: (status: SocketStatus, attempt: number, reason?: string) => void;
}

export class Socket {
    private ws: WebSocket | null = null;

    private readonly options: SocketOptions;

    private stopped = true;

    private attempt = 0;
    private reconnectTimer?: ReturnType<typeof setTimeout>;
    private heartbeatTimer?: ReturnType<typeof setTimeout>;

    constructor(options: SocketOptions) {
        this.options = options;
    }

    connect() {
        if (!this.stopped) return;
        this.stopped = false;
        this.options.onStatus('connecting', this.attempt);
        this.open();
    }

    disconnect() {
        this.options.onStatus('closed', this.attempt);
        this.close();
    }

    send(msg: SubscribeMessage): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(msg));
        }
    }

    private open() {
        const ws = new WebSocket(this.options.url);

        ws.onopen = () => {
            if (ws !== this.ws) return;
            this.attempt = 0;
            this.resetHeartbeat();
            this.options.onStatus('open', this.attempt);
        };

        ws.onclose = (event) => {
            if (ws !== this.ws) return;
            if (event.code === NOT_FOUND_ERROR_CODE) {
                this.options.onStatus('closed', this.attempt, event.reason);
                this.close();
            } else {
                this.handleClose();
            }
        };
        ws.onmessage = (ev: MessageEvent<unknown>) => {
            if (ws !== this.ws) return;
            this.handleMessage(ev.data);
        };

        this.ws = ws;
    }

    private close() {
        this.stopped = true;
        clearTimeout(this.reconnectTimer);
        clearTimeout(this.heartbeatTimer);
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    private handleMessage(msg: unknown) {
        let message: unknown;
        try {
            if (typeof msg === 'string') {
                message = JSON.parse(msg);
            }
        } catch {
            return;
        }

        this.options.onMessage(message);

        this.resetHeartbeat();
    }

    private handleClose() {
        if (!this.stopped) {
            this.ws = null;
            clearTimeout(this.heartbeatTimer);
            this.scheduleReconnect();
        }
    }

    private scheduleReconnect() {
        clearTimeout(this.reconnectTimer);
        const delay = backoff(this.attempt);
        this.reconnectTimer = setTimeout(this.open.bind(this), delay);
        this.attempt += 1;
        this.options.onStatus('reconnecting', this.attempt);
    }

    private resetHeartbeat() {
        clearTimeout(this.heartbeatTimer);

        this.heartbeatTimer = setTimeout(() => {
            this.ws?.close();
            this.handleClose();
        }, HEARTBEAT_RATE);
    }
}
