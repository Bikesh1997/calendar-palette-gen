
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Upload, FileText, Image, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  type: 'note' | 'call' | 'meeting' | 'email';
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface LeadNotesModalProps {
  leadId: string;
  leadName: string;
}

const LeadNotesModal = ({ leadId, leadName }: LeadNotesModalProps) => {
  const [open, setOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<'note' | 'call' | 'meeting' | 'email'>('note');
  const { toast } = useToast();

  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'Initial contact made. Customer interested in business loan for expansion.',
      author: 'Rahul Sharma',
      timestamp: '2024-06-03 10:30 AM',
      type: 'call'
    },
    {
      id: '2',
      content: 'Sent loan application forms and required document checklist via email.',
      author: 'Rahul Sharma',
      timestamp: '2024-06-03 2:15 PM',
      type: 'email'
    },
    {
      id: '3',
      content: 'Customer requested meeting to discuss loan terms. Scheduled for tomorrow.',
      author: 'Rahul Sharma',
      timestamp: '2024-06-04 11:00 AM',
      type: 'note'
    }
  ]);

  const [attachments, setAttachments] = useState<Attachment[]>([
    {
      id: '1',
      name: 'Business_Registration_Certificate.pdf',
      type: 'application/pdf',
      size: '2.4 MB',
      uploadedBy: 'Rahul Sharma',
      uploadedAt: '2024-06-03'
    },
    {
      id: '2',
      name: 'Financial_Statements_2023.xlsx',
      type: 'application/excel',
      size: '1.8 MB',
      uploadedBy: 'Rahul Sharma',
      uploadedAt: '2024-06-03'
    }
  ]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      author: 'Rahul Sharma',
      timestamp: new Date().toLocaleString(),
      type: noteType
    };

    setNotes(prev => [note, ...prev]);
    setNewNote('');
    toast({
      title: "Note Added",
      description: "Note has been added to the lead.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const attachment: Attachment = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          uploadedBy: 'Rahul Sharma',
          uploadedAt: new Date().toLocaleDateString()
        };
        setAttachments(prev => [attachment, ...prev]);
      });
      toast({
        title: "Files Uploaded",
        description: `${files.length} file(s) uploaded successfully.`,
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call': return <span className="text-blue-600">📞</span>;
      case 'meeting': return <span className="text-green-600">🤝</span>;
      case 'email': return <span className="text-purple-600">📧</span>;
      default: return <span className="text-gray-600">📝</span>;
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image size={16} className="text-blue-600" />;
    return <FileText size={16} className="text-gray-600" />;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquare size={16} className="mr-2" />
          Notes & Files
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Notes & Attachments - {leadName}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notes Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Activity Timeline</h3>
            
            {/* Add New Note */}
            <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
              <div className="flex space-x-2">
                <select 
                  value={noteType} 
                  onChange={(e) => setNoteType(e.target.value as any)}
                  className="px-2 py-1 border rounded text-sm"
                >
                  <option value="note">Note</option>
                  <option value="call">Call</option>
                  <option value="meeting">Meeting</option>
                  <option value="email">Email</option>
                </select>
              </div>
              <Textarea
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
              />
              <Button onClick={handleAddNote} size="sm">
                Add Note
              </Button>
            </div>

            {/* Notes List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notes.map((note) => (
                <div key={note.id} className="p-3 border rounded-lg bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(note.type)}
                      <Badge variant="outline" className="text-xs">
                        {note.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{note.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{note.content}</p>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">RS</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-600">{note.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Documents & Files</h3>
            
            {/* File Upload */}
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-sm text-gray-600">
                  Click to upload files or drag and drop
                </span>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </Label>
            </div>

            {/* Attachments List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {attachments.map((attachment) => (
                <div key={attachment.id} className="p-3 border rounded-lg bg-white hover:shadow-sm">
                  <div className="flex items-start space-x-3">
                    {getFileIcon(attachment.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {attachment.name}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{attachment.size}</span>
                        <span>•</span>
                        <span>Uploaded by {attachment.uploadedBy}</span>
                        <span>•</span>
                        <span>{attachment.uploadedAt}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadNotesModal;
