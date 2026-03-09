const Footer = () => (
  <footer className="bg-nav py-8 mt-auto">
    <div className="container mx-auto flex flex-col items-center gap-2">
      <p className="text-xs text-muted-foreground">© OTIC. All rights reserved.</p>
      <div className="flex gap-6 text-xs text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-foreground transition-colors">Support</a>
      </div>
    </div>
  </footer>
);

export default Footer;