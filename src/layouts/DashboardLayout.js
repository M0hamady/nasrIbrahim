import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Icon for dropdown
import ExpandLessIcon from "@mui/icons-material/ExpandLess"; // Icon for closing dropdown
import { useSections } from "../context/SectionsContext"; // Import useSections hook
import { Link } from "react-router-dom"; // Updated import for react-router

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null); // Track open sections for dropdown

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Get sections data from the context
  const { sections, loading, error } = useSections();

  if (loading) return <div>Loading sections...</div>;
  if (error) return <div>Error: {error}</div>;

  // Handle section dropdown toggle
  const handleSectionToggle = (sectionId: string | number) => {
    setOpenSection(openSection === sectionId ? null : sectionId); // Toggle dropdown for a specific section
  };

  return (
    <div className="flex h-screen bg-light">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary text-white z-50 transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button
            className="text-white text-2xl"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Home Link */}
        <div className="mt-4">
          <ul>
            <li className="mb-4">
              <Link
                to="/" // Adjust the path if necessary
                className="text-white flex items-center p-2 rounded-md hover:bg-accent hover:text-dark"
              >
                <span className="mr-2">
                  <i className="material-icons">home</i>
                </span>
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Sections Dropdown */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Sections</h3>
          <ul>
            {sections.map((section) => (
              <li key={section.id} className="mb-2">
                <div className="flex justify-between items-center">
                  {/* Section name with a dropdown icon */}
                  <button
                    className="text-white flex items-center hover:text-accent"
                    onClick={() => handleSectionToggle(section.id)}
                  >
                    {section.name}
                    {openSection === section.id ? (
                      <ExpandLessIcon className="ml-2" />
                    ) : (
                      <ExpandMoreIcon className="ml-2" />
                    )}
                  </button>
                </div>

                {/* Dropdown for tables */}
                {openSection === section.id && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {section.tables.map((table, index) => (
                      <li key={index}>
                        <Link
                          to={`/section/${section.id}/table/${table.name}`}
                          className="text-white flex items-center p-2 rounded-md hover:bg-accent hover:text-dark"
                        >
                          <span className="mr-2">
                            {/* Add icon for table (e.g., a table icon) */}
                            <i className="material-icons">table_chart</i>
                          </span>
                          {table.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Absolute button for opening sidebar on mobile */}
      {!isSidebarOpen && (
        <button
          className="fixed bottom-6 right-6 bg-accent text-white p-3 rounded-full shadow-lg z-40"
          onClick={toggleSidebar}
          aria-label="Open Sidebar"
        >
          <MenuIcon />
        </button>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-dark text-white p-4 flex items-center justify-between">
          <button
            className="text-white text-2xl"
            onClick={toggleSidebar}
            aria-label="Open Sidebar"
          ></button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
