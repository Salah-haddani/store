import React from "react";
import {
  Home as HomeIcon,
  ChevronDown,
  User,
  Menu,
  Gift,
  ShoppingCart,
  DollarSign,
  BarChart2,
  MessageSquare,
  HelpCircle,
  Monitor,
} from "lucide-react";

const TOP_LINKS = [
  { name: "Home", icon: HomeIcon, href: "/" },
  {
    name: "Categories",
    icon: Menu,
    href: "/categories",
    submenu: [
      { name: "Men", href: "/products" },
      { name: "Women", href: "/products" },
      { name: "Kids", href: "/products" },
      { name: "Accessories", href: "/products" },
    ],
  },
  { name: "Promos", icon: Gift, href: "/promos" },
  { name: "Orders", icon: ShoppingCart, href: "/orders" },
  { name: "Transactions", icon: DollarSign, href: "/transactions" },
  { name: "Analytics", icon: BarChart2, href: "/analytics" },
];

const BOTTOM_LINKS = [
  { name: "Feedback", icon: MessageSquare, href: "/feedback" },
  { name: "Help", icon: HelpCircle, href: "/help" },
];

const SidebarLink = ({ link }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (link.submenu) {
    return (
      <div className="group">
        <div
          className="flex items-center justify-between p-3 cursor-pointer text-textDark hover:bg-actionPrimary/10 rounded-lg transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            <link.icon className="w-5 h-5 mr-3" />
            <span className="text-sm">{link.name}</span>
          </div>

          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="ml-6 py-1 border-l border-softGray2">
            {link.submenu.map((sub, index) => (
              <a
                key={index}
                href={sub.href}
                className="block p-2 text-sm text-textDark hover:text-actionPrimary transition-colors duration-200"
              >
                {sub.name}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={link.href}
      className="flex items-center p-3 text-textDark hover:bg-actionPrimary/10 rounded-lg transition-colors duration-200 group"
    >
      <link.icon className="w-5 h-5 mr-3" />
      <span className="text-sm">{link.name}</span>
    </a>
  );
};

const Sidebar = () => {
  return (
    <div
      className="
        w-64
        h-screen
        p-4
        fixed
        top-0
        left-0
        shadow-lg
        bg-sidebarBg
        z-30
        flex flex-col
        justify-between
        rounded-r-xl
      "
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-textDark whitespace-nowrap pl-4">
              Welcome again!
            </h1>
          </div>
        </div>

        <nav className="space-y-2">
          {TOP_LINKS.map((link, index) => (
            <SidebarLink key={index} link={link} />
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        <nav className="space-y-2 pt-4 border-t border-softGray2">
          {BOTTOM_LINKS.map((link, index) => (
            <SidebarLink key={index} link={link} />
          ))}
        </nav>

        <a
          href="/profile"
          className="flex items-center p-3 bg-actionPrimary/10 rounded-lg cursor-pointer hover:bg-actionPrimary/20 transition-colors duration-200"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-actionPrimary text-white">
            <User className="w-5 h-5" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-textDark whitespace-nowrap">
              Salah Haddani
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
