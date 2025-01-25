import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSections } from "../context/SectionsContext";

const SectionPage = () => {
  const { sectionId } = useParams(); // Get sectionId from route
  const { sections } = useSections(); // Use the Sections context to access data

  const [section, setSection] = useState(null);

  useEffect(() => {
    if (sectionId) {
      const selectedSection = sections.find(
        (section) => section.id === parseInt(sectionId)
      );
      setSection(selectedSection);
    }
  }, [sectionId, sections]);

  if (!section) {
    return <div>Loading...</div>; // Loading state until data is fetched
  }

  return (
    <div>
      <h1>{section.name}</h1>
      <p>{section.description}</p>
      {/* Render other section-related data here */}
      {section.tables?.map((table,index) => (
        <div key={index}>
          <h2>{table.table_name}</h2>
          <p>{table.table_description}</p>
          {/* Render rows and cells dynamically */}
          {table.rows?.map((row, idx) => (
            <div key={idx}>
              {Object.entries(row).map(([column, value], i) => (
                <p key={i}>
                  <strong>{column}: </strong>{value}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SectionPage;
