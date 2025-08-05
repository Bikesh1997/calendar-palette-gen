
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';
import CustomerTable from '@/components/customers/CustomerTable';
import LeadsPagination from '@/components/leads/LeadsPagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Customer360 = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const urlCustomer = searchParams.get('customer');
  
  const [selectedCustomer, setSelectedCustomer] = useState(urlCustomer || 'priya-sharma');
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  // Generate additional random leads
  const generateRandomLeads = () => {
    const companies = [
      'Tech Innovations', 'Digital Solutions', 'Smart Systems', 'Future Corp', 'DataFlow Inc',
      'CloudTech Ltd', 'NextGen Software', 'AI Dynamics', 'Cyber Solutions', 'InfoTech Pro',
      'WebFlow Agency', 'CodeCraft Studios', 'TechPrime Ltd', 'Digital Edge', 'Innovation Hub',
      'SmartBiz Corp', 'TechVision Inc', 'DataCore Systems', 'CloudFirst Ltd', 'DevTech Solutions',
      'ByteCode Corp', 'TechMaster Inc', 'Digital World', 'CyberEdge Ltd', 'InfoSys Pro',
      'WebTech Innovations', 'CodeSphere Inc', 'TechFlow Ltd', 'Digital Craft', 'SmartCode Corp',
      'TechAdvance Inc', 'DataStream Ltd', 'CloudCore Systems', 'DevFlow Corp', 'ByteStream Inc',
      'TechNova Ltd', 'Digital Hub', 'CyberFlow Corp', 'InfoFlow Inc', 'WebCore Systems',
      'CodeFlow Ltd', 'TechSphere Corp', 'Digital Stream', 'SmartFlow Inc', 'TechCore Systems',
      'DataEdge Ltd', 'CloudStream Corp', 'DevCore Inc', 'ByteFlow Systems', 'TechStream Ltd'
    ];
    
    const contacts = [
      'Amit Sharma', 'Priya Singh', 'Rohit Kumar', 'Sneha Patel', 'Vikash Gupta',
      'Neha Agarwal', 'Suresh Reddy', 'Kavita Joshi', 'Manoj Yadav', 'Pooja Verma',
      'Rajesh Mishra', 'Sunita Devi', 'Arjun Singh', 'Meera Nair', 'Kiran Jain',
      'Sanjay Tiwari', 'Rekha Sharma', 'Deepak Rao', 'Gita Kumari', 'Ravi Chandra',
      'Seema Gupta', 'Anil Pandey', 'Shweta Roy', 'Harish Sinha', 'Divya Malhotra',
      'Yogesh Kapoor', 'Ritu Bansal', 'Nikhil Saxena', 'Swati Chopra', 'Manish Agarwal',
      'Anita Joshi', 'Sunil Varma', 'Nisha Goel', 'Rahul Khanna', 'Preeti Sood',
      'Ashok Mittal', 'Sonia Gupta', 'Vivek Sharma', 'Jyoti Rana', 'Gaurav Singh',
      'Mamta Devi', 'Sachin Tomar', 'Bharti Jain', 'Pankaj Gupta', 'Rashmi Verma',
      'Dinesh Kumar', 'Asha Rani', 'Puneet Aggarwal', 'Shilpa Sethi', 'Mohit Garg'
    ];

    const sources = ['Website Forms', 'WhatsApp Business', 'Call Center', 'Social Media', 'Referral'];
    const statuses = ['new', 'qualified', 'proposal', 'converted'];
    const priorities = ['High', 'Medium', 'Low'];

    const newLeads = [];
    for (let i = 0; i < 50; i++) {
      const leadId = `L${String(allLeads.length + i + 1).padStart(3, '0')}`;
      const company = companies[Math.floor(Math.random() * companies.length)];
      const contact = contacts[Math.floor(Math.random() * contacts.length)];
      const phone = `+91 ${Math.floor(90000 + Math.random() * 10000)} ${Math.floor(10000 + Math.random() * 90000)}`;
      const email = `${contact.toLowerCase().replace(' ', '.')}@${company.toLowerCase().replace(' ', '')}.com`;
      const source = sources[Math.floor(Math.random() * sources.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      const value = `₹${Math.floor(5 + Math.random() * 45)}L`;

      newLeads.push({
        id: leadId,
        name: company,
        contact: contact,
        phone: phone,
        email: email,
        status: status,
        source: source,
        value: value,
        assignedTo: user?.name || 'Current User',
        assignedToId: user?.id || 'current',
        lastContact: `${Math.floor(1 + Math.random() * 10)} days ago`,
        priority: priority
      });
    }
    return newLeads;
  };

  // Combine original leads with new random leads
  const allLeadsWithRandom = [...allLeads, ...generateRandomLeads()];

  // Create customer data from leads
  const createCustomerFromLead = (lead: any) => {
    const customerKey = lead.contact.toLowerCase().replace(/\s+/g, '-');
    return {
      key: customerKey,
      name: lead.contact,
      id: lead.id,
      segment: lead.priority === 'High' ? 'Premium' : lead.priority === 'Medium' ? 'Gold' : 'Silver',
      relationshipValue: lead.priority === 'High' ? 'High' : 'Medium',
      totalRelationship: lead.value,
      phone: lead.phone,
      email: lead.email,
      address: 'Address not available',
      joinDate: '01 Jan 2024',
      lastContact: lead.lastContact,
      lastInteraction: lead.lastContact,
      riskScore: 'Low',
      products: [
        { type: 'Savings Account', balance: '₹1.5L', status: 'Active' },
      ],
      interactions: [
        { date: '25 May 2024', type: 'Call', purpose: 'Lead Follow-up', outcome: 'Interested' },
      ],
      family: [],
      opportunities: [
        { product: 'Personal Loan', priority: 'Medium', reason: 'New customer opportunity', potential: '₹5L' },
      ]
    };
  };

  // Enhanced customer data with additional family members for Neha's account + leads
  const staticCustomerData = {
    'priya-sharma': {
      name: 'Heena Thakkar',
      id: 'CUST001234',
      segment: 'Premium',
      relationshipValue: 'High',
      totalRelationship: '₹15.2L',
      phone: '+91 98765 43210',
      email: 'priya.sharma@email.com',
      address: 'Bandra West, Mumbai 400050',
      joinDate: '15 Mar 2019',
      lastInteraction: '2 days ago',
      riskScore: 'Low',
      products: [
        { type: 'Savings Account', balance: '₹2.5L', status: 'Active' },
        { type: 'Fixed Deposit', amount: '₹8L', maturity: '15 Dec 2024' },
        { type: 'Home Loan', outstanding: '₹45L', emi: '₹42,000' },
        { type: 'Credit Card', limit: '₹3L', utilization: '35%' },
      ],
      interactions: [
        { date: '25 May 2024', type: 'Call', purpose: 'FD Renewal Discussion', outcome: 'Interested' },
        { date: '20 May 2024', type: 'Branch Visit', purpose: 'Loan Documentation', outcome: 'Completed' },
        { date: '15 May 2024', type: 'Email', purpose: 'Insurance Product Offer', outcome: 'No Response' },
        { date: '10 May 2024', type: 'SMS', purpose: 'Payment Reminder', outcome: 'Paid' },
      ],
      family: [
        { 
          name: 'Rajesh Sharma', 
          relation: 'Spouse', 
          age: 45,
          products: ['Savings Account', 'SIP'], 
          relationshipValue: '₹8.5L',
          isCustomer: true,
          phone: '+91 98765 43211',
          email: 'rajesh.sharma@email.com',
          opportunities: ['Life Insurance', 'Personal Loan']
        },
        { 
          name: 'Arjun Sharma', 
          relation: 'Son', 
          age: 16,
          products: ['Student Account'],
          relationshipValue: '₹25K',
          isCustomer: true,
          opportunities: ['Education Loan', 'Study Abroad Loan']
        },
        { 
          name: 'Meera Sharma', 
          relation: 'Mother-in-law', 
          age: 68,
          products: [],
          isCustomer: false,
          phone: '+91 98765 43214',
          opportunities: ['Senior Citizen FD', 'Health Insurance', 'Pension Plan']
        }
      ],
      opportunities: [
        { product: 'Personal Loan', priority: 'High', reason: 'Good credit history & salary increment', potential: '₹8L' },
        { product: 'Life Insurance', priority: 'Medium', reason: 'Family protection needs', potential: '₹50L cover' },
        { product: 'Mutual Funds', priority: 'Low', reason: 'Investment diversification', potential: '₹2L SIP' },
      ]
    },
    'rajesh-kumar': {
      name: 'Rajesh Kumar',
      id: 'CUST001235',
      segment: 'Gold',
      relationshipValue: 'Medium',
      totalRelationship: '₹8.5L',
      phone: '+91 98765 43211',
      email: 'rajesh.kumar@email.com',
      address: 'Koramangala, Bangalore 560034',
      joinDate: '22 Jul 2020',
      lastInteraction: '1 week ago',
      riskScore: 'Medium',
      products: [
        { type: 'Savings Account', balance: '₹1.2L', status: 'Active' },
        { type: 'Personal Loan', outstanding: '₹3.5L', emi: '₹15,000' },
        { type: 'Credit Card', limit: '₹2L', utilization: '45%' },
      ],
      interactions: [
        { date: '18 May 2024', type: 'Call', purpose: 'Loan EMI Discussion', outcome: 'Completed' },
        { date: '10 May 2024', type: 'Email', purpose: 'Investment Product Offer', outcome: 'Interested' },
      ],
      family: [
        { name: 'Sunita Kumar', relation: 'Spouse', products: ['Savings Account'] },
      ],
      opportunities: [
        { product: 'Fixed Deposit', priority: 'High', reason: 'Surplus liquidity', potential: '₹5L' },
        { product: 'Health Insurance', priority: 'Medium', reason: 'Family health coverage', potential: '₹10L cover' },
      ]
    },
    'anita-patel': {
      name: 'Anita Patel',
      id: 'CUST001236',
      segment: 'Silver',
      relationshipValue: 'Medium',
      totalRelationship: '₹4.8L',
      phone: '+91 98765 43212',
      email: 'anita.patel@email.com',
      address: 'Satellite, Ahmedabad 380015',
      joinDate: '05 Jan 2022',
      lastInteraction: '3 days ago',
      riskScore: 'Low',
      products: [
        { type: 'Savings Account', balance: '₹85K', status: 'Active' },
        { type: 'SIP', amount: '₹2K/month', status: 'Active' },
      ],
      interactions: [
        { date: '22 May 2024', type: 'Branch Visit', purpose: 'Account Opening', outcome: 'Completed' },
        { date: '15 May 2024', type: 'Call', purpose: 'Product Information', outcome: 'Interested' },
      ],
      family: [],
      opportunities: [
        { product: 'Credit Card', priority: 'High', reason: 'Good salary and credit score', potential: '₹1.5L limit' },
        { product: 'Term Insurance', priority: 'Medium', reason: 'Young professional protection', potential: '₹25L cover' },
      ]
    },
    'vikram-singh': {
      name: 'Vikram Singh',
      id: 'CUST001237',
      segment: 'Premium',
      relationshipValue: 'High',
      totalRelationship: '₹22.3L',
      phone: '+91 98765 43213',
      email: 'vikram.singh@email.com',
      address: 'Vasant Kunj, New Delhi 110070',
      joinDate: '10 Nov 2018',
      lastInteraction: '5 days ago',
      riskScore: 'Low',
      products: [
        { type: 'Savings Account', balance: '₹5.2L', status: 'Active' },
        { type: 'Fixed Deposit', amount: '₹12L', maturity: '20 Jan 2025' },
        { type: 'Home Loan', outstanding: '₹65L', emi: '₹58,000' },
        { type: 'Credit Card', limit: '₹5L', utilization: '25%' },
        { type: 'SIP', amount: '₹10K/month', status: 'Active' },
      ],
      interactions: [
        { date: '20 May 2024', type: 'Call', purpose: 'Investment Review', outcome: 'Scheduled Meeting' },
        { date: '12 May 2024', type: 'Email', purpose: 'Premium Banking Offer', outcome: 'Interested' },
      ],
      family: [
        { name: 'Meera Singh', relation: 'Spouse', products: ['Savings Account', 'SIP', 'Term Insurance'] },
        { name: 'Kavya Singh', relation: 'Daughter', products: ['Minor Savings Account'] },
      ],
      opportunities: [
        { product: 'Business Loan', priority: 'High', reason: 'Expanding business operations', potential: '₹15L' },
        { product: 'Child Education Plan', priority: 'Medium', reason: 'Daughter\'s education planning', potential: '₹20L' },
      ]
    }
  };

  // Combine static customer data with leads data
  const customerData = { ...staticCustomerData };
  
  // Add customers from leads - ensure all leads are included
  allLeadsWithRandom.forEach(lead => {
    const customerKey = lead.contact.toLowerCase().replace(/\s+/g, '-');
    if (!customerData[customerKey]) {
      customerData[customerKey] = createCustomerFromLead(lead);
    }
  });

  const customers = Object.entries(customerData).map(([key, data]) => ({
    key,
    ...data
  }));

  // Pagination logic
  const totalCustomers = customers.length;
  const totalPages = Math.ceil(totalCustomers / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const paginatedCustomers = customers.slice(startIndex, startIndex + leadsPerPage);

  // Check if current user is Neha Gupta (Relationship Manager)
  const isNehaAccount = user?.id === '5' && user?.name === 'Neha Gupta';

  // Update selected customer when URL parameter changes
  useEffect(() => {
    if (urlCustomer && customerData[urlCustomer]) {
      setSelectedCustomer(urlCustomer);
    }
  }, [urlCustomer]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNehaAccount ? 'Advanced Customer 360° View' : 'Customer 360° View'}
          </h1>
          <p className="text-gray-600">
            {isNehaAccount ? 
              'Comprehensive relationship management with AI-powered insights' : 
              'Comprehensive customer relationship overview'
            }
          </p>
        </div>
      </div>

      {/* Customer Table */}
      <CustomerTable 
        customers={paginatedCustomers}
        selectedCustomer={selectedCustomer}
        onCustomerSelect={setSelectedCustomer}
      />
      
      {/* Pagination */}
      <div className="mt-4">
        <LeadsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          leadsPerPage={leadsPerPage}
          totalLeads={totalCustomers}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Customer360;
