import React from 'react';

export function Tabs({ children, defaultValue, className }) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeTab });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-4">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
}

export function TabsTrigger({ value, activeTab, setActiveTab, children }) {
  return (
    <button
      className={`px-4 py-2 rounded ${activeTab === value ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeTab, children }) {
  return activeTab === value ? <div>{children}</div> : null;
}
