import { writable } from 'svelte/store';

export const activeVideoKey = writable<string | null>(null);
