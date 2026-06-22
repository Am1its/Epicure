import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

let triggerIntersection: (isIntersecting: boolean) => void;

beforeEach(() => {
  window.IntersectionObserver = jest.fn((callback) => {
    triggerIntersection = (isIntersecting: boolean) =>
      callback(
        [{ isIntersecting } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    return {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    };
  }) as unknown as typeof IntersectionObserver;
});

test('returns false before intersection', () => {
  const el = document.createElement('div');
  const { result } = renderHook(() => {
    const ref = useRef(el);
    return useIntersectionObserver(ref);
  });
  expect(result.current).toBe(false);
});

test('returns true when element intersects', () => {
  const el = document.createElement('div');
  const { result } = renderHook(() => {
    const ref = useRef(el);
    return useIntersectionObserver(ref);
  });
  act(() => triggerIntersection(true));
  expect(result.current).toBe(true);
});

test('stays true after element leaves viewport (one-shot)', () => {
  const el = document.createElement('div');
  const { result } = renderHook(() => {
    const ref = useRef(el);
    return useIntersectionObserver(ref);
  });
  act(() => triggerIntersection(true));
  act(() => triggerIntersection(false));
  expect(result.current).toBe(true);
});
