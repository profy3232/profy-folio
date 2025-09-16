import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code, Briefcase, User, Mail } from "lucide-react";
import avatar from "@/assets/hero.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: User, label: "About", href: "#about" },
    { icon: Code, label: "Performance", href: "#performance" },
    { icon: Briefcase, label: "Portfolio", href: "#portfolio" },
    { icon: Mail, label: "Contact", href: "#contact" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'cyber-border bg-background/80 backdrop-blur-md' : 'bg-transparent'
      }`}>
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-center">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-8 text-xl">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center gap-2 text-muted-foreground hover:text-ethereum transition-colors text-white"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-ethereum transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/20 bg-background/90 backdrop-blur-md">
            <div className="py-4 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-3 w-full p-3 text-left text-muted-foreground hover:text-ethereum hover:bg-muted/50 rounded-lg transition-all"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <Button variant="cyber" size="sm" className="w-full">
                  Hire Me
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;