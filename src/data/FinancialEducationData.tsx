// Financial Education Content Types and Data
export interface FinancialTerm {
    id: string;
    term: string;
    definition: string;
    category: 'banking' | 'loans' | 'investments' | 'insurance' | 'payments' | 'credit';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    relatedTerms: string[];
    examples?: string[];
    language: 'en' | 'hi' | 'regional';
  }
  
  export interface HowToGuide {
    id: string;
    title: string;
    description: string;
    category: 'banking' | 'loans' | 'digital' | 'savings' | 'credit';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    readTime: number; // in minutes
    steps: GuideStep[];
    tags: string[];
    language: 'en' | 'hi' | 'regional';
    lastUpdated: string;
  }
  
  export interface GuideStep {
    id: string;
    title: string;
    description: string;
    image?: string;
    tips?: string[];
    warnings?: string[];
    examples?: string[];
  }
  
  export interface Calculator {
    id: string;
    name: string;
    description: string;
    category: 'loan' | 'savings' | 'investment' | 'tax';
    fields: CalculatorField[];
    formula: string;
    resultTemplate: string;
  }
  
  export interface CalculatorField {
    id: string;
    label: string;
    type: 'number' | 'percentage' | 'select' | 'currency';
    required: boolean;
    min?: number;
    max?: number;
    options?: string[];
    placeholder?: string;
  }
  
  // Sample Financial Terms Database
  export const financialTerms: FinancialTerm[] = [
    {
      id: '1',
      term: 'Savings Account',
      definition: 'A deposit account held at a bank that allows you to deposit money, keep it safe, and withdraw funds as needed while earning interest.',
      category: 'banking',
      difficulty: 'beginner',
      relatedTerms: ['Current Account', 'Fixed Deposit', 'Interest Rate'],
      examples: [
        'Keep emergency funds in a savings account',
        'Earn 3-4% annual interest on savings account balance'
      ],
      language: 'en'
    },
    {
      id: '2',
      term: 'EMI',
      definition: 'Equated Monthly Installment - A fixed payment amount made by a borrower to a lender at a specified date each calendar month.',
      category: 'loans',
      difficulty: 'beginner',
      relatedTerms: ['Principal', 'Interest Rate', 'Loan Tenure'],
      examples: [
        'Home loan EMI of ₹25,000 per month',
        'Car loan EMI calculation based on principal and interest'
      ],
      language: 'en'
    },
    {
      id: '3',
      term: 'CIBIL Score',
      definition: 'A 3-digit numeric summary of your credit history, ranging from 300 to 900. Higher scores indicate better creditworthiness.',
      category: 'credit',
      difficulty: 'intermediate',
      relatedTerms: ['Credit Report', 'Credit History', 'Default'],
      examples: [
        'Score above 750 is considered excellent',
        'Regular EMI payments improve CIBIL score'
      ],
      language: 'en'
    },
    {
      id: '4',
      term: 'KYC',
      definition: 'Know Your Customer - A process of verifying the identity of customers to prevent fraud and money laundering.',
      category: 'banking',
      difficulty: 'beginner',
      relatedTerms: ['Aadhar Card', 'PAN Card', 'Address Proof'],
      examples: [
        'Submit Aadhar and PAN for KYC compliance',
        'Video KYC for remote account opening'
      ],
      language: 'en'
    },
    {
      id: '5',
      term: 'Fixed Deposit',
      definition: 'A financial instrument where money is deposited for a fixed period at a predetermined interest rate.',
      category: 'investments',
      difficulty: 'beginner',
      relatedTerms: ['Interest Rate', 'Maturity', 'Premature Withdrawal'],
      examples: [
        '1-year FD at 6.5% interest rate',
        '₹1 lakh FD matures to ₹1.065 lakh after 1 year'
      ],
      language: 'en'
    }
  ];
  
  // Sample How-To Guides
  export const howToGuides: HowToGuide[] = [
    {
      id: '1',
      title: 'How to Open a infinity Fincorp Solutions',
      description: 'Step-by-step guide to opening your first savings account with infinity Fincorp Solutions',
      category: 'banking',
      difficulty: 'beginner',
      readTime: 5,
      tags: ['account opening', 'KYC', 'documents'],
      language: 'en',
      lastUpdated: '2024-01-15',
      steps: [
        {
          id: '1',
          title: 'Gather Required Documents',
          description: 'Collect your identity proof (Aadhar, PAN), address proof, and recent photographs',
          tips: ['Keep original documents for verification', 'Carry photocopies as well'],
          warnings: ['Ensure all documents are valid and not expired']
        },
        {
          id: '2',
          title: 'Visit Nearest infinity Fincorp Solutions Branch',
          description: 'Locate and visit the nearest infinity Fincorp Solutions branch or use online application',
          tips: ['Use branch locator on website', 'Check branch timings before visiting']
        },
        {
          id: '3',
          title: 'Fill Application Form',
          description: 'Complete the savings account application form with accurate details',
          tips: ['Double-check all information', 'Sign wherever required'],
          warnings: ['Provide accurate mobile number for SMS alerts']
        },
        {
          id: '4',
          title: 'Initial Deposit',
          description: 'Make the minimum initial deposit as per account type',
          tips: ['Ask about minimum balance requirements', 'Get deposit receipt']
        },
        {
          id: '5',
          title: 'Account Activation',
          description: 'Your account will be activated within 24-48 hours after successful KYC verification',
          tips: ['You will receive SMS confirmation', 'Debit card will be dispatched to registered address']
        }
      ]
    },
    {
      id: '2',
      title: 'How to Calculate Your EMI',
      description: 'Learn to calculate Equated Monthly Installments for loans using simple formulas',
      category: 'loans',
      difficulty: 'intermediate',
      readTime: 8,
      tags: ['EMI', 'calculation', 'loan planning'],
      language: 'en',
      lastUpdated: '2024-01-10',
      steps: [
        {
          id: '1',
          title: 'Understand EMI Components',
          description: 'EMI consists of principal repayment and interest payment',
          tips: ['Initial EMIs have higher interest component', 'Later EMIs have higher principal component']
        },
        {
          id: '2',
          title: 'Know the EMI Formula',
          description: 'EMI = [P x R x (1+R)^N] / [(1+R)^N-1] where P=Principal, R=Monthly Interest Rate, N=Number of months',
          tips: ['Convert annual interest rate to monthly by dividing by 12', 'Use online calculators for quick computation']
        },
        {
          id: '3',
          title: 'Apply the Formula',
          description: 'Substitute your loan amount, interest rate, and tenure in the formula',
          examples: ['₹5 lakh loan at 10% for 5 years = EMI of ₹10,624']
        }
      ]
    }
  ];
  
  // Sample Calculators
  export const calculators: Calculator[] = [
    {
      id: '1',
      name: 'EMI Calculator',
      description: 'Calculate your monthly EMI for home, personal, or vehicle loans',
      category: 'loan',
      fields: [
        {
          id: 'principal',
          label: 'Loan Amount',
          type: 'currency',
          required: true,
          min: 10000,
          max: 10000000,
          placeholder: 'Enter loan amount'
        },
        {
          id: 'rate',
          label: 'Annual Interest Rate',
          type: 'percentage',
          required: true,
          min: 1,
          max: 30,
          placeholder: 'Enter interest rate %'
        },
        {
          id: 'tenure',
          label: 'Loan Tenure (Years)',
          type: 'number',
          required: true,
          min: 1,
          max: 30,
          placeholder: 'Enter tenure in years'
        }
      ],
      formula: 'EMI = [P x R x (1+R)^N] / [(1+R)^N-1]',
      resultTemplate: 'Your monthly EMI will be ₹{emi}. Total interest payable: ₹{totalInterest}. Total amount payable: ₹{totalAmount}'
    },
    {
      id: '2',
      name: 'FD Calculator',
      description: 'Calculate maturity amount for your Fixed Deposit',
      category: 'savings',
      fields: [
        {
          id: 'principal',
          label: 'Deposit Amount',
          type: 'currency',
          required: true,
          min: 1000,
          max: 10000000,
          placeholder: 'Enter deposit amount'
        },
        {
          id: 'rate',
          label: 'Annual Interest Rate',
          type: 'percentage',
          required: true,
          min: 1,
          max: 15,
          placeholder: 'Enter interest rate %'
        },
        {
          id: 'tenure',
          label: 'FD Tenure (Years)',
          type: 'number',
          required: true,
          min: 0.25,
          max: 10,
          placeholder: 'Enter tenure in years'
        },
        {
          id: 'compounding',
          label: 'Compounding Frequency',
          type: 'select',
          required: true,
          options: ['Quarterly', 'Half-yearly', 'Yearly']
        }
      ],
      formula: 'A = P(1 + r/n)^(nt)',
      resultTemplate: 'Maturity amount: ₹{maturityAmount}. Interest earned: ₹{interestEarned}'
    }
  ];
  
  // Content Categories
  export const contentCategories = [
    { id: 'banking', name: 'Banking Basics', icon: 'Building2' },
    { id: 'loans', name: 'Loans & Credit', icon: 'CreditCard' },
    { id: 'investments', name: 'Savings & Investment', icon: 'TrendingUp' },
    { id: 'payments', name: 'Digital Payments', icon: 'Smartphone' },
    { id: 'insurance', name: 'Insurance', icon: 'Shield' },
    { id: 'credit', name: 'Credit Score', icon: 'BarChart3' }
  ];
  
  // Search functionality
  export const searchContent = (query: string, type: 'all' | 'terms' | 'guides' = 'all') => {
    const searchQuery = query.toLowerCase();
    
    let results: any[] = [];
    
    if (type === 'all' || type === 'terms') {
      const termResults = financialTerms.filter(term => 
        term.term.toLowerCase().includes(searchQuery) ||
        term.definition.toLowerCase().includes(searchQuery) ||
        term.category.toLowerCase().includes(searchQuery)
      ).map(term => ({ ...term, type: 'term' }));
      
      results = [...results, ...termResults];
    }
    
    if (type === 'all' || type === 'guides') {
      const guideResults = howToGuides.filter(guide =>
        guide.title.toLowerCase().includes(searchQuery) ||
        guide.description.toLowerCase().includes(searchQuery) ||
        guide.tags.some(tag => tag.toLowerCase().includes(searchQuery))
      ).map(guide => ({ ...guide, type: 'guide' }));
      
      results = [...results, ...guideResults];
    }
    
    return results;
  };