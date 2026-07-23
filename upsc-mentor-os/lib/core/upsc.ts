import { UPSC_SETTINGS } from "../constants";
import { getSubjects } from "../data/subjects";
import { getResources } from "../data/resources";
import { getPYQs } from "../data/pyqs";
import { getCurrentAffairs } from "../data/current-affairs";
import { getTests } from "../data/tests";

export function getDashboardStats() {
  return {
    subjects: getSubjects().length,
    resources: getResources().length,
    pyqs: getPYQs().length,
    currentAffairs: getCurrentAffairs().length,
    tests: getTests().length,
  };
}

export function getStudySettings() {
  return UPSC_SETTINGS;
}

export function getDailyStudyHours() {
  return UPSC_SETTINGS.dailyStudyHours;
}

export function getRevisionSchedule() {
  return UPSC_SETTINGS.revisionIntervals;
}

export function getWeeklyRevisionDay() {
  return UPSC_SETTINGS.weeklyRevisionDay;
}

export function getTargetScores() {
  return {
    prelims: UPSC_SETTINGS.targetPrelimsScore,
    mains: UPSC_SETTINGS.targetMainsScore,
  };
}

export function getAppSummary() {
  const stats = getDashboardStats();

  return {
    ...stats,
    dailyStudyHours: UPSC_SETTINGS.dailyStudyHours,
    revisionIntervals: UPSC_SETTINGS.revisionIntervals,
    targetPrelims: UPSC_SETTINGS.targetPrelimsScore,
    targetMains: UPSC_SETTINGS.targetMainsScore,
  };
}