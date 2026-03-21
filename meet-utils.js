import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ── Active meet ──────────────────────────────────────────────────────────────

export function setActiveMeet(meetId) {
  localStorage.setItem("activeMeetId", meetId);
}

export function getActiveMeetId() {
  return localStorage.getItem("activeMeetId");
}

export async function getActiveMeet() {
  const meetId = getActiveMeetId();
  if (!meetId) return null;
  const snap = await getDoc(doc(db, "meets", meetId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// ── Attempt formatting ───────────────────────────────────────────────────────

/**
 * Returns display data for an attempt chip.
 * @param {number|null} weight
 * @param {""|"g"|"x"} result
 * @returns {{ label: string, colorClass: string, icon: string }}
 */
export function formatAttempt(weight, result) {
  if (!weight && weight !== 0) {
    return { label: "—", colorClass: "attempt-empty", icon: "" };
  }
  const label = weight + " lbs";
  if (result === "g") {
    return { label, colorClass: "attempt-good", icon: "fa-check" };
  } else if (result === "x") {
    return { label, colorClass: "attempt-fail", icon: "fa-xmark" };
  } else {
    return { label, colorClass: "attempt-pending", icon: "" };
  }
}

// ── Scoring ──────────────────────────────────────────────────────────────────

function bestGood(a1, r1, a2, r2, a3, r3) {
  const attempts = [
    { w: a1, r: r1 },
    { w: a2, r: r2 },
    { w: a3, r: r3 },
  ];
  const goods = attempts.filter(a => a.r === "g" && a.w > 0).map(a => a.w);
  return goods.length ? Math.max(...goods) : 0;
}

export function calcTotal(athlete) {
  const sq = bestGood(
    athlete.squat1, athlete.squat1Result,
    athlete.squat2, athlete.squat2Result,
    athlete.squat3, athlete.squat3Result
  );
  const be = bestGood(
    athlete.bench1, athlete.bench1Result,
    athlete.bench2, athlete.bench2Result,
    athlete.bench3, athlete.bench3Result
  );
  const dl = bestGood(
    athlete.dead1, athlete.dead1Result,
    athlete.dead2, athlete.dead2Result,
    athlete.dead3, athlete.dead3Result
  );
  // Only show total if all three events have at least one good lift
  if (sq === 0 || be === 0 || dl === 0) return null;
  return sq + be + dl;
}

export function bestSquat(athlete) {
  return bestGood(
    athlete.squat1, athlete.squat1Result,
    athlete.squat2, athlete.squat2Result,
    athlete.squat3, athlete.squat3Result
  );
}

export function bestBench(athlete) {
  return bestGood(
    athlete.bench1, athlete.bench1Result,
    athlete.bench2, athlete.bench2Result,
    athlete.bench3, athlete.bench3Result
  );
}

export function bestDead(athlete) {
  return bestGood(
    athlete.dead1, athlete.dead1Result,
    athlete.dead2, athlete.dead2Result,
    athlete.dead3, athlete.dead3Result
  );
}

// ── Weight class ordering ─────────────────────────────────────────────────────

const WC_ORDER = ["97", "105", "114", "123", "132", "148", "165", "181", "198", "220", "242", "275", "308", "220+", "308+", "SHW"];

export function weightClassSort(a, b) {
  const ai = WC_ORDER.indexOf(a);
  const bi = WC_ORDER.indexOf(b);
  if (ai === -1 && bi === -1) return a.localeCompare(b);
  if (ai === -1) return 1;
  if (bi === -1) return -1;
  return ai - bi;
}
