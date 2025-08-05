import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';

interface KYCDocument {
  type: string;
  status: 'uploaded' | 'pending' | 'verified' | 'rejected';
  fileName?: string;
  uploadDate?: string;
  expiryDate?: string;
  documentNumber?: string;
  isRequired: boolean;
}

interface KYCTabProps {
  customerName: string;
}

const KYCTab = ({ customerName }: KYCTabProps) => {
  const [documents, setDocuments] = useState<KYCDocument[]>([
    {
      type: 'PAN Card',
      status: 'verified',
      fileName: 'pan_priya_sharma.pdf',
      uploadDate: '15 Mar 2024',
      documentNumber: 'ABCDE1234F',
      isRequired: true
    },
    {
      type: 'Aadhar Card',
      status: 'verified',
      fileName: 'aadhar_priya_sharma.pdf',
      uploadDate: '15 Mar 2024',
      documentNumber: 'XXXX XXXX 5678',
      isRequired: true
    },
    {
      type: 'Driving License',
      status: 'uploaded',
      fileName: 'driving_license_priya.pdf',
      uploadDate: '20 Mar 2024',
      expiryDate: '15 Jun 2030',
      documentNumber: 'MH12 20240012345',
      isRequired: false
    },
    {
      type: 'Passport',
      status: 'pending',
      isRequired: false
    },
    {
      type: 'Electricity Bill',
      status: 'verified',
      fileName: 'electricity_bill_mar2024.pdf',
      uploadDate: '18 Mar 2024',
      isRequired: true
    },
    {
      type: 'Rent Agreement',
      status: 'pending',
      isRequired: false
    },
    {
      type: 'GST Certificate',
      status: 'pending',
      isRequired: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'uploaded': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle size={16} className="text-green-600" />;
      case 'uploaded': return <FileText size={16} className="text-blue-600" />;
      case 'pending': return <AlertCircle size={16} className="text-yellow-600" />;
      case 'rejected': return <AlertCircle size={16} className="text-red-600" />;
      default: return <FileText size={16} className="text-gray-600" />;
    }
  };

  const handleFileUpload = (documentType: string) => {
    // Simulate file upload
    console.log(`Uploading file for ${documentType}`);
    setDocuments(prev => 
      prev.map(doc => 
        doc.type === documentType 
          ? { ...doc, status: 'uploaded' as const, fileName: `${documentType.toLowerCase().replace(' ', '_')}_${Date.now()}.pdf`, uploadDate: new Date().toLocaleDateString() }
          : doc
      )
    );
  };

  const handleViewDocument = (document: KYCDocument) => {
    console.log(`Viewing document: ${document.fileName}`);
  };

  const handleDownloadDocument = (document: KYCDocument) => {
    console.log(`Downloading document: ${document.fileName}`);
  };

  const requiredDocuments = documents.filter(doc => doc.isRequired);
  const optionalDocuments = documents.filter(doc => !doc.isRequired);
  const completionPercentage = Math.round((requiredDocuments.filter(doc => doc.status === 'verified').length / requiredDocuments.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">KYC Documentation</h3>
          <p className="text-sm text-gray-600">Manage customer verification documents</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="text-gray-600">Completion: </span>
            <span className="font-medium text-teal-600">{completionPercentage}%</span>
          </div>
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-teal-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <AlertCircle size={18} className="mr-2 text-red-600" />
            Required Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requiredDocuments.map((document, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  {getStatusIcon(document.status)}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{document.type}</h4>
                    {document.fileName && (
                      <p className="text-xs text-gray-600">{document.fileName}</p>
                    )}
                    {document.documentNumber && (
                      <p className="text-xs text-gray-500">Doc No: {document.documentNumber}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {document.uploadDate && (
                        <span className="text-xs text-gray-500">Uploaded: {document.uploadDate}</span>
                      )}
                      {document.expiryDate && (
                        <span className="text-xs text-gray-500">Expires: {document.expiryDate}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <Badge className={`${getStatusColor(document.status)} text-xs`}>
                    {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                  </Badge>
                  <div className="flex space-x-2">
                    {document.status === 'pending' ? (
                      <>
                        <input
                          type="file"
                          id={`upload-${index}`}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={() => handleFileUpload(document.type)}
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.document.getElementById(`upload-${index}`)?.click()}
                          className="text-xs"
                        >
                          <Upload size={12} className="mr-1" />
                          Upload
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDocument(document)}
                          className="text-xs"
                        >
                          <Eye size={12} className="mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadDocument(document)}
                          className="text-xs"
                        >
                          <Download size={12} className="mr-1" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Optional Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <FileText size={18} className="mr-2 text-blue-600" />
            Optional Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {optionalDocuments.map((document, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  {getStatusIcon(document.status)}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{document.type}</h4>
                    {document.fileName && (
                      <p className="text-xs text-gray-600">{document.fileName}</p>
                    )}
                    {document.documentNumber && (
                      <p className="text-xs text-gray-500">Doc No: {document.documentNumber}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {document.uploadDate && (
                        <span className="text-xs text-gray-500">Uploaded: {document.uploadDate}</span>
                      )}
                      {document.expiryDate && (
                        <span className="text-xs text-gray-500">Expires: {document.expiryDate}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <Badge className={`${getStatusColor(document.status)} text-xs`}>
                    {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                  </Badge>
                  <div className="flex space-x-2">
                    {document.status === 'pending' ? (
                      <>
                        <input
                          type="file"
                          id={`upload-optional-${index}`}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={() => handleFileUpload(document.type)}
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.document.getElementById(`upload-optional-${index}`)?.click()}
                          className="text-xs"
                        >
                          <Upload size={12} className="mr-1" />
                          Upload
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDocument(document)}
                          className="text-xs"
                        >
                          <Eye size={12} className="mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadDocument(document)}
                          className="text-xs"
                        >
                          <Download size={12} className="mr-1" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Document Upload Summary */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-base">KYC Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {documents.filter(doc => doc.status === 'verified').length}
              </div>
              <div className="text-xs text-gray-600">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {documents.filter(doc => doc.status === 'uploaded').length}
              </div>
              <div className="text-xs text-gray-600">Under Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {documents.filter(doc => doc.status === 'pending').length}
              </div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{completionPercentage}%</div>
              <div className="text-xs text-gray-600">Complete</div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default KYCTab;