const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border py-8 text-center text-muted-foreground">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AI Oracle. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Insights into the future of Artificial Intelligence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
