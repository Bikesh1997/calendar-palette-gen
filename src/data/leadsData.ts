
interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  status: string;
  source: string;
  value: string;
  assignedTo: string;
  assignedToId: string;
  lastContact: string;
  priority: string;
  starred?: boolean;
}

export const allLeads: Lead[] = [
  {
    id: 'LEAD001',
    name: 'TechCorp Solutions',
    contact: 'Ravi Kumar',
    phone: '+91 98765 43210',
    email: 'ravi@techcorp.com',
    status: 'new',
    source: 'Website Forms',
    value: '₹25,00,000',
    assignedTo: 'Rahul Sharma',
    assignedToId: '1',
    lastContact: '2 hours ago',
    priority: 'High',
    starred: true
  },
  {
    id: 'LEAD002',
    name: 'Sunrise Enterprises',
    contact: 'Meera Patel',
    phone: '+91 98765 43211',
    email: 'meera@sunrise.com',
    status: 'qualified',
    source: 'WhatsApp Business',
    value: '₹15,00,000',
    assignedTo: 'Anjali Patel',
    assignedToId: '2',
    lastContact: '4 hours ago',
    priority: 'Medium',
    starred: true
  },
  {
    id: 'LEAD003',
    name: 'Green Valley Farms',
    contact: 'Suresh Singh',
    phone: '+91 98765 43212',
    email: 'suresh@greenvalley.com',
    status: 'proposal',
    source: 'Call Center',
    value: '₹30,00,000',
    assignedTo: 'Vikash Kumar',
    assignedToId: '3',
    lastContact: '1 day ago',
    priority: 'High',
    starred: true
  },
  {
    id: 'LEAD004',
    name: 'Urban Developers',
    contact: 'Heena Thakkar',
    phone: '+91 98765 43213',
    email: 'priya@urban.com',
    status: 'converted',
    source: 'Website Forms',
    value: '₹50,00,000',
    assignedTo: 'Priya Singh',
    assignedToId: '4',
    lastContact: '3 days ago',
    priority: 'Low'
  },
  {
    id: 'LEAD005',
    name: 'Quick Transport',
    contact: 'Amit Gupta',
    phone: '+91 98765 43214',
    email: 'amit@quicktransport.com',
    status: 'new',
    source: 'WhatsApp Business',
    value: '₹20,00,000',
    assignedTo: 'Rahul Sharma',
    assignedToId: '1',
    lastContact: '5 hours ago',
    priority: 'Medium'
  },
  // Generate additional 95 leads to reach 100 total
  ...Array.from({ length: 95 }, (_, index) => {
    const leadNumber = (index + 6).toString().padStart(3, '0');
    const companies = [
      'Tech Innovations', 'Digital Solutions', 'Smart Systems', 'Future Corp', 'Alpha Industries',
      'Beta Technologies', 'Gamma Enterprises', 'Delta Services', 'Epsilon Group', 'Zeta Corp',
      'Theta Solutions', 'Lambda Tech', 'Sigma Industries', 'Omega Systems', 'Phoenix Corp',
      'Aurora Tech', 'Nova Solutions', 'Stellar Systems', 'Cosmic Corp', 'Quantum Tech',
      'Vector Solutions', 'Matrix Corp', 'Nexus Tech', 'Vertex Systems', 'Apex Corp',
      'Prime Solutions', 'Elite Tech', 'Summit Corp', 'Peak Systems', 'Crown Tech'
    ];
    
    const contacts = [
      'Rajesh Kumar', 'Sunita Sharma', 'Arjun Patel', 'Kavya Singh', 'Rohit Gupta',
      'Priyanka Yadav', 'Deepak Joshi', 'Neha Agarwal', 'Sanjay Verma', 'Pooja Mishra',
      'Vinay Tiwari', 'Shweta Pandey', 'Manoj Dubey', 'Rekha Sinha', 'Ashok Rai',
      'Geeta Nair', 'Sunil Jain', 'Madhuri Saxena', 'Ramesh Rao', 'Kiran Reddy'
    ];
    
    const statuses = ['new', 'qualified', 'proposal', 'converted', 'lost'];
    const sources = ['Website Forms', 'WhatsApp Business', 'Call Center'];
    const priorities = ['High', 'Medium', 'Low'];
    const assignees = [
      { name: 'Rahul Sharma', id: '1' },
      { name: 'Anjali Patel', id: '2' },
      { name: 'Vikash Kumar', id: '3' },
      { name: 'Priya Singh', id: '4' }
    ];
    
    const company = companies[index % companies.length];
    const contact = contacts[index % contacts.length];
    const status = statuses[index % statuses.length];
    const source = sources[index % sources.length];
    const priority = priorities[index % priorities.length];
    const assignee = assignees[index % assignees.length];
    
    const value = (Math.floor(Math.random() * 50) + 10) * 100000;
    const lastContactOptions = ['1 hour ago', '3 hours ago', '1 day ago', '2 days ago', '1 week ago'];
    
    return {
      id: `LEAD${leadNumber}`,
      name: company,
      contact: contact,
      phone: `+91 ${Math.floor(Math.random() * 90000) + 10000} ${Math.floor(Math.random() * 90000) + 10000}`,
      email: `${contact.toLowerCase().replace(' ', '.')}@${company.toLowerCase().replace(' ', '')}.com`,
      status: status,
      source: source,
      value: `₹${(value / 100000).toFixed(0)},00,000`,
      assignedTo: assignee.name,
      assignedToId: assignee.id,
      lastContact: lastContactOptions[index % lastContactOptions.length],
      priority: priority
    };
  })
];
