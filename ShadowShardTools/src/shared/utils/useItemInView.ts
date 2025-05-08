// useItemInView.ts
import { useInView } from 'react-intersection-observer';

/**
 * Custom hook to create an array of InView refs for staggered animations
 * @param count Number of items to create refs for
 * @param threshold Optional threshold for triggering the inView state
 * @param triggerOnce Optional boolean to trigger only once (defaults to true)
 * @returns Array of {ref, inView} objects
 */
export function useItemsInView(
  count: number, 
  threshold: number = 0.1, 
  triggerOnce: boolean = true
) {
  // Create an array of refs with fixed length
  const refs = Array.from({ length: count }, () => 
    useInView({
      threshold,
      triggerOnce,
      // Add a small random delay to make animations less mechanical
      rootMargin: `0px 0px ${Math.random() * 100}px 0px`
    })
  );
  
  return refs;
}