export const backoff = (attempt: number): number => {
    return Math.min(10000 + Math.random() * 1000, 1000 * 2 ** attempt + Math.random() * 1000);
};
