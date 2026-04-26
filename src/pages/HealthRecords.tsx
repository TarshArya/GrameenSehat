import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockHealthRecords } from '@/data/mockData';
import { 
  FileText, 
  Download, 
  Search, 
  Calendar, 
  User, 
  Stethoscope,
  Pill,
  TestTube,
  Heart,
  Plus,
  Filter
} from 'lucide-react';

const HealthRecords: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'consultation': return Stethoscope;
      case 'prescription': return Pill;
      case 'lab_report': return TestTube;
      case 'diagnosis': return Heart;
      default: return FileText;
    }
  };

  const getRecordColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-700';
      case 'prescription': return 'bg-green-100 text-green-700';
      case 'lab_report': return 'bg-purple-100 text-purple-700';
      case 'diagnosis': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredRecords = mockHealthRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.titlePunjabi.includes(searchTerm) ||
                         (record.doctorName && record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || record.type === selectedType;
    return matchesSearch && matchesType;
  });

  const recordTypes = [
    { value: 'all', label: 'All Records', icon: FileText },
    { value: 'consultation', label: 'Consultations', icon: Stethoscope },
    { value: 'prescription', label: 'Prescriptions', icon: Pill },
    { value: 'lab_report', label: 'Lab Reports', icon: TestTube },
    { value: 'diagnosis', label: 'Diagnosis', icon: Heart },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {t('health.records.title')}
              </h1>
              <p className="text-muted-foreground">
                Manage your digital health records and medical history
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary-dark">
              <Plus className="w-4 h-4 mr-2" />
              {t('health.records.add')}
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedType} onValueChange={setSelectedType}>
            <TabsList className="grid w-full grid-cols-5">
              {recordTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <TabsTrigger key={type.value} value={type.value} className="flex items-center space-x-1">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{type.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        {/* Health Records List */}
        <div className="space-y-4">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => {
              const Icon = getRecordIcon(record.type);
              return (
                <Card key={record.id} className="shadow-card hover:shadow-medical transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getRecordColor(record.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {language === 'pa' ? record.titlePunjabi : record.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {language === 'pa' ? record.contentPunjabi : record.content}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {record.type.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        {record.doctorName && (
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{record.doctorName}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>

                    {record.attachments && record.attachments.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-muted-foreground mb-2">Attachments:</p>
                        <div className="flex space-x-2">
                          {record.attachments.map((attachment, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              📎 {attachment}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">No records found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedType !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Your health records will appear here'}
              </p>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Record
              </Button>
            </div>
          )}
        </div>

        {/* Offline Access Notice */}
        <Card className="mt-8 border-primary bg-primary-light">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Download className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-primary">Offline Access Available</h3>
                <p className="text-sm text-primary/80">
                  All your health records are stored locally and accessible without internet connection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HealthRecords;