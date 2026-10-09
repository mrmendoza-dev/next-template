"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * SSR-safe localStorage hook: initial render matches server (default), then hydrates from storage.
 */
export const useLocalStorage = <T>(
	key: string,
	defaultValue: T,
): [T, (value: T | ((prev: T) => T)) => void] => {
	const [state, setState] = useState<T>(defaultValue);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(key);
			if (raw != null) {
				setState(JSON.parse(raw) as T);
			}
		} catch {
			// ignore invalid JSON
		}
	}, [key]);

	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			setState((prev) => {
				const next =
					typeof value === "function" ? (value as (p: T) => T)(prev) : value;
				try {
					localStorage.setItem(key, JSON.stringify(next));
				} catch {
					// quota / private mode
				}
				return next;
			});
		},
		[key],
	);

	return [state, setValue];
};
