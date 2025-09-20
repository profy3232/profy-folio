import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Github, Send, MessageCircle, Calendar, Star, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

// Form validation types
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  errors: FormErrors;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    errors: {},
  });

  const { toast } = useToast();

  // EmailJS configuration (you'll need to set these up in your EmailJS account)
  // You can either set these directly or use environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_your_service_id';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_your_template_id';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

  // Form validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      errors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  // Real-time validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        break;
      case 'email':
        if (!value.trim()) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        break;
      case 'subject':
        if (!value.trim()) return "Subject is required";
        if (value.trim().length < 5) return "Subject must be at least 5 characters";
        break;
      case 'message':
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        break;
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    const error = validateField(name, value);
    setFormState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [name]: error,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({ ...prev, errors }));
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true, errors: {} }));

    try {
      // Check if EmailJS is properly configured
      if (EMAILJS_PUBLIC_KEY === 'your_public_key' || !EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS not configured');
      }

      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Profy",
      };

      // Send email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Success
      setFormState((prev) => ({ ...prev, isSubmitting: false, isSuccess: true }));
      
      toast({
        title: "Message sent successfully! 🎉",
        description: "Thank you for reaching out. I'll get back to you within 8 hours.",
      });

      // Reset form after success
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setFormState({ isSubmitting: false, isSuccess: false, errors: {} });
      }, 2000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
      
      // Check if it's a configuration error
      if (error instanceof Error && error.message === 'EmailJS not configured') {
        toast({
          title: "Email service not configured",
          description: "Please contact me directly at profy2032@gmail.com or set up EmailJS configuration.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to send message",
          description: "Something went wrong. Please try again or contact me directly at profy2032@gmail.com",
          variant: "destructive",
        });
      }
    }
  };

  // Reset success state when form data changes
  useEffect(() => {
    if (formState.isSuccess) {
      setFormState((prev) => ({ ...prev, isSuccess: false }));
    }
  }, [formData]);

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-purple-400 animate-pulse" />
            <span className="text-sm font-medium text-purple-300 uppercase tracking-wider">
              Let's Connect
            </span>
            <Star className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your project to life? Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="glass-effect border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 group">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Send a Message
                </CardTitle>
              </div>
              <CardDescription className="text-gray-400 text-lg">
                I'd love to hear about your project and explore how we can collaborate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Success Message */}
              {formState.isSuccess && (
                <Alert className="mb-6 border-green-500/50 bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-300">
                    Message sent successfully! I'll get back to you soon.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300 font-medium">
                      Name <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`glass-effect transition-all duration-300 hover:border-purple-400/50 ${
                        formState.errors.name
                          ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/50"
                          : "border-purple-500/30 focus:border-purple-400 focus:ring-purple-400/50"
                      }`}
                      placeholder="Your full name"
                      disabled={formState.isSubmitting}
                      aria-describedby={formState.errors.name ? "name-error" : undefined}
                      aria-invalid={!!formState.errors.name}
                    />
                    {formState.errors.name && (
                      <p id="name-error" className="text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formState.errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 font-medium">
                      Email <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`glass-effect transition-all duration-300 hover:border-purple-400/50 ${
                        formState.errors.email
                          ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/50"
                          : "border-purple-500/30 focus:border-purple-400 focus:ring-purple-400/50"
                      }`}
                      placeholder="your.email@example.com"
                      disabled={formState.isSubmitting}
                      aria-describedby={formState.errors.email ? "email-error" : undefined}
                      aria-invalid={!!formState.errors.email}
                    />
                    {formState.errors.email && (
                      <p id="email-error" className="text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formState.errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300 font-medium">
                    Subject <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`glass-effect transition-all duration-300 hover:border-purple-400/50 ${
                      formState.errors.subject
                        ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/50"
                        : "border-purple-500/30 focus:border-purple-400 focus:ring-purple-400/50"
                    }`}
                    placeholder="What's this about?"
                    disabled={formState.isSubmitting}
                    aria-describedby={formState.errors.subject ? "subject-error" : undefined}
                    aria-invalid={!!formState.errors.subject}
                  />
                  {formState.errors.subject && (
                    <p id="subject-error" className="text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formState.errors.subject}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300 font-medium">
                    Message <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`glass-effect transition-all duration-300 hover:border-purple-400/50 min-h-32 resize-none ${
                      formState.errors.message
                        ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/50"
                        : "border-purple-500/30 focus:border-purple-400 focus:ring-purple-400/50"
                    }`}
                    placeholder="Tell me about your project, goals, and how I can help..."
                    disabled={formState.isSubmitting}
                    aria-describedby={formState.errors.message ? "message-error" : undefined}
                    aria-invalid={!!formState.errors.message}
                  />
                  {formState.errors.message && (
                    <p id="message-error" className="text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formState.errors.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={formState.isSubmitting || formState.isSuccess}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {formState.isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : formState.isSuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-24">
            {/* Email Card */}
            <Card className="glass-effect border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                    <p className="text-gray-400 text-lg">profy2032@gmail.com</p>
                    <p className="text-sm text-purple-300 mt-1">I'll respond within 8 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Github Card */}
            <Card className="glass-effect border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Github className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">GitHub</h3>
                    <p className="text-gray-400 text-lg">profy3232</p>
                    <p className="text-sm text-cyan-300 mt-1">Check out my projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discord Card */}
            <Card className="glass-effect border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">Discord</h3>
                    <p className="text-gray-400 text-lg">profy3232</p>
                    <p className="text-sm text-green-300 mt-1">Join my community</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
