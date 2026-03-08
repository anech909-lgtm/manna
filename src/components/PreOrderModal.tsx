import React, { useState } from 'react';
import { X, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type OrderType = 'cinnamon-rolls' | 'salad-bowls' | 'sweet-potatoes' | null;

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: OrderType;
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({ isOpen, onClose, type }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    countryCode: '+1',
    phoneNumber: '',
    deliveryAddress: '',
    deliveryDate: '',
    flavorSelection: '',
    quantity: 1,
    specialInstructions: '',
    // Other fields for other types can be added here
    base: '',
    protein: [] as string[],
    toppings: [] as string[],
    dressing: '',
    meat: '',
  });

  if (!isOpen || !type) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'toppings' | 'protein') => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, [field]: [...prev[field], value] };
      } else {
        return { ...prev, [field]: prev[field].filter(t => t !== value) };
      }
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleArrayChange(e, 'toppings');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Phone number validation (basic check for 7-15 digits)
    const phoneRegex = /^[0-9]{7,15}$/;
    const cleanedPhone = formData.phoneNumber.replace(/[\s-()]/g, '');
    
    if (!phoneRegex.test(cleanedPhone)) {
      setPhoneError('Please enter a valid phone number (7-15 digits).');
      return;
    }
    
    setPhoneError('');
    setIsSubmitting(true);
    
    // Prepare data for API integration
    const orderPayload = {
      orderType: type,
      ...formData,
      fullPhoneNumber: `${formData.countryCode}${cleanedPhone}`
    };
    
    console.log('Submitting order:', orderPayload);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
        // Reset form
        setFormData({
          customerName: '',
          countryCode: '+1',
          phoneNumber: '',
          deliveryAddress: '',
          deliveryDate: '',
          flavorSelection: '',
          quantity: 1,
          specialInstructions: '',
          base: '',
          protein: [] as string[],
          toppings: [] as string[],
          dressing: '',
          meat: '',
        });
      } else {
        throw new Error(data.message || 'Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setPhoneError('');
    onClose();
  };

  const titles = {
    'cinnamon-rolls': 'Cinnamon Rolls Order',
    'salad-bowls': 'Build Your Salad Bowl',
    'sweet-potatoes': 'Stuffed Sweet Potatoes Order'
  };

  const submitTexts = {
    'cinnamon-rolls': 'Place Order',
    'salad-bowls': 'Order Bowl',
    'sweet-potatoes': 'Place Order'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative transform overflow-hidden rounded-2xl bg-[var(--color-manna-cream)] text-left shadow-2xl transition-all sm:my-8 w-full max-w-2xl border border-[var(--color-manna-gold)]/20"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white rounded-full p-2 shadow-sm text-[var(--color-manna-dark)] transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            {isSuccess ? (
              <div className="p-10 md:p-16 flex flex-col items-center justify-center text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                  className="w-24 h-24 bg-[var(--color-manna-green)]/10 rounded-full flex items-center justify-center mb-6"
                >
                  <Smile className="w-12 h-12 text-[var(--color-manna-green)]" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-serif text-[var(--color-manna-green)] mb-4"
                >
                  Thank You!
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[var(--color-manna-dark)]/70 mb-8 max-w-md text-lg"
                >
                  Your order has been successfully placed. We're preparing your fresh food and will contact you shortly.
                </motion.p>
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleClose} 
                  className="bg-[var(--color-manna-green)] text-white px-8 py-4 rounded-xl text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-manna-dark)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Back to Menu
                </motion.button>
              </div>
            ) : (
              <div className="p-6 md:p-10">
              <div className="mb-8 text-center">
                <span className="text-[var(--color-manna-gold)] text-xs uppercase tracking-[0.2em] font-semibold mb-2 block">Pre-Order Request</span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[var(--color-manna-green)]">
                  {titles[type]}
                </h2>
              </div>
              
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Common Customer Info Fields */}
                <div className="space-y-5">
                  <h3 className="text-xl font-serif text-[var(--color-manna-green)] border-b border-[var(--color-manna-gold)]/20 pb-2">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-2">Customer Name</label>
                      <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} required className="w-full bg-white border border-[var(--color-manna-gold)]/30 rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-2">Phone Number</label>
                      <div className="flex gap-2">
                        <select 
                          name="countryCode" 
                          value={formData.countryCode} 
                          onChange={handleInputChange} 
                          className="w-1/3 sm:w-1/4 bg-white border border-[var(--color-manna-gold)]/30 rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm"
                        >
                          <option value="+1">US (+1)</option>
                          <option value="+44">UK (+44)</option>
                          <option value="+1">CA (+1)</option>
                          <option value="+61">AU (+61)</option>
                          <option value="+91">IN (+91)</option>
                          <option value="+81">JP (+81)</option>
                          <option value="+49">DE (+49)</option>
                          <option value="+33">FR (+33)</option>
                        </select>
                        <input 
                          type="tel" 
                          name="phoneNumber" 
                          value={formData.phoneNumber} 
                          onChange={handleInputChange} 
                          required 
                          className={`w-2/3 sm:w-3/4 bg-white border ${phoneError ? 'border-red-500' : 'border-[var(--color-manna-gold)]/30'} rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm`} 
                          placeholder="Phone number" 
                        />
                      </div>
                      {phoneError && <p className="text-red-500 text-xs mt-1.5 font-medium">{phoneError}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-2">Delivery Address</label>
                      <textarea name="deliveryAddress" value={formData.deliveryAddress} onChange={handleInputChange} required rows={2} className="w-full bg-white border border-[var(--color-manna-gold)]/30 rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm" placeholder="Full delivery address"></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-2">Delivery Date</label>
                      <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} required className="w-full bg-white border border-[var(--color-manna-gold)]/30 rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm" />
                    </div>
                  </div>
                </div>

                {/* Specific Fields */}
                <div className="space-y-5">
                  <h3 className="text-xl font-serif text-[var(--color-manna-green)] border-b border-[var(--color-manna-gold)]/20 pb-2">Order Details</h3>
                  
                  {type === 'cinnamon-rolls' && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-2">Flavor Selection</label>
                          <select name="flavorSelection" value={formData.flavorSelection} onChange={handleInputChange} required className="w-full bg-white border border-[var(--color-manna-gold)]/30 rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm">
                            <option value="">Select a flavor</option>
                            <option value="Classic Cinnamon">Classic Cinnamon</option>
                            <option value="Cream Cheese">Cream Cheese</option>
                            <option value="Chocolate">Chocolate</option>
                            <option value="Caramel">Caramel</option>
                            <option value="Custom Flavor">Custom Flavor</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-2">Quantity</label>
                          <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} min="1" required className="w-full bg-white border border-[var(--color-manna-gold)]/30 rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-2">Special Instructions</label>
                        <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleInputChange} rows={3} className="w-full bg-white border border-[var(--color-manna-gold)]/30 rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm" placeholder="Any special requests?"></textarea>
                      </div>
                    </div>
                  )}

                  {type === 'salad-bowls' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-3">Select Base</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {['Lettuce', 'Spinach', 'Mixed Greens'].map(base => (
                            <label key={base} className="flex items-center p-3 bg-white border border-[var(--color-manna-gold)]/30 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[var(--color-manna-green)] has-[:checked]:bg-[var(--color-manna-green)]/5 shadow-sm">
                              <input type="radio" name="base" value={base} checked={formData.base === base} onChange={handleInputChange} required className="w-4 h-4 text-[var(--color-manna-green)] focus:ring-[var(--color-manna-green)] border-gray-300" />
                              <span className="ml-3 text-sm text-[var(--color-manna-dark)]">{base}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-3">Select Protein (Multi-select)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {['Chicken', 'Shrimp', 'Ground Beef'].map(protein => (
                            <label key={protein} className="flex items-center p-3 bg-white border border-[var(--color-manna-gold)]/30 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[var(--color-manna-green)] has-[:checked]:bg-[var(--color-manna-green)]/5 shadow-sm">
                              <input type="checkbox" name="protein" value={protein} checked={formData.protein.includes(protein)} onChange={(e) => handleArrayChange(e, 'protein')} className="w-4 h-4 text-[var(--color-manna-green)] focus:ring-[var(--color-manna-green)] border-gray-300 rounded" />
                              <span className="ml-3 text-sm text-[var(--color-manna-dark)]">{protein}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-3">Select Toppings (Multi-select)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {['Corn', 'Tomatoes', 'Avocado', 'Cucumber', 'Cheese', 'Onions'].map(topping => (
                            <label key={topping} className="flex items-center p-3 bg-white border border-[var(--color-manna-gold)]/30 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[var(--color-manna-green)] has-[:checked]:bg-[var(--color-manna-green)]/5 shadow-sm">
                              <input type="checkbox" name="toppings" value={topping} checked={formData.toppings.includes(topping)} onChange={handleCheckboxChange} className="w-4 h-4 text-[var(--color-manna-green)] focus:ring-[var(--color-manna-green)] border-gray-300 rounded" />
                              <span className="ml-3 text-sm text-[var(--color-manna-dark)]">{topping}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-2">Select Dressing</label>
                          <select name="dressing" value={formData.dressing} onChange={handleInputChange} required className="w-full bg-white border border-[var(--color-manna-gold)]/30 rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm">
                            <option value="">Select a dressing</option>
                            <option value="Ranch">Ranch</option>
                            <option value="Honey Mustard">Honey Mustard</option>
                            <option value="Vinaigrette">Vinaigrette</option>
                            <option value="Caesar">Caesar</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-2">Quantity</label>
                          <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} min="1" required className="w-full bg-white border border-[var(--color-manna-gold)]/30 rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm" />
                        </div>
                      </div>
                    </div>
                  )}

                  {type === 'sweet-potatoes' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-3">Choose Meat</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {['Chicken', 'Shrimp', 'Ground Beef'].map(meat => (
                            <label key={meat} className="flex items-center p-3 bg-white border border-[var(--color-manna-gold)]/30 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[var(--color-manna-green)] has-[:checked]:bg-[var(--color-manna-green)]/5 shadow-sm">
                              <input type="radio" name="meat" value={meat} checked={formData.meat === meat} onChange={handleInputChange} required className="w-4 h-4 text-[var(--color-manna-green)] focus:ring-[var(--color-manna-green)] border-gray-300" />
                              <span className="ml-3 text-sm text-[var(--color-manna-dark)]">{meat}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-3">Choose Toppings</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {['Corn', 'Cheese', 'Avocado', 'Tomatoes', 'Sauce'].map(topping => (
                            <label key={topping} className="flex items-center p-3 bg-white border border-[var(--color-manna-gold)]/30 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[var(--color-manna-green)] has-[:checked]:bg-[var(--color-manna-green)]/5 shadow-sm">
                              <input type="checkbox" name="toppings" value={topping} checked={formData.toppings.includes(topping)} onChange={handleCheckboxChange} className="w-4 h-4 text-[var(--color-manna-green)] focus:ring-[var(--color-manna-green)] border-gray-300 rounded" />
                              <span className="ml-3 text-sm text-[var(--color-manna-dark)]">{topping}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-2">Quantity</label>
                          <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} min="1" required className="w-full bg-white border border-[var(--color-manna-gold)]/30 rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-manna-dark)]/70 uppercase tracking-wider mb-2">Special Instructions</label>
                        <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleInputChange} rows={3} className="w-full bg-white border border-[var(--color-manna-gold)]/30 rounded-xl p-3 text-[var(--color-manna-dark)] focus:ring-2 focus:ring-[var(--color-manna-gold)] focus:border-transparent outline-none transition-all shadow-sm" placeholder="Any special requests?"></textarea>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[var(--color-manna-green)] text-white px-8 py-4 rounded-xl text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-manna-dark)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : submitTexts[type]}
                  </button>
                </div>
              </form>
            </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
