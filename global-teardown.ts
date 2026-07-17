import * as fs from 'fs';
import * as path from 'path';

/**
 * Global Teardown — runs once after the entire test suite completes.
 *
 * Responsibilities:
 * - Log completion of the test run.
 * - Retain .auth/ files for post-run debugging (do NOT delete them here).
 *   If you want a clean slate for every run, uncomment the cleanup block.
 */
async function globalTeardown(): Promise<void> {
  console.log('\n[Teardown] ─── Global Teardown Starting ────────────────────');

  const credFile = path.join(__dirname, '.auth', 'credentials.json');
  if (fs.existsSync(credFile)) {
    const creds = JSON.parse(fs.readFileSync(credFile, 'utf-8'));
    console.log(`[Teardown] ✓ Session for user "${creds.username}" ended`);
  }

  // ── Optional: uncomment to delete session state after each run ────
  // const stateFile = path.join(__dirname, '.auth', 'session.json');
  // if (fs.existsSync(stateFile)) {
  //   fs.rmSync(stateFile);
  //   console.log('[Teardown] Session state deleted');
  // }

  console.log('[Teardown] ─── Global Teardown Complete ───────────────────\n');
}

export default globalTeardown;
