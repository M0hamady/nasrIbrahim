import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "./LanguageContext";
// Define types for your data structure (without TypeScript syntax)
const SectionsContext = createContext(undefined);

export const SectionsProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // To handle update loading state
  const [isAdding, setIsAdding] = useState(false); // To handle add loading state
  const { language, switchLanguage } = useLanguage(); // Language Context

  // Get the token from localStorage (assuming JWT is stored here)
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSectionsData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/sections/", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': language,

          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch sections");
        }
        const data = await response.json();
        setSections(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionsData();
  }, [token]);

  // Function to handle adding a new section
  const handleAddSection = async (newSection) => {
    if (!token) {
      setError("Unauthorized: Please log in");
      return;
    }

    setIsAdding(true);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/sections/${newSection.id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSection),
      });
      if (!response.ok) {
        throw new Error("Failed to add section");
      }
      const data = await response.json();
      setSections((prevSections) => [...prevSections, data]); // Add new section to state
    } catch (error) {
      setError(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  // Function to handle updating a section
  const handleUpdateSection = async (updatedSection) => {
    if (!token) {
      setError("Unauthorized: Please log in");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/sections/${updatedSection.id}/`, {
      method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSection),
      });
      if (!response.ok) {
        throw new Error("Failed to update section");
      }
      const data = await response.json();
      setSections((prevSections) =>
        prevSections.map((section) => (section.id === data.id ? data : section))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <SectionsContext.Provider
      value={{
        sections,
        loading,
        error,
        isAdding,
        isUpdating,
        handleAddSection,
        handleUpdateSection,
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export const useSections = () => {
  const context = useContext(SectionsContext);
  if (!context) {
    throw new Error("useSections must be used within a SectionsProvider");
  }
  return context;
};
