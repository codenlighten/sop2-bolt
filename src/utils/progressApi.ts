import { User } from '../types';

const API_BASE = 'https://smart-certs-npkd4.ondigitalocean.app/api';

/**
 * Fetch a user's progress for a specific module.
 * @param {string} email 
 * @param {string} moduleId 
 * @returns {Promise<object>} progress object
 */
export async function getProgress(email: string, moduleId: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/progress/${encodeURIComponent(email)}/${encodeURIComponent(moduleId)}`);
    if (!res.ok) throw new Error(`Error fetching progress: ${res.statusText}`);
    const data = await res.json();
    return data.progress || {};
  } catch (error) {
    console.error(`Failed to fetch progress for ${moduleId}:`, error);
    return {};
  }
}

/**
 * Update/save a user's progress for a module.
 * @param {string} email
 * @param {string} moduleId
 * @param {object} progress arbitrary progress payload
 * @returns {Promise<boolean>} success
 */
export async function saveProgress(email: string, moduleId: string, progress: any): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, moduleId, progress })
    });
    if (!res.ok) throw new Error(`Error saving progress: ${res.statusText}`);
    const data = await res.json();
    return data.success || false;
  } catch (error) {
    console.error(`Failed to save progress for ${moduleId}:`, error);
    return false;
  }
}

/**
 * Check whether a user has completed the entire course.
 * @param {string} email
 * @returns {Promise<object>} e.g. { completed: true, date: "2025‑04‑17T12:34:56Z" }
 */
export async function checkCompletion(email: string): Promise<{ completed: boolean; date?: string }> {
  try {
    const res = await fetch(`${API_BASE}/completion/${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error(`Error checking completion: ${res.statusText}`);
    const data = await res.json();
    return data || { completed: false };
  } catch (error) {
    console.error('Failed to check completion status:', error);
    return { completed: false };
  }
}

/**
 * Retrieve a certificate PDF/JSON/whatever by its ID.
 * @param {string} certificateId
 * @returns {Promise<object>} Certificate data
 */
export async function getCertificate(certificateId: string): Promise<any> {
  try {
    const url = `${API_BASE}/certificates/${encodeURIComponent(certificateId)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error fetching certificate: ${res.statusText}`);
    const data = await res.json();
    return data || {};
  } catch (error) {
    console.error(`Failed to fetch certificate ${certificateId}:`, error);
    return {};
  }
}

/**
 * Sync local progress with the server
 * @param {string} email
 * @param {User['progress']} progress
 * @returns {Promise<boolean>} success
 */
export async function syncProgress(email: string, progress: User['progress']): Promise<boolean> {
  try {
    // Clean up any undefined moduleIds in quiz scores
    const cleanQuizScores = { ...progress.quizScores };
    if ('undefined' in cleanQuizScores) {
      delete cleanQuizScores['undefined'];
    }
    
    // Sync overall progress
    await saveProgress(email, 'overall', {
      completedChapters: progress.completedChapters,
      earnedBadges: progress.earnedBadges,
      timeSpent: progress.timeSpent,
      completedExercises: progress.completedExercises
    });
    
    // Sync quiz scores
    await saveProgress(email, 'quizzes', cleanQuizScores);
    
    // Sync simulation scores
    await saveProgress(email, 'simulations', progress.simulationScores);
    
    // Check if course is completed and send certificate request if needed
    const isCompleted = progress.completedChapters.length >= 10 && progress.earnedBadges.length >= 8;
    if (isCompleted) {
      await requestCertificate(email);
    }
    
    return true;
  } catch (error) {
    console.error('Error syncing progress:', error);
    return false;
  }
}

/**
 * Request a certificate for a completed course
 * @param {string} email
 * @returns {Promise<boolean>} success
 */
export async function requestCertificate(email: string): Promise<boolean> {
  try {
    // Calculate average score from localStorage
    const userProgress = localStorage.getItem('userProgress');
    let averageScore = 0;
    
    if (userProgress) {
      const progress = JSON.parse(userProgress);
      const quizScores = Object.values(progress.quizScores || {}) as number[];
      if (quizScores.length > 0) {
        averageScore = Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length);
      }
    }
    
    // Send certificate request to server
    const res = await fetch(`${API_BASE}/certificate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        courseName: 'Cryptocurrency Crime Investigation',
        score: averageScore
      })
    });
    
    if (!res.ok) throw new Error(`Error requesting certificate: ${res.statusText}`);
    const data = await res.json();
    return data.success || false;
  } catch (error) {
    console.error('Error requesting certificate:', error);
    return false;
  }
}

/**
 * Load all progress from the server
 * @param {string} email
 * @returns {Promise<User['progress']>} Complete progress object
 */
export async function loadAllProgress(email: string): Promise<User['progress'] | null> {
  try {
    // Load overall progress
    const overall = await getProgress(email, 'overall');
    
    // Load quiz scores
    const quizScores = await getProgress(email, 'quizzes');
    
    // Load simulation scores
    const simulationScores = await getProgress(email, 'simulations');
    
    return {
      completedChapters: overall.completedChapters || [],
      earnedBadges: overall.earnedBadges || [],
      quizScores: quizScores || {},
      simulationScores: simulationScores || {},
      timeSpent: overall.timeSpent || {},
      completedExercises: overall.completedExercises || [],
      failedAttempts: {},
      lastAccessed: overall.lastAccessed || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error loading progress:', error);
    return null;
  }
}

/**
 * Clean up localStorage by removing undefined module IDs
 */
export function cleanupLocalStorage(): void {
  try {
    const userProgress = localStorage.getItem('userProgress');
    if (userProgress) {
      const progress = JSON.parse(userProgress);
      if (progress.quizScores && 'undefined' in progress.quizScores) {
        delete progress.quizScores['undefined'];
        localStorage.setItem('userProgress', JSON.stringify(progress));
        console.log('Cleaned up undefined module IDs in localStorage');
      }
      
      // Also clean up simulationScores
      if (progress.simulationScores && 'undefined' in progress.simulationScores) {
        delete progress.simulationScores['undefined'];
        localStorage.setItem('userProgress', JSON.stringify(progress));
        console.log('Cleaned up undefined module IDs in simulationScores');
      }
    }
  } catch (error) {
    console.error('Error cleaning up localStorage:', error);
  }
}

/**
 * Track badge progress for a specific badge
 * @param {string} email 
 * @param {string} badgeId 
 * @param {number} progress 
 */
export async function trackBadgeProgress(email: string, badgeId: string, progress: number): Promise<boolean> {
  try {
    // Instead of using the badge-progress endpoint, we'll use the regular progress endpoint
    // with a special moduleId format to track badge progress
    const moduleId = `badge_${badgeId}`;
    
    const res = await saveProgress(email, moduleId, { progress });
    return res;
  } catch (error) {
    console.error(`Failed to track badge progress for ${badgeId}:`, error);
    return false;
  }
}