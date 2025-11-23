import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import {
  Bell,
  Globe,
  MapPin,
  LogOut,
  Check,
  X,
  Package,
  Calendar,
  DollarSign,
  ChevronRight,
} from "lucide-react";

const MOCK_USER = {
  username: "Salah Haddani",
  email: "salah.edine.haddani@gmail.com",
  avatarUrl: "/avatar.jpeg",
  settings: {
    notifications: true,
    language: "English",
  },
  address: "Rabat, Morocco",
};

const MOCK_ORDER_HISTORY = [
  {
    id: "ORD001",
    date: "2025-10-20",
    total: 155.49,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD002",
    date: "2025-11-01",
    total: 99.99,
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD003",
    date: "2025-11-15",
    total: 25.5,
    status: "Processing",
    items: 1,
  },
];

const ToggleSwitch = ({ label, icon: Icon, isEnabled, onToggle }) => (
  <div className="flex justify-between items-center py-3 border-b border-softGray2/70">
    <div className="flex items-center text-textDark">
      <Icon className="w-5 h-5 mr-3 text-actionPrimary" />
      <span className="font-medium">{label}</span>
    </div>
    <button
      onClick={onToggle}
      className={`
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full 
                cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-actionPrimary 
                ${isEnabled ? "bg-actionPrimary" : "bg-softGray2"}
            `}
      role="switch"
      aria-checked={isEnabled}
    >
      <span
        aria-hidden="true"
        className={`
                    pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform 
                    ring-0 transition ease-in-out duration-200
                    ${isEnabled ? "translate-x-5" : "translate-x-0"}
                `}
      />
    </button>
  </div>
);

const Profile = () => {
  const [userSettings, setUserSettings] = useState(MOCK_USER.settings);

  const handleToggleNotifications = () => {
    setUserSettings((prev) => ({
      ...prev,
      notifications: !prev.notifications,
    }));
  };

  const handleLogout = () => {
    alert("Logging out...");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-softGray2 text-textDark";
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="card-base p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={MOCK_USER.avatarUrl}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-actionPrimary/50 shadow-md"
          />
          <div className="text-center sm:text-left">
            <h2 className="h2 text-textDark mb-1">{MOCK_USER.username}</h2>
            <p className="text-md text-softGray3">{MOCK_USER.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 flex items-center text-red-500 hover:text-red-700 transition-colors mx-auto sm:mx-0"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="card-base p-6">
          <h3 className="h3 text-textDark mb-4 border-b border-softGray2/70 pb-2">
            Order History
          </h3>
          <div className="space-y-3">
            {MOCK_ORDER_HISTORY.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center p-3 hover:bg-softGray1 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Package className="w-5 h-5 text-actionPrimary" />
                  <div>
                    <p className="font-semibold text-textDark">{order.id}</p>
                    <div className="text-xs text-softGray3 flex items-center space-x-3 mt-1">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {order.date}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-softGray3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-base p-6">
          <h3 className="h3 text-textDark mb-4 border-b border-softGray2/70 pb-2">
            Account Settings
          </h3>

          <ToggleSwitch
            label="Email Notifications"
            icon={Bell}
            isEnabled={userSettings.notifications}
            onToggle={handleToggleNotifications}
          />

          <div className="flex justify-between items-center py-3 border-b border-softGray2/70">
            <div className="flex items-center text-textDark">
              <Globe className="w-5 h-5 mr-3 text-actionPrimary" />
              <span className="font-medium">Language</span>
            </div>
            <select
              value={userSettings.language}
              onChange={(e) =>
                setUserSettings((prev) => ({
                  ...prev,
                  language: e.target.value,
                }))
              }
              className="input-base px-3 py-1 text-sm bg-white"
            >
              <option value="English">English</option>
              <option value="Spanish">Arabic</option>
              <option value="French">French</option>
            </select>
          </div>

          <div className="py-3">
            <div className="flex items-center text-textDark mb-2">
              <MapPin className="w-5 h-5 mr-3 text-actionPrimary" />
              <span className="font-medium">Address Information</span>
            </div>
            <p className="text-sm text-softGray3 ml-8">{MOCK_USER.address}</p>
            <button className="text-sm text-actionPrimary hover:text-actionSecondary mt-2 ml-8">
              Edit Address
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
