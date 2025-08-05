
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Save, X } from 'lucide-react';

interface KRA {
  id: string;
  role: string;
  title: string;
  type: string;
  target: number;
  unit: string;
  weightage: number;
  thresholds: {
    red: number;
    amber: number;
    green: number;
  };
  period: string;
}

interface RoleKRATableProps {
  role: string;
  kras: KRA[];
  onUpdateKRA: (id: string, updatedData: any) => void;
  onDeleteKRA: (id: string) => void;
}

const RoleKRATable = ({ role, kras, onUpdateKRA, onDeleteKRA }: RoleKRATableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const startEdit = (kra: KRA) => {
    setEditingId(kra.id);
    setEditData(kra);
  };

  const saveEdit = () => {
    if (editingId) {
      onUpdateKRA(editingId, editData);
      setEditingId(null);
      setEditData({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const getTypeColor = (type: string) => {
    return type === 'numeric' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const getPeriodColor = (period: string) => {
    const colors = {
      daily: 'bg-purple-100 text-purple-800',
      weekly: 'bg-indigo-100 text-indigo-800',
      monthly: 'bg-blue-100 text-blue-800',
      quarterly: 'bg-cyan-100 text-cyan-800'
    };
    return colors[period as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const totalWeightage = kras.reduce((sum, kra) => sum + kra.weightage, 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">{role} KRAs</h3>
          <p className="text-sm text-gray-600">
            Total Weightage: {totalWeightage}%
            {totalWeightage !== 100 && (
              <span className="text-red-600 ml-2">
                ({totalWeightage > 100 ? 'Exceeds' : 'Below'} 100%)
              </span>
            )}
          </p>
        </div>
      </div>

      {kras.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No KRAs configured for this role yet.</p>
          <p className="text-sm">Click "Add KRA" to get started.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>KRA Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Weightage</TableHead>
                <TableHead>Thresholds (R/A/G)</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kras.map((kra) => (
                <TableRow key={kra.id}>
                  <TableCell>
                    {editingId === kra.id ? (
                      <Input
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                        className="min-w-40"
                      />
                    ) : (
                      <div>
                        <div className="font-medium">{kra.title}</div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(kra.type)}>
                      {kra.type === 'numeric' ? 'Numeric' : 'Percentage'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {editingId === kra.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={editData.target}
                          onChange={(e) => setEditData({...editData, target: Number(e.target.value)})}
                          className="w-16"
                        />
                        <Input
                          value={editData.unit}
                          onChange={(e) => setEditData({...editData, unit: e.target.value})}
                          className="w-16"
                          placeholder="unit"
                        />
                      </div>
                    ) : (
                      <span>{kra.target} {kra.unit}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === kra.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={editData.weightage}
                          onChange={(e) => setEditData({...editData, weightage: Number(e.target.value)})}
                          className="w-16"
                          min="0"
                          max="100"
                        />
                        <span>%</span>
                      </div>
                    ) : (
                      <span className="font-medium">{kra.weightage}%</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-red-600">&lt;{kra.thresholds.red}%</span>
                      <span className="text-yellow-600">{kra.thresholds.red}-{kra.thresholds.amber}%</span>
                      <span className="text-green-600">≥{kra.thresholds.green}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPeriodColor(kra.period)}>
                      {kra.period}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {editingId === kra.id ? (
                        <>
                          <Button size="sm" onClick={saveEdit} className="h-7 w-7 p-0">
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit} className="h-7 w-7 p-0">
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => startEdit(kra)} className="h-7 w-7 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => onDeleteKRA(kra.id)} 
                            className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RoleKRATable;
