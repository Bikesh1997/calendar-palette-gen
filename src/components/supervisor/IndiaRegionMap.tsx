
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const IndiaRegionMap = () => {
  const regionData = [
    { region: 'North', value: '₹18.5L', color: '#f8f9fa' },
    { region: 'South', value: '₹15.2L', color: '#e9ecef' },
    { region: 'East', value: '₹8.7L', color: '#dee2e6' },
    { region: 'West', value: '₹12.1L', color: '#ced4da' },
    { region: 'Central', value: '₹6.3L', color: '#adb5bd' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          {/* India Map Image */}
          <div className="relative w-full max-w-sm h-96 flex justify-center">
            <img
              src={`${process.env.NODE_ENV === 'production' ? '/infinity-fincorp-solutions/' : ''}assets/989df0bb-e890-47fb-9f2d-7a1f2a1bdb09.png`}
              alt="India Regional Map"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Sales Figures */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {regionData.map((region) => (
              <div key={region.region} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: region.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">{region.region}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{region.value}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="w-full max-w-sm p-3 bg-teal-50 rounded-lg border border-teal-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-teal-800">Total Sales</span>
              <span className="text-lg font-bold text-teal-900">₹60.8L</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndiaRegionMap;
