import React, { useState } from 'react';
import { CreditCard, Plus, Check, Trash2, AlertCircle, ChevronDown, ChevronUp, Ban as Bank } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface BankAccount {
  id: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  ifscCode: string;
  isDefault: boolean;
}

const BankAccountPage: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      accountNumber: 'XXXX XXXX 4321',
      accountName: 'Rahul Sharma',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234',
      isDefault: true
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpiForm, setShowUpiForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    accountName: '',
    bankName: '',
    ifscCode: '',
    confirmAccountNumber: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount({
      ...newAccount,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      const updatedErrors = { ...formErrors };
      delete updatedErrors[name];
      setFormErrors(updatedErrors);
    }
  };
  
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!newAccount.accountName.trim()) {
      errors.accountName = 'Account holder name is required';
    }
    
    if (!newAccount.accountNumber.trim()) {
      errors.accountNumber = 'Account number is required';
    } else if (!/^\d+$/.test(newAccount.accountNumber)) {
      errors.accountNumber = 'Account number must contain only digits';
    }
    
    if (newAccount.accountNumber !== newAccount.confirmAccountNumber) {
      errors.confirmAccountNumber = 'Account numbers do not match';
    }
    
    if (!newAccount.bankName.trim()) {
      errors.bankName = 'Bank name is required';
    }
    
    if (!newAccount.ifscCode.trim()) {
      errors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(newAccount.ifscCode)) {
      errors.ifscCode = 'Invalid IFSC code format';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newBankAccount: BankAccount = {
        id: Date.now().toString(),
        accountNumber: `XXXX XXXX ${newAccount.accountNumber.slice(-4)}`,
        accountName: newAccount.accountName,
        bankName: newAccount.bankName,
        ifscCode: newAccount.ifscCode,
        isDefault: bankAccounts.length === 0
      };
      
      setBankAccounts([...bankAccounts, newBankAccount]);
      setNewAccount({
        accountNumber: '',
        accountName: '',
        bankName: '',
        ifscCode: '',
        confirmAccountNumber: ''
      });
      setShowAddForm(false);
    }
  };
  
  const setDefaultAccount = (id: string) => {
    setBankAccounts(bankAccounts.map(account => ({
      ...account,
      isDefault: account.id === id
    })));
  };
  
  const removeAccount = (id: string) => {
    // If removing default account, make another one default
    const isRemovingDefault = bankAccounts.find(a => a.id === id)?.isDefault;
    const filteredAccounts = bankAccounts.filter(account => account.id !== id);
    
    if (isRemovingDefault && filteredAccounts.length > 0) {
      filteredAccounts[0].isDefault = true;
    }
    
    setBankAccounts(filteredAccounts);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bank Accounts</h1>
          <p className="text-gray-600">Manage your bank accounts for investments and withdrawals</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddForm(true)}
          >
            Add Bank Account
          </Button>
        </div>
      </div>
      
      {bankAccounts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Bank Accounts Added</h2>
          <p className="text-gray-600 mb-6">Add a bank account to deposit funds and withdraw your earnings.</p>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddForm(true)}
          >
            Add Bank Account
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Bank Accounts</h2>
          
          <div className="space-y-4">
            {bankAccounts.map((account) => (
              <div 
                key={account.id} 
                className={`border rounded-lg p-5 ${account.isDefault ? 'border-primary-300 bg-primary-50' : 'border-gray-200'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                      <Bank size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">{account.bankName}</h3>
                        {account.isDefault && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-800 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700">{account.accountName}</p>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Account Number: {account.accountNumber}</p>
                        <p>IFSC Code: {account.ifscCode}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    {!account.isDefault && (
                      <>
                        <button
                          onClick={() => setDefaultAccount(account.id)}
                          className="text-primary-600 hover:text-primary-700"
                          title="Set as default"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => removeAccount(account.id)}
                          className="text-gray-400 hover:text-error-600"
                          title="Remove account"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Payment Method Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Other Payment Methods</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg">
            <button
              className="w-full flex items-center justify-between p-4"
              onClick={() => setShowUpiForm(!showUpiForm)}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0L1 6V18L12 24L23 18V6L12 0Z" fill="#3A67AF"/>
                    <path d="M12 0L1 6V18L12 24V0Z" fill="#7D87B3"/>
                    <path d="M12.038 15.914L8.019 9.373H11.981L16 15.914H12.038Z" fill="white"/>
                    <path d="M8 15.914L11.981 9.373H8L4 15.914H8Z" fill="#E1E5EF"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">UPI</h3>
                  <p className="text-sm text-gray-600">Add your UPI ID for quick transactions</p>
                </div>
              </div>
              {showUpiForm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {showUpiForm && (
              <div className="p-4 border-t border-gray-200">
                <form className="space-y-4">
                  <Input
                    label="UPI ID"
                    placeholder="yourname@bankname"
                    name="upiId"
                  />
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <AlertCircle size={16} />
                    <p>We'll verify your UPI ID with a ₹1 transaction</p>
                  </div>
                  
                  <Button variant="primary">
                    Add UPI ID
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add Bank Account Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Bank Account</h2>
            
            <form onSubmit={handleAddAccount} className="space-y-4">
              <Input
                label="Account Holder Name"
                name="accountName"
                value={newAccount.accountName}
                onChange={handleInputChange}
                error={formErrors.accountName}
                placeholder="Enter account holder name"
              />
              
              <Input
                label="Account Number"
                name="accountNumber"
                value={newAccount.accountNumber}
                onChange={handleInputChange}
                error={formErrors.accountNumber}
                placeholder="Enter account number"
              />
              
              <Input
                label="Confirm Account Number"
                name="confirmAccountNumber"
                value={newAccount.confirmAccountNumber}
                onChange={handleInputChange}
                error={formErrors.confirmAccountNumber}
                placeholder="Re-enter account number"
              />
              
              <Input
                label="Bank Name"
                name="bankName"
                value={newAccount.bankName}
                onChange={handleInputChange}
                error={formErrors.bankName}
                placeholder="Enter bank name"
              />
              
              <Input
                label="IFSC Code"
                name="ifscCode"
                value={newAccount.ifscCode}
                onChange={handleInputChange}
                error={formErrors.ifscCode}
                placeholder="Enter IFSC code"
              />
              
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                <AlertCircle size={16} />
                <p>We'll verify this account with two small deposits</p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="primary"
                  type="submit"
                  fullWidth
                >
                  Add Account
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankAccountPage;