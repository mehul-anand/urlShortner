const Footer = ({
  logo = {
    src: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg",
    alt: "blocks for shadcn/ui",
    title: "URL Shortner",
    url: "/",
  },
  tagline = "URL Sharing made easy",
  menuItems = [
    {
      title: "Navigate",
      links: [
        { text: "Home", url: "/" },
        { text: "Dashboard", url: "/dashboard" },
        { text: "Pricing(coming soon)", url: "/" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "https://x.com/mehul_xyz" },
        { text: "Github", url: "https://github.com/mehul-anand" },
        { text: "LinkedIn", url: "https://www.linkedin.com/in/mehulxyz/" },
        { text: "Peerlist", url: "https://peerlist.io/mehulxyz" },
      ],
    },
  ],
  desc = "Made by Mehul Anand",
  bottomLinks = [{ text: "Contact me", url: "mailto:mehulanand78@gmail.com" }],
}) => {
  return (
    <section className="py-3 px-10">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-6">
            <div className="col-span-2 sm:col-span-4 mb-8 lg:mb-0">
              <div className="flex items-center gap-5 lg:justify-start">
                <a href="/">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-10"
                  />
                </a>
                <p className="text-xl font-semibold">{logo.title}</p>
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            <div className="flex sm:gap-36 gap-20">
              {menuItems.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-4 font-bold">{section.title}</h3>
                  <ul className="space-y-4 text-muted-foreground">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="font-medium hover:text-primary"
                      >
                        <a href={link.url}>{link.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-24 flex justify-center gap-16 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{desc}</p>
            <ul className="flex">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
