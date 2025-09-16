import { Github, Users, Mail, Heart } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <p className="text-2xl mb-2 block">Profy</p>
            <p className="text-muted-foreground">
              Defi & NFT & Trading Bot Builder
              
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-3">
            <a
              href="mailto:profy2032@gmail.com"
              className="flex items-center space-x-2 text-muted-foreground hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>profy2032@gmail.com</span>
            </a>
            <a
              href="https://github.com/profy916"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Profy</span>
            </a>
            <a
              href="https://teams.microsoft.com/l/chat/0/0?users=profy2032@outlook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-white transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Join Teams</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground flex items-center justify-center space-x-2">
            <span>©2023</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
