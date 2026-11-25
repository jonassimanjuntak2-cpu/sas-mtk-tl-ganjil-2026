/**
 * Independent mathematical verification helpers used in unit tests
 * to verify every polynomial & trigonometric solution key in the question bank.
 */

export function evalPoly(coeffsDesc: number[], x: number): number {
  return coeffsDesc.reduce((acc, c) => acc * x + c, 0);
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function approxEqual(a: number, b: number, eps = 1e-9): boolean {
  return Math.abs(a - b) <= eps;
}
