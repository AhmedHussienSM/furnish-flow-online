
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd send this data to your backend
    // For now, we'll just show a success message
    toast({
      title: "Message sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-furniture-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl text-gray-700">
              Have questions or need assistance? Our team is here to help you create the perfect space.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Info & Form */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-2xl font-medium mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-furniture-primary/10 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="text-furniture-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Visit Us</h3>
                    <p className="text-gray-700">
                      123 Furniture Avenue<br />
                      Design District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-furniture-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Mail className="text-furniture-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Email Us</h3>
                    <p className="text-gray-700">
                      info@elegantliving.com<br />
                      support@elegantliving.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-furniture-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Phone className="text-furniture-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Call Us</h3>
                    <p className="text-gray-700">
                      +1 (555) 123-4567<br />
                      Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-furniture-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Clock className="text-furniture-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Opening Hours</h3>
                    <p className="text-gray-700">
                      Monday to Friday: 9am - 6pm<br />
                      Saturday: 10am - 5pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="mt-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Interactive Map will go here</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl font-medium mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">Your Name</label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Your Email</label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-1">Subject</label>
                  <Input 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                  <Textarea 
                    id="message" 
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full flex items-center justify-center">
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </form>
              
              <p className="text-gray-600 text-sm mt-6">
                We'll get back to you within 24 hours. Your information will be handled according to our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl font-medium mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">How long does delivery take?</h3>
              <p className="text-gray-700">
                Delivery times vary depending on your location and product availability. Standard delivery typically takes 5-7 business days, while express delivery options are available for 1-3 business days.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">Do you offer assembly services?</h3>
              <p className="text-gray-700">
                Yes, we offer professional assembly services for an additional fee. You can select this option during checkout or contact our customer service team to arrange assembly.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">What is your return policy?</h3>
              <p className="text-gray-700">
                We offer a 30-day return policy for most items in their original condition. Custom-made furniture cannot be returned unless there is a manufacturing defect. Please contact our support team to initiate a return.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">Do you ship internationally?</h3>
              <p className="text-gray-700">
                Currently, we offer shipping within the continental United States and select international destinations. Please contact us for specific information regarding international shipping options and rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
