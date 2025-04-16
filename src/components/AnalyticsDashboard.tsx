import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import {
  BarChart,
  Activity,
  Award,
  Clock,
  TrendingUp,
  Star,
  CheckCircle,
  Calendar
} from 'lucide-react';

export function AnalyticsDashboard() {
  const { getAnalytics } = useAnalytics();
  const analytics = getAnalytics();

  if (!analytics) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <Activity className="w-8 h-8 mx-auto mb-2" />
          <p>No analytics data available yet</p>
        </div>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const formatDuration = (start: string, end: string) => {
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.floor(duration / 1000 / 60);
    return `${minutes} minutes`;
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-blue-900">Completion</h3>
          </div>
          <p className="text-2xl font-semibold text-blue-700">
            {analytics.progress.completion}%
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-green-600" />
            <h3 className="font-medium text-green-900">Average Score</h3>
          </div>
          <p className="text-2xl font-semibold text-green-700">
            {analytics.progress.averageScore.toFixed(1)}%
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-purple-900">Points</h3>
          </div>
          <p className="text-2xl font-semibold text-purple-700">
            {analytics.achievements.points}
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-yellow-600" />
            <h3 className="font-medium text-yellow-900">Engagement</h3>
          </div>
          <p className="text-2xl font-semibold text-yellow-700">
            {analytics.progress.engagement}%
          </p>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
        <div className="space-y-4">
          {analytics.sessions.slice(-5).reverse().map((session, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-900">
                    {formatDate(session.start)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">
                    {session.end ? formatDuration(session.start, session.end) : 'Active'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Chapters</div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{session.chapters.length}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Points</div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span>{session.points}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Badges Earned</h4>
            <div className="space-y-2">
              {Object.entries(analytics.achievements.badges).map(([badge, date]) => (
                <div key={badge} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span>{badge}</span>
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(date)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Certificates</h4>
            <div className="space-y-2">
              {Object.entries(analytics.achievements.certificates).map(([cert, date]) => (
                <div key={cert} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{cert}</span>
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(date)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}