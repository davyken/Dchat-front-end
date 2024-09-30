import React from "react";
import { Link } from "react-router-dom";
import MobileNavBar from "../../components/chatcomponent/MobileNav";

function GeneralSettings() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">General Settings</h1>
      <div className="flex flex-col space-y-4">
        <p className="text-lg">
          Here you can find general settings for your account.
        </p>
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-bold">Account Settings</p>
          <Link to="/account-settings" className="text-blue-500">
            Go to Account Settings
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-bold">Security Settings</p>
          <p>
            Here you can manage your security settings. For example, you can
            change your password.
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-bold">Notifications Settings</p>
          <p>
            Here you can manage your notification settings. For example, you can
            turn on notifications for new messages.
          </p>
        </div>
      </div>
      <MobileNavBar />
    </div>
  );
}

export default GeneralSettings;
