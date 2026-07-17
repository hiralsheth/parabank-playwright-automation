/**
 * Lightweight step logger.
 * Prefixes each message with an ISO timestamp so output is easy to correlate
 * with Playwright trace and screenshot artifacts.
 */
export function log(message: string): void {
  console.log(`[ParaBank] ${new Date().toISOString()} — ${message}`);
}
