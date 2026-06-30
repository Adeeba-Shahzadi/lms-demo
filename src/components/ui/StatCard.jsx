import { Card } from './Card';

export function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value} from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 bg-emerald-50 text-[#3b4e33] rounded-full flex items-center justify-center">
            <Icon size={24} />
          </div>
        )}
      </div>
    </Card>
  );
}
