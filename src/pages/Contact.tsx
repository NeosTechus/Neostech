import { Layout } from "@/components/layout/Layout";
import Globe from "@/components/ui/globe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MapPin, Phone, Send, MessageCircle, Clock } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { LampContainer } from "@/components/ui/lamp";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@neostechus.com",
    link: "mailto:info@neostechus.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (314) 978-2326",
    link: "tel:+13149782326",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Saint Louis, Missouri",
    link: null,
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "Within 24 hours",
    link: null,
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <LampContainer
        className="bg-transparent min-h-screen rounded-none items-start justify-start pt-36 lg:pt-40"
        contentClassName="w-full translate-y-0 px-0"
      >
        <div className="relative w-full">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-grid opacity-40" />

          {/* Hero */}
          <section className="pt-8 pb-12 lg:pt-12 lg:pb-16 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h1
                  initial={{ opacity: 0.5, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5"
                >
                  Let's build something{" "}
                  <span className="text-gradient">amazing</span>
                </motion.h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Ready to start your project? We'd love to hear from you. Fill out
                  the form below and we'll get back to you within 24 hours.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form & Info */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
                {/* Form */}
                <div className="lg:col-span-3">
                  <div className="glass rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="bg-secondary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="bg-secondary/50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="bg-secondary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service">Service Interested In</Label>
                          <Select
                            value={formData.service}
                            onValueChange={(value) => setFormData({ ...formData, service: value })}
                          >
                            <SelectTrigger className="bg-secondary/50">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website">Website Development</SelectItem>
                              <SelectItem value="ai">AI Agents</SelectItem>
                              <SelectItem value="custom">Custom Solution</SelectItem>
                              <SelectItem value="consulting">Consulting</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Estimated Budget</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => setFormData({ ...formData, budget: value })}
                        >
                          <SelectTrigger className="bg-secondary/50">
                            <SelectValue placeholder="Select your budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<5k">Less than $5,000</SelectItem>
                            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value=">50k">$50,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          rows={5}
                          className="bg-secondary/50 resize-none"
                        />
                      </div>

                      <Button
                        variant="hero"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="glass rounded-2xl p-8">
                    <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      {contactInfo.map((item) => (
                        <div key={item.title} className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <item.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">{item.title}</p>
                            {item.link ? (
                              <a
                                href={item.link}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="font-medium">{item.value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative overflow-hidden min-h-[300px] flex items-center justify-center z-10">
                    <Globe size={250} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </LampContainer>
    </Layout>
  );
}
